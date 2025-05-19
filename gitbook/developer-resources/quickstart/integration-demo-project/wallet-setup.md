---
description: >-
  We're going to use the Stellar Wallet Kit, and setup all the configuration in
  order to sign transactions.
icon: wallet
---

# Wallet Setup

## Custom Hook

We are going to use a custom hook in order to manage the actions of connect and disconnect wallet by using the Wallet Context and the wallet kit.

```typescript
import { kit } from "@/config/wallet-kit";
import { useWalletContext } from "@/providers/wallet.provider";
import { ISupportedWallet } from "@creit.tech/stellar-wallets-kit";

export const useWallet = () => {
  // Get wallet info from wallet context
  const { setWalletInfo, clearWalletInfo } = useWalletContext();

  /**
   * Connect to a wallet using the Stellar Wallet Kit and set the wallet info in the wallet context
   */
  const connectWallet = async () => {
    await kit.openModal({
      modalTitle: "Connect to your favorite wallet",
      onWalletSelected: async (option: ISupportedWallet) => {
        kit.setWallet(option.id);

        const { address } = await kit.getAddress();
        const { name } = option;

        setWalletInfo(address, name);
      },
    });
  };

  /**
   * Disconnect from the wallet using the Stellar Wallet Kit and clear the wallet info in the wallet context
   */
  const disconnectWallet = async () => {
    await kit.disconnect();
    clearWalletInfo();
  };

  /**
   * Handle the connection to the wallet by some button click
   */
  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  /**
   * Handle the disconnection to the wallet by some button click
   */
  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  return {
    connectWallet,
    disconnectWallet,
    handleConnect,
    handleDisconnect,
  };
};

```

The "handleConnect" and  "handleDisconnect" functions you can use with buttons in order to call the wallet connect modal or empty their state.



## Helpers

All endpoints need your signature by wallet. The Stellar Wallet Kit provides that functionality, but we'll abstract that in a helper function.

```typescript
import { kit } from "@/config/wallet-kit";
import { WalletNetwork } from "@creit.tech/stellar-wallets-kit";

interface signTransactionProps {
  unsignedTransaction: string;
  address: string;
}

/**
 * Sign a transaction
 *
 * @Flow:
 * 1. Sign the unsigned transaction
 * 2. Return the signed transaction
 */
export const signTransaction = async ({
  unsignedTransaction,
  address,
}: signTransactionProps): Promise<string> => {
  const { signedTxXdr } = await kit.signTransaction(unsignedTransaction, {
    address,
    networkPassphrase: WalletNetwork.TESTNET,
  });

  return signedTxXdr;
};


```

