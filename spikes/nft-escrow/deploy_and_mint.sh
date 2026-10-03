#!/usr/bin/env bash
set -euo pipefail

NETWORK="testnet"
DEV_ACCOUNT="${DEV_ACCOUNT:-GDEVWALLET...TEST}"
NFT_WASM="target/wasm32-unknown-unknown/release/nft.wasm"

echo "Deploying NFT contract to $NETWORK..."
NFT_CONTRACT=$(soroban contract deploy \
  --wasm "$NFT_WASM" \
  --source "$DEV_ACCOUNT" \
  --network "$NETWORK" \
  --quiet)

echo "NFT Contract: $NFT_CONTRACT"

echo "Minting token #1..."
soroban contract invoke \
  --id "$NFT_CONTRACT" \
  --source "$DEV_ACCOUNT" \
  --network "$NETWORK" \
  --fn mint \
  --args "$DEV_ACCOUNT" 1 "TW Spike #1" "ipfs://QmTest"

echo "Done. Contract $NFT_CONTRACT minted to $DEV_ACCOUNT"
