"use client";

import {
  StellarWalletsKit,
  WalletNetwork,
  FREIGHTER_ID,
  AlbedoModule,
  FreighterModule,
} from "@creit.tech/stellar-wallets-kit";

/**
 * Stellar Wallet Kit
 *
 * @description The Stellar Wallet Kit is used to connect to the wallet
 * @description The Stellar Wallet Kit is used to sign transactions
 * @description The Stellar Wallet Kit is used to get the wallet address
 */
let kit: StellarWalletsKit | null = null;

export const getKit = (): StellarWalletsKit => {
  if (kit) return kit;
  if (typeof window === "undefined") {
    throw new Error("StellarWalletsKit is client-only");
  }
  kit = new StellarWalletsKit({
    network: WalletNetwork.TESTNET,
    selectedWalletId: FREIGHTER_ID,
    modules: [new FreighterModule(), new AlbedoModule()],
  });
  return kit;
};

interface SignTransactionParams {
  unsignedTransaction: string;
  address: string;
}

/**
 * Sign Transaction Params
 *
 * @param unsignedTransaction - The unsigned transaction
 * @param address - The address of the wallet
 */
export const signTransaction = async ({
  unsignedTransaction,
  address,
}: SignTransactionParams): Promise<string> => {
  const { signedTxXdr } = await getKit().signTransaction(unsignedTransaction, {
    address,
    networkPassphrase: WalletNetwork.TESTNET,
  });

  return signedTxXdr;
};
