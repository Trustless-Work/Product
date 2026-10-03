import { Keypair, Networks, TransactionBuilder, Operation, xdr, Horizon } from '@stellar/stellar-sdk';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const LOG_DIR = process.env.LOG_DIR || './logs';

/**
 * End-to-end test: create a real Stellar testnet transaction,
 * sign it, and submit it to the public Testnet horizon.
 */
async function testStellarSigning() {
  console.log('\n=== Test: Stellar Signing & Submission ===\n');

  // Generate a test keypair
  const kp = Keypair.random();
  console.log(`[TEST] Public key: ${kp.publicKey()}`);
  console.log(`[TEST] Private key: ${kp.secret()}`);

  // Use public Testnet Horizon
  const horizon = new Horizon('https://horizon-testnet.stellar.org');

  // Fund the address using friendbot (Testnet faucet)
  try {
    const res = await fetch(`https://friendbot.stellar.org?addr=${kp.publicKey()}`);
    const data = await res.json();
    console.log(`[TEST] Friendbot response: ${JSON.stringify(data)}`);
  } catch (e) {
    console.log(`[TEST] Could not fund via friendbot: ${e.message}`);
  }

  // Build a simple payment transaction
  const sourceAccount = await horizon.accounts().accountID(kp.publicKey()).call().catch(() => null);

  if (!sourceAccount) {
    console.log('[TEST] Account not funded yet, building transaction anyway (will fail on submit).');
    // Still test signing
    const tx = new TransactionBuilder(sourceAccount || {
      accountId: kp.publicKey(),
      sequence: '1',
      fees: '100',
    }, { fee: '100', networkPassphrase: Networks.TESTNET })
      .addOperation(Operation.payment({
        destination: kp.publicKey(), // self-payment
        asset: 'XLM',
        amount: '1',
      }))
      .setTimeout(30)
      .build();

    tx.sign(kp);
    console.log(`[TEST] Signed TX: ${tx.toEnvelope().toBase64()}`);

    const logEntry = {
      action: 'test_payment',
      publicKey: kp.publicKey(),
      signedXdr: tx.toEnvelope().toBase64(),
      status: 'signed',
    };
    fs.appendFileSync(`${LOG_DIR}/test-log.jsonl`, JSON.stringify(logEntry) + '\n');
    console.log('[TEST] Signed XDR logged.');
    return;
  }

  const tx = new TransactionBuilder(sourceAccount, { fee: '100', networkPassphrase: Networks.TESTNET })
    .addOperation(Operation.payment({
      destination: kp.publicKey(),
      asset: 'XLM',
      amount: '1',
    }))
    .setTimeout(30)
    .build();

  tx.sign(kp);
  console.log(`[TEST] Signed TX: ${tx.toEnvelope().toBase64()}`);

  const submitResult = await horizon.submitTransaction(tx);
  console.log(`[TEST] Submitted: ${JSON.stringify(submitResult, null, 2)}`);
}

testStellarSigning().catch(err => {
  console.error('[TEST FAILED]', err);
  process.exit(1);
});
