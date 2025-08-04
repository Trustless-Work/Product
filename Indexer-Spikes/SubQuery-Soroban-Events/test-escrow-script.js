/**
 * Test Script to generate escrow events on Stellar Testnet
 * This script simulates the interactions you would make in the Trustless Work dApp
 */

const { 
  StellarSdk, 
  Keypair, 
  Networks,
  TransactionBuilder,
  Operation,
  Asset,
  Server
} = require('stellar-sdk');

// Configuration for Testnet
const server = new Server('https://horizon-testnet.stellar.org');
const networkPassphrase = Networks.TESTNET;

async function testEscrowInteractions() {
  console.log('🚀 Starting escrow events test...');
  
  try {
    // Generate test account
    const sourceKeypair = Keypair.random();
    const sourcePublicKey = sourceKeypair.publicKey();
    
    console.log('📝 Test account:', sourcePublicKey);
    console.log('🏦 Funding account with Friendbot...');
    
    // Fund account with Friendbot
    await fetch(`https://friendbot.stellar.org?addr=${sourcePublicKey}`);
    
    // Wait a bit for processing
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Get account information
    const account = await server.loadAccount(sourcePublicKey);
    console.log('✅ Account funded, sequence:', account.sequenceNumber());
    
    // NOTE: To generate real escrow events you would need:
    // 1. The contract ID of the Trustless Work escrow on testnet
    // 2. Call the contract functions that emit events
    
    console.log(`
🎯 To generate real escrow events:

1. Go to the dApp: https://docs.trustlesswork.com/trustless-work/open-source-dapps/dapp-overview
2. Connect this account: ${sourcePublicKey}
3. Or any other testnet account

Alternatively, you can:
- Search for existing escrow contracts in Stellar Explorer
- Monitor existing transactions on testnet
    `);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Function to check existing events via GraphQL
async function checkExistingEvents() {
  console.log('🔍 Checking existing events in the indexer...');
  
  const query = `
    query {
      escrowEvents(first: 5, orderBy: TIMESTAMP_DESC) {
        nodes {
          id
          type
          contractId
          ledger
          timestamp
        }
        totalCount
      }
    }
  `;
  
  try {
    const response = await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    
    const result = await response.json();
    console.log('📊 Events found:', JSON.stringify(result, null, 2));
    
  } catch (error) {
    console.error('❌ Error querying GraphQL:', error.message);
  }
}

// Execute the tests
async function main() {
  console.log('🧪 Escrow Events Test - SubQuery Indexer\n');
  
  await checkExistingEvents();
  console.log('\n' + '='.repeat(50) + '\n');
  await testEscrowInteractions();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { testEscrowInteractions, checkExistingEvents };