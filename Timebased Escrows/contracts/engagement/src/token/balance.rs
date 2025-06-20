#![allow(dead_code)]
use crate::storage::types::DataKey;
use soroban_sdk::{Address, Env};

use crate::error::ContractError;

const BALANCE_BUMP_AMOUNT: u32 = 1000;
const BALANCE_LIFETIME_THRESHOLD: u32 = 10;

pub fn read_balance(e: &Env, addr: Address) -> i128 {
    let key = DataKey::Balance(addr);
    if let Some(balance) = e.storage().persistent().get::<DataKey, i128>(&key) {
        e.storage()
            .persistent()
            .extend_ttl(&key, BALANCE_LIFETIME_THRESHOLD, BALANCE_BUMP_AMOUNT);
        balance
    } else {
        0
    }
}

pub fn write_balance(e: &Env, addr: Address, amount: i128) {
    let key = DataKey::Balance(addr);
    e.storage().persistent().set(&key, &amount);
    e.storage()
        .persistent()
        .extend_ttl(&key, BALANCE_LIFETIME_THRESHOLD, BALANCE_BUMP_AMOUNT);
}

pub fn receive_balance(e: &Env, addr: Address, amount: i128) {
    let balance = read_balance(e, addr.clone());
    let total_balance = balance
        .checked_add(amount)
        .ok_or(ContractError::Overflow)
        .unwrap();
    write_balance(e, addr, total_balance);
}

pub fn spend_balance(e: &Env, addr: Address, amount: i128) {
    let balance = read_balance(e, addr.clone());
    if balance < amount {
        panic!("insufficient balance");
    }
    let total_balance = balance
        .checked_sub(amount)
        .ok_or(ContractError::Underflow)
        .unwrap();
    write_balance(e, addr, total_balance);
}
