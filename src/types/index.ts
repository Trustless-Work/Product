export interface Transaction {
  id: string;
  functionCall: string;
  timestamp: string;
  hash: string;
  status: 'success' | 'failed' | 'pending';
  contractAddress: string;
}

export interface SorobanHooksResponse {
  success: boolean;
  data: {
    transactions: Transaction[];
    total: number;
    page: number;
    limit: number;
  };
  message?: string;
}

export interface WatcherResponse {
  success: boolean;
  data: {
    id: string;
    contractAddress: string;
    webhookUrl: string;
    chainType: string;
    createdAt: string;
  };
  message?: string;
}

export interface EscrowData {
  id: string;
  contractAddress: string;
  title: string;
  description: string;
  amount: string;
  currency: string;
  status: 'open' | 'funded' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  chainType: 'testnet' | 'mainnet';
}
