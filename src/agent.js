import { Horizons } from '@stellar/stellar-sdk';
import { BaseWallet, ServerUtils } from '@stellar/stellar-sdk/horizon';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

dotenv.config();

const LOG_DIR = process.env.LOG_DIR || './logs';
const RULES_FILE = process.env.RULES_FILE || './rules.json';

// Ensure log directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

/**
 * Load or generate a Stellar Testnet keypair.
 */
class Keystore {
  constructor() {
    this.privateKey = process.env.STELLAR_PRIVATE_KEY;
    if (!this.privateKey) {
      const keypair = require('@stellar/stellar-sdk').Keypair.random();
      this.privateKey = keypair.secret();
      console.log(chalk.yellow('[KEYSTORE] Generated new keypair (no STELLAR_PRIVATE_KEY in env)'));
      console.log(chalk.yellow(`[KEYSTORE] Public Key: ${keypair.publicKey()}`));
    }
  }

  getKeypair() {
    return require('@stellar/stellar-sdk').Keypair.fromSecret(this.privateKey);
  }

  getPublicKey() {
    return this.getKeypair().publicKey();
  }
}

/**
 * Trustless Work API client.
 * Uses the Horizon-like API documented at https://docs.trustlesswork.com
 */
class TWApiClient {
  constructor(baseUrl, apiKey) {
    this.baseUrl = baseUrl || process.env.TW_API_BASE_URL || 'https://api.staging.trustlesswork.com';
    this.apiKey = apiKey || process.env.TW_API_KEY;
    this.horizon = new Horizons(this.baseUrl);
  }

  async getEscrow(escrowId) {
    const res = await fetch(`${this.baseUrl}/v1/escrows/${escrowId}`);
    if (!res.ok) throw new Error(`Failed to fetch escrow ${escrowId}: ${res.status}`);
    return res.json();
  }

  async getUnsignedXdr(escrowId, action) {
    // Request an unsigned XDR for a specific action
    const res = await fetch(`${this.baseUrl}/v1/escrows/${escrowId}/xdrs?role=${action}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.apiKey ? { 'Authorization': `Bearer ${this.apiKey}` } : {}),
      },
      body: JSON.stringify({ action }),
    });
    if (!res.ok) throw new Error(`Failed to get unsigned XDR: ${res.status} ${await res.text()}`);
    return res.json();
  }

  async submitTransaction(xdrEnvelope) {
    const res = await fetch(`${this.baseUrl}/v1/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.apiKey ? { 'Authorization': `Bearer ${this.apiKey}` } : {}),
      },
      body: JSON.stringify({ envelopeXdr: xdrEnvelope }),
    });
    if (!res.ok) throw new Error(`Failed to submit transaction: ${res.status} ${await res.text()}`);
    return res.json();
  }
}

/**
 * Rule engine — decides whether an action is permitted.
 */
class RuleEngine {
  constructor(rulesFile) {
    const raw = fs.readFileSync(rulesFile, 'utf8');
    this.config = JSON.parse(raw);
  }

  /**
   * Returns the recommended action based on rules, or null if no rule matches.
   */
  evaluate(escrow) {
    const { rules, defaultThreshold } = this.config;
    const desc = (escrow.metadata?.description || '').toLowerCase();
    const amount = escrow.amount || 0;

    for (const rule of rules) {
      if (!rule.enabled) continue;
      if (rule.condition === 'description_contains' && desc.includes(rule.value.toLowerCase())) {
        return rule.action;
      }
      if (rule.condition === 'amount_below' && amount < (rule.threshold ?? defaultThreshold)) {
        return rule.action;
      }
    }
    return null;
  }
}

/**
 * Logs a run to a JSONL file for reproducibility.
 */
function logRun(entry) {
  const ts = new Date().toISOString();
  const logFile = path.join(LOG_DIR, `agent-log.jsonl`);
  const line = JSON.stringify({ ...entry, timestamp: ts }) + '\n';
  fs.appendFileSync(logFile, line);
  console.log(chalk.green(`[LOG] ${ts} ${entry.action} escrow=${entry.escrowId} tx=${entry.txHash}`));
}

/**
 * Main agent loop.
 */
