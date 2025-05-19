---
description: >-
  In Stellar, a Trustline is a link that a user (account) creates to trust and
  hold a specific asset issued by another account (like USDC, EURC, etc.).
  Without a Trustline, you can only hold XLM.
icon: handshake-angle
---

# Trustlines

## Overview

In order to interact with others no native tokens, you'll need to have some Trustlines like USDC or EURC from Circle.&#x20;



## USDC & EURC Trustlines

```typescript
/**
 *
 * The allows the user to interact with some tokens, in this case, we're using USDC and EURC. But you can add more trustlines.
 *
 */
export const trustlines = [
  {
    name: "USDC",
    address: "CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA",
    decimals: 10000000,
  },
  {
    name: "EURC",
    address: "GB3Q6QDZYTHWT7E5PVS3W7FUT5GVAFC5KSZFFLPU25GO7VTC3NM2ZTVO",
    decimals: 10000000,
  },

  // you can add more trustlines here
];

```

We are going to use them when we initialize an escrow, because we need to specify to the smart contract which token we're gonna use.

