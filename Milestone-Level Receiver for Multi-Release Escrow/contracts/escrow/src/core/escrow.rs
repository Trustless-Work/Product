use soroban_sdk::token::Client as TokenClient;
use soroban_sdk::{Address, Env, Symbol, Vec};

use crate::core::validators::escrow::{
    list_completed_milestones, validate_escrow_property_change_conditions,
    validate_fund_escrow_conditions, validate_initialize_escrow_conditions,
    validate_release_conditions,
};
use crate::error::ContractError;
use crate::modules::fee::{FeeCalculator, FeeCalculatorTrait};
use crate::storage::types::{AddressBalance, DataKey, Escrow};

pub struct EscrowManager;

impl EscrowManager {
    pub fn initialize_escrow(e: &Env, escrow_properties: Escrow) -> Result<Escrow, ContractError> {
        validate_initialize_escrow_conditions(e, escrow_properties.clone())?;
        e.storage()
            .instance()
            .set(&DataKey::Escrow, &escrow_properties);
        Ok(escrow_properties)
    }

    pub fn fund_escrow(
        e: &Env,
        signer: &Address,
        expected_escrow: &Escrow,
        amount: i128,
    ) -> Result<(), ContractError> {
        let stored_escrow: Escrow = Self::get_escrow(e)?;
        validate_fund_escrow_conditions(amount, &stored_escrow, expected_escrow)?;

        signer.require_auth();
        let token_client = TokenClient::new(e, &stored_escrow.trustline.address);
        token_client.transfer(signer, &e.current_contract_address(), &amount);
        Ok(())
    }

    pub fn release_completed_milestones_funds(
        e: &Env,
        release_signer: &Address,
        trustless_work_address: &Address,
    ) -> Result<Vec<u32>, ContractError> {
        release_signer.require_auth();

        let escrow = Self::get_escrow(e)?;

        // Validate release conditions upfront
        validate_release_conditions(&escrow, release_signer)?;

        // Get list of completed milestones to release
        let transactions = list_completed_milestones(e, escrow.milestones.clone())?;

        let contract_address = e.current_contract_address();
        let token_client = TokenClient::new(e, &escrow.trustline.address);

        // Check if contract has enough balance for all releases
        let total_amount: i128 = transactions.iter().map(|t| t.amount).sum();
        if token_client.balance(&contract_address) < total_amount {
            return Err(ContractError::EscrowBalanceNotEnoughToSendEarnings);
        }

        let mut released_indices: Vec<u32> = Vec::new(e);

        // Finding and release all approved, unreleased milestones
        for (idx, milestone) in escrow.milestones.iter().enumerate() {
            let milestone_idx = idx as u32;

            // Skip already released or non-approved milestones
            if milestone.released || !milestone.approved {
                continue;
            }

            Self::_release_milestone_internal(e, milestone_idx, trustless_work_address, false)?;

            released_indices.push_back(milestone_idx);
        }

        Ok(released_indices)
    }

    /// Public function to release a single milestone with authentication
    pub fn release_milestone_fund(
        e: &Env,
        milestone_idx: u32,
        release_signer: &Address,
        trustless_work_address: &Address,
    ) -> Result<(), ContractError> {
        release_signer.require_auth();
        Self::_release_milestone_internal(e, milestone_idx, trustless_work_address, true)
    }

    /// Internal function to release a milestone
    fn _release_milestone_internal(
        e: &Env,
        milestone_idx: u32,
        trustless_work_address: &Address,
        validate_conditions: bool,
    ) -> Result<(), ContractError> {
        let mut escrow = Self::get_escrow(e)?;

        // Only validate if this is a standalone call (not from batch)
        if validate_conditions {
            validate_release_conditions(&escrow, &escrow.roles.release_signer)?;
        }

        if milestone_idx >= escrow.milestones.len() {
            return Err(ContractError::MilestoneIndexOutOfRange);
        }

        let mut milestone = escrow.milestones.get(milestone_idx).unwrap().clone();
        if !milestone.approved {
            return Err(ContractError::MilestoneHasNotApproved);
        }
        if milestone.released {
            return Err(ContractError::MilestoneHasAlreadyBeenReleased);
        }

        // mark milestone as released and persist before any external contract call .
        milestone.released = true;
        escrow.milestones.set(milestone_idx, milestone.clone());

        let all_released = escrow.milestones.iter().all(|m| m.released);
        if all_released {
            escrow.flags.released = true;
        }
        e.storage().instance().set(&DataKey::Escrow, &escrow);

        let contract_address = e.current_contract_address();
        let token_client = TokenClient::new(e, &escrow.trustline.address);

        if token_client.balance(&contract_address) < milestone.amount {
            return Err(ContractError::EscrowBalanceNotEnoughToSendEarnings);
        }

        let fee_result =
            FeeCalculator::calculate_standard_fees(milestone.amount as i128, escrow.platform_fee)?;

        token_client.transfer(
            &contract_address,
            trustless_work_address,
            &fee_result.trustless_work_fee,
        );
        token_client.transfer(
            &contract_address,
            &escrow.roles.platform_address,
            &fee_result.platform_fee,
        );

        token_client.transfer(
            &contract_address,
            &milestone.receiver,
            &fee_result.receiver_amount,
        );

        Ok(())
    }
    pub fn change_escrow_properties(
        e: &Env,
        platform_address: &Address,
        escrow_properties: Escrow,
    ) -> Result<Escrow, ContractError> {
        platform_address.require_auth();
        let existing_escrow = Self::get_escrow(e)?;
        let token_client = TokenClient::new(e, &existing_escrow.trustline.address);
        let contract_balance = token_client.balance(&e.current_contract_address());

        validate_escrow_property_change_conditions(
            &existing_escrow,
            &escrow_properties,
            platform_address,
            contract_balance,
        )?;

        e.storage()
            .instance()
            .set(&DataKey::Escrow, &escrow_properties);
        Ok(escrow_properties)
    }

    pub fn get_multiple_escrow_balances(
        e: &Env,
        addresses: Vec<Address>,
    ) -> Result<Vec<AddressBalance>, ContractError> {
        const MAX_ESCROWS: u32 = 20;
        if addresses.len() > MAX_ESCROWS {
            return Err(ContractError::TooManyEscrowsRequested);
        }

        let mut balances: Vec<AddressBalance> = Vec::new(e);
        let self_addr = e.current_contract_address();
        for address in addresses.iter() {
            let escrow = if address == self_addr {
                Self::get_escrow(e)?
            } else {
                Self::get_escrow_by_contract_id(e, &address)?
            };
            let token_client = TokenClient::new(e, &escrow.trustline.address);
            let balance = token_client.balance(&address);
            balances.push_back(AddressBalance {
                address: address.clone(),
                balance,
                trustline_decimals: token_client.decimals(),
            });
        }
        Ok(balances)
    }

    pub fn get_escrow_by_contract_id(
        e: &Env,
        contract_id: &Address,
    ) -> Result<Escrow, ContractError> {
        Ok(e.invoke_contract::<Escrow>(contract_id, &Symbol::new(e, "get_escrow"), Vec::new(e)))
    }

    pub fn get_escrow(e: &Env) -> Result<Escrow, ContractError> {
        Ok(e.storage()
            .instance()
            .get(&DataKey::Escrow)
            .ok_or(ContractError::EscrowNotFound)?)
    }
}
