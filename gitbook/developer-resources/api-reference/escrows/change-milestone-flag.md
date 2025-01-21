# Change milestone flag

Responsible for modifying the "flag" property of a specific milestone in the escrow to approve that milestone.

**URL:** `/escrow/change-milestone-flag`

### Body params:

contractId: ID (address) that identifies the escrow contract

milestoneIndex: Position that identifies the milestone within the group of milestones in the escrow

newFlag: New value for the "flag" property within the escrow milestone

client: Address of the client who will approve the milestone

#### Example:

```jsx
{
	contractId: "GC3DJY4LLQYJHEONXFDLQVVRCFZQCPFX7VD33KP4P7QSVZY3SJHQBZGV",
	milestoneIndex: "0", 
	newFlag: true,
	client: "GBY3PAJY5R3ZIXTYBGFW4URB4RINEXQBC3T4RWDDKJ5TZXQYZUN6A4TP"
};
```

