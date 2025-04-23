# Multi-Chain Escrow Funding PoC with Allbridge Integration

**Version:** 0.1.0 (Proof of Concept)  
**Date:** 2025-04-23

## Overview

This project is a Proof of Concept (PoC) demonstrating the integration of the [Allbridge](https://allbridge.io/) protocol to enable users to fund Trustless Work escrows using USDC from various blockchain networks. The goal is to provide a seamless cross-chain funding experience, specifically bridging USDC from chains like Solana directly to a Stellar-based escrow contract. This aligns with the objective of making Trustless Work multi-chain ready.

---

## Problem Statement

Currently, funding Trustless Work escrows might be limited to specific assets on the Stellar network. This can create friction for users who primarily hold USDC or other stablecoins on different blockchains. They would typically need to go through a manual and potentially complex process of finding a bridge, transferring their USDC to Stellar, and then funding the escrow.

---

## Solution: Allbridge Integration PoC

This PoC aims to simplify this process by integrating the Allbridge SDK into the Trustless Work Dapp's funding flow. This integration will allow users to directly bridge USDC from a supported source chain (e.g., Solana) to the Stellar address of the escrow contract.

---

## 🌉 Allbridge Integration Flow Diagram

The following diagram illustrates how Allbridge facilitates the cross-chain funding of the Stellar escrow contract:

```plaintext
+--------------------+       +------------------------+       +-----------------------+       +-----------------------+
|    User Wallet     |       |   Trustless Work Dapp  |       |     Allbridge UI     |       |   Stellar Escrow     |
|  (e.g., Solana)    | ----> |   (PoC Integration)    | ----> |       SDK Flow       | ----> |  Contract (USDC)     |
+--------------------+       +------------------------+       +-----------------------+       +-----------------------+
         |                              |                              |                                |
         |  Select "Fund from another   |  Initialize Allbridge SDK    |  Show source chains, token     |  Receive USDC on Stellar
         |        chain" option         |  with preset params          |  (USDC), destination: Stellar  |  and credit escrow balance
         |                              |  (destination address =      |  Execute bridging flow         |
         |                              |   escrow contract address)   |                                |
         +------------------------------+------------------------------+--------------------------------+
```

---

## 🔧 Code Integration Example

You can pass the escrow contract address (`destination`) and amount to bridge (`amount`) as props to the `AllbridgeClient` component like this:

### `App.js`

```jsx
import React from "react";
import "./App.css";
import AllbridgeClient from "./pages/AllBridgeClient";

const destination = "GDW2WOVG6JQLYD46HQWAGUDYFPWKCUNOCCMMZEUUEVNSGI4ODA3H3NXH";
const amount = "100";

function App() {
  return (
    <div className="App">
      <AllbridgeClient destination={destination} amount={amount} />
    </div>
  );
}

export default App;
```

### `AllBridgeClient.jsx` (simplified example)

```jsx
import React, { useEffect } from "react";

const AllbridgeClient = ({ destination, amount }) => {
  useEffect(() => {
    console.log("Initialize Allbridge with:");
    console.log("Destination:", destination);
    console.log("Amount:", amount);

    // Here you'd initialize the Allbridge SDK and pass the props accordingly.
  }, [destination, amount]);

  return (
    <div>
      <h3>Allbridge Integration</h3>
      <p>Destination: {destination}</p>
      <p>Amount: {amount}</p>
      {/* SDK UI Widget would be rendered here */}
    </div>
  );
};

export default AllbridgeClient;
```

---

## 🧠 Code-Level Integration Flow Diagram

```plaintext
+------------+     Props     +----------------------+     Uses Props     +-----------------------------+
|  App.js    | ------------> |  AllbridgeClient.jsx | -----------------> |  Allbridge SDK Init Logic   |
| (Injects   |               |   (UI Wrapper)       |                    |  (destination, amount, etc) |
| destination, amount)      |                      |                    |                             |
+------------+               +----------------------+                    +-----------------------------+
```

---

This expanded PoC documentation provides developers with a clear understanding of both the **UX flow** and the **technical flow**, along with the integration code they can plug into a React project. Let me know if you'd like an actual image (PNG/SVG) of the diagrams or markdown optimization for GitHub `README.md`.
