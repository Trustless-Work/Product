# Lifecycle Overview

Trustless Work enables a complete lifecycle for tokenized private credit without intermediaries.\
Funds are raised, held, released, and redeemed through a sequence of **transparent, auditable, on-chain stages**.

The entire lifecycle consists of:

1. **Token Sale → Fundraising**
2. **Escrow Funding → Capital enters milestone-controlled escrow**
3. **Project Execution → Milestones & releases via Trustless Work**
4. **ROI Deposit → Vault setup for investor payout**
5. **Investor Claims → Token burn + payout**

The diagram below illustrates this end-to-end flow.

***

## **3.1 Full Lifecycle Diagram (Text Version)**

#### **High-Level Flow**

```
┌────────────────────────────────────┐
│            TOKEN SALE              │
│  Investors swap USDC for PT token  │
└───────────────┬────────────────────┘
                │ USDC
                ▼
        ┌──────────────────┐
        │     ESCROW        │
        │ TW milestone-based│
        │ fund release       │
        └───────┬───────────┘
                │ releases
                ▼
        ┌──────────────────┐
        │ PROJECT EXECUTION│
        │ Milestones +      │
        │ Evidence + Roles  │
        └───────┬───────────┘
                │ After completion
                ▼
        ┌──────────────────┐
        │      VAULT        │
        │ ROI deposit +      │
        │ Set price/token    │
        └───────┬───────────┘
                │ claims
                ▼
        ┌──────────────────┐
        │   INVESTOR CLAIM │
        │ Burn PT → Get USDC│
        └──────────────────┘
```

#### **Roles & Actors Layer (Overlay)**

```
Investor  → buys token → claims ROI
Project Creator → deploys escrow, token, sale
Project Manager → updates milestones, submits evidence
Approver/Signer → unlocks milestone releases
Vault Operator → deposits ROI + opens claim
```

***

## **3.2 Phase Breakdown**

Below is the full lifecycle broken into the **three functional phases** you requested: Funding, Execution, Redemption.

Each phase includes:

* Key actors
* Jobs to be done
* System interactions
* Suggested UI screens (for your hackathon dApps)

***

### **PHASE 1 — FUNDING**

**(Token Sale → Escrow Deposit)**

#### **Objective:**

Raise capital and ensure all investor funds flow _directly_ into a milestone-controlled escrow for transparency.

***

#### **Key Actors**

* **Investor**
* **Token Sale Contract**
* **Escrow Contract (Trustless Work)**
* **Backoffice / Creator dApp**

***

#### **Jobs-To-Be-Done**

**Investor**

* Connect wallet
* Select amount of USDC to invest
* Swap USDC → Participation Token (PT)
* View transaction status + purchased tokens
* See escrow information and trust signals

**Token Sale Contract**

* Accept USDC
* Mint/send participation tokens
* Deposit received USDC into the **escrow contract**

**Escrow Contract (Trustless Work)**

* Lock funds
* Track deposits
* Provide transparency (viewer, API, indexer)

**Project Creator**

* Deploy escrow using Trustless Work Backoffice
* Configure milestones and roles
* Deploy participation token via Token Factory
* Configure Token Sale contract (price, cap, end date)

***

#### **System Flow**

```
Investor → TokenSale.buy() 
    → USDC sent to TokenSale 
        → TokenSale deposits USDC into ESCROW 
            → TokenFactory mints PT → sends PT to investor
```

***

### **PHASE 2 — EXECUTION**

**(Milestones → Releases)**

#### **Objective:**

Allow the real-world project to progress while maintaining investor trust through full transparency and role-controlled fund release.

***

#### **Key Actors**

* **Project Manager**
* **Approver**
* **Release Signer**
* **Escrow Contract**
* **Project Dashboard dApp**

***

#### **Jobs-To-Be-Done**

**Project Manager**

* Upload milestone evidence (images, invoices, documents)
* Mark milestones as completed
* Add commentary, updates, progress reports

**Approver**

* Review milestone evidence
* Validate milestone completion
* Approve progression

**Release Signer**

* Execute signature on release transaction
* Trigger USDC payout to project owner

**Escrow Contract**

* Release milestone amounts only with correct role signatures
* Record all state transitions on-chain
* Feed indexer → viewer → investor portal

***

#### **System Flow**

```
Manager updates milestone → Approver signs → ReleaseSigner signs
    → Escrow releases USDC (partial) → Project Owner receives funds
```

***

### **PHASE 3 — REDEMPTION**

**(Vault → Investor Claims)**

#### **Objective:**

Once the project finishes and generates revenue, distribute returns to token holders proportionally and transparently.

***

#### **Key Actors**

* **Project Creator / Vault Operator**
* **Vault Contract**
* **Investor**
* **Investor Portal (Claim UI)**

***

#### **Jobs-To-Be-Done**

**Vault Operator**

* Deploy Vault contract (links participation token + escrow ID)
* Deposit ROI USDC (principal + interest)
* Set final **price\_per\_token**
* Enable claim mode (“open for claims”)

**Investor**

* Connect wallet
* View PT balance
* Preview payout (balance × price\_per\_token)
* Claim USDC
* Burn PT during redemption

**Vault Contract**

* Hold ROI pool safely
* Burn PT when claimed
* Transfer USDC to investor
* Track claim status + remaining balance

***
