# Trustless Work Mobile

Versão mobile do Trustless Work com suporte a Meridian Wallet.

## Requisitos
- Node.js 18+
- React Native 0.73+
- TypeScript 5+

## Instalação

```bash
cd mobile
npm install
```

## Execução

```bash
# Android
npx react-native run-android

# iOS
npx react-native run-ios
```

## Meridian Wallet

Esta versão integra com a Meridian Wallet para operações trustless.

### Configuração
1. Clone o repositório Meridian OS quando disponível
2. Configure as variáveis de ambiente no arquivo `.env`
3. Execute `npm run setup:meridian`

## Estrutura do Projeto

```
mobile/
├── src/
│   ├── components/
│   │   └── MeridianWallet.tsx
│   ├── screens/
│   │   └── WalletScreen.tsx
│   ├── config/
│   │   └── meridian.ts
│   └── App.tsx
├── package.json
└── tsconfig.json
```

## Contribuição

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## License

MIT
