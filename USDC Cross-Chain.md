## 📝 Trustless Architecture Cross Chain Bridge

**🚀 1. Proposed Solution for USDC Cross-Chain Integration Using Albridge (Stellar Asset Bridge).**

## Overview

The proposed solution leverages Allbridge, a decentralized bridging protocol, to enable seamless transfer of USDC between other blockchain networks (e.g., Ethereum, Solana, XRPL, Tezos) and  Stellar’s Soroban smart contracts. Using Allbridge’s lock-mint/burn-release mechanism and validator network, the architecture ensures secure and scalable cross-chain communication while maintaining decentralization.


## Alignment with Trustless Work.

Allbridge is a stellar asset bridge that connects Stellar with multiple blockchain networks. It supports various asset types, it is used by projects like Chrysalis for cross-chain functionality and  it has an excellent developer [support system](https://discord.gg/KuN6sFTq). This makes Allbridge an excellent choice to be used with Trustless work.

This solution aligns with Trustless Work’s vision by:
- Enabling trustless multichain capabilities.
- Reducing complexity by leveraging Allbridge’s established infrastructure.
- Supporting scalability and seamless integration with future blockchain ecosystems.


## Core Components.

Using Allbridge Classic provides the following options:
- lock USDC on BNB Chain and unlock abUSDC on Stellar.
- lock cUSD on Celo and unlock acUSD on Stellar.
- lock USDC on Ethereum and unlock aeUSDC on Stellar
- lock USDC on Polygon and unlock apUSDC on Stellar
- lock USDC on Solana and unlock asUSDC on Stellar


If the interest of a developer is a backward transfer, there will be a need to get abUSDC, acUSD, aeUSDC, apUSDC, and asUSDC on Stellar first, this is in case of working with native USDC on Stellar.


### Lock & Mint Mechanism:

**🚀 Lock & Mint Contract (Source Blockchain):**

```
Original Asset (Chain A) -> Locked in Bridge -> Wrapped Asset (Stellar)
```

It's a simple transfer to the bridge muxedAccount . Attached is a link to the different bridge address.  [Learn more here](https://docs.allbridge.io/allbridge-overview/bridge-contracts) & [this too](https://github.com/allbridge-io/allbridge-contract-docs?tab=readme-ov-file#lock-tokens-1).


#### For other blockchains (EVM ) :
- Call lock method with the [contract address](https://docs.allbridge.io/allbridge-overview/bridge-contracts) and [ABI](https://github.com/allbridge-io/allbridge-contract-docs/blob/master/allbridge-multisig-abi.json)

```solidity
function lock(uint128 lockId, address tokenAddress, bytes32 recipient, bytes4 destination, uint256 amount)
```



### Burn & Release Mechanism:

**🚀 Burn & Release Contract (Stellar via Soroban):**

```
Wrapped Asset (Stellar) -> Burned -> Original Asset (Chain A)
```

At this time of research, currently the functionality for Allbridge to send tokens to a smart contract and not an address is still under development. 
What Allbridge currently has is the ability to send it directly to a stellar address. To know more about how it is being done, kindly [check this out](https://github.com/allbridge-io/allbridge-contract-docs?tab=readme-ov-file#stellar-1).

**PS:**
- It is important to note that if this is to be done, a trustline for the bridge token needs to be set for the stellar address before sending it.


To study more about sending into the soroban smart contract, this is a link to Allbridge soroban [smart contract](https://github.com/allbridge-io/allbridge-core-soroban-contracts/tree/main)



**PS**: [encodeEd25519PublicKey](https://stellar.github.io/js-stellar-sdk/StrKey.html#.encodeEd25519PublicKey) and [decodeEd25519PublicKey](https://stellar.github.io/js-stellar-sdk/StrKey.html#.decodeEd25519PublicKey) from [StellarSdk](https://github.com/stellar/js-stellar-base) are used to encode and decode stellar addresses.



## Security Considerations:

- Multi-signature validation
- Oracle-based verification



## More Resources:
- 1. [Allbridge Core Stellar guide](https://docs-core.allbridge.io/sdk/guides/stellar/transfer)
- 2. [Allbridge Core JS-SDK](https://github.com/allbridge-io/allbridge-core-js-sdk/blob/main/examples/src/examples/bridge/srb/srb-send-full-example.ts)
- 3. [Allbridge Core REST-API](https://github.com/allbridge-io/allbridge-core-rest-api/blob/master/examples/src/usage/bridge/srb/srb-send-full-example.ts)
- 4. [Allbridge smart contracts addresses](https://docs.allbridge.io/allbridge-overview/bridge-contracts#stellar-bridge-contracts)
- 5. [Signatures.](https://allbridgeapi.net/sign/%7BtransactionId%7D)
- 6. [Albridge ABI’s](https://github.com/allbridge-io/allbridge-contract-docs/blob/master/allbridge-multisig-abi.json)
- 7. [Bridge contract address on stellar](https://stellar.expert/explorer/public/account/GALLBRBQHAPW5FOVXXHYWR6J4ZDAQ35BMSNADYGBW25VOUHUYRZM4XIL)





**🚀 2. Proposed Solution for USDC Cross-Chain Bridge Using Circle (Stellar’s Anchor).**


## Overview
Circle provides cross-chain USDC transfer capabilities through their Cross-Chain Transfer Protocol (CCTP), allowing users to move USDC between supported blockchains.   Circle is a steller's [anchor](https://anchors.stellar.org/?s=circle).


## How Circle Cross-Chain Works:

**Transfer Process:**

```
Source Chain (Burn) -> Circle Attestation -> Destination Chain (Mint)
```

- 1. Source Chain: User initiates transfer
- 2. Message Transmission: Circle's attestation service validates transfer
- 3. Destination Chain: USDC is minted on target network


## Technical Limitation
Currently, circle only works with API endpoints, it provides several key endpoints for cross-chain transfers:

- Transfer initiation
- Status checking
- Attestation verification
- Destination minting


## Resource:

- [Circle's CCTP Documentation](https://developers.circle.com/stablecoins/docs/cctp-getting-started)




## Next Steps
Upon acceptance:
- If required, I will Design architecture diagrams to illustrate blockchain-specific workflows.