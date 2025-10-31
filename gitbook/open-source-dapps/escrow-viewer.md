# 👁️ Escrow Viewer

The **Escrow Viewer** is a decentralized, read-only application designed to make Trustless Work escrows fully transparent and easy to inspect—without needing to write code or parse raw blockchain data.

Every escrow deployed through Trustless Work is a standalone smart contract on the Stellar blockchain. While explorers like **Stellar Expert** show this data, it’s difficult to read because the escrow properties, roles, and milestones are encoded. The Escrow Viewer organizes this information into a clean, human-readable format.

***

#### What You Can Do

* **Search by Escrow ID** — Enter any contract ID to view live on-chain data.
* **Inspect Roles** — See which wallet addresses are assigned to each role (service provider, approver, release signer, receiver, platform address).
* **Track Milestones** — View progress for each milestone: pending, completed, approved, or released.
* **Check Fees and Balances** — See platform fees, escrow balances, and funding status.
* **Switch Networks** — Toggle between **Testnet** and **Mainnet** to explore different environments.

***

#### For Builders

Beyond transparency, the Escrow Viewer doubles as an **open-source template** that demonstrates how to:

* Query contract data directly from the **Stellar RPC**
* Parse escrow properties, roles, and milestones
* Display blockchain data in a clean UI

If you’re building dashboards, analytics tools, or verification interfaces, this repo is an excellent starting point.

***

#### Contribute or Fork

You can explore tasks, issues, or propose new features directly on GitHub:\
👉 [**github.com/Trustless-Work/escrow-viewer**](https://github.com/Trustless-Work/escrow-viewer)