async function main() {
  console.log(chalk.cyan('\n=== Trustless Work Agent Signer v0.1 ===\n'));

  const keystore = new Keystore();
  const publicKey = keystore.getPublicKey();
  const client = new TWApiClient();
  const ruleEngine = new RuleEngine(RULES_FILE);

  console.log(chalk.blue(`[AGENT] Public key: ${publicKey}`));
  console.log(chalk.blue(`[AGENT] API base: ${client.baseUrl}`));

  // Determine which escrows to process
  // Fetch list of escrows where agent is assigned a role
  let escrows = [];
  try {
    const res = await fetch(`${client.baseUrl}/v1/agents/${publicKey}/escrows`);
    if (res.ok) {
      escrows = await res.json();
    }
  } catch (e) {
    console.log(chalk.yellow('[AGENT] Could not fetch agent escrows list, will run demo mode.'));
  }

  // If no escrows found, use a demo escrow ID from env or a known test ID
  const escrowIds = escrows.length > 0
    ? escrows.map(e => e.id)
    : [process.env.SCOPED_ESCROW_ID || 'demo'];

  for (const escrowId of escrowIds) {
    await processEscrow(escrowId, keystore, client, ruleEngine, publicKey);
  }
}

async function processEscrow(escrowId, keystore, client, ruleEngine, publicKey) {
  console.log(chalk.magenta(`\n--- Processing escrow: ${escrowId} ---`));

  let escrow;
  try {
    escrow = await client.getEscrow(escrowId);
  } catch (e) {
    console.log(chalk.red(`[AGENT] Cannot fetch escrow ${escrowId}: ${e.message}`));
    return;
  }

  console.log(chalk.white(`[ESCROW] Status: ${escrow.status}`));
  console.log(chalk.white(`[ESCROW] Amount: ${escrow.amount} ${escrow.asset}`));
  console.log(chalk.white(`[ESCROW] Description: ${escrow.metadata?.description || 'N/A'}`));

  // Evaluate rules
  const recommendedAction = ruleEngine.evaluate(escrow);
  if (recommendedAction) {
    console.log(chalk.green(`[RULE] Rule matched → action: ${recommendedAction}`));
    await executeAction(escrowId, recommendedAction, keystore, client, publicKey, escrow);
  } else {
    console.log(chalk.yellow('[RULE] No rule triggered. Manually testing approve action.'));
    await executeAction(escrowId, 'approve', keystore, client, publicKey, escrow);
  }
}

async function executeAction(escrowId, action, keystore, client, publicKey, escrow) {
  console.log(chalk.cyan(`[ACTION] Requesting unsigned XDR for: ${action}`));

  let xdrResponse;
  try {
    xdrResponse = await client.getUnsignedXdr(escrowId, action);
  } catch (e) {
    console.log(chalk.red(`[ACTION] Failed to get unsigned XDR: ${e.message}`));
    return;
  }

  const { xdr: unsignedXdr } = xdrResponse;
  console.log(chalk.white(`[XDR] Unsigned envelope: ${unsignedXdr}`));

  // Decode, sign, rebuild
  const { TransactionBuilder, Networks, Operation, xdr } = require('@stellar/stellar-sdk');
  const signedTx = new TransactionBuilder(
    new Horizons(client.baseUrl),
    { fee: '100', networkPassphrase: Networks.TESTNET }
  )
    .addOperation(
      xdr.DecodedXdr.fromBase64(unsignedXdr).v1().tx().operations()[0]
    )
    .setTimeout(30)
    .build();

  const keypair = keystore.getKeypair();
  signedTx.sign(keypair);

  console.log(chalk.green(`[SIGNED] Signed by ${publicKey}`));
  console.log(chalk.white(`[SIGNED] XDR: ${signedTx.toEnvelope().toBase64()}`));

  // Submit to Trustless Work API
  console.log(chalk.cyan('[SUBMIT] Submitting signed transaction...'));
  let submissionResult;
  try {
    submissionResult = await client.submitTransaction(signedTx.toEnvelope().toBase64());
  } catch (e) {
    console.log(chalk.red(`[SUBMIT] Failed: ${e.message}`));
    logRun({ escrowId, action, publicKey, status: 'failed', error: e.message });
    return;
  }

  console.log(chalk.green('[SUBMIT] Submitted successfully!'));
  console.log(chalk.white(`[SUBMIT] Response: ${JSON.stringify(submissionResult, null, 2)}`));

  const txHash = submissionResult.hash || submissionResult.result_xdr || 'unknown';

  logRun({ escrowId, action, publicKey, txHash, status: 'submitted', response: submissionResult });

  // Also verify on Stellar ledger
  try {
    const { TransactionApi } = require('@stellar/stellar-sdk');
    const txApi = new TransactionApi(client.horizon);
    const result = await txApi.transaction(txHash);
    console.log(chalk.green(`[VERIFY] Transaction on ledger: ${JSON.stringify(result, null, 2)}`));
    logRun({ escrowId, action, publicKey, txHash, status: 'verified', stellarResult: result });
  } catch (e) {
    console.log(chalk.yellow(`[VERIFY] Could not verify on ledger: ${e.message}`));
  }

  console.log(chalk.cyan(`\n[AGENT] Escrow action complete.\n`));
}

// Run
main().catch(err => {
  console.error(chalk.red('[FATAL]', err));
  process.exit(1);
});
