use soroban_sdk::{contracttype, Address, Env, Vec};

#[contracttype]
pub struct Recipient {
    pub address: Address,
    pub bps: u32,
}

#[derive(Clone, Copy, PartialEq, Eq)]
#[contracttype]
pub enum DataKey {
    Initialized,
    Admin,
    Token,
    Recipients,
}

pub fn is_initialized(env: &Env) -> bool {
    env.storage()
        .persistent()
        .get::<DataKey, bool>(&DataKey::Initialized)
        .unwrap_or(false)
}

pub fn set_initialized(env: &Env, value: bool) {
    env.storage()
        .persistent()
        .set(&DataKey::Initialized, &value);
}

pub fn get_admin(env: &Env) -> Address {
    env.storage()
        .persistent()
        .get(&DataKey::Admin)
        .expect("admin not set")
}

pub fn set_admin(env: &Env, admin: &Address) {
    env.storage().persistent().set(&DataKey::Admin, admin);
}

pub fn get_token(env: &Env) -> Address {
    env.storage()
        .persistent()
        .get(&DataKey::Token)
        .expect("token not set")
}

pub fn set_token(env: &Env, token: &Address) {
    env.storage().persistent().set(&DataKey::Token, token);
}

pub fn get_recipients(env: &Env) -> Vec<Recipient> {
    env.storage()
        .persistent()
        .get(&DataKey::Recipients)
        .expect("recipients not set")
}

pub fn set_recipients(env: &Env, recipients: &Vec<Recipient>) {
    env.storage()
        .persistent()
        .set(&DataKey::Recipients, recipients);
}
