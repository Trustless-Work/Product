#![no_std]
use soroban_sdk::{
    contract, contracterror, contractimpl, contracttype, symbol_short, vec, Address, BytesN, Env,
    String, Symbol, Vec,
};

#[contract]
pub struct ReclaimContract;

const CONFIG: Symbol = symbol_short!("CONFIG");
const EPOCH: Symbol = symbol_short!("EPOCH");

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Config {
    pub owner: Address,
    pub current_epoch: u128,
    pub exists: bool,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Witness {
    pub address: BytesN<20>,
    pub host: String,
}

impl Witness {
    pub fn get_addresses(witness: Vec<Witness>) -> Vec<BytesN<20>> {
        let env = Env::default();
        let mut vec_addresses = vec![&env];
        for wit in witness {
            vec_addresses.push_back(wit.address);
        }
        return vec_addresses;
    }
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Epoch {
    pub id: u128,
    pub timestamp_start: u64,
    pub timestamp_end: u64,
    pub minimum_witness: u32,
    pub witnesses: Vec<Witness>,
}

// fn generate_random_seed(bytes: Vec<u8>, offset: usize) -> u32 {
//     let hash_slice = &bytes.slice(offset as u32..(offset + 4) as u32);
//     let mut seed = 0u32;

//     for i in 0..hash_slice.len(){
//         let byte = hash_slice.x;
//     }

//     for (i, &byte) in hash_slice.iter().enumerate() {
//         seed |= u32::from(byte) << (i * 8);
//     }

//     seed
// }

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct SignedClaim {
    pub message_digest: String,
    pub signatures: String,
    pub recovery_id: u32,
}

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum ReclaimError {
    OnlyOwner = 1,
    AlreadyInitialized = 2,
    HashMismatch = 3,
    LengthMismatch = 4,
    SignatureMismatch = 5,
}

#[contractimpl]
impl ReclaimContract {
    pub fn instantiate(env: Env, user: Address) -> Result<(), ReclaimError> {
        user.require_auth();

        let default_config = Config {
            owner: user.clone(),
            current_epoch: 0_u128,
            exists: false,
        };
        let mut config: Config = env
            .storage()
            .persistent()
            .get(&CONFIG)
            .unwrap_or(default_config);

        if config.exists == true {
            return Err(ReclaimError::AlreadyInitialized);
        }

        config = Config {
            owner: user,
            current_epoch: 0_u128,
            exists: true,
        };

        env.storage().persistent().set(&CONFIG, &config);

        let now = env.ledger().timestamp();

        let default_witness = [
            36, 72, 151, 87, 35, 104, 234, 223, 101, 191, 188, 90, 236, 152, 216, 229, 68, 58, 144,
            114,
        ];

        let items = &default_witness[0..20]
            .try_into()
            .expect("slice with incorrect length");

        let mut witnesses = vec![&env];
        let witness = Witness {
            address: BytesN::<20>::from_array(&env, items),
            host: String::from_str(&env, "http"),
        };
        witnesses.push_back(witness);

        let epoch = Epoch {
            id: 0_u128,
            timestamp_start: now,
            timestamp_end: now + 10000_u64,
            minimum_witness: 1_u32,
            witnesses: witnesses,
        };

        env.storage().persistent().set(&EPOCH, &epoch);
        Ok(())
    }

    pub fn add_epoch(
        env: Env,
        witnesses: Vec<Witness>,
        minimum_witness: u32,
    ) -> Result<(), ReclaimError> {
        let mut config: Config = env.storage().persistent().get(&CONFIG).unwrap();
        let admin = config.owner.clone();
        admin.require_auth();

        let new_epoch_id = config.current_epoch + 1_u128;
        let now = env.ledger().timestamp();

        let epoch = Epoch {
            id: new_epoch_id,
            timestamp_start: now,
            timestamp_end: now + 10000_u64,
            minimum_witness,
            witnesses: witnesses,
        };

        env.storage().persistent().set(&EPOCH, &epoch);

        config.current_epoch = new_epoch_id;
        env.storage().persistent().set(&CONFIG, &config);

        Ok(())
    }

    pub fn verify_proof(
        env: Env,
        message_digest: BytesN<32>,
        signature: BytesN<64>,
        recovery_id: u32,
    ) -> Result<(), ReclaimError> {
        let epoch: Epoch = env.storage().persistent().get(&EPOCH).unwrap();

        let wits = epoch.witnesses.slice(0..epoch.minimum_witness);
        let mut addresses = vec![&env];

        for wit in wits {
            addresses.push_back(wit.address);
        }

        let full_address = env
            .crypto()
            .secp256k1_recover(&message_digest, &signature, recovery_id);

        let address_slice = &mut [0; 65];
        full_address.copy_into_slice(address_slice);
        let address_slice_unprefixed = &address_slice[1..];

        let mut slice_bytes = [0_u8; 64];

        for i in 0..64 {
            slice_bytes[i] = *address_slice_unprefixed.get(i).unwrap();
        }

        let by: BytesN<64> = BytesN::from_array(&env, &slice_bytes);

        let hashed_full_address = env.crypto().keccak256(&by.into());

        let mut pub_key = [0_u8; 20];
        for i in 12..32 {
            let byte = hashed_full_address.get(i).unwrap().into();
            pub_key[(i - 12) as usize] = byte;
        }

        let address: BytesN<20> = BytesN::from_array(&env, &pub_key);

        if !addresses.contains(&address) {
            return Err(ReclaimError::SignatureMismatch);
        }

        Ok(())
    }
}

mod test;
