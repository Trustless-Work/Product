"use client";

import { useWalletContext } from "@/components/tw-blocks/wallet-kit/WalletProvider";
import { EscrowsByRoleCards } from "@/components/tw-blocks/escrows/escrows-by-role/cards/EscrowsCards";

export function EscrowListByRole({ role }: { role: "ServiceProvider" | "Approver" | "Recipient" }) {
  const { walletAddress } = useWalletContext();

  if (!walletAddress) {
    return (
      <div className="space-y-3">
        <div className="font-medium">Your Escrows ({role})</div>
        <div className="rounded border p-4 text-sm text-muted-foreground">
          Connect your wallet to see escrows.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="font-medium">Your Escrows ({role})</div>
      <EscrowsByRoleCards />
    </div>
  );
}


