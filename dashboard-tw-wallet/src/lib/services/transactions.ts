import { API_BASE_URL, DEFAULT_ACCOUNT_ID, TRANSACTIONS_PER_PAGE, Transaction } from '../constants';

interface TransactionResponse {
  _embedded: {
    records: Array<{
      id: string;
      source_account: string;
      created_at: string;
    }>;
  };
  _links: {
    next?: { href: string };
  };
}

interface OperationResponse {
  _embedded: {
    records: Array<{
      type: string;
      amount?: string;
      asset_type?: string;
      asset_code?: string;
      asset_issuer?: string;
      destination?: string;
      account?: string;
      starting_balance?: string;
      limit?: string;
      trustee?: string;
      transaction_successful?: boolean;
    }>;
  };
}

async function fetchOperations(txId: string): Promise<OperationResponse> {
  const response = await fetch(`${API_BASE_URL}/transactions/${txId}/operations`);
  return response.json();
}

function processOperation(operation: OperationResponse['_embedded']['records'][0], sourceAccount: string): Partial<Transaction> {
  if (!operation) return {};

  const baseTransaction = {
    asset_type: operation.asset_type || 'native',
    asset_code: operation.asset_code,
    asset_issuer: operation.asset_issuer,
    status: (operation.transaction_successful ? 'Completed' : 'Failed') as 'Completed' | 'Failed'
  };

  switch (operation.type) {
    case 'payment':
      return {
        ...baseTransaction,
        amount: operation.amount || '0',
        to: operation.destination || sourceAccount,
      };
    case 'create_account':
      return {
        ...baseTransaction,
        amount: operation.starting_balance || '0',
        to: operation.account || sourceAccount,
      };
    case 'change_trust':
      return {
        ...baseTransaction,
        amount: operation.limit || '0',
        to: operation.trustee || sourceAccount,
      };
    default:
      return {};
  }
}

export async function fetchRecentTransactions(page: number = 1): Promise<{ 
  transactions: Transaction[], 
  totalPages: number,
  currentPage: number 
}> {
  try {
    const url = new URL(`${API_BASE_URL}/accounts/${DEFAULT_ACCOUNT_ID}/transactions`);
    url.searchParams.append('order', 'desc');
    url.searchParams.append('limit', TRANSACTIONS_PER_PAGE.toString());
    url.searchParams.append('offset', ((page - 1) * TRANSACTIONS_PER_PAGE).toString());

    const response = await fetch(url.toString());
    const data: TransactionResponse = await response.json();

    const transactionsWithOperations = await Promise.all(
      data._embedded.records.map(async (tx) => {
        try {
          const operationsData = await fetchOperations(tx.id);
          const operation = operationsData._embedded.records[0];
          const operationData = processOperation(operation, tx.source_account);

          const transaction: Transaction = {
            id: tx.id,
            created_at: tx.created_at,
            from: tx.source_account,
            amount: operationData.amount || '0',
            asset_type: operationData.asset_type || 'native',
            asset_code: operationData.asset_code,
            asset_issuer: operationData.asset_issuer,
            to: operationData.to || tx.source_account,
            status: operationData.status || 'Completed'
          };

          return transaction;
        } catch (error) {
          console.error(`Error fetching operations for transaction ${tx.id}:`, error);
          return null;
        }
      })
    );

    const filteredTransactions = transactionsWithOperations
      .filter((tx): tx is Transaction => 
        tx !== null && 
        tx.from !== 'Unknown' && 
        tx.to !== 'Unknown' &&
        tx.to === DEFAULT_ACCOUNT_ID &&
        tx.from !== DEFAULT_ACCOUNT_ID
      );

    // Calculate total pages based on the presence of next link
    const hasNextPage = !!data._links.next;
    const totalPages = hasNextPage ? page + 1 : page;

    return {
      transactions: filteredTransactions,
      totalPages,
      currentPage: page
    };
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return { 
      transactions: [],
      totalPages: 1,
      currentPage: 1
    };
  }
} 