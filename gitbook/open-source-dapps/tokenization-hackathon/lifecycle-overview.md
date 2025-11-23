# Lifecycle Overview

The tokenized private credit flow built on top of Trustless Work consists of **six sequential stages**, each representing a clear handoff of responsibility and capital state.

The entire lifecycle consists of:

1. **Project Configuration -> Contracts deployment**
2. **Token Sale → Fundraising**
3. **Escrow Funding → Capital enters milestone-controlled escrow**
4. **Project Execution → Milestones & releases via Trustless Work**
5. **ROI Deposit → Vault setup for investor payout**
6. **Investor Claims → Token burn + payout**

The diagram below illustrates this end-to-end flow.

***

***

### **1. Project Configuration → Contract Deployment**

**Objective:**\
The project creator sets up the full structure of the investment round.

**Key Actions:**

* Configure the project in the **Backoffice**
* Deploy:
  * **Escrow Contract** (milestones + roles)
  * **Participation Token** (via Token Factory)
  * **Token Sale Contract** (price, cap, deadlines)

***

### **2. Token Sale → Fundraising**

**Objective:**\
Investors swap USDC for participation tokens representing their share of the investment.

**Key Actions:**

* Investor uses the **Investor Portal**
* Calls `buy()` on the **Token Sale Contract**
* Token Sale Contract:
  * Receives USDC
  * Mints Participation Tokens (PT)
  * Sends PT to investor

**Outcome:**\
Investors hold PT, and the Token Sale Contract holds all contributed USDC.

***

### **3. Escrow Funding → Capital Enters Controlled Escrow**

**Objective:**\
Swap proceeds are automatically deposited into a milestone-based escrow for transparency and control.

**Key Actions:**

* Token Sale Contract deposits accumulated USDC into the **Escrow Contract**
* Trustless Work:
  * Locks funds
  * Records deposits
  * Exposes full transparency through the **Escrow Viewer** and API

**Outcome:**\
Capital is secured in a programmable, auditable escrow governed by milestones.

***

### **4. Project Execution → Milestones & Releases**

**Objective:**\
Real-world work progresses while fund releases remain tied to on-chain verifications.

**Key Actions:**

* Project Manager updates milestones (evidence, status)
* Approver signs milestone verification
* Release Signer executes release
* Escrow releases milestone amounts to the Project Owner

**Outcome:**\
Funds are released progressively as the project advances, with full transparency for investors.

***

### **5. ROI Deposit → Vault Setup**

**Objective:**\
When the project completes, the project creator deposits principal + yield into a redemption vault.

**Key Actions:**

* Deploy **Vault Contract**
* Deposit USDC (ROI pool)
* Set `price_per_token`
* Open the Vault for claims

**Outcome:**\
A fixed redemption rate is defined and the ROI pool becomes claimable.

***

### **6. Investor Claims → Token Burn + Payout**

**Objective:**\
Investors redeem their participation tokens for USDC.

**Key Actions:**

* Investor connects wallet to **Claim Portal**
* Calls `claim()`
* Vault Contract:
  * Burns PT
  * Sends `balance × price_per_token` in USDC
  * Tracks redemption progress

**Outcome:**\
Tokens are burned, investors receive payouts, and the vault settles until empty.
