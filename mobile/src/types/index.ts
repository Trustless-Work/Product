// Tipos globais para o projeto Trustless Work Mobile

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string;
  network: string;
}

export interface Transaction {
  id: string;
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
}

export interface MeridianSDK {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getBalance(address: string): Promise<string>;
  sendTransaction(transaction: Transaction): Promise<string>;
  signMessage(message: string): Promise<string>;
}

export type { default as AppNavigation } from './navigation';
