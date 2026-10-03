// Configuração do Meridian Wallet
// Este arquivo será atualizado quando o repositório Meridian OS estiver disponível

export const MERIDIAN_CONFIG = {
  // TODO: Adicionar configuração real quando Meridian OS estiver disponível
  enabled: false,
  network: 'mainnet' as 'mainnet' | 'testnet',
  rpcUrl: '',
  contractAddress: '',
};

export interface MeridianConfig {
  enabled: boolean;
  network: 'mainnet' | 'testnet';
  rpcUrl: string;
  contractAddress: string;
  chainId: number;
}

export const getMeridianConfig = (): MeridianConfig => {
  return {
    ...MERIDIAN_CONFIG,
    chainId: MERIDIAN_CONFIG.network === 'mainnet' ? 1 : 5,
  };
};
