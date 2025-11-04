---
icon: monitor-waveform
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
---

# Escrow's Single Release Lifecycle

Step by Step Guide to implement Escrow's Single Release Lifecycle

Important

It does not work for a real use case, only for testing purposes. But if you want to implement it, you can use the code below as a reference and customize it to your needs.

### Create a Next.js Project# <a href="#create-nextjs-project" id="create-nextjs-project"></a>

Start by creating a new Next.js project with TypeScript and Tailwind CSS. In order to make easier the setup, please use the path alias with "@/":

```
npx create-next-app@latest
```

Navigate to your project directory:

```
cd my-trustless-app
```

### Install Trustless Work Blocks# <a href="#install-trustless-work-blocks" id="install-trustless-work-blocks"></a>

Install the main library package:

npm

```
npm install @trustless-work/blocks
```

#### Run the CLI Setup <a href="#run-cli-setup" id="run-cli-setup"></a>

Initialize your project with the Trustless Work CLI:

```
npx trustless-work init
```

What the init command does:

* Installs shadcn/ui components (with interactive prompts)
* Installs required dependencies: @tanstack/react-query, @trustless-work/escrow, axios, zod, react-hook-form, @creit.tech/stellar-wallets-kit, react-day-picker, etc.
* Creates `.twblocks.json` configuration file
* Optionally wires providers into your Next.js `app/layout.tsx`

### Environment Configuration <a href="#environment-configuration" id="environment-configuration"></a>

