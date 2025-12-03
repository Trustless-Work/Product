---
icon: pencil
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

# Update Escrow

### Single Release

```typescript
/**
 * Single Release Update Escrow Payload
 */
export type UpdateSingleReleaseEscrowPayload = {
  /**
   * ID (address) that identifies the escrow contract
   */
  contractId: string;

  /**
   * Escrow data
   */
  escrow: {
    /**
   * Unique identifier for the escrow
   */
    engagementId: string;

    /**
     * Name of the escrow
     */
    title: string;

    /**
     * Roles that make up the escrow structure
     */
    roles: {
      /**
       * Address of the entity requiring the service.
       */
      approver: string;

      /**
       * Address of the entity providing the service.
       */
      serviceProvider: string;

      /**
       * Address of the entity that owns the escrow
       */
      platformAddress: string;

      /**
       * Address of the user in charge of releasing the escrow funds to the service provider.
       */
      releaseSigner: string;

      /**
       * Address in charge of resolving disputes within the escrow.
       */
      disputeResolver: string;

      /**
       * Address where escrow proceeds will be sent to
       */
      receiver: string;
    };

    /**
     * Text describing the function of the escrow
     */
    description: string;

    /**
     * Amount to be transferred upon completion of escrow milestones
     */
    amount: number;

    /**
     * Commission that the platform will receive when the escrow is completed
     */
    platformFee: number;

    /**
     * Objectives to be completed to define the escrow as completed
     */
    milestones: {
      /**
       * Text describing the function of the milestone.
       */
      description: string;

      /**
       * Milestone status. Ex: Approved, In dispute, etc...
       */
      status?: string;

      /**
       * Evidence of work performed by the service provider.
       */
      evidence?: string;

      /**
       * Approved flag, only if the escrow is single-release
       */
      approved?: boolean;
    }[];

    /**
     * Flags validating certain escrow life states
     */
    flags?: {
      /**
       * Flag indicating that an escrow is in dispute.
       */
      disputed?: boolean;

      /**
       * Flag indicating that escrow funds have already been released.
       */
      released?: boolean;

      /**
       * Flag indicating that a disputed escrow has already been resolved.
       */
      resolved?: boolean;

      /**
       * Flag indicating whether a milestone has been approved by the approver.
       */
      approved?: boolean;
    };

    /**
     * Information on the trustline that will manage the movement of funds in escrow
     */
    trustline: {
      /**
       * Public address establishing permission to accept and use a specific token.
       */
      address: string;
    };

    /**
     * Whether the escrow is active. This comes from DB, not from the blockchain.
     */
    isActive?: boolean;
  };

  /**
   * Address of the user signing the contract transaction
   */
  signer: string;
};
```

### Multi Release

```typescript
/**
 * Multi Release Update Escrow Payload
 */
export type UpdateMultiReleaseEscrowPayload = {
  /**
   * ID (address) that identifies the escrow contract
   */
  contractId: string;

  /**
   * Escrow data
   */
  escrow: {
    /**
     * Unique identifier for the escrow
     */
    engagementId: string;

    /**
     * Name of the escrow
     */
    title: string;

    /**
     * Roles that make up the escrow structure (without receiver, as each milestone has its own receiver)
     */
    roles: {
      /**
       * Address of the entity requiring the service.
       */
      approver: string;

      /**
       * Address of the entity providing the service.
       */
      serviceProvider: string;

      /**
       * Address of the entity that owns the escrow
       */
      platformAddress: string;

      /**
       * Address of the user in charge of releasing the escrow funds to the service provider.
       */
      releaseSigner: string;

      /**
       * Address in charge of resolving disputes within the escrow.
       */
      disputeResolver: string;
    };

    /**
     * Text describing the function of the escrow
     */
    description: string;

    /**
     * Commission that the platform will receive when the escrow is completed
     */
    platformFee: number;

    /**
     * Objectives to be completed to define the escrow as completed
     */
    milestones: {
      /**
       * Text describing the function of the milestone.
       */
      description: string;

      /**
       * Milestone status. Ex: Approved, In dispute, etc...
       */
      status?: string;

      /**
       * Evidence of work performed by the service provider.
       */
      evidence?: string;

      /**
       * Amount to be transferred upon completion of this milestone
       */
      amount: number;

      /**
       * Address where milestone proceeds will be sent to
       */
      receiver: string;

      /**
       * Flags validating certain milestone life states, only if the escrow is multi-release
       */
      flags?: {
        /**
         * Flag indicating that an escrow is in dispute.
         */
        disputed?: boolean;

        /**
         * Flag indicating that escrow funds have already been released.
         */
        released?: boolean;

        /**
         * Flag indicating that a disputed escrow has already been resolved.
         */
        resolved?: boolean;

        /**
         * Flag indicating whether a milestone has been approved by the approver.
         */
        approved?: boolean;
      };
    }[];

    /**
     * Information on the trustline that will manage the movement of funds in escrow
     */
    trustline: {
      /**
       * Public address establishing permission to accept and use a specific token.
       */
      address: string;
    };

    /**
     * Whether the escrow is active. This comes from DB, not from the blockchain.
     */
    isActive?: boolean;
  };

  /**
   * Address of the user signing the contract transaction
   */
  signer: string;
};
```
