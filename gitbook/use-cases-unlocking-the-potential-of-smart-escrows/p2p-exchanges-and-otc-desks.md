---
icon: chart-mixed-up-circle-dollar
---

# P2P Exchanges and OTC Desks

Peer-to-peer (P2P) exchanges and Over-the-Counter (OTC) desks play a critical role in crypto trading—especially for trades that happen across different chains or involve fiat off-ramps. Yet these transactions often rely on trust between strangers, screenshots, and shaky coordination.

At **Trustless Work**, we bring **neutral, programmable escrows** to this space—offering a secure, blockchain-based middle layer that holds funds until both parties are satisfied. Whether you're facilitating a P2P swap or operating an OTC desk, our infrastructure helps reduce risk, enable automation, and build trust between counterparties.

***

### The Problem

In a typical P2P or OTC trade, two users agree on a deal—for example:

* Alice wants to **buy BTC** with $1000 USDC.
* Or Alice wants to **buy USDC** with $1000 in fiat (via bank transfer).

In all these cases, **someone has to go first**—and that introduces risk.

* If Alice sends $1000 fiat first, Bob might not send the USDC.
* If Bob sends USDC first, Alice might not pay.
* If the BTC transfer happens first, there’s no guarantee Alice will release funds.

Without a neutral middle layer, users often rely on screenshots, trust, and hope.

<figure><img src="../.gitbook/assets/image (22).png" alt=""><figcaption></figcaption></figure>

***

### The Trustless Work Solution

Trustless Work provides **Smart Escrows**—programmable contracts that hold funds (e.g., stablecoins) on-chain, with predefined conditions for releasing them.

In the P2P trade flow:

* Alice deposits her USDC into an escrow.
* Bob sends the BTC to Alice’s wallet.
* Once Alice confirms receipt, the escrow releases the USDC to Bob.

Our escrow configuration defines **who can act at each step**—from marking the BTC as sent, to signing off the release of funds.

***

### Escrow Lifecycle in a P2P Trade

Here’s how we map the transaction flow to roles in Trustless Work, you can learn more about roles [here](../smart-escrow-design/roles-in-trustless-work.md):

<figure><img src="../.gitbook/assets/image (24).png" alt=""><figcaption></figcaption></figure>

| **Phase**                | **Escrow Role (Trustless Work)**      | **Entity**                                                  |
| ------------------------ | ------------------------------------- | ----------------------------------------------------------- |
| 1 - **Initiation**       | Platform                              | P2P exchange or OTC desk (defines roles, fees, metadata)    |
| 2 - **Funding**          | Funder                                | Alice (Buyer)                                               |
| 3 - **Milestone Update** | Milestone Marker (_Service Provider_) | Bob (Seller) – marks BTC as sent                            |
| 4- **Approval**          | Milestone Approver                    | Alice – confirms BTC received                               |
| 5 - **Release**          | Release Signer                        | Alice – or dual signers (e.g., Alice + lawyer, or platform) |
| 6 - **Receiver**         | Receiver                              | Bob – receives USDC from escrow                             |
| **Dispute** (Optional)   | Dispute Resolver                      | Platform or OTC desk                                        |

***

### Release Signer Flexibility

Our escrow system allows for different release models:

1. **Buyer-Driven Release**: Default setup—Alice signs off once she receives the BTC.
2. **Platform-Driven Release**: The platform (e.g., OTC desk) signs the release when off-chain proof is provided.
3. **Multi-Signature Release**: 2-of-2 setup where both Alice and her lawyer (or Bob's agent) must sign for funds to be released. This enables compliant, high-trust configurations.

***

### OTC Desks: Acting as Middlemen

OTC desks can also use Trustless Work as a programmable middle layer:

* They can configure escrows on behalf of clients.
* Serve as the **Release Signer** or **Dispute Resolver**.
* Maintain transparency and auditability over large transactions.

Whether the OTC desk holds the crypto itself or just coordinates the trade, Trustless Work adds a **neutral, verifiable layer of control**.

***

### Built for Cross-Chain and Off-Chain Settlements

Even if BTC is sent on-chain or fiat is transferred via bank wire, Trustless Work can hold the **stablecoin leg** in escrow until off-chain confirmation is complete. We bridge the trust gap between blockchains and banking systems, without needing custody or intermediaries.

***

### Now on Testnet – Launching May 2025

We’re currently live on **testnet**, with a full **mainnet launch planned for May 2025**. This is the perfect time to explore integration, test your escrow flows, or become one of our early partners shaping the future of secure payments in P2P and OTC trading.

***

### Conclusion

Trustless Work brings the power of programmable smart escrows to P2P trades and OTC transactions. By abstracting the complexity of smart contracts and allowing platforms to define their own roles and flows, we enable a new layer of secure, transparent global commerce—whether you're trading across chains, across borders, or across platforms.

**Try it. Integrate it. Build on it.**
