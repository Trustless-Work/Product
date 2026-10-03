# Indexer Spike

Indexer responsável por consumir eventos on-chain do protocolo Trustless Work na Base e materializar o estado em um store consultável.

## Escopo
- Polling de logs do contrato principal via viem
- Normalização de eventos `WorkCreated`, `ProposalSubmitted`, `WorkCompleted`
- Persistência futura em Postgres / Redis

## Como rodar
```bash
cp .env.example .env
pnpm install
pnpm start
