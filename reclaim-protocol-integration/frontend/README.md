# Reclaim Protocol Starter Pack - Stellar

This repository provides a **React-based frontend example** for developers to interact with the Reclaim Protocol smart contract on the **Stellar** network. This template demonstrates how to submit and verify proofs on-chain, making it easier for developers to integrate Reclaim Protocol into their applications.

---

## Features

- **Proof Submission**: Generate proof requests and submit them on-chain.
- **Proof Verification**: Verify submitted proofs directly through the smart contract.
- **Wallet Connection**: Built-in wallet connection with Starknet support.

---

## Getting Started

Follow these steps to set up the project locally.

### 1. Clone the Repository

Run this command:
```bash
git clone https://gitlab.reclaimprotocol.org/starterpacks/reclaim-stellar-example.git
cd reclaim-stellar-example
```
### 2. Install Dependencies

Run this command:
```bash
npm install
```
### 3. Update environement variables

Copy `.env-example` to `.env` file and replace variables

```bash
APP_ID = "YOUR_APP_ID"; // Replace with your application ID
providerId = "YOUR_PROVIDER_ID"; // Replace with your provider ID
APP_SECRET = "YOUR_APP_SECRET"; // Replace with your app secret
REACT_APP_CONTRACT_ADDRESS = "your-contract-address"
```


### 4. Change the Network
This demo is using Testnet by default if you want to change the Network you can change in the file `src/utils/network.js`
```javascript
export const TESTNET_DETAILS = { // Replace this with the Mainnet config
  network: "TESTNET",
  networkUrl: "https://horizon-testnet.stellar.org",
  networkPassphrase: "Test SDF Network ; September 2015",
};
```

---

## Usage

After configuration, you can run the project locally to test the proof verification process.

### Start the Application

Run this command:
```bash
npm run start
```
1. **Connect Wallet**: Ensure your wallet is connected and set to the correct network.
2. **Request Proof**: Click the "Create Claim QR Code" button to generate a QR code for proof submission.
3. **Verify Proof**: Once the proof is received, a "Verify Proof" button appears. Click it to submit a transaction for on-chain verification.
4. **View Transaction**: After verification, a link to view the transaction on the explorer will be available.

---

## Code Overview

`src/App.js`

- Proof Request: Configures and initiates proof requests through Reclaim’s SDK.
- QR Code Generation: Displays a QR code for users to scan and submit proofs.
- Proof Submission: Handles on-chain submission upon proof verification.

`src/verify-proof.jsx`

- Proof Transformation: Transforms the received proof to be compatible with the smart contract.
- Verification Process: Sends a transaction to verify the proof on-chain and provides a link to the transaction on the explorer.

---

## Troubleshooting

- **Wallet Connection Issues**: Ensure that your wallet is set to the correct network that you contract is deployed on and refresh the page if the connection fails.
- **Proof Submission Fails**: Double-check your Reclaim credentials, contract address, and that the correct network is selected.