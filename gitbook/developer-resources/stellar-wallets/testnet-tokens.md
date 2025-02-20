# How to Get Testnet Tokens

Testnet tokens are a great way to experiment with Stellar wallets and blockchain operations without risking real assets. This guide explains how to obtain testnet tokens, their purpose, and how to use them effectively.

***

## **What Are Testnet Tokens?**

Testnet tokens are virtual assets used on Stellar's test network (testnet) to:

* Test wallet setups.
* Experiment with sending and receiving payments.
* Learn Stellar operations like creating trustlines or setting up smart contracts.

### **Why Use Testnet Tokens?**

* **Risk-Free Learning:** No monetary value; perfect for practice.
* **Development Testing:** Test your applications or smart contracts before deploying on the mainnet.
* **Community Access:** Many developers and testers rely on the testnet for Stellar experiments.

***

## **How to Obtain XLM Testnet Tokens**

### **Option 1: Use the Stellar Lab Faucet**

1. Go to the **Stellar Laboratory**:\
   [Stellar Laboratory](https://lab.stellar.org/account/fund?$=network$id=testnet\&label=Testnet\&horizonUrl=https:////horizon-testnet.stellar.org\&rpcUrl=https:////soroban-testnet.stellar.org\&passphrase=Test%20SDF%20Network%20/;%20September%202015;;)
2. Paste your **Public Key** into the faucet's input field.
3. Click **"Request Lumens"**:
   * You’ll receive a transaction confirmation.
   * Check your wallet to confirm receipt of 10,000 XLM test tokens.

***

### **Option 2: Use Stellar Command-Line Interface (CLI)**

1. Install the Stellar CLI:
   * Install the `stellar-core` or `stellar-horizon` command-line tool (refer to Stellar documentation).
2. Request Tokens:
   *   Run the following command:

       ```bash
       stellar-cli request-tokens --network testnet --public-key <Your Public Key>
       ```
   * Replace `<Your Public Key>` with your Stellar wallet address.
3. Verify Balance:
   * Use the CLI or a Stellar wallet to check your testnet account balance.

***

### **How to Get Testnet USDC**

1. **Set the Trustline:** Ensure you've established a trustline for USDC on your Stellar testnet account. \
   Issuer: GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5
2. **Visit the Circle USDC Faucet:**
   * Go to [Circle USDC Faucet](https://faucet.circle.com/).
3. **Select Stellar and Request USDC:**
   * Use the dropdown menu to select "Stellar".
   * Paste your Stellar testnet address.
   * Click on "Get Tokens" to receive testnet USDC.

***

## **How to Use Testnet Tokens**

### **1. Explore Wallet Operations**

* Send tokens between test accounts.
* Experiment with memo fields, transaction fees, and multi-signature setups.

### **2. Learn Key Stellar Concepts**

* **Trustlines:** Use testnet tokens to create trustlines for custom assets.
* **Asset Issuance:** Test issuing and trading custom assets.
* **Smart Contracts:** Experiment with Stellar's **pre-signed transactions** to simulate smart contracts.

### **3. Connect to Applications**

* Use your testnet wallet with Stellar-based dApps like **Trustless Work** to test integrations.

***

## **Switching Your Wallet to Testnet**

Most Stellar wallets allow you to switch between the mainnet and testnet. Here's how:

### **General Steps:**

1. Open your wallet settings.
2. Look for the **"Network"** option.
3. Switch from **Mainnet** to **Testnet**.
4. Save your settings and restart the wallet if required.

### **Examples for Popular Wallets:**

* **Freighter Wallet:**
  * Click on **Settings** > **Network** > **Testnet**.
* **Rabet Wallet:**
  * Select **"Network"** in the main menu and toggle to **Testnet**.
* **Albedo Wallet:**
  * Adjust the network via the settings or during the transaction prompt.

***

## **Important Notes**

1. **Testnet Tokens Have No Value:**
   * These tokens are strictly for testing and cannot be transferred to the mainnet.
2. **Testnet Environment Resets:**
   * The Stellar testnet resets periodically, clearing all test accounts and balances.
   * Always re-create your accounts and re-fund them when the testnet resets.
3. **Avoid Sharing Secret Keys:**
   * Even in a test environment, keep your **Secret Key** secure to mimic best practices for the mainnet.

***

## **Troubleshooting & FAQs**

### **I didn’t receive test tokens. What should I do?**

* Ensure you’ve used the correct **Public Key**.
* Try another method (e.g., Stellar Faucet vs. Laboratory).
* Wait for a few minutes as the testnet might experience delays.

### **Why can’t I switch my wallet to Testnet?**

* Make sure your wallet supports Stellar’s testnet.
* Check for updates or consider using a wallet that supports testnet, like Freighter or Rabet.

### **What happens if I lose my Secret Key?**

* Without the Secret Key, you cannot access your testnet account. Treat it as you would a real wallet key.

***

## **Additional Resources**

* [Stellar Testnet Status](https://status.stellar.org/)
* [Stellar Laboratory](https://laboratory.stellar.org/)
* [Stellar Developer Documentation](https://developers.stellar.org/)
* [Stellar Discord Community](https://discord.com/invite/stellar)

***

By following this guide, you can confidently explore Stellar’s testnet and test a variety of operations risk-free.
