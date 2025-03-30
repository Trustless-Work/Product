export const API_BASE_URL = 'https://horizon-testnet.stellar.org';
export const DEFAULT_ACCOUNT_ID = 'GA6KH5VWPCHBOEF63X57SPX6T4H366YFFKKGCVDBTXT2N7JVL6PJCK7G';
export const TRANSACTIONS_PER_PAGE = 10;

export interface Transaction {
  id: string;
  created_at: string;
  amount: string;
  asset_type: string;
  asset_code?: string;
  asset_issuer?: string;
  from: string;
  to: string;
  status: 'Completed' | 'Failed';
} 