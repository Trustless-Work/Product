# Project Creator Flow

This flow describes what the Project Creator actually does inside our hackathon prototype using Trustless Work as the trust layer for tokenized private credit.

The entire process consists of **three dApps**:

* [**Backoffice** ](https://tokenization-backoffice.vercel.app/)→ create escrow, approve/release milestones
* [**Project Dashboard** ](https://tokenization-investor.vercel.app/)→ provide updates, create vault, open claims
* [**Investor Portal** ](https://tokenization-project-updates.vercel.app/)→ purchase token, redeem ROI

This page focuses only on the creator journey.

***

## **4.1 Responsibilities of the Project Creator**

The Project Creator is responsible for:

* Defining the real-world project being financed
* Deploying the **escrow contract**
* Tokenizing the escrow (deploying the participation token + token sale)
* Providing updates during execution
* Creating the vault and enabling investor claims

Trustless Work handles the escrow core: roles, milestone logic, transparency, indexing, and release signatures.

***

## **4.2 Step-by-Step Flow (Hackathon Version — Accurate)**

***

### **Step 1 — Deploy Escrow Contract (Backoffice)**

**This is always the first step.**

The creator uses the Trustless Work Backoffice to deploy the escrow.

**Actions:**

* Add project metadata
* Define milestone percentages
* Assign roles:
  * **Approver**
  * **Release Signer**
  * **Receiver** (project owner)
* Deploy escrow on Soroban

**Outcome:**\
A Soroban escrow contract is deployed and becomes the central trust layer for all funds.

**Output:**

* `escrow_id`
* Fully defined milestone and signature structure

***

### **Step 2 — Tokenize the Escrow (One Action, Two Contracts)**

**This single action:**

* Deploys the **Participation Token**
* Deploys the **Token Sale Contract**
* Links both back to the **escrow\_id**

#### **Actions:**

* Click “Tokenize Escrow”
* Choose token name / symbol
* Confirm deployment on wallet

#### **Output:**

* **Token Address (Participation Token)**\
  → used by investors as their claim representation
* **Token Sale Contract ID**\
  → used to configure the investor page
* **Trustline required** (investors must set it before receiving tokens)

#### **Outcome:**

The escrow is now “tokenized” and capable of receiving fundraising capital from investors.

***

### **Step 3 — Configure Investor Page (Manual Setup)**

The system does **not** auto-generate this page.

The creator (or platform) configures:

* Token price
* Sale parameters (cap, open/close time)
* Token Sale Contract ID
* Escrow ID
* Project details
* Media & description

This becomes the public-facing page the investors use to buy tokens.

***

### **Step 4 — Fundraising Goes Live (Investor Portal)**

Investors use the portal to:

* Connect wallet
* Set trustline for the token
* Choose USDC amount
* Call `buy()` on the Token Sale contract

**Token Sale Contract:**

* Receives USDC
* Mints Participation Tokens
* Sends tokens to investor
* Automatically deposits USDC into **the escrow contract**

**Outcome:**\
The escrow is now fully funded, transparent, and investor-visible.

***

### **Step 5 — Project Execution (Project Dashboard + Backoffice)**

#### **Where updates happen:**

* **Project Dashboard**

#### **Where signing happens:**

* **Backoffice**\
  → UI mutates based on the connected wallet\
  → Approvers see “Approve”\
  → Release signers see “Release”\
  → Managers see “Add update / evidence”

#### **Actions (Manager)**

* Add milestone progress
* Upload images, PDFs, receipts
* Mark milestone ready for review

#### **Actions (Approver & Release Signer)**

* Approver reviews evidence
* Signs milestone approval
* Release Signer signs the release
* Escrow releases USDC to the project owner

**Outcome:**\
Investors can track progress and releases via the viewer.

***

### **Step 6 — Create Vault (Project Dashboard)**

When the project reaches completion:

**Actions:**

* Open Project Dashboard
* Deploy Vault contract
* Link Participation Token
* Deposit ROI (principal + yield)
* Set `price_per_token`
* Enable “claim mode”

**Outcome:**\
Vault becomes the redemption pool for investors.

***

### **Step 7 — ROI Claims (Investor Portal)**

Once enabled:

* Investors connect wallet
* System reads PT balance
* Preview redemption amount
* User clicks “Claim”
* Vault burns PT → sends USDC
* Vault updates claim percentage

**Outcome:**\
Tokens are burned, investors receive ROI, and the project is closed.

