use soroban_sdk::{Address, contracttype, Env, String, symbol_short, Vec};
use soroban_sdk::token::Client as TokenClient;
use crate::error::ContractError;


#[contracttype]
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct Escrow {
    pub engagement_id: String,
    pub title: String,
    pub description: String,
    pub approver: Address,
    pub service_provider: Address,
    pub platform_address: Address,
    pub amount: i128,
    pub platform_fee: i128,
    pub milestones: Vec<Milestone>,
    pub release_signer: Address,
    pub dispute_resolver: Address,
    pub dispute_flag: bool,
    pub release_flag: bool,
    pub resolved_flag: bool,
    pub trustline: Address,
}

#[contracttype]
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct Milestone {
    pub description: String,
    pub status: String,
    pub approved_flag: bool,
}

#[contracttype]
#[derive(Clone)]
pub struct AllowanceValue {
    pub amount: i128,
    pub expiration_ledger: u32,
}

#[contracttype]
#[derive(Clone)]
pub struct AllowanceDataKey {
    pub from: Address,
    pub spender: Address,
}

#[contracttype]
#[derive(Clone, Debug)]
pub struct AddressBalance {
    pub address: Address,
    pub balance: i128,
}

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Escrow,
    Balance(Address),
    Allowance(AllowanceDataKey),
    Admin,
}


pub fn get_escrow(e: Env) -> Result<Escrow, ContractError> {
    let escrow = e.storage()
        .instance()
        .get::<_, Escrow>(&DataKey::Escrow)
        .ok_or(ContractError::EscrowNotFound);
    Ok(escrow?)
}

pub fn fund_escrow(
    e: Env, 
    signer: Address, 
    amount_to_deposit: i128
) -> Result<(), ContractError> {
    signer.require_auth();

    let escrow_result = get_escrow(e.clone());
    let escrow = match escrow_result {
        Ok(esc) => esc,
        Err(err) => return Err(err),
    };

    if escrow.dispute_flag {
        return Err(ContractError::EscrowOpenedForDisputeResolution);
    }

    let usdc_approver = TokenClient::new(&e, &escrow.trustline);

    let signer_balance = usdc_approver.balance(&signer);

    let contract_address = e.current_contract_address();
    
    if usdc_approver.balance(&contract_address) as i128 > escrow.amount {
        return Err(ContractError::EscrowFullyFunded);
    }

    if amount_to_deposit as i128 > escrow.amount {
        return Err(ContractError::AmountToDepositGreatherThanEscrowAmount);
    }

    if signer_balance < amount_to_deposit {
        return Err(ContractError::SignerInsufficientFunds);
    }

    usdc_approver.transfer(&signer, &contract_address, &amount_to_deposit);

// Emit `escrow_funded` event after successful deposit
e.events().publish(
    (symbol_short!("escrow"), symbol_short!("funded")), // Topics
    (escrow.engagement_id.clone(), amount_to_deposit) // Payload: ID, Amounts
);

e.storage().instance().set(&DataKey::Escrow, &escrow);

    e.storage().instance().set(&DataKey::Escrow, &escrow);

    Ok(())
}


pub fn change_milestone_status(
    e: Env,
    milestone_index: i128,
    new_status: String,
    service_provider: Address,
) -> Result<(), ContractError> {
    let escrow_result = get_escrow(e.clone());
    let existing_escrow = match escrow_result {
        Ok(esc) => esc,
        Err(err) => return Err(err),
    };

    let engagement_id = existing_escrow.engagement_id.clone();

    if service_provider != existing_escrow.service_provider {
        return Err(ContractError::OnlyServiceProviderChangeMilstoneStatus);
    }
    service_provider.require_auth();

    if existing_escrow.milestones.is_empty() {
        return Err(ContractError::NoMileStoneDefined);
    }

    if milestone_index < 0 || milestone_index >= existing_escrow.milestones.len() as i128 {
        return Err(ContractError::InvalidMileStoneIndex);
    }

    let mut updated_milestones = Vec::<Milestone>::new(&e);
    for (index, milestone) in existing_escrow.milestones.iter().enumerate() {
        let mut new_milestone = milestone.clone();
        if index as i128 == milestone_index {
            new_milestone.status = new_status.clone();
        }
        updated_milestones.push_back(new_milestone);
    }

    let updated_escrow = Escrow {
        milestones: updated_milestones,
        ..existing_escrow
    };

    e.storage().instance().set(
        &DataKey::Escrow,
        &updated_escrow,
    );

    // Emit `milestone_status_changed` event after milestone status update
    let old_status = existing_escrow.milestones.get(milestone_index as u32).unwrap().status;
    e.events().publish(
        (symbol_short!("milestone"), symbol_short!("status")), // Topics
        (engagement_id, old_status, new_status) // Payload: ID, Index, Old Status, New Status
    );

    Ok(())
}