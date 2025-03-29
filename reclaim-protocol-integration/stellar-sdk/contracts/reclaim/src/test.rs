#![cfg(test)]

use super::*;
use soroban_sdk::{testutils::Address, Env};

#[test]
fn should_initialize() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, ReclaimContract);
    let client = ReclaimContractClient::new(&env, &contract_id);
    let user = <soroban_sdk::Address as Address>::generate(&env);

    assert_eq!(client.instantiate(&user), ());
}

#[test]
fn should_add_epoch() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, ReclaimContract);
    let client = ReclaimContractClient::new(&env, &contract_id);

    let user = <soroban_sdk::Address as Address>::generate(&env);
    assert_eq!(client.instantiate(&user), ());

    let mut witnesses = Vec::new(&env);

    let bytes = "244897572368eadf65bfbc5aec98d8e5443a9072".as_bytes();

    let items = &bytes[0..20]
        .try_into()
        .expect("slice with incorrect length");

    let witness = Witness {
        address: BytesN::<20>::from_array(&env, items),
        host: String::from_str(&env, "http"),
    };
    witnesses.push_back(witness);

    assert_eq!(client.add_epoch(&witnesses, &1_u32), ());
}

#[test]
fn should_verify_proofs() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, ReclaimContract);
    let client = ReclaimContractClient::new(&env, &contract_id);

    let user = <soroban_sdk::Address as Address>::generate(&env);
    assert_eq!(client.instantiate(&user), ());

    let mut witnesses = Vec::new(&env);

    let bytes = hex::decode("244897572368eadf65bfbc5aec98d8e5443a9072").unwrap();

    let items = &bytes[0..20]
        .try_into()
        .expect("slice with incorrect length");

    let witness = Witness {
        address: BytesN::<20>::from_array(&env, items),
        host: String::from_str(&env, "http"),
    };
    witnesses.push_back(witness);

    assert_eq!(client.add_epoch(&witnesses, &1_u32), ());

    let message_digest_array: [u8; 32] = [
        195, 46, 87, 183, 18, 71, 193, 170, 180, 185, 59, 176, 162, 187, 55, 49, 134, 172, 194,
        213, 201, 189, 141, 252, 208, 70, 225, 208, 85, 63, 212, 33,
    ];

    let message_digest: BytesN<32> = BytesN::from_array(&env, &message_digest_array);
    // let mut signatures: Vec<BytesN<64>> = Vec::new(&env);

    let signature_slice = hex::decode("2888485f650f8ed02d18e32dd9a1512ca05feb83fc2cbf2df72fd8aa4246c5ee541fa53875c70eb64d3de9143446229a250c7a762202b7cc289ed31b74b31c81").unwrap();
    assert_eq!(signature_slice.len(), 64);

    let mut signature_array: [u8; 64] = [0_u8; 64];

    for i in 0..64 {
        let elem = signature_slice.get(i).unwrap();
        signature_array[i] = *elem;
    }
    let signature: BytesN<64> = BytesN::from_array(&env, &signature_array);

    // signatures.push_back(signature);

    // let signed_claim = SignedClaim {
    //     message_digest,
    //     signatures,
    //     recovery_id: 1,
    // };

    assert_eq!(client.verify_proof(&message_digest, &signature, &1_u32), ());
}
