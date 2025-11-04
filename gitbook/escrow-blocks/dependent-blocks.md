---
icon: codepen
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

# Dependent Blocks

Some blocks require other blocks to work properly. Make sure to add their dependencies before using them.

Important

If you don't follow the instructions below, you may run into issues with the blocks not working properly.

### Diagram of Dependencies# <a href="#diagram-of-dependencies" id="diagram-of-dependencies"></a>

Some blocks require other blocks to work properly. Make sure to add their dependencies before using them.

Show DiagramClick to load the interactive dependencies diagram

### Dependencies by Block Group# <a href="#dependencies-by-block-group" id="dependencies-by-block-group"></a>

#### Escrows by Signer ([Table](https://blocks.trustlesswork.com/blocks/escrows-escrows-by-signer-table),[Cards](https://blocks.trustlesswork.com/blocks/escrows-escrows-by-signer-cards)) & Escrows by Role ([Table](https://blocks.trustlesswork.com/blocks/escrows-escrows-by-role-table),[Cards](https://blocks.trustlesswork.com/blocks/escrows-escrows-by-role-cards))# <a href="#escrows-by-signer-and-role" id="escrows-by-signer-and-role"></a>

These listing/detail blocks depend on several shared modules and providers:

* `wallet-kit`
* `providers`
* `handle-errors`
* `helpers`
* `tanstack`
* `single-release`or`multi-release`or`single-multi-release`// Depending on your needs

Providers to includeEnsure you include **all the providers. These blocks need all of them**

```
# Quick install examples
npx trustless-work add wallet-kit
npx trustless-work add escrows/single-release # If you need single-release escrows
npx trustless-work add escrows/multi-release # If you need multi-release escrows
npx trustless-work add escrows/single-multi-release # If you need fund, approve or change status
npx trustless-work add tanstack

# If you skipped the init command, add these providers
npx trustless-work add providers # All of them are required to these blocks

# Optional utility modules
npx trustless-work add handle-errors
npx trustless-work add helpers
```

#### Single Release & Multi Release components# <a href="#single-release-multi-release-components" id="single-release-multi-release-components"></a>

All single-release and multi-release actions ([Initialize Escrow](https://blocks.trustlesswork.com/blocks/escrows-initialize-escrow), [Fund Escrow](https://blocks.trustlesswork.com/blocks/escrows-fund-escrow), [Change Milestone Status](https://blocks.trustlesswork.com/blocks/escrows-change-milestone-status), [Approve Milestone](https://blocks.trustlesswork.com/blocks/escrows-approve-milestone), [Release](https://blocks.trustlesswork.com/blocks/escrows-release-escrow), [Dispute](https://blocks.trustlesswork.com/blocks/escrows-dispute-escrow), [Resolve](https://blocks.trustlesswork.com/blocks/escrows-resolve-dispute), [Update Escrow](https://blocks.trustlesswork.com/blocks/escrows-update-escrow)) require:

* `wallet-kit`
* `providers`
* `handle-errors`
* `tanstack`
* `helpers`

```
# Add essentials for single-release flows
npx trustless-work add wallet-kit
npx trustless-work add tanstack

# If you skipped the init command, add these providers
npx trustless-work add providers # Only need Wallet, TrustlessWork, Escrow and ReactQueryClient

# Optional utility modules
npx trustless-work add handle-errors
npx trustless-work add helpers
```

### Provider Wrapping (order matters)# <a href="#provider-wrapping" id="provider-wrapping"></a>

Wrap your app with the following providers, in this order. Include`EscrowDialogsProvider`and `EscrowAmountProvider`when a page uses dialogs or amount context.

app/layout.tsx

```
import { ReactQueryClientProvider } from "@/components/tw-blocks/providers/ReactQueryClientProvider";
import { TrustlessWorkProvider } from "@/components/tw-blocks/providers/TrustlessWork";
import { WalletProvider } from "@/components/tw-blocks/wallet-kit/WalletProvider";
import { EscrowProvider } from "@/components/tw-blocks/providers/EscrowProvider";
import { EscrowDialogsProvider } from "@/components/tw-blocks/providers/EscrowDialogsProvider";
import { EscrowAmountProvider } from "@/components/tw-blocks/providers/EscrowAmountProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryClientProvider>
          <TrustlessWorkProvider>
            <WalletProvider>
              <EscrowProvider>
                <EscrowDialogsProvider>
                  <EscrowAmountProvider>
                    {children}
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
