# System Components

<figure><img src="../../.gitbook/assets/image (1).png" alt=""><figcaption></figcaption></figure>

### OfferHub Frontend

* Marketplace UI (browse, buy, sell)
* Balance UI (top-up, withdraw)
* Order timeline UI (funded, in progress, disputed, released)

### OfferHub Orchestrator (Backend API)

* Creates and manages orders
* Coordinates Airtm and Trustless Work calls
* Handles webhooks and escrow events
* Maintains audit log and internal state

### Airtm Integration Module

* Create pay-in intents
* Receive pay-in webhooks
* Initiate pay-outs / withdrawals
* Retrieve transaction status

### Trustless Work Integration Module

* Create escrow per order
* Update milestone states
* Raise disputes
* Execute release/refund transactions

### Backoffice&#x20;

For this prototype it is expected that the dispute resolving and manual releases through our [Bakcoffice dApp](../backoffice-dapp-overview/). We will also leverage the [escrow viewer](../escrow-viewer.md).

* Dispute case management
* Manual overrides and retries
* Monitoring and audit export
