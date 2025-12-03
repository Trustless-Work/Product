---
icon: wallet
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
---

# Withdraw Remaining Funds

### Multi Release Only

```typescript
/**
 * Withdraw remaining funds
 */
export type WithdrawRemainingFundsPayload = {
  /**
   * ID (address) that identifies the escrow contract
   */
  contractId: string;

  /**
   * Address in charge of resolving disputes within the escrow.
   */
  disputeResolver: string;

  /**
   * Distributions of the escrow amount to the receivers.
   */
  distributions: [
    {
      /**
       * Address of the receiver
       */
      address: string;
      /**
       * Amount to be transferred to the receiver. All the amount must be equal to the total amount of the escrow.
       */
      amount: number;
    },
  ];
};

```
