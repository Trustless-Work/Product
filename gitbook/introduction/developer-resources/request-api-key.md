---
description: Request an API Key to interact with all the endpoints.
icon: key
---

# Request API Key

To interact with the Trustless Work API, you’ll need to generate an API Key.\
This key authenticates your requests and links them to your verified wallet identity.\
\
**Overview:**\
API keys are managed directly in the **Trustless Work BackOffice dApp**.\
They are required **only** if you plan to interact **programmatically** with the API —\
you don’t need one for using the dApp interface itself.

{% embed url="https://dapp.trustlesswork.com" %}

***

#### Step 1 — Connect Your Stellar Wallet

To begin, connect a **Stellar-compatible wallet** (such as **Freighter**, **Albedo**, or **xBull**) to the dApp.\
You’ll be prompted to **sign a message** — this confirms ownership of your wallet and automatically creates your **user profile**.

If you’ve never used a Stellar wallet before, check out the Stellar Wallets section for setup instructions.

{% content-ref url="../stellar-and-soroban-the-backbone-of-trustless-work/stellar-wallets/" %}
[stellar-wallets](../stellar-and-soroban-the-backbone-of-trustless-work/stellar-wallets/)
{% endcontent-ref %}

***

#### Step 2 — Complete Your Profile

Once logged in:

1. Click your **wallet address** at the bottom-left corner.
2. Select **Settings** from the menu.
3. Fill out your profile with basic details — **name, email, and use case**.
   * The **Use Case** field is required before you can generate an API key.
   * This helps us understand your integration goals and provide better support.

> 💡 Tip: You can always update your profile later to reflect new projects or integrations.

***

#### Step 3 — Request an API Key

In the **Settings sidebar**, navigate to the **API Keys** tab:

1. **Choose a Network:**
   * `Testnet` — For development and testing
   * `Mainnet` — For production (available post-audit)
2. Click **Request API Key** to generate a new key.
3. **Copy it immediately** — once you close the dialog, it **cannot be viewed again** for security reasons.\
   You’ll need to generate a new one if lost.

> ⚠️ You must confirm that you’ve copied the key before exiting the dialog.

{% hint style="warning" %}
You must have at least the **use case** filled, if not, the system won't give you the API Key.
{% endhint %}

***

#### 🧠 Summary

| Action           | Description                                      |
| ---------------- | ------------------------------------------------ |
| Connect Wallet   | Log in and sign to create your profile.          |
| Complete Profile | Fill in personal info and use case (required).   |
| Request Key      | Generate a key from the API Keys tab.            |
| Save Securely    | Copy and store it safely — it’s shown only once. |

***

#### ✅ Ready to Build

Once you have your API key, you can start interacting with the Trustless Work API to:

* Deploy and fund escrows
* Mark milestones as complete
* Approve, dispute, or release payments
* Query escrow status and balances

Explore the [API Reference](/broken/pages/ZzuxcJ2Y0YqqSIjhhxFP) section to see available endpoints.
