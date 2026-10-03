/**
 * React hook for Moonpay integration
 */

import { useCallback, useState } from 'react';
import MoonpayService from '../index';
import type { MoonpayConfig, MoonpayTransaction } from '../index';

export function useMoonpay(config: MoonpayConfig) {
  const [transaction, setTransaction] = useState<MoonpayTransaction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const service = new MoonpayService(config);

  /**
   * Initiate a Moonpay buy flow
   */
  const initiateBuy = useCallback(
    async (params: {
      walletAddress: string;
      amount?: number;
      currency?: string;
      onSuccess?: (transaction: MoonpayTransaction) => void;
      onError?: (error: Error) => void;
    }) => {
      setIsLoading(true);
      setError(null);

      try {
        const buyUrl = service.getBuyUrl({
          walletAddress: params.walletAddress,
          amount: params.amount,
          currency: params.currency,
        });

        // Open Moonpay in a new window/tab
        const popup = window.open(buyUrl, '_blank', 'width=600,height=800');

        if (!popup) {
          throw new Error('Popup blocked. Please allow popups for this site.');
        }

        // Listen for postMessage from Moonpay
        const handleMessage = (event: MessageEvent) => {
          if (event.origin !== new URL(buyUrl).origin) return;

          if (event.data?.type === 'moonpay_buy_completed') {
            setTransaction(event.data.transaction as MoonpayTransaction);
            params.onSuccess?.(event.data.transaction as MoonpayTransaction);
          } else if (event.data?.type === 'moonpay_buy_error') {
            setError(event.data.message);
            params.onError?.(new Error(event.data.message));
          }
        };

        window.addEventListener('message', handleMessage);

        // Cleanup after 10 minutes
        setTimeout(() => {
          window.removeEventListener('message', handleMessage);
        }, 10 * 60 * 1000);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initiate buy');
      } finally {
        setIsLoading(false);
      }
    },
    [service],
  );

  /**
   * Check transaction status
   */
  const checkStatus = useCallback(
    async (transactionId: string): Promise<MoonpayTransaction> => {
      setIsLoading(true);
      setError(null);

      try {
        const status = await service.getTransactionStatus(transactionId);
        setTransaction(status);
        return status;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to check status');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [service],
  );

  return {
    transaction,
    isLoading,
    error,
    initiateBuy,
    checkStatus,
  };
}

export default useMoonpay;
