#![no_std]

mod errors;
mod events;
mod storage;
mod test;

use errors::Error;
use events::{emit_distributed, emit_initialized, emit_recipient_paid};
use soroban_sdk::{contract, contractimpl, token, Address, Env, Vec};
pub use storage::Recipient;
use storage::{
    get_admin, get_recipients, get_token, is_initialized, set_admin, set_initialized,
    set_recipients, set_token,
};

const BPS_TOTAL: u32 = 10_000;

#[contract]
pub struct Contract;

#[contractimpl]
impl Contract {
    pub fn initialize(
        env: Env,
        admin: Address,
        token: Address,
        recipients: Vec<Recipient>,
    ) -> Result<(), Error> {
        if is_initialized(&env) {
            return Err(Error::AlreadyInitialized);
        }

        if recipients.is_empty() {
            return Err(Error::EmptyRecipientList);
        }

        let mut total_bps: u32 = 0;
        for i in 0..recipients.len() {
            let recipient = &recipients.get(i).unwrap();
            if recipient.bps == 0 {
                return Err(Error::ZeroBps);
            }
            total_bps = total_bps.saturating_add(recipient.bps);

            for j in (i + 1)..recipients.len() {
                let other = &recipients.get(j).unwrap();
                if recipient.address == other.address {
                    return Err(Error::DuplicateRecipient);
                }
            }
        }

        if total_bps != BPS_TOTAL {
            return Err(Error::InvalidBpsTotal);
        }

        set_admin(&env, &admin);
        set_token(&env, &token);
        set_recipients(&env, &recipients);
        set_initialized(&env, true);

        emit_initialized(&env, &admin, &token, recipients.len());
        Ok(())
    }

    pub fn distribute(env: Env, caller: Address) -> Result<(), Error> {
        caller.require_auth();

        if !is_initialized(&env) {
            return Err(Error::NotInitialized);
        }

        let recipients = get_recipients(&env);
        let token_addr = get_token(&env);

        let is_recipient = recipients.iter().any(|r| r.address == caller);

        if !is_recipient {
            return Err(Error::Unauthorized);
        }

        let token_client = token::Client::new(&env, &token_addr);
        let contract_address = env.current_contract_address();
        let balance = token_client.balance(&contract_address);

        if balance == 0 {
            return Err(Error::ZeroBalance);
        }

        let mut distributed: i128 = 0;
        for i in 0..recipients.len() {
            let recipient = match recipients.get(i) {
                Some(x) => x,
                None => return Err(Error::RecipientNotFound),
            };

            let amount = (balance * recipient.bps as i128) / BPS_TOTAL as i128;

            if amount > 0 {
                token_client.transfer(&contract_address, &recipient.address, &amount);
                distributed += amount;
                emit_recipient_paid(&env, &recipient.address, amount, recipient.bps);
            }
        }

        // Add remainder to first recipient
        if distributed < balance {
            let remainder = balance - distributed;
            let first_recipient = recipients.get(0).unwrap();
            token_client.transfer(&contract_address, &first_recipient.address, &remainder);
            distributed += remainder;
        }

        emit_distributed(&env, &caller, distributed);
        Ok(())
    }

    pub fn get_config(env: Env) -> Result<(Address, Address, Vec<Recipient>), Error> {
        if !is_initialized(&env) {
            return Err(Error::NotInitialized);
        }
        Ok((get_admin(&env), get_token(&env), get_recipients(&env)))
    }
}
