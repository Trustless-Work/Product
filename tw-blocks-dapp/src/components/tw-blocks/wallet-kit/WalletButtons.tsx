"use client";

import { useWalletContext } from "./WalletProvider";
import { useWallet } from "./useWallet";

export function WalletButton() {
  const {
    walletAddress,
    walletName,
  } = useWalletContext();
  const wallet = useWallet();

  if (walletAddress) {
    return (
      <div className="flex items-center gap-4">
        <div className="text-sm">
          <p className="font-medium">{walletName}</p>
          <p className="text-xs text-muted-foreground truncate w-32">
            {walletAddress}
          </p>
        </div>
        <button
          onClick={() => wallet.handleDisconnect()}
          className="px-3 py-2 rounded border text-sm"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => wallet.handleConnect()}
      className="px-3 py-2 rounded border text-sm"
    >
      Connect Wallet
    </button>
  );
}