[Documentation](https://docs.trustlesswork.com/trustless-work/developer-resources/authentication/request-api-key)

Create a `.env` file in your project root:

.env

```
# Required: Your Trustless Work API key 
NEXT_PUBLIC_API_KEY=your_api_key_here
```

### Add Wallet Connectivity <a href="#add-wallet-connectivity" id="add-wallet-connectivity"></a>

Add wallet connectivity to your app:

```
npx trustless-work add wallet-kit
```

#### Wrap your app with the WalletProvider: <a href="#wrap-app-wallet-provider" id="wrap-app-wallet-provider"></a>

Wrap your app with the WalletProvider in your layout.tsx:

app/layout.tsx

```
return (
    <WalletProvider>{children}</WalletProvider> 
);
```

#### Example usage in a page: <a href="#example-usage-wallet-page" id="example-usage-wallet-page"></a>

Add wallet connectivity to your app:

app/page.tsx

```
"use client";

import { WalletButton } from "@/components/tw-blocks/wallet-kit/WalletButtons";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <header className="flex justify-between items-center w-full">
        <h2 className="text-2xl font-bold">Trustless Work</h2>

        {/* Wallet Button */}
        <WalletButton />
      </header>
    </div>
  );
}
```

### Add Helpers <a href="#add-helpers" id="add-helpers"></a>

Add helpers to your app:

```
npx trustless-work add helpers
```

### Add Tanstack Query <a href="#add-tanstack-query" id="add-tanstack-query"></a>

Add Tanstack Query to your app:

```
npx trustless-work add tanstack
```

### Add Handle Errors <a href="#add-handle-errors" id="add-handle-errors"></a>

Add Handle Errors to your app:

```
npx trustless-work add handle-errors
```

### Add Providers (If you skipped the init command) <a href="#add-providers" id="add-providers"></a>

Add Providers to your app:

```
npx trustless-work add providers
```

### Add Single Release Escrows Components <a href="#add-single-release-escrows" id="add-single-release-escrows"></a>

Add Single Release Escrows to your app:

```
npx trustless-work add escrows/single-release
```

### Add Single-Multi Release Escrows Components <a href="#add-single-multi-release-escrows" id="add-single-multi-release-escrows"></a>

Add Single-Multi Release Escrows to your app:

```
npx trustless-work add escrows/single-multi-release
```

### Add Escrows by Role Cards <a href="#add-escrows-by-role-cards" id="add-escrows-by-role-cards"></a>

Add Escrows by Role Cards to your app:

```
npx trustless-work add escrows/escrows-by-role/cards
```

#### Import Actions <a href="#import-actions" id="import-actions"></a>

In the code, there are some actions commented out. You can uncomment them and import them from the single-release block. See the notes in the escrows by role or by signer components.

#### Commented Out Code <a href="#commented-out-code" id="commented-out-code"></a>

escrows/escrows-by-role/details/Actions.tsx

```
return (
    <div className="flex items-start justify-start flex-col gap-2 w-full">
      {/* You can add the buttons here, using the buttons from the blocks. These actions are conditional based on the escrow flags and the user roles. */}
      {hasConditionalButtons && (
        <div className="flex flex-col gap-2 w-full">
          {/* UpdateEscrowDialog component should be rendered based on the escrow type. It means that if the selectedEscrow.type is "single-release", then the UpdateEscrowDialog (from the single-release block) component should be rendered. If the selectedEscrow.type is "multi-release", then the UpdateEscrowDialog (from the multi-release block) component should be rendered. */}
          {/* {shouldShowEditButton && <UpdateEscrowDialog />} */}

          {/* Works only with single-release escrows */}
          {/* Only appears if the escrow has balance */}
          {/* {shouldShowDisputeButton && <DisputeEscrowButton />} */}

          {/* Works only with single-release escrows */}
          {/* Only appears if the escrow is disputed */}
          {/* {shouldShowResolveButton && <ResolveDisputeDialog />} */}

          {/* Works only with single-release escrows */}
          {/* Only appears if all the milestones are approved */}
          {/* {shouldShowReleaseFundsButton && <ReleaseEscrowButton />} */}
        </div>
      )}

      <FundEscrowDialog />
    </div>
  );
```

#### Actions Imported <a href="#actions-imported" id="actions-imported"></a>

escrows/escrows-by-role/details/Actions.tsx

```
// If you need both types, you should import both versions to update escrow
import { UpdateEscrowDialog } from "../../single-release/update-escrow/dialog/UpdateEscrow";
/* import { UpdateEscrowDialog as UpdateEscrowDialogMultiRelease } from "../../multi-release/update-escrow/dialog/UpdateEscrow"; */
import { FundEscrowDialog } from "../../single-multi-release/fund-escrow/dialog/FundEscrow";
import { DisputeEscrowButton } from "../../single-release/dispute-escrow/button/DisputeEscrow";
import { ResolveDisputeDialog } from "../../single-release/resolve-dispute/dialog/ResolveDispute";
import { ReleaseEscrowButton } from "../../single-release/release-escrow/button/ReleaseEscrow";

return (
    <div className="flex items-start justify-start flex-col gap-2 w-full">
      {/* You can add the buttons here, using the buttons from the blocks. These actions are conditional based on the escrow flags and the user roles. */}
      {hasConditionalButtons && (
        <div className="flex flex-col gap-2 w-full">
          {/* UpdateEscrowDialog component should be rendered based on the escrow type. It means that if the selectedEscrow.type is "single-release", then the UpdateEscrowDialog (from the single-release block) component should be rendered. If the selectedEscrow.type is "multi-release", then the UpdateEscrowDialog (from the multi-release block) component should be rendered. */}
          {shouldShowEditButton && <UpdateEscrowDialog />}

          {/* Works only with single-release escrows */}
          {shouldShowDisputeButton && <DisputeEscrowButton />}

          {/* Works only with single-release escrows */}
          {shouldShowResolveButton && <ResolveDisputeDialog />}

          {/* Works only with single-release escrows */}
          {shouldShowReleaseFundsButton && <ReleaseEscrowButton />}
        </div>
      )}

      <FundEscrowDialog />
    </div>
  );
```

### Manual Provider Setup <a href="#manual-provider-setup" id="manual-provider-setup"></a>

Wrap your app with the required providers in this specific order:

app/layout.tsx

```
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryClientProvider } from "@/components/tw-blocks/providers/ReactQueryClientProvider";
import { TrustlessWorkProvider } from "@/components/tw-blocks/providers/TrustlessWork";
import { WalletProvider } from "@/components/tw-blocks/wallet-kit/WalletProvider";
import { EscrowProvider } from "@/components/tw-blocks/providers/EscrowProvider";
import { EscrowDialogsProvider } from "@/components/tw-blocks/providers/EscrowDialogsProvider";
import { EscrowAmountProvider } from "@/components/tw-blocks/providers/EscrowAmountProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // optional: use geistSans.variable and geistMono.variable
        className="antialiased"
      >
        <ReactQueryClientProvider>
          <TrustlessWorkProvider>
            <WalletProvider>
              <EscrowProvider>
                <EscrowDialogsProvider>
                  <EscrowAmountProvider>
                    {children}

                    <Toaster />
                  </EscrowAmountProvider>
                </EscrowDialogsProvider>
              </EscrowProvider>
            </WalletProvider>
          </TrustlessWorkProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
```

Provider Order MattersThe providers must be nested in this exact order for proper functionality.

### Example usage in a page: <a href="#example-usage-complete-page" id="example-usage-complete-page"></a>

Now, you are able to interact with the entire escrow lifecycle.

app/page.tsx

```
"use client";

import { EscrowsByRoleCards } from "@/components/tw-blocks/escrows/escrows-by-role/cards/EscrowsCards";
import { InitializeEscrowDialog } from "@/components/tw-blocks/escrows/single-release/initialize-escrow/dialog/InitializeEscrow";
import { WalletButton } from "@/components/tw-blocks/wallet-kit/WalletButtons";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <header className="flex justify-between items-center w-full">
        <h2 className="text-2xl font-bold">Trustless Work</h2>
        <WalletButton />
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="container">
          <div className="flex w-full mb-4 justify-end">
            <div className="flex w-1/6">
              <InitializeEscrowDialog />
            </div>
          </div>

          <EscrowsByRoleCards />
        </div>
      </main>
    </div>
  );
}

```

All the blocks were added, now use them!You already have all the required blocks to start using the single-release escrow lifecycle.

### Final UI <a href="#final-ui" id="final-ui"></a>

By using these components, you'll be able to completed the entire escrow lifecycle.

Important Usage Advice- This cards components works **by role**. In the filters section, you can select the role you want to see the escrows for. Based on that, the actions buttons will be rendered.\
\- Before you start using the UI, you must add the **USDC** asset to your wallet. If not, you wont be able to interact with Trustless Work.

#### Wallet Connection Dialog <a href="#wallet-connection-dialog" id="wallet-connection-dialog"></a>

Show the wallet connection dialog:

![Escrow Lifecycle](https://blocks.trustlesswork.com/_next/image?url=%2Fstart-from-scratch%2Fwallet-kit.png\&w=1080\&q=75)

#### Cards by Role <a href="#cards-by-role" id="cards-by-role"></a>

Show the cards by role:

![Escrow Lifecycle](https://blocks.trustlesswork.com/_next/image?url=%2Fstart-from-scratch%2Fcards-by-role.png\&w=2048\&q=75)

#### Initialize Escrow Dialog <a href="#initialize-escrow-dialog" id="initialize-escrow-dialog"></a>

Show the initialize escrow dialog:

![Escrow Lifecycle](https://blocks.trustlesswork.com/_next/image?url=%2Fstart-from-scratch%2Finitialize-escrow.png\&w=2048\&q=75)

#### Escrow Details Dialog <a href="#escrow-details-dialog" id="escrow-details-dialog"></a>

Show the escrow details dialog:

![Escrow Lifecycle](https://blocks.trustlesswork.com/_next/image?url=%2Fstart-from-scratch%2Fdetails.png\&w=2048\&q=75)

The easiest way to implement escrows in blockchain."
