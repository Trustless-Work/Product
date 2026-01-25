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

Some blocks depend on shared modules (providers, helpers, query, etc).

Install the dependencies first.

{% hint style="warning" %}
If you skip dependencies, you’ll hit missing context errors at runtime.
{% endhint %}

### Dependency diagram

Use the interactive dependency diagram to confirm what a block needs.

{% embed url="https://blocks.trustlesswork.com/get-started/dependencies" %}

***

### Dependencies by block group

#### Listings (Escrows by Signer / Escrows by Role)

Applies to:

* Escrows by Signer: [Table](https://blocks.trustlesswork.com/blocks/escrows-escrows-by-signer-table), [Cards](https://blocks.trustlesswork.com/blocks/escrows-escrows-by-signer-cards)
* Escrows by Role: [Table](https://blocks.trustlesswork.com/blocks/escrows-escrows-by-role-table), [Cards](https://blocks.trustlesswork.com/blocks/escrows-escrows-by-role-cards)

Required modules:

* `wallet-kit`
* `providers`
* `handle-errors`
* `helpers`
* `tanstack`
* `escrows/single-release` or `escrows/multi-release` or `escrows/single-multi-release` (depends on which actions you want enabled)

{% hint style="info" %}
Include **all** providers for listings.

Listings open details dialogs and need the dialog + amount contexts.
{% endhint %}

{% code title="CLI (examples)" %}
```sh
# Core
npx trustless-work add wallet-kit
npx trustless-work add tanstack
npx trustless-work add providers

# Actions (pick what you need)
npx trustless-work add escrows/single-release
# npx trustless-work add escrows/multi-release
# npx trustless-work add escrows/single-multi-release

# Optional utility modules
npx trustless-work add handle-errors
npx trustless-work add helpers
```
{% endcode %}

#### Actions (single-release / multi-release)

All single-release and multi-release actions ([Initialize Escrow](https://blocks.trustlesswork.com/blocks/escrows-initialize-escrow), [Fund Escrow](https://blocks.trustlesswork.com/blocks/escrows-fund-escrow), [Change Milestone Status](https://blocks.trustlesswork.com/blocks/escrows-change-milestone-status), [Approve Milestone](https://blocks.trustlesswork.com/blocks/escrows-approve-milestone), [Release](https://blocks.trustlesswork.com/blocks/escrows-release-escrow), [Dispute](https://blocks.trustlesswork.com/blocks/escrows-dispute-escrow), [Resolve](https://blocks.trustlesswork.com/blocks/escrows-resolve-dispute), [Update Escrow](https://blocks.trustlesswork.com/blocks/escrows-update-escrow)) require:

* `wallet-kit`
* `providers`
* `handle-errors`
* `tanstack`
* `helpers`

{% code title="CLI (minimum for actions)" %}
```sh
npx trustless-work add wallet-kit
npx trustless-work add tanstack
npx trustless-work add providers

npx trustless-work add handle-errors
npx trustless-work add helpers
```
{% endcode %}

***

### Provider wrapping (order matters)

Wrap your app with these providers, in this exact order.

Include `EscrowDialogsProvider` and `EscrowAmountProvider` when you use dialogs or amount context.

{% hint style="danger" %}
Do not reorder providers.

Most “hooks not working” issues come from provider order.
{% endhint %}

{% code title="app/layout.tsx" overflow="wrap" %}
```tsx
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
{% endcode %}
