import { API_BASE_URL, DEFAULT_ACCOUNT_ID, TRANSACTIONS_PER_PAGE, Transaction } from '../constants';

let server: any = null;

// Initialize server only on client side
if (typeof window !== 'undefined') {
  import('stellar-sdk').then((module) => {
    const { Horizon } = module;
    server = new Horizon.Server(API_BASE_URL);
  }).catch((error) => {
    console.error('Failed to initialize Stellar SDK:', error);
  });
}

function processOperation(
  operation: any | undefined,
  sourceAccount: string
): Partial<Transaction> {
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
    if (!server) {
      throw new Error('Stellar SDK not initialized');
    }

    // Fetch transactions using stellar-sdk
    const transactionsResponse = await server
      .transactions()
      .forAccount(DEFAULT_ACCOUNT_ID)
      .order('desc')
      .limit(TRANSACTIONS_PER_PAGE)
      .call();

    // Validate response structure
    if (!transactionsResponse.records?.length) {
      return {
        transactions: [],
        totalPages: 1,
        currentPage: 1
      };
    }

    const transactionsWithOperations = await Promise.all(
      transactionsResponse.records.map(async (tx: any) => {
        try {
          // Fetch operations using stellar-sdk
          const operationsResponse = await server
            .operations()
            .forTransaction(tx.id)
            .call();

          // Validate operations response structure
          if (!operationsResponse.records?.length) {
            console.warn(`No operations found for transaction ${tx.id}`);
            return null;
          }

          const operation = operationsResponse.records[0];
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

    // If we have only one row or no rows, always return page 1
    if (filteredTransactions.length <= 1) {
      return {
        transactions: filteredTransactions,
        totalPages: 1,
        currentPage: 1
      };
    }

    // Calculate pagination based on the response
    const hasNextPage = !!transactionsResponse._links?.next;
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