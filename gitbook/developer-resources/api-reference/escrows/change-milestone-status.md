# Change milestone status

Responsible for modifying the "status" property of a specific milestone in the escrow

**URL:** `/escrow/change-milestone-status`

### Body params:

contractId: ID (address) that identifies the escrow contract

milestoneIndex: Position that identifies the milestone within the group of milestones in the escrow

newStatus: New value for the "status" property within the escrow milestone

serviceProvider: Address of the service provider who will modify the contract's "status" property

#### Example:

```jsx
{
	contractId: "GC3DJY4LLQYJHEONXFDLQVVRCFZQCPFX7VD33KP4P7QSVZY3SJHQBZGV",
	milestoneIndex: "0", 
	newStatus: "Approved",
	serviceProvider: "GBY3PAJY5R3ZIXTYBGFW4URB4RINEXQBC3T4RWDDKJ5TZXQYZUN6A4TP"
};
```

