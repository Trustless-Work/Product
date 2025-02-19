# Funding Phase

<figure><img src="../../../.gitbook/assets/image (3) (1).png" alt=""><figcaption></figcaption></figure>

The Funding Phase is where funds are deposited into the escrow smart contract, signaling the formal commitment of all parties to the transaction. This phase ensures the financial security of the agreement, builds trust among participants, and sets the stage for the remaining phases.

***

#### **Key Actions**

**1. Depositing Funds**

* Anyone with a Stellar wallet and funds in the configured currency can deposit to the escrow smart contract.
* The escrow contract address is the **Escrow ID (Contract ID)** generated during the Initiation Phase.

**2. Escrow Contract Updates**

* Upon deposit, the escrow contract:
  * Updates the balance to reflect the deposited amount.
  * Emits a blockchain **Deposit Event**, notifying all participants of the successful funding.

**3. Verification by Participants**

* All participants, including the **Milestone Marker**, **Release Signer**, and **Platform Address**, can independently verify the transaction using:
  * The transaction ID (e.g., `tx123abc`) on the Stellar network and Stellar block explorer.
  * The **Escrow Viewer** provided by Trustless Work.
  * A direct request to the **Trustless Work API** using the Escrow ID.

***

#### **Key Notes**

* **Blockchain Transparency:** All participants can independently verify the funding status using the transaction ID on-chain.
* **Stellar Integration Flexibility:** Any Stellar Anchor (on/off-ramp) can be seamlessly integrated to fund the escrow, allowing for global accessibility and currency flexibility.
* **Escrow Balance Updates:** Participants calculate funding status off-chain by comparing the balance with the agreed amount.

***

#### **Outcomes of the Funding Phase**

1. **Funds Held On-Chain:**
   * The deposited amount is securely held in the escrow smart contract, ensuring safety and transparency.
2. **Participant Verification:**
   * All participants can verify the funding details using the on-chain transaction ID, building trust and confidence.
3. **Trust Reinforced:**
   * The client’s deposit demonstrates their commitment to the transaction, fostering trust with the service provider.
