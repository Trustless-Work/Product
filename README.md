# Test API - Soroban Contract Versioning

## Solução proposta

**Problema:** Atualizações no contrato Soroban quebram compatibilidade com contratos já implantados.

**Solução:** Registry de versão por endereço de contrato + Adapter Pattern.

1. `ContractVersionService` mantém mapeamento `contractAddress -> version`. Em produção, persistir em DB.
2. `AdapterFactory` seleciona adapter correto `v1`/`v2` baseado na versão registrada.
3. `EscrowService` normaliza payload da API para o formato esperado pelo contrato específico e simula chamada via stellar-sdk.
4. Rotas permanecem estáveis: `POST /escrow/:contractAddress/release`. A compatibilidade é transparente para o cliente.

## Demonstração

Swagger: `http://localhost:3000/api-docs`

Exemplos:
- `GET /escrow/CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/version` -> v1
- `POST /escrow/CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/release` body `{ "milestoneId":"m1","amount":"100" }`
- `POST /escrow/CBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB/release` body `{ "milestoneId":"m2","amount":"200","note":"final","recipient":"G..." }`

Novos contratos podem ser registrados com `version` nova sem quebrar contratos antigos.
