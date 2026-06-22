#![cfg(test)]

use crate::storage::Recipient;
use crate::{Contract, ContractClient};
use soroban_sdk::testutils::Address as _;
use soroban_sdk::{vec, Address, Env, Vec};

#[test]
fn test_initialize_valid() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let token = Address::generate(&env);
    let r1 = Address::generate(&env);
    let r2 = Address::generate(&env);

    let recipients = vec![
        &env,
        Recipient {
            address: r1,
            bps: 7000,
        },
        Recipient {
            address: r2,
            bps: 3000,
        },
    ];

    client.initialize(&admin, &token, &recipients);
}

#[test]
#[should_panic]
fn test_initialize_invalid_bps() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let token = Address::generate(&env);
    let r1 = Address::generate(&env);

    let recipients = vec![
        &env,
        Recipient {
            address: r1,
            bps: 9000,
        },
    ];

    client.initialize(&admin, &token, &recipients);
}

#[test]
#[should_panic]
fn test_initialize_empty_list() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let token = Address::generate(&env);
    let recipients: Vec<Recipient> = vec![&env];

    client.initialize(&admin, &token, &recipients);
}

#[test]
#[should_panic]
fn test_initialize_zero_bps() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let token = Address::generate(&env);
    let r1 = Address::generate(&env);

    let recipients = vec![
        &env,
        Recipient {
            address: r1,
            bps: 0,
        },
    ];

    client.initialize(&admin, &token, &recipients);
}

#[test]
#[should_panic]
fn test_initialize_duplicate() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let token = Address::generate(&env);
    let r1 = Address::generate(&env);

    let recipients = vec![
        &env,
        Recipient {
            address: r1.clone(),
            bps: 5000,
        },
        Recipient {
            address: r1,
            bps: 5000,
        },
    ];

    client.initialize(&admin, &token, &recipients);
}

#[test]
fn test_get_config() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let token = Address::generate(&env);
    let r1 = Address::generate(&env);

    let recipients = vec![
        &env,
        Recipient {
            address: r1,
            bps: 10000,
        },
    ];

    client.initialize(&admin, &token, &recipients);
    let config = client.get_config();
    let (stored_admin, stored_token, stored_recipients) = config;

    assert_eq!(stored_admin, admin);
    assert_eq!(stored_token, token);
    assert_eq!(stored_recipients.len(), 1);
}

#[test]
#[should_panic]
fn test_initialize_bps_too_high() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let token = Address::generate(&env);
    let r1 = Address::generate(&env);

    let recipients = vec![
        &env,
        Recipient {
            address: r1,
            bps: 10001,
        },
    ];

    client.initialize(&admin, &token, &recipients);
}

#[test]
#[should_panic]
fn test_initialize_bps_overflow_multiple() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let token = Address::generate(&env);
    let r1 = Address::generate(&env);
    let r2 = Address::generate(&env);

    let recipients = vec![
        &env,
        Recipient {
            address: r1,
            bps: 6000,
        },
        Recipient {
            address: r2,
            bps: 5000,
        },
    ];

    client.initialize(&admin, &token, &recipients);
}

#[test]
fn test_initialize_single_recipient() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let token = Address::generate(&env);
    let r1 = Address::generate(&env);

    let recipients = vec![
        &env,
        Recipient {
            address: r1,
            bps: 10000,
        },
    ];

    client.initialize(&admin, &token, &recipients);
    let (_, _, stored_recipients) = client.get_config();
    assert_eq!(stored_recipients.len(), 1);
}

#[test]
fn test_initialize_many_recipients() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let token = Address::generate(&env);

    let mut recipients = vec![&env];
    let bps_per_recipient = 10000 / 10;

    for _ in 0..10 {
        recipients.push_back(Recipient {
            address: Address::generate(&env),
            bps: bps_per_recipient,
        });
    }

    client.initialize(&admin, &token, &recipients);
    let (_, _, stored_recipients) = client.get_config();
    assert_eq!(stored_recipients.len(), 10);
}

#[test]
#[should_panic]
fn test_initialize_twice() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let token = Address::generate(&env);
    let r1 = Address::generate(&env);

    let recipients = vec![
        &env,
        Recipient {
            address: r1.clone(),
            bps: 10000,
        },
    ];

    client.initialize(&admin, &token, &recipients);
    client.initialize(&admin, &token, &recipients);
}

#[test]
#[should_panic]
fn test_initialize_bps_one_off_low() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let token = Address::generate(&env);
    let r1 = Address::generate(&env);

    let recipients = vec![
        &env,
        Recipient {
            address: r1,
            bps: 9999,
        },
    ];

    client.initialize(&admin, &token, &recipients);
}

