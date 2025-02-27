use stellar_base::{
    transaction::TransactionEnvelope,
    network::Network,
    crypto::SodiumKeyPair,
    xdr::{XDRDeserialize, XDRSerialize},
};
use std::error::Error;

fn main() {
    let unsigned_xdr = "AAAAAgAAA..."; // Example unsigned XDR transaction
    let secret_keys = vec!["SDS3...", "SDS5..."]; // Example secret keys
    match sign_transaction(unsigned_xdr, &secret_keys) {
        Ok(signed_xdr) => println!("Signed Transaction: {}", signed_xdr),
        Err(e) => eprintln!("Error signing transaction: {}", e),
    }
}

fn sign_transaction(unsigned_xdr: &str, secret_keys: &[&str]) -> Result<String, Box<dyn Error>> {
    // Parse the XDR string
    let envelope = TransactionEnvelope::from_xdr_base64(unsigned_xdr)
        .map_err(|e| format!("Failed to parse XDR: {}", e))?;
    let mut envelope_clone = envelope.clone();

    // Create network instance
    let network = Network::new_public();

    // Sign with each secret key
    for &secret_key_str in secret_keys {
        let keypair = SodiumKeyPair::from_secret_seed(secret_key_str)
            .map_err(|e| format!("Failed to create keypair: {}", e))?;
        envelope_clone.sign(keypair.as_ref(), &network)
            .map_err(|e| format!("Failed to sign transaction: {}", e))?;
    }

    // Convert back to XDR
    envelope_clone.xdr_base64()
        .map_err(|e| format!("Failed to serialize signed XDR: {}", e).into())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_single_signature() {
        // Example valid unsigned XDR transaction
        let unsigned_xdr = "AAAAAgAAA..."; 
        let secret_keys = vec!["SDS3..."]; // Example secret key
        let result = sign_transaction(unsigned_xdr, &secret_keys);
        println!("Result: {:?}", result); // Debug output
        assert!(result.is_ok());
    }

    #[test]
    fn test_multi_signature() {
        // Example valid unsigned XDR transaction
        let unsigned_xdr = "AAAAAgAAA..."; 
        let secret_keys = vec!["SDS3...", "SDS5..."]; // Example secret keys
        let result = sign_transaction(unsigned_xdr, &secret_keys);
        println!("Result: {:?}", result); // Debug output
        assert!(result.is_ok());
    }

    #[test]
    fn test_invalid_xdr() {
        let unsigned_xdr = "INVALID_XDR";
        let secret_keys = vec!["SDS3..."];
        let result = sign_transaction(unsigned_xdr, &secret_keys);
        println!("Result: {:?}", result); // Debug output
        assert!(result.is_err());
    }
}