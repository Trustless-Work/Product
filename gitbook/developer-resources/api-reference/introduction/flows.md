---
description: Here you'll find the basic flow in order to use Trustless Work API.
icon: arrow-progress
---

# Flows

Before you start:

A public and private address must be generated with this stellar resource:&#x20;

{% embed url="https://lab.stellar.org/account/create?$=network$id=testnet&horizonUrl=https:////horizon-testnet.stellar.org&label=Testnet&passphrase=Test+SDF+Network+/;+September+2015&rpcUrl=https:////soroban-testnet.stellar.org" %}



Then stellar funds must be given to this address by placing the public key in this stellar resource:&#x20;

{% embed url="https://lab.stellar.org/account/fund?$=network$id=testnet&horizonUrl=https:////horizon-testnet.stellar.org&label=Testnet&passphrase=Test+SDF+Network+/;+September+2015&rpcUrl=https:////soroban-testnet.stellar.org" %}



USDC on testnet faucet Stellar testnet:&#x20;

{% embed url="https://faucet.circle.com/" %}



1. To be able to interact with USDC from a stellar address you have to define the trustline. For this you can use this api endpoint:&#x20;

{% embed url="https://api.trustlesswork.com/helper/set-trustline" %}

### Case 1:

_**Normal case where a escrow is created and the escrow are completed correctly:**_



1. The escrow contract must be deployed, which in turn initializes the escrow with its metadata.

{% embed url="https://api.trustlesswork.com/deployer/invoke-deployer-contract" %}

Among the information returned you will get the id of the contract you have just deployed, which you will need to enter to be able to use the other endpoints.

**NOTE:** This 50 percent that is being transferred goes directly to the balance of the deployed contract, not to the service provider. The escrow must then be funded so that the service provider can be assured of 50 percent of the escrow value.



2. To do this, the following endpoint must be executed:&#x20;

{% embed url="https://api.trustlesswork.com/escrow/fund-escrow" %}



3. The following endpoint must be executed in order to complete the escrow after mutual agreement:&#x20;

{% embed url="https://api.trustlesswork.com/escrow/complete-escrow" %}

With this step the other 50 percent of the escrow value will be transferred to the balance of the deployed contract.



4. After the escrow is completed, the service provider may claim the proceeds of the escrow through this endpoint:&#x20;

{% embed url="https://api.trustlesswork.com/escrow/claim-escrow-earnings" %}

### Case 2:

Case in which the contract is deployed and the escrow is initialized and funded but the service provider decides to cancel the escrow:

1. The escrow contract must be deployed, which in turn initializes the escrow with its metadata.

{% embed url="https://api.trustlesswork.com/deployer/invoke-deployer-contract" %}

Among the information returned you will get the id of the contract you have just deployed, which you will need to enter to be able to use the other endpoints.

NOTE: This 50 percent that is being transferred goes directly to the balance of the deployed contract, not to the service provider.



2. The escrow must then be funded so that the service provider can be assured of 50 percent of the escrow value.

{% embed url="https://api.trustlesswork.com/escrow/fund-escrow" %}

3. Due to an external cause the service provider decided to cancel the escrow.

{% embed url="https://api.trustlesswork.com/escrow/cancel-escrow" %}

4. The escrow owner (signer) will be able to refund to his account the 50 percent that he financed for the escrow due to the above mentioned situation.&#x20;

{% embed url="https://api.trustlesswork.com/escrow/refund-remaining-funds" %}

**IMPORTANT NOTE:** All endpoints related to escrow management return the transaction unsigned. This is done by means of a string returned in XDR (External Data Representation) format, which is a format that stellar uses to encode transactions. This string is what you should use to sign the transaction with the wallet of your choice. After being signed it will return the transaction signed in the same way by means of a string in XDR format.&#x20;



5. This string is the one that must be sent to the next endpoint for the transaction to be sent to the Stellar network:&#x20;

{% embed url="https://api.trustlesswork.com/helper/send-transaction" %}

The only endpoints that do not require the previous step since they are signed and sent to the network directly when executed, are the following (mentioning them by the name they have in the documentation):

1. Invoke Deployer Contract
2. Get Escrow by Engagement ID
3. Set Trustline