#[test]
#[should_panic]
fn test_initialize_bps_one_off_high() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let token = Address::generate(&env);
    let r1 = Address::generate(&env);

    let recipients = vec![
        &env,
        Recipient {
            address: r1,
            bps: 10001,
        },
    ];

    client.initialize(&admin, &token, &recipients);
}

#[test]
fn test_initialize_high_precision_split() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let token = Address::generate(&env);
    let r1 = Address::generate(&env);
    let r2 = Address::generate(&env);
    let r3 = Address::generate(&env);

    let recipients = vec![
        &env,
        Recipient {
            address: r1,
            bps: 3333,
        },
        Recipient {
            address: r2,
            bps: 3333,
        },
        Recipient {
            address: r3,
            bps: 3334,
        },
    ];

    client.initialize(&admin, &token, &recipients);
    let (_, _, stored) = client.get_config();
    assert_eq!(stored.len(), 3);
}

#[test]
#[should_panic]
fn test_initialize_three_recipients_uneven() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let token = Address::generate(&env);
    let r1 = Address::generate(&env);
    let r2 = Address::generate(&env);
    let r3 = Address::generate(&env);

    let recipients = vec![
        &env,
        Recipient {
            address: r1,
            bps: 3333,
        },
        Recipient {
            address: r2,
            bps: 3333,
        },
        Recipient {
            address: r3,
            bps: 3333,
        },
    ];

    client.initialize(&admin, &token, &recipients);
}

#[test]
#[should_panic]
fn test_initialize_duplicate_three_recipients() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let token = Address::generate(&env);
    let r1 = Address::generate(&env);
    let r2 = Address::generate(&env);

    let recipients = vec![
        &env,
        Recipient {
            address: r1.clone(),
            bps: 3000,
        },
        Recipient {
            address: r2,
            bps: 4000,
        },
        Recipient {
            address: r1,
            bps: 3000,
        },
    ];

    client.initialize(&admin, &token, &recipients);
}

#[test]
#[should_panic]
fn test_initialize_all_duplicates() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let token = Address::generate(&env);
    let r1 = Address::generate(&env);

    let recipients = vec![
        &env,
        Recipient {
            address: r1.clone(),
            bps: 5000,
        },
        Recipient {
            address: r1.clone(),
            bps: 3000,
        },
        Recipient {
            address: r1,
            bps: 2000,
        },
    ];

    client.initialize(&admin, &token, &recipients);
}

#[test]
fn test_initialize_min_allocation() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let token = Address::generate(&env);
    let r1 = Address::generate(&env);
    let r2 = Address::generate(&env);

    let recipients = vec![
        &env,
        Recipient {
            address: r1,
            bps: 9999,
        },
        Recipient {
            address: r2,
            bps: 1,
        },
    ];

    client.initialize(&admin, &token, &recipients);
    let (_, _, stored) = client.get_config();
    assert_eq!(stored.get(1).unwrap().bps, 1);
}

#[test]
#[should_panic]
fn test_initialize_all_zero_bps() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let token = Address::generate(&env);
    let r1 = Address::generate(&env);

    let recipients = vec![
        &env,
        Recipient {
            address: r1,
            bps: 0,
        },
    ];

    client.initialize(&admin, &token, &recipients);
}

#[test]
fn test_initialize_marketplace_example() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let token = Address::generate(&env);
    let seller = Address::generate(&env);
    let platform = Address::generate(&env);
    let automation = Address::generate(&env);

    let recipients = vec![
        &env,
        Recipient {
            address: seller,
            bps: 8500,
        },
        Recipient {
            address: platform,
            bps: 1499,
        },
        Recipient {
            address: automation,
            bps: 1,
        },
    ];

    client.initialize(&admin, &token, &recipients);
    let (_, _, stored) = client.get_config();
    assert_eq!(stored.len(), 3);
}

#[test]
#[should_panic]
fn test_initialize_negative_overflow_check() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let token = Address::generate(&env);
    let r1 = Address::generate(&env);
    let r2 = Address::generate(&env);

    let recipients = vec![
        &env,
        Recipient {
            address: r1,
            bps: 7000,
        },
        Recipient {
            address: r2,
            bps: 4000,
        },
    ];

    client.initialize(&admin, &token, &recipients);
}

