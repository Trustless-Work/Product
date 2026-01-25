---
description: >-
  A production-ready set of React blocks for integrating Trustless Work’s escrow
  flows.
icon: play
---

# Introduction

{% hint style="info" %}
Want to customize the blocks?

Edit the generated components however you want.
{% endhint %}

***

### What you get

* UI blocks (cards/tables/dialogs/forms) to list and manage escrows
* Providers for API config, wallet context, dialogs and amounts
* TanStack Query hooks for fetching and mutating escrows
* Wallet-kit helpers and error handling utilities

### Links

{% embed url="https://blocks.trustlesswork.com" %}

{% embed url="https://github.com/Trustless-Work/react-library-trustless-work-blocks" %}

{% embed url="https://www.npmjs.com/package/@trustless-work/blocks" %}

### List all available blocks

Use the CLI to print all available blocks:

{% code title="CLI" %}
```sh
npx trustless-work list
```
{% endcode %}

This is the fastest way to discover folder paths for `npx trustless-work add ...`.

### Context API

The context API is a global storage of escrows. It is used to store the escrows that are fetched from the API. It is also used to store the selected escrow.

{% hint style="info" %}
You don’t have to use this context approach.

You can use Redux, Zustand, or anything else.\
Just make sure the target escrow data is available to each endpoint hook.
{% endhint %}

#### How the context is used by endpoint hooks

When implementing the endpoints, we need to pass the data of a specific escrow to each endpoint. But how do we do that? Our library provides a context called `EscrowContext`, which includes some very important utilities. Among them are`selectedEscrow`and `setSelectedEscrow`, which allow us to do the following:

#### `selectedEscrow`

Currently, `selectedEscrow` holds a specific escrow that we are pointing to. With this, all the endpoint hooks interact with that state in order to extract data from it, such as contractId, roles, etc. For example, in the change status select, the `milestoneIndex` values are loaded based on the currently selected escrow. Therefore, if`setSelectedEscrow` is undefined, they won't load.

{% code title="useChangeMilestoneStatus.ts" overflow="wrap" %}
```ts
const { selectedEscrow } = useEscrowContext();

const handleSubmit = form.handleSubmit(async (payload) => {             
  /**
   * Create the final payload for the change milestone status mutation
   *
   * @param payload - The payload from the form
   * @returns The final payload for the change milestone status mutation
  */
  const finalPayload: ChangeMilestoneStatusPayload = {
    contractId: selectedEscrow?.contractId || '', // contractId from the selectedEscrow
    milestoneIndex: payload.milestoneIndex,
    newStatus: payload.status,
    newEvidence: payload.evidence || undefined,
    serviceProvider: walletAddress || '',
  };

  /**
   * Call the change milestone status mutation
   *
   * @param payload - The final payload for the change milestone statusmutation
   * @param type - The type of the escrow
   * @param address - The address of the escrow
  */
  await changeMilestoneStatus.mutateAsync({
    payload: finalPayload,
    type: selectedEscrow?.type || 'multi-release',
    address: walletAddress || '',
  });
}
```
{% endcode %}

#### `setSelectedEscrow`

`setSelectedEscrow` stores the selected escrow in context.

Other hooks and UI blocks can then read `selectedEscrow` to get `contractId`, roles, etc.\
Example: cards view stores the selected escrow before opening the details dialog.

{% code title="EscrowsCards.tsx" overflow="wrap" %}
```ts
const { setSelectedEscrow } = useEscrowContext();

const onCardClick = (escrow: Escrow) => {
  setSelectedEscrow(escrow);
  dialogStates.second.setIsOpen(true);
};
```
{% endcode %}

#### `updateEscrow`

Our `updateEscrow` function update the existing selectedEscrow in the context. It is useful to update a flag or others fields. For example, we use it to update the escrow status after a change milestone status mutation.

{% code title="useChangeMilestoneStatus.ts" overflow="wrap" %}
```ts
const { selectedEscrow, updateEscrow } = useEscrowContext();

const handleSubmit = form.handleSubmit(async (payload) => { 
  /**
    * Call the change milestone status mutation
    *
    * @param payload - The final payload for the change milestone status mutation
    * @param type - The type of the escrow
    * @param address - The address of the escrow
  */
  await changeMilestoneStatus.mutateAsync({
    payload: finalPayload,
    type: selectedEscrow?.type || "multi-release", // type from the selectedEscrow
    address: walletAddress || "",
  });

  toast.success("Milestone status updated successfully");

  // Update the selected escrow in the context with the new status and evidence
  updateEscrow({
    ...selectedEscrow,
    milestones: selectedEscrow?.milestones.map((milestone, index) => {
      if (index === Number(payload.milestoneIndex)) {
        return {
          ...milestone,
          status: payload.status,
          evidence: payload.evidence || undefined,
        };
      }
      return milestone;
    }),
  });
}
```
{% endcode %}

### Install blocks by folder path

You can install whole folders (and all child blocks) with one command.

#### Install a parent directory

```sh
npx trustless-work add escrows
```

Installs all escrow blocks.

#### Install a specific subfolder

```sh
npx trustless-work add escrows/single-release
```

Installs only single-release escrow blocks.

{% hint style="success" %}
The deeper the folder path, the more specific the install.

Start broad (`escrows`), then narrow down as needed (`escrows/single-release/...`).
{% endhint %}

[Installation Guide](https://blocks.trustlesswork.com/get-started/installation)
