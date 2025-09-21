---
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

# 📓 Escrow Blocks

A production-ready set of React blocks for integrating Trustless Work's escrow and dispute resolution flows.

{% hint style="info" %}
Would you like to customize the blocks?\
**You can do that by editing the blocks as you see fit.**
{% endhint %}

***

### What you get <a href="#what-you-get" id="what-you-get"></a>

* UI blocks (cards/tables/dialogs/forms) to list and manage escrows
* Providers for API config, wallet context, dialogs and amounts
* TanStack Query hooks for fetching and mutating escrows
* Wallet-kit helpers and error handling utilities

## Links

{% embed url="https://blocks.trustlesswork.com" %}

{% embed url="https://github.com/Trustless-Work/react-library-trustless-work-blocks" %}

{% embed url="https://www.npmjs.com/package/@trustless-work/blocks" %}

### List all available blocks# <a href="#list-all-available-blocks" id="list-all-available-blocks"></a>

With the CLI you can list all available blocks:

```
npx trustless-work list
```

The init command will:

* Show all available blocks.

### Context API# <a href="#context-api" id="context-api"></a>

The context API is a global storage of escrows. It is used to store the escrows that are fetched from the API. It is also used to store the selected escrow.

Important

If you don't want to use our approach for retrieving the escrow data, you are completely free to change it. You can use Redux, Zustand, or any other solution instead. However, it is important that you ensure the desired escrow is passed to the endpoint.

#### Understanding how the context works in escrows endpoints.# <a href="#understanding-context-escrows-endpoints" id="understanding-context-escrows-endpoints"></a>

When implementing the endpoints, we need to pass the data of a specific escrow to each endpoint. But how do we do that? Our library provides a context called `EscrowContext`, which includes some very important utilities. Among them are`selectedEscrow`and `setSelectedEscrow`, which allow us to do the following:

#### Use of selectedEscrow# <a href="#use-of-selectedescrow" id="use-of-selectedescrow"></a>

Currently, `selectedEscrow` holds a specific escrow that we are pointing to. With this, all the endpoint hooks interact with that state in order to extract data from it, such as contractId, roles, etc. For example, in the change status select, the `milestoneIndex` values are loaded based on the currently selected escrow. Therefore, if`setSelectedEscrow` is undefined, they won't load.

/useChangeMilestoneStatus.ts

```
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

#### Use of setSelectedEscrow# <a href="#use-of-setselectedescrow" id="use-of-setselectedescrow"></a>

The function `setSelectedEscrow` save the selected escrow in the context, so that all the endpoint hooks interact with that state in order to extract data from it, such as contractId, roles, etc. For example, in escrows cards by signer we save the selected escrow in the context, so that we can use it in details dialog.

/EscrowsCards.tsx

```
const { setSelectedEscrow } = useEscrowContext();

const onCardClick = (escrow: Escrow) => {
  setSelectedEscrow(escrow);
  dialogStates.second.setIsOpen(true);
};
```

#### Use of updateEscrow# <a href="#use-of-updateescrow" id="use-of-updateescrow"></a>

Our `updateEscrow` function update the existing selectedEscrow in the context. It is useful to update a flag or others fields. For example, we use it to update the escrow status after a change milestone status mutation.

/useChangeMilestoneStatus.ts

```
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

### Installation based on folder path# <a href="#installation-based-on-folder-path" id="installation-based-on-folder-path"></a>

If you need all the child blocks, you can install them by pointing to their parent directory, so you won't have to install them one by one.

```
npx trustless-work escrows // or other parent's blocks directory
```



#### Install Parent Directory

```
npx trustless-work add escrows
```

Installs ALL escrow blocks

**Install Specific Subfolder**

```
npx trustless-work add escrows/single-release
```

Installs only single-release escrow blocks

**💡 Pro Tip: Hierarchical Installation**

The deeper you go in the folder structure, the more specific the blocks become. Start with parent directories for comprehensive functionality, then drill down to specific components as needed.

[Installation Guide](https://blocks.trustlesswork.com/get-started/installation)
