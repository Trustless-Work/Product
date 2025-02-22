use stellar_sdk::{Transaction, Keypair, Network};
use stellar_sdk::xdr::{TransactionEnvelope, TransactionV1Envelope};
use std::error::Error;

struct SignerInput {
    unsigned_xdr: String,
    signers: Vec<SignerKey>,
}

struct SignerKey {
    public_key: String,
    secret_key: String,
}

struct SignerOutput {
    signed_transaction: String,
}

fn sign_xdr_transaction(input: SignerInput, network_passphrase: &str) -> Result<SignerOutput, Box<dyn Error>> {
    // Parse the unsigned XDR
    let mut tx = Transaction::from_xdr_base64(&input.unsigned_xdr, network_passphrase)?;
    
    // Validate we have at least one signer
    if input.signers.is_empty() {
        return Err("At least one signer is required".into());
    }

    // Sign with each provided key
    for signer in input.signers.iter() {
        let keypair = Keypair::from_secret(&signer.secret_key)
            .map_err(|_| "Invalid secret key")?;
        
        if keypair.public_key().to_string() != signer.public_key {
            return Err("Public key doesn't match secret key".into());
        }
        
        tx.sign(&keypair)?;
    }

    // Convert back to XDR
    let signed_xdr = tx.to_envelope()
        .to_xdr_base64()
        .map_err(|_| "Failed to serialize signed transaction")?;

    Ok(SignerOutput {
        signed_transaction: signed_xdr
    })
}

fn main() -> Result<(), Box<dyn Error>> {
    // Example usage
    let input = SignerInput {
        unsigned_xdr: "AAAAAgAAAAA...".to_string(),
        signers: vec![
            SignerKey {
                public_key: "GB3D...".to_string(),
                secret_key: "SDS3...".to_string(),
            },
            SignerKey {
                public_key: "GB5D...".to_string(),
                secret_key: "SDS5...".to_string(),
            }
        ]
    };

    let network = Network::testnet();
    match sign_xdr_transaction(input, network.passphrase()) {
        Ok(output) => println!("Signed XDR: {}", output.signed_transaction),
        Err(e) => eprintln!("Error: {}", e),
    }
    
    Ok(())
}