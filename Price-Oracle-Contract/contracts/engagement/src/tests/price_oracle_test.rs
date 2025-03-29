#![cfg(test)]

use crate::core::reflector_oracle::Asset;
use crate::core::{PriceOracle, PriceOracleClient};

extern crate std;
use std::println;

use soroban_sdk::{symbol_short, testutils::EnvTestConfig, Address, Env, String};

#[test]
fn test_price_oracle() {
    let mut env = Env::from_ledger_snapshot_file("../../../../snapshot.json");
    env.set_config(EnvTestConfig {
        capture_snapshot_at_drop: false,
    });

    let contract_id = env.register_contract(None, PriceOracle);
    let client = PriceOracleClient::new(&env, &contract_id);

    let reflector_address = Address::from_string(&String::from_str(
        &env,
        "CAVLP5DH2GJPZMVO7IJY4CVOD5MWEFTJFVPD2YY2FQXOQHRGHK4D6HLP",
    ));

    client.initialize_oracle(&reflector_address);

    let asset = &Asset::Other(symbol_short!("BTC"));
    let price = client.fetch_price(asset);

    println!("{:?}", price.price);
}
