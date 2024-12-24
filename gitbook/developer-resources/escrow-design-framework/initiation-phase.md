# Initiation Phase

<div data-full-width="true"><figure><img src="../../.gitbook/assets/Initiation_phase_lite.png" alt=""><figcaption></figcaption></figure></div>

### **nitiation Phase: Setting Up for Success**

The Initiation Phase serves as the starting point for any escrow process. During this phase, the smart escrow contract is created and configured with all necessary details, ensuring transparency, clear role assignments, and a shared understanding of the transaction's terms. This lays the groundwork for a secure and efficient process.

#### **Key Elements**

1. **Engagement ID (e.g., Order\_ID):** A unique identifier that connects the escrow to a specific transaction, ensuring traceability and reference throughout the process.
2. **Participants and Roles:**
   * **Client (e.g., Alice):** The buyer or service requester initiating the transaction, identified by their blockchain address.
   * **Service Provider (e.g., Bob):** The seller or provider responsible for delivering the agreed-upon product or service.
   * **Platform (e.g., Marketplace):** The facilitator providing the infrastructure for the transaction and possibly acting as the Dispute Resolver.
   * **Release Signer (e.g., Alice):** The party responsible for approving the release of funds upon milestone completion.
   * **Dispute Resolver (e.g., Marketplace):** The entity tasked with resolving disputes fairly if they arise.
   * **Receiver (e.g., Bob):** The final recipient of the funds once all conditions are met.
3. **Escrow Configuration:**
   * **Amount:** The total funds to be held in escrow.
   * **Balance:** Initially $0 until the client deposits funds.
   * **Platform Fee:** A fixed or percentage-based fee for the platform’s services.
   * **Milestones:** Defined deliverables or outcomes that are tracked and verified throughout the process.

***

#### **Process Steps**

1. **Agreeing on Terms:** Both the client and service provider finalize the details of the transaction, including product or service descriptions, pricing, and delivery expectations.
2. **Recording Metadata:** The platform records the transaction details and assigns a unique Engagement ID to track the agreement.
3. **Initializing the Escrow:** Using the Trustless Work API, the platform creates the escrow contract with the provided metadata. The API generates a unique Contract ID as a reference for all parties.

***

#### **Example Scenario**

Alice agrees to pay $100 to Bob for delivering a service. The platform (Marketplace) facilitates the transaction by generating an Engagement ID (Order\_ID) and initializing the escrow contract using the Trustless Work API. Alice is designated as the Release Signer, while the platform serves as the Dispute Resolver. Clear milestones are established, providing transparency and alignment from the outset.

***

#### **Outcome of the Initiation Phase**

By completing the Initiation Phase:

* A smart escrow contract is fully created and ready for the transaction to proceed.
* Roles, responsibilities, and conditions are clearly defined and agreed upon.
* All participants have visibility into the process, fostering trust and reducing potential misunderstandings.
