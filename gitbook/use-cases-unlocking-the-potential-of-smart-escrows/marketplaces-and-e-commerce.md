---
icon: cart-arrow-up
---

# Marketplaces & E-commerce

Trust is the foundation of every marketplace transaction—but building that trust usually means building complex infrastructure. Traditional platforms like eBay, Etsy, and Amazon use internal escrow mechanisms to ensure that sellers are paid **only** after buyers are satisfied. Most startups and emerging platforms can’t afford to build this kind of system.

**Trustless Work** makes it easy for any marketplace or e-commerce platform to integrate neutral, transparent escrow flows using stablecoins—without needing to manage custody, compliance, or custom infrastructure.

With just a few API calls, funds can be held securely until the product is shipped, received, or approved—ensuring fairness for both buyers and sellers.

***

<figure><img src="../.gitbook/assets/image (25).png" alt=""><figcaption></figcaption></figure>

### Core Use Cases

#### 1. Product Delivery Assurance

Hold payment in escrow when an order is placed. Release it only after the buyer confirms receipt, or automatically after a timeout.

#### 2. Dropshipping & Cross-Border Sales

Funds stay in escrow until the seller provides valid shipping proof (e.g. tracking number). Great for low-trust environments and international trade.

#### 3. Digital Goods & Downloads

For assets like templates, code snippets, plugins, or in-game items. Funds are released after the buyer confirms access or download is complete.

#### 4. Second-Hand & P2P Goods

Buyers escrow payment when purchasing from another user. Once the item is received or confirmed, funds are released to the seller.

***

### Escrow Flow for Marketplaces

<figure><img src="../.gitbook/assets/image (26).png" alt=""><figcaption></figcaption></figure>

1. **Initiation Phase**\
   The buyer places an order. A new escrow contract is created, defining the roles:
   * **Buyer** funds the escrow
   * **Seller** delivers the item
   * **Buyer** or **Platform** signs for release
2. **Funding Phase**\
   The buyer deposits stablecoins (e.g. USDC, EURC) into the escrow.
3. **Milestone Status Update Phase**\
   The seller marks the item as shipped or provides tracking information.
4. **Approval Phase**\
   The buyer confirms delivery or the system auto-approves after a timeout. If approved, funds move to release.
5. **Release Phase**\
   The escrow releases the funds to the seller. Optionally, a platform fee is deducted.
6. **Receiver** - Receives the funds from Escrow
7. **Dispute Resolution (optional)**\
   If the buyer disputes the delivery, a platform moderator or external resolver can step in, depending on the escrow configuration.

***

### Benefits for Marketplaces

* **Fast Integration** – Plug-and-play escrow API and UI templates
* **Global Payments** – Accept and settle in stablecoins (e.g. USDC) across borders
* **Reduce Fraud & Chargebacks** – Escrow eliminates the need for trust in the transaction
* **Neutrality by Design** – Funds are not held by the platform, but by a smart contract
* **Custom Logic** – Choose who approves release: buyer, platform, or auto-timer

***

### Who Should Use This

* Web3 marketplaces (NFTs, gaming items, digital goods)
* Niche e-commerce platforms with physical or digital products
* Second-hand or peer-to-peer selling apps
* Dropshipping or global e-commerce platforms
* No-code marketplaces using stablecoins
