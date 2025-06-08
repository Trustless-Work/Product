---
description: Utils UI Components.
icon: meter
---

# Utils

## Connect Wallet Warning

When the user is trying to use the demo without the wallet.

```typescript
import { Button } from "@/components/ui/button";
import { AlertCircle, Wallet } from "lucide-react";
import { useWallet } from "@/components/modules/auth/hooks/wallet.hook";

export const ConnectWalletWarning = () => {
  const { handleConnect } = useWallet();

  return (
    <div className="p-8 flex flex-col items-center justify-center text-center">
      <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-full mb-4">
        <Wallet className="h-8 w-8 text-amber-600 dark:text-amber-500" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Wallet Connection Required</h3>
      <p className="text-muted-foreground max-w-md mb-6">
        To access and interact with the Trustless Work API endpoints, you need
        to connect your Stellar wallet first.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={handleConnect} className="flex items-center gap-2">
          <Wallet className="h-4 w-4" />
          Connect Wallet
        </Button>
      </div>
      <div className="mt-6 flex items-center gap-2 text-sm text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg">
        <AlertCircle className="h-4 w-4" />
        <p>Your wallet information is never stored on our servers</p>
      </div>
    </div>
  );
};

```

## Reponse Display

When we catch an endpoint response, we save it and show it by this component.

```typescript
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Copy } from "lucide-react";
import { useUtils } from "@/hooks/utils.hook";
import { Escrow } from "@/@types/escrows/escrow.entity";
import {
  EscrowRequestResponse,
  InitializeEscrowResponse,
  UpdateEscrowResponse,
} from "@/@types/escrows/escrow-response.entity";

interface ResponseDisplayProps {
  response:
    | InitializeEscrowResponse
    | UpdateEscrowResponse
    | EscrowRequestResponse
    | Escrow
    | null;
}

export function ResponseDisplay({ response }: ResponseDisplayProps) {
  const [activeTab, setActiveTab] = useState("formatted");
  const { copyToClipboard, copied } = useUtils();

  if (!response) return null;

  const responseString = JSON.stringify(response, null, 2);

  return (
    <Card className="mt-6 border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Response</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => copyToClipboard(responseString)}
          className="h-8 px-2 text-xs"
        >
          {copied ? (
            <>
              <CheckCircle className="h-4 w-4 mr-1" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1" /> Copy
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="formatted"
              className="flex-1 rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:shadow-none py-3"
            >
              Formatted
            </TabsTrigger>
            <TabsTrigger
              value="raw"
              className="flex-1 rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:shadow-none py-3"
            >
              Raw
            </TabsTrigger>
          </TabsList>
          <div className="p-4">
            <TabsContent value="formatted" className="mt-0">
              <pre className="bg-muted p-4 rounded-md overflow-auto max-h-96 text-xs">
                {responseString}
              </pre>
            </TabsContent>
            <TabsContent value="raw" className="mt-0">
              <div className="bg-muted p-4 rounded-md overflow-auto max-h-96 text-xs break-all">
                {JSON.stringify(response)}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}

```