#[test]
fn test_initialize_equal_split_two() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let token = Address::generate(&env);
    let r1 = Address::generate(&env);
    let r2 = Address::generate(&env);

    let recipients = vec![
        &env,
        Recipient {
            address: r1,
            bps: 5000,
        },
        Recipient {
            address: r2,
            bps: 5000,
        },
    ];

    client.initialize(&admin, &token, &recipients);
    let (_, _, stored) = client.get_config();
    assert_eq!(stored.get(0).unwrap().bps, 5000);
    assert_eq!(stored.get(1).unwrap().bps, 5000);
}

#[test]
fn test_initialize_equal_split_four() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let token = Address::generate(&env);

    let recipients = vec![
        &env,
        Recipient {
            address: Address::generate(&env),
            bps: 2500,
        },
        Recipient {
            address: Address::generate(&env),
            bps: 2500,
        },
        Recipient {
            address: Address::generate(&env),
            bps: 2500,
        },
        Recipient {
            address: Address::generate(&env),
            bps: 2500,
        },
    ];

    client.initialize(&admin, &token, &recipients);
    let (_, _, stored) = client.get_config();
    assert_eq!(stored.len(), 4);
}

#[test]
#[should_panic]
fn test_initialize_boundary_next_max_u32() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let token = Address::generate(&env);
    let r1 = Address::generate(&env);

    let recipients = vec![
        &env,
        Recipient {
            address: r1,
            bps: 10001,
        },
    ];

    client.initialize(&admin, &token, &recipients);
}

#[test]
fn test_initialize_many_small_allocations() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let token = Address::generate(&env);

    let mut recipients = vec![&env];
    for i in 0..100 {
        if i < 99 {
            recipients.push_back(Recipient {
                address: Address::generate(&env),
                bps: 100,
            });
        } else {
            recipients.push_back(Recipient {
                address: Address::generate(&env),
                bps: 100,
            });
        }
    }

    client.initialize(&admin, &token, &recipients);
    let (_, _, stored) = client.get_config();
    assert_eq!(stored.len(), 100);
}

#[test]
#[should_panic]
fn test_initialize_duplicate_in_middle() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let token = Address::generate(&env);
    let r1 = Address::generate(&env);
    let r2 = Address::generate(&env);
    let r3 = Address::generate(&env);

    let recipients = vec![
        &env,
        Recipient {
            address: r1,
            bps: 3000,
        },
        Recipient {
            address: r2.clone(),
            bps: 3000,
        },
        Recipient {
            address: r2,
            bps: 4000,
        },
        Recipient {
            address: r3,
            bps: 0,
        },
    ];

    client.initialize(&admin, &token, &recipients);
}

#[test]
fn test_get_config_after_init() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let token = Address::generate(&env);
    let r1 = Address::generate(&env);
    let r2 = Address::generate(&env);
    let r3 = Address::generate(&env);

    let recipients = vec![
        &env,
        Recipient {
            address: r1.clone(),
            bps: 5000,
        },
        Recipient {
            address: r2.clone(),
            bps: 3000,
        },
        Recipient {
            address: r3.clone(),
            bps: 2000,
        },
    ];

    client.initialize(&admin, &token, &recipients);
    let (ret_admin, ret_token, ret_recipients) = client.get_config();

    assert_eq!(ret_admin, admin);
    assert_eq!(ret_token, token);
    assert_eq!(ret_recipients.len(), 3);
    assert_eq!(ret_recipients.get(0).unwrap().address, r1);
    assert_eq!(ret_recipients.get(0).unwrap().bps, 5000);
    assert_eq!(ret_recipients.get(1).unwrap().address, r2);
    assert_eq!(ret_recipients.get(1).unwrap().bps, 3000);
    assert_eq!(ret_recipients.get(2).unwrap().address, r3);
    assert_eq!(ret_recipients.get(2).unwrap().bps, 2000);
}

#[test]
#[should_panic]
fn test_get_config_before_init() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    client.get_config();
}

#[test]
#[should_panic]
fn test_initialize_single_zero_bps_only() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let token = Address::generate(&env);
    let r1 = Address::generate(&env);

    let recipients = vec![
        &env,
        Recipient {
            address: r1,
            bps: 0,
        },
    ];

    client.initialize(&admin, &token, &recipients);
}

#[test]
fn test_initialize_max_bps_valid() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let token = Address::generate(&env);
    let r1 = Address::generate(&env);

    let recipients = vec![
        &env,
        Recipient {
            address: r1,
            bps: 10000,
        },
    ];

    client.initialize(&admin, &token, &recipients);
    let (_, _, stored) = client.get_config();
    assert_eq!(stored.get(0).unwrap().bps, 10000);
}
