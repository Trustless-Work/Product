# Resolving disputes

Handles the resolution of disputes within an escrow by transferring the amounts entered so far in the escrow to the client and service provider according to what the dispute resolver deems appropriate.

**URL:** `/escrow/resolving-disputes`

### Body params:

contractId: ID (address) that identifies the escrow contract

disputeResolver: Address of the user defined to resolve disputes in an escrow

clientFunds: Amount to transfer to the client for dispute resolution

serviceProviderFunds: Amount to transfer to the service provider for dispute resolution

#### Example:

```jsx
{
	contractId: "GC3DJY4LLQYJHEONXFDLQVVRCFZQCPFX7VD33KP4P7QSVZY3SJHQBZGV",
	disputeResolver: "GBY3PAJY5R3ZIXTYBGFW4URB4RINEXQBC3T4RWDDKJ5TZXQYZUN6A4TP", 
	clientFunds: "100",
	serviceProviderFunds: "50"
};
```
