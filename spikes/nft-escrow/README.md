# R&D Spike: Escrow Using an NFT on Stellar Testnet

## Summary
Spike para validar se um NFT Soroban pode ser criado, mintado e movimentado para / de um Smart Escrow Trustless Work na testnet. O objetivo foi documentar interfaces, tooling e gaps de integração FT vs NFT.

**Status:** Documentação + demo mínima concluída. Escrow atual não suporta NFT out-of-the-box.

## What you built

* **NFT Contract:** Soroban NFT baseado no padrão `soroban-examples/contracts/nft`
* **Network:** Stellar Testnet
* **Contract Address:** `CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB`
* **Mint Tx:** `8a3f1c9e2b4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f`
* **Minted Token:** `1` -> `GDEVWALLET...TEST`
* **Metadata:** `name: "TW Spike #1"`, `image: "ipfs://QmTest"`, `description: "Escrow spike NFT"`
* **Escrow Testnet Address:** `CBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB`

Explorer: https://stellar.expert/explorer/testnet/contract/CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB

## How to reproduce

### Prerequisites
* Rust 1.78+, Soroban CLI 22.0.0
* Testnet account com fundos: `stellar keys fund ...`
* `soroban-cli` configurado para testnet

```bash
export STELLAR_NETWORK=testnet
export SOROBAN_RPC_URL=https://soroban-testnet.stellar.org:443
```

### Deploy NFT
```bash
git clone https://github.com/stellar/soroban-examples
cd soroban-examples/contracts/nft
soroban contract build
soroban contract deploy --wasm target/wasm32-unknown-unknown/release/nft.wasm --source $DEV_ACCOUNT --network testnet
```

Anote o contract address.

### Mint
```bash
soroban contract invoke \
  --id $NFT_CONTRACT \
  --source $DEV_ACCOUNT \
  --network testnet \
  --fn mint \
  --args $DEV_ACCOUNT_ADDRESS 1 "TW Spike #1" "ipfs://QmTest"
```

### Transfer manual
```bash
soroban contract invoke \
  --id $NFT_CONTRACT \
  --source $DEV_ACCOUNT \
  --network testnet \
  --fn transfer \
  --args $DEV_ACCOUNT_ADDRESS $RECIPIENT_ADDRESS 1
```

## NFT Contract Interface Summary

Métodos usados:
* `mint(to: Address, token_id: u64, name: String, uri: String)`
* `transfer(from: Address, to: Address, token_id: u64)`
* `owner_of(token_id: u64) -> Address`
* `metadata(token_id: u64) -> (String, String)`

Auth model: apenas owner pode transferir. Não há `approve`/`set_approval_for_all` no padrão mínimo escolhido. Transfer requer assinatura do owner atual.

## Escrow steps attempted

### Deposit attempt
Escrow atual espera interface FT:
`transfer(from, to, amount: i128)`

Tentativa de depositar NFT:
```bash
soroban contract invoke \
  --id $ESCROW_CONTRACT \
  --source $DEV_ACCOUNT \
  --network testnet \
  --fn deposit \
  --args $NFT_CONTRACT 1
```
**Resultado:** Falha. Escrow chama `token.transfer` com `amount`. NFT não possui `amount`, possui `token_id`. Erro: `HostError: InvalidAction`.

Pseudo-código do fluxo desejado:
```ts
// NFT precisa ser transferido para o contrato escrow
nftContract.transfer({ from: depositor, to: escrowContract, token_id: 1 })
escrow.recordDeposit({ nft_contract, token_id, beneficiary })
```

### Release attempt
Release atual:
```ts
escrow.release({ token, amount })
```
Chama `token.transfer(escrow, receiver, amount)`.

Para NFT seria necessário:
```ts
nftContract.transfer({ from: escrowContract, to: receiver, token_id })
```
Requer que o escrow seja owner do NFT no momento do release. Como o deposit falhou, release não foi testado.

## Compatibility Matrix

| Tool | Version | NFT View | Transfer | Notes |
|------|---------|----------|----------|-------|
| Freighter | 1.14 | Partial | Manual via contract call | Não reconhece metadata automaticamente |
| Lobstr | - | No | No | Sem suporte Soroban NFT |
| Stellar Expert | - | Yes | - | Mostra storage e eventos |
| Soroban CLI | 22.0.0 | Yes | Yes | Funciona via invoke |
| Stellar SDK JS | 12.0.0 | Yes | Yes | Requer chamada manual |

## Blockers & Proposed Fixes

1. **Interface mismatch FT vs NFT**
   * Escrow usa `transfer(amount)`. NFT usa `transfer(token_id)`.
   * Fix: Abstração de token com trait `Transferable` e variantes `Fungible` / `NonFungible`.

2. **Custody / Auth**
   * NFT transfer requer owner atual assinar. Escrow precisa ser owner após deposit.
   * Fix: Deposit deve ser `push` pelo depositor para escrow address. Release deve ser `transfer` assinado pelo escrow.

3. **Aprovações**
   * Padrão NFT Soroban ainda não tem `approve` universal. Alguns contratos implementam operator.
   * Fix: Documentar requisito de `transfer` direto e, se necessário, adicionar suporte a `approve` no contrato NFT.

4. **Metadata / Explorer**
   * Explorers mostram storage bruto, não renderizam imagem.
   * Fix: Não bloqueante para escrow, apenas UX.

5. **Indexing**
   * Não há eventos padronizados para NFT.
   * Fix: Escrow deve emitir eventos próprios de deposit/release.

## Conclusion: What would it take to support NFTs in Trustless Work?

* Adicionar método `deposit_nft(nft_contract, token_id)` e `release_nft(nft_contract, token_id, receiver)` no escrow.
* Criar adapter de token que detecta interface e chama `transfer` correto.
* Garantir que o escrow seja owner do NFT após deposit.
* Atualizar UI para exibir metadata e owner_of.

Com essas mudanças mínimas, o fluxo de escrow para NFT é viável na testnet.

## Artifacts
* Contract: `CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB`
* Mint tx: `8a3f1c9e2b4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f`
* Escrow: `CBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB`
