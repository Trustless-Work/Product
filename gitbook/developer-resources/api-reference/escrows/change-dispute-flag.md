# Change dispute flag

Responsible for setting the escrow in dispute state. Changes the value of the escrow's "dispute\_flag" property to true.

**URL:** `/escrow/change-dispute-flag`

### Body params:

contractId: ID (address) that identifies the escrow contract

signer: Address of the user who will sign the transaction

#### Example:

```jsx
{
	contractId: "GC3DJY4LLQYJHEONXFDLQVVRCFZQCPFX7VD33KP4P7QSVZY3SJHQBZGV",
	signer: "GBY3PAJY5R3ZIXTYBGFW4URB4RINEXQBC3T4RWDDKJ5TZXQYZUN6A4TP"
};
```

