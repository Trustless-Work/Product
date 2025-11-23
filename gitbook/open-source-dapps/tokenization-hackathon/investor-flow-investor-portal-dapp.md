# Investor Flow (Investor Portal dApp)

Investors are the source of capital in the tokenized private credit lifecycle.\
Their experience must be **simple, transparent, and trustworthy**, even though the underlying mechanics involve multiple smart contracts.

In this hackathon project, investors interact only through the **Investor Portal**, where they can:

* View the project
* Connect their wallet
* Buy participation tokens
* Monitor escrow and milestone progress
* Claim their ROI once the project completes

Trustless Work provides the escrow infrastructure and transparency layer that assures investors their capital is being used according to the promised milestones.

***

## **6.1 Responsibilities of the Investor**

An Investor is responsible for:

* Adding the trustline to the participation token
* Purchasing tokens through the token sale
* Tracking project updates
* Claiming their payout at the end of the cycle

They do **not** need to understand smart contracts — all functions are abstracted into a clean UI.

***

## **6.2 Where the Investor Works**

Investors use only one interface:

#### **📱 Investor Portal**

This portal allows investors to:

* View project details
* Inspect escrow progress (via embedded escrow viewer)
* Participate in the token sale (funding phase)
* Claim USDC during the ROI phase

The portal is lightweight and fully powered by Trustless Work APIs and the newly added tokenization contracts.

***

## **6.3 Step-by-Step Investor Flow**

***

### **Step 1 — Open Project Public Page**

The project public page displays:

* Project name & description
* Industry (e.g., luxury cars, art gallery, hotel, etc.)
* Token sale price (USDC per token)
* Hard cap & progress bar
* Timeline preview (milestones)
* Escrow viewer for transparency

This gives investors the right level of context before committing funds.

***

### **Step 2 — Connect Wallet**

The investor connects via:

* Freighter
* Albedo
* Lobstr Vault (if supported)
* Any wallet integrated via Stellar Wallet Connect

The portal recognizes:

* Wallet address
* Token trustlines
* Existing PT balance
* Claim eligibility (later)

***

### **Step 3 — Set Trustline to the Participation Token**

Participation Tokens (PT) require trustlines on Stellar.

Upon first visit after token deployment:

* The portal detects if the trustline is missing
* Displays a **Trustline Required** modal
* Investor approves the trustline in their wallet

**Outcome:**\
Investor wallet is now eligible to receive PT.

***

### **Step 4 — Buy Participation Tokens**

Investor selects an amount of USDC to invest.

#### **Actions:**

* Input USDC amount (e.g., 1,500 USDC)
* Review purchase summary
* Click **Buy Token**

#### **Token Sale Contract Process (under the hood):**

1. Receives investor’s USDC
2. Mints PT to the investor wallet
3. Automatically deposits USDC into the **Escrow Contract**

**Outcome:**\
The investor holds PT tokens representing their share of the round.

***

### **Step 5 — Monitor Escrow Progress**

Investors can check real-time progress as the project evolves.

Portal displays:

* Milestone list
* Evidence uploads (photos, receipts, PDFs)
* Approval and release signatures
* Escrow balance
* Total releases made

This is where Trustless Work shines:\
Investors finally get full visibility into the use of funds.

***

### **Step 6 — Wait for Project Completion**

Investors simply monitor:

* Milestones = completed
* Escrow = fully released
* Project = ready for ROI

When the project creator creates and funds the vault, the system notifies the investor that **redemption is now open**.

***

### **Step 7 — Claim ROI from Vault**

Once the Vault is open:

**Investor Actions:**

* Connect wallet
* Portal reads PT balance
* Shows “Your Claimable USDC”
* Investor clicks **Claim**
* Vault burns PT
* Vault pays USDC to investor

#### Formula:

```
payout = token_balance × price_per_token
```

**Outcome:**\
Investor receives principal + yield.\
Tokens are burned, ending their participation.

## **6.5 Why This Matters**

The Investor Flow demonstrates how Trustless Work enables:

* **True transparency** on how funds are used
* **Milestone-based capital protection**
* **Clear lines of responsibility between roles**
* **Simple redemption without intermediaries**
* **A trust experience that traditional private credit lacks**

This is how tokenized private credit becomes accessible and trustworthy.

