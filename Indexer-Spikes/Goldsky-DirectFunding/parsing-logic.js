// Parsing logic for account_credited effects in Goldsky
// This logic is used to extract relevant data from account_credited effects

// Load environment variables from .env file
require('dotenv').config();

/**
 * Parse account_credited effect to extract escrow funding information
 * @param {Object} effect - The account_credited effect from Stellar
 * @param {Object} ledger - The ledger information
 * @returns {Object|null} Parsed EscrowFundingEvent data or null if not escrow
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
    escrowAddress: effect.account,
    from: effect.source_account || effect.operation_source_account,
    amount: effect.amount,
    asset:
      effect.asset_type === 'native'
        ? 'XLM'
        : `${effect.asset_code}:${effect.asset_issuer}`,
    ledger: ledger.sequence,
    timestamp: ledger.timestamp,
  };

  return escrowFundingEvent;
}

/**
 * Check if an account is a known escrow contract
 * @param {string} account - The account address to check
 * @returns {boolean} True if the account is a known escrow contract
 */
function isKnownEscrowContract(account) {
  // Prefer dynamic env-based config, fallback to dev placeholder
  const knownEscrowContracts =
    process.env.ESCROW_ADDRESSES?.split(',') || [
      "CDT6K35SFQTWS3XQX5RJK6LWRHRUNUZIQMASQAUCRRURCRV4NFHVK3ES", // Mainnet escrow (unfunded)
    ];

  return knownEscrowContracts.includes(account);
}

/**
 * Process a batch of account_credited effects
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
  processEffects,
};
