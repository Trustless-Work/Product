// Simple test to verify that the GraphQL indexer works correctly
const fetch = require('node-fetch');

async function testGraphQL() {
  console.log('🔍 Testing GraphQL connection...');
  
  const queries = [
    {
      name: 'Health Check',
      query: `query { escrowEvents(first: 1) { totalCount } }`
    },
    {
      name: 'Schema Check', 
      query: `query { __schema { types { name } } }`
    },
    {
      name: 'All Events',
      query: `query { escrowEvents(first: 10) { nodes { id type contractId ledger } totalCount } }`
    }
  ];
  
  for (const test of queries) {
    try {
      console.log(`\n📋 Executing: ${test.name}`);
      
      const response = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: test.query }),
      });
      
      const result = await response.json();
      
      if (result.errors) {
        console.log('❌ Error:', result.errors);
      } else {
        console.log('✅ Result:', JSON.stringify(result.data, null, 2));
      }
      
    } catch (error) {
      console.log('❌ Connection error:', error.message);
    }
  }
}

testGraphQL().catch(console.error);