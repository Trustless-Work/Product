import { Account, Credit, Debit, Payment, Transfer, EscrowEvent } from "../types";
import {
  StellarOperation,
  StellarEffect,
  SorobanEvent,
} from "@subql/types-stellar";
import {
  AccountCredited,
  AccountDebited,
} from "@stellar/stellar-sdk/lib/horizon/types/effects";
import { Horizon, xdr } from "@stellar/stellar-sdk";
import { Address } from "@stellar/stellar-base";

export async function handleOperation(
  op: StellarOperation<Horizon.HorizonApi.PaymentOperationResponse>,
): Promise<void> {
  logger.info(`Indexing operation ${op.id}, type: ${op.type}`);

  const fromAccount = await checkAndGetAccount(op.from, op.ledger!.sequence);
  const toAccount = await checkAndGetAccount(op.to, op.ledger!.sequence);

  const payment = Payment.create({
    id: op.id,
    fromId: fromAccount.id,
    toId: toAccount.id,
    txHash: op.transaction_hash,
    amount: op.amount,
  });

  fromAccount.lastSeenLedger = op.ledger!.sequence;
  toAccount.lastSeenLedger = op.ledger!.sequence;
  await Promise.all([fromAccount.save(), toAccount.save(), payment.save()]);
}

export async function handleCredit(
  effect: StellarEffect<AccountCredited>,
): Promise<void> {
  logger.info(`Indexing effect ${effect.id}, type: ${effect.type}`);

  const account = await checkAndGetAccount(
    effect.account,
    effect.ledger!.sequence,
  );

  const credit = Credit.create({
    id: effect.id,
    accountId: account.id,
    amount: effect.amount,
  });

  account.lastSeenLedger = effect.ledger!.sequence;
  await Promise.all([account.save(), credit.save()]);
}

export async function handleDebit(
  effect: StellarEffect<AccountDebited>,
): Promise<void> {
  logger.info(`Indexing effect ${effect.id}, type: ${effect.type}`);

  const account = await checkAndGetAccount(
    effect.account,
    effect.ledger!.sequence,
  );

  const debit = Debit.create({
    id: effect.id,
    accountId: account.id,
    amount: effect.amount,
  });

  account.lastSeenLedger = effect.ledger!.sequence;
  await Promise.all([account.save(), debit.save()]);
}

export async function handleEvent(event: SorobanEvent): Promise<void> {
  logger.info(
    `New transfer event found at block ${event.ledger!.sequence.toString()}`,
  );

  // Get data from the event
  // The transfer event has the following payload \[env, from, to\]
  // logger.info(JSON.stringify(event));
  const {
    topic: [env, from, to],
  } = event;

  try {
    decodeAddress(from);
    decodeAddress(to);
  } catch (e) {
    logger.info(`decode address failed`);
  }

  const fromAccount = await checkAndGetAccount(
    decodeAddress(from),
    event.ledger!.sequence,
  );
  const toAccount = await checkAndGetAccount(
    decodeAddress(to),
    event.ledger!.sequence,
  );

  // Create the new transfer entity
  const transfer = Transfer.create({
    id: event.id,
    ledger: event.ledger!.sequence,
    date: new Date(event.ledgerClosedAt),
    contract: event.contractId?.contractId().toString()!,
    fromId: fromAccount.id,
    toId: toAccount.id,
    value: BigInt(event.value.i64().toString()),
  });

  fromAccount.lastSeenLedger = event.ledger!.sequence;
  toAccount.lastSeenLedger = event.ledger!.sequence;
  await Promise.all([fromAccount.save(), toAccount.save(), transfer.save()]);
}

async function checkAndGetAccount(
  id: string,
  ledgerSequence: number,
): Promise<Account> {
  let account = await Account.get(id.toLowerCase());
  if (!account) {
    // We couldn't find the account
    account = Account.create({
      id: id.toLowerCase(),
      firstSeenLedger: ledgerSequence,
    });
  }
  return account;
}

export async function handleEscrowEvents(event: SorobanEvent): Promise<void> {
  logger.info(`Indexing escrow event ${event.id}`);

  // Extract event type from the first topic element (should be the event name)
  const eventType = event.topic[0]?.toString() || "unknown";
  
  // Create a unique ID for this event
  const eventId = `${event.contractId?.contractId().toString()}-${event.ledger!.sequence}-${event.id}`;
  
  // Try to extract engagement ID from payload if it exists
  let engagementId: string | undefined;
  try {
    // For update events (chg_esc), the engagement ID might be in the topic payload
    if (eventType === "chg_esc" && event.topic && event.topic.length > 2) {
      // The engagement ID should be in the topic payload
      const rawEngagementId = event.topic[2];
      if (rawEngagementId) {
        engagementId = rawEngagementId.toString();
      }
    }
  } catch (e) {
    logger.warn(`Could not extract engagement ID from event: ${e}`);
  }

  const escrowEvent = EscrowEvent.create({
    id: eventId,
    type: eventType,
    contractId: event.contractId?.contractId().toString() || "unknown",
    engagementId: engagementId,
    payload: JSON.stringify(event.topic.map(t => t.toString())),
    ledger: BigInt(event.ledger!.sequence),
    timestamp: BigInt(new Date(event.ledgerClosedAt).getTime()),
  });

  await escrowEvent.save();
}

// scValToNative not works, temp solution
function decodeAddress(scVal: xdr.ScVal): string {
  try {
    return Address.account(scVal.address().accountId().ed25519()).toString();
  } catch (e) {
    return Address.contract(scVal.address().contractId()).toString();
  }
}
