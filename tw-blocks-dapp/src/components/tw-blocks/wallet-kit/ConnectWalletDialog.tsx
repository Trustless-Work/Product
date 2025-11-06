"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/tw-blocks/dialog";
import { Button } from "@/components/tw-blocks/button";
import { useWalletContext } from "./WalletProvider";

export function ConnectWalletDialogButton() {
  const { walletAddress, walletName, setWalletInfo, clearWalletInfo } = useWalletContext();
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [connecting, setConnecting] = React.useState(false);

  const connectFreighter = async () => {
    try {
      setError(null);
      setConnecting(true);
      const freighter = (globalThis as any).freighterApi;
      if (!freighter?.getPublicKey) {
        setError("Freighter not detected. Install and unlock the extension, then try again.");
        return;
      }
      const address = await freighter.getPublicKey();
      if (!address) {
        setError("Could not retrieve address from Freighter. Ensure it is unlocked.");
        return;
      }
      setWalletInfo(address, "Freighter");
      setOpen(false);
    } catch (e: any) {
      setError(e?.message || "Failed to connect wallet.");
    } finally {
      setConnecting(false);
    }
  };

  const disconnect = () => {
    clearWalletInfo();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {walletAddress ? (
          <Button variant="outline">{walletName || "Wallet"}</Button>
        ) : (
          <Button>Connect Wallet</Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Connect a wallet</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {walletAddress ? (
            <>
              <div className="text-sm text-muted-foreground">Connected as {walletName}: {walletAddress}</div>
              <Button variant="destructive" onClick={disconnect}>Disconnect</Button>
            </>
          ) : (
            <>
              <Button disabled={connecting} onClick={connectFreighter} className="w-full">
                {connecting ? "Connecting…" : "Connect with Freighter"}
              </Button>
              {error ? (
                <div className="text-sm text-destructive">{error}</div>
              ) : (
                <div className="text-xs text-muted-foreground">Freighter is recommended on Testnet. Install the browser extension if not present.</div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
