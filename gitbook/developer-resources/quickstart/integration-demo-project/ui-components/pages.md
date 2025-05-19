---
description: The main page of escrows.
icon: pager
---

# Pages

## Dashboard

The page which renders the main tabs.

```typescript
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useWalletContext } from "@/providers/wallet.provider";
import { MainTabs } from "../tabs/MainTabs";
import { ConnectWalletWarning } from "../ConnectWalletWarning";

export function Dashboard() {
  const { walletAddress } = useWalletContext();

  return (
    <div className="space-y-8">
      <Card className="border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl font-bold">Dashboard</CardTitle>
          <CardDescription>
            Manage escrow contracts and interact with the Stellar blockchain
            using the <span className="font-bold">Trustless Work API.</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {walletAddress ? <MainTabs /> : <ConnectWalletWarning />}
        </CardContent>
      </Card>
    </div>
  );
}

```
