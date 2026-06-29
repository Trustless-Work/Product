use soroban_sdk::{contractevent, Address, Env};

#[contractevent]
pub struct Initialized {
    pub admin: Address,
    pub token: Address,
    pub recipient_count: u32,
}

#[contractevent]
pub struct Distributed {
    pub caller: Address,
    pub total_amount: i128,
}

#[contractevent]
pub struct RecipientPaid {
    pub recipient: Address,
    pub amount: i128,
    pub bps: u32,
}

pub fn emit_initialized(env: &Env, admin: &Address, token: &Address, recipient_count: u32) {
    Initialized {
        admin: admin.clone(),
        token: token.clone(),
        recipient_count,
    }
    .publish(env);
}

pub fn emit_distributed(env: &Env, caller: &Address, total_amount: i128) {
    Distributed {
        caller: caller.clone(),
        total_amount,
    }
    .publish(env);
}

pub fn emit_recipient_paid(env: &Env, recipient: &Address, amount: i128, bps: u32) {
    RecipientPaid {
        recipient: recipient.clone(),
        amount,
        bps,
    }
    .publish(env);
}
