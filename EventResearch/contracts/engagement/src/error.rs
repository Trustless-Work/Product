use soroban_sdk::contracterror;
use core::fmt;

#[derive(Debug, Copy, Clone, PartialEq)]
#[contracterror]
pub enum ContractError {
      EscrowFullyFunded = 1,
      SignerInsufficientFunds = 2,
      EscrowNotFound = 3,
      OnlyServiceProviderChangeMilstoneStatus = 4,
      NoMileStoneDefined = 5,
      InvalidMileStoneIndex = 6,
      EscrowOpenedForDisputeResolution = 7,
      AmountToDepositGreatherThanEscrowAmount = 8,
}

impl fmt::Display for ContractError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            ContractError::EscrowFullyFunded => write!(f, "This escrow is already fully funded"),
            ContractError::SignerInsufficientFunds => write!(f, "The signer does not have sufficient funds"),
            ContractError::EscrowNotFound => write!(f, "Escrow not found"),
            ContractError::OnlyServiceProviderChangeMilstoneStatus => write!(f, "Only the service provider can change milestone status"),
            ContractError::NoMileStoneDefined => write!(f, "Escrow initialized without milestone"),
            ContractError::InvalidMileStoneIndex => write!(f, "Invalid milestone index"),
            ContractError::EscrowOpenedForDisputeResolution => write!(f, "Escrow has been opened for dispute resolution"),
            ContractError::AmountToDepositGreatherThanEscrowAmount => write!(f, "Amount to deposit is greater than the escrow amount"),
        }
    }
}
