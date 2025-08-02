// Parsing logic for account_credited effects in Goldsky
// This logic would be used to extract relevant data from account_credited effects

/**
 * Parse account_credited effect to extract escrow funding information
 * @param {Object} effect - The account_credited effect from Stellar
 * @param {Object} ledger - The ledger information
 * @returns {Object} Parsed EscrowFundingEvent data
 */
function parseAccountCreditedEffect(effect, ledger) {
  // Check if this is a credit to an escrow contract
  // In a real implementation, this would check against a registry of known escrow contracts
  const isEscrowContract = isKnownEscrowContract(effect.account);
  
  if (!isEscrowContract) {
    return null; // Not an escrow contract, skip this effect
  }
  
  // Extract relevant data from the effect
  const escrowFundingEvent = {
    id: `${effect.id}-${effect.paging_token}`,
    escrowAddress: effect.account, // The escrow contract that was credited
    from: effect.source_account || effect.operation_source_account, // The account that sent the funds
    amount: effect.amount, // The amount credited
    asset: effect.asset_type === 'native' ? 'XLM' : `${effect.asset_code}:${effect.asset_issuer}`, // The asset credited
    ledger: ledger.sequence, // The ledger sequence number
    timestamp: ledger.timestamp // The ledger timestamp
  };
  
  return escrowFundingEvent;
}

/**
 * Check if an account is a known escrow contract
 * @param {string} account - The account address to check
 * @returns {boolean} True if the account is a known escrow contract
 */
function isKnownEscrowContract(account) {
  // In a real implementation, this would check against a registry of known escrow contracts
  // For now, we'll use a hardcoded list of example escrow contract addresses
  const knownEscrowContracts = [
    "CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD2KMCT",
    "CBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHK3K3A",
    // Add more escrow contract addresses as needed
  ];
  
  return knownEscrowContracts.includes(account);
}

/**
 * Example of how to process a batch of effects
 * @param {Array} effects - Array of account_credited effects
 * @param {Object} ledger - The ledger information
 * @returns {Array} Array of parsed EscrowFundingEvents
 */
function processEffects(effects, ledger) {
  const escrowFundingEvents = [];
  
  for (const effect of effects) {
    const parsedEvent = parseAccountCreditedEffect(effect, ledger);
    if (parsedEvent) {
      escrowFundingEvents.push(parsedEvent);
    }
  }
  
  return escrowFundingEvents;
}

// Export functions for use in Goldsky
module.exports = {
  parseAccountCreditedEffect,
  isKnownEscrowContract,
  processEffects
};