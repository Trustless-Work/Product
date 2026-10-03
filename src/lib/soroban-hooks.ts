import { SorobanHooksResponse, WatcherResponse } from '@/types';

const SOROBANHOOKS_API_URL = 'https://api.sorobanhooks.xyz/v1/api';

export async function fetchContractTransactions(
  contractAddress: string,
  page: number = 1,
  limit: number = 25
): Promise<SorobanHooksResponse> {
  try {
    const response = await fetch(
      `${SOROBANHOOKS_API_URL}/contract/transactions?address=${encodeURIComponent(contractAddress)}&page=${page}&limit=${limit}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data as SorobanHooksResponse;
  } catch (error) {
    console.error('Error fetching contract transactions:', error);
    return {
      success: false,
      data: { transactions: [], total: 0, page, limit },
      message: error instanceof Error ? error.message : 'Failed to fetch transactions'
    };
  }
}

export async function createContractWatcher(
  contractAddress: string,
  chainType: string,
  webhookUrl: string
): Promise<WatcherResponse> {
  try {
    const response = await fetch(`${SOROBANHOOKS_API_URL}/get_contract_transaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        webhook_url: webhookUrl,
        chainType,
        contractAddress,
        enableTransactionHistory: true,
        enableStorage: true,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data as WatcherResponse;
  } catch (error) {
    console.error('Error creating contract watcher:', error);
    return {
      success: false,
      data: { id: '', contractAddress, webhookUrl, chainType, createdAt: '' },
      message: error instanceof Error ? error.message : 'Failed to create watcher'
    };
  }
}

export async function getContractWatcher(watcherId: string): Promise<any> {
  try {
    const response = await fetch(
      `${SOROBANHOOKS_API_URL}/get_contract_transaction/${watcherId}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching contract watcher:', error);
    return null;
  }
}

export async function deleteContractWatcher(watcherId: string): Promise<boolean> {
  try {
    const response = await fetch(
      `${SOROBANHOOKS_API_URL}/get_contract_transaction/${watcherId}`,
      {
        method: 'DELETE',
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting contract watcher:', error);
    return false;
  }
}
