import { useState, useEffect, useCallback } from 'react';
import { Transaction } from '@/lib/constants';
import { fetchRecentTransactions } from '@/lib/services/transactions';

export const useTransactions = (timeFilter: string) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<Error | null>(null);

  const loadMoreTransactions = useCallback(async (page: number = 1) => {
    try {
      setError(null);
      const { transactions: newTransactions, totalPages: newTotalPages } = await fetchRecentTransactions(page);
      
      const filteredTransactions = filterTransactionsByTime(newTransactions, timeFilter);
      
      if (page > 1) {
        setTransactions(prev => {
          // Create a Set of existing transaction IDs
          const existingIds = new Set(prev.map(tx => tx.id));
          // Filter out any transactions that already exist
          const uniqueNewTransactions = filteredTransactions.filter(tx => !existingIds.has(tx.id));
          return [...prev, ...uniqueNewTransactions];
        });
      } else {
        setTransactions(filteredTransactions);
      }
      
      setCurrentPage(page);
      setTotalPages(newTotalPages);
      setHasMore(page < newTotalPages);
    } catch (error) {
      console.error('Error loading transactions:', error);
      setError(error instanceof Error ? error : new Error('Failed to load transactions'));
    } finally {
      setIsLoading(false);
    }
  }, [timeFilter]);

  // Initial load and time filter change effect
  useEffect(() => {
    setTransactions([]);
    setCurrentPage(1);
    setTotalPages(1);
    setHasMore(true);
    setError(null);
    loadMoreTransactions(1);
  }, [timeFilter, loadMoreTransactions]);

  // Real-time sync effect
  useEffect(() => {
    // Only start polling if we're on the first page
    if (currentPage === 1) {
      const intervalId = setInterval(() => {
        loadMoreTransactions(1);
      }, 5000); // Poll every 5 seconds

      // Cleanup interval on unmount or when page changes
      return () => clearInterval(intervalId);
    }
  }, [currentPage, loadMoreTransactions]);

  return {
    transactions,
    isLoading,
    hasMore,
    currentPage,
    totalPages,
    loadMoreTransactions,
    error
  };
};

const filterTransactionsByTime = (transactions: Transaction[], timeFilter: string) => {
  const now = new Date();
  return transactions.filter(tx => {
    const txDate = new Date(tx.created_at);
    const hoursDiff = (now.getTime() - txDate.getTime()) / (1000 * 60 * 60);
    
    switch (timeFilter) {
      case '24h':
        return hoursDiff <= 24;
      case '7d':
        return hoursDiff <= 24 * 7;
      case '30d':
        return hoursDiff <= 24 * 30;
      default:
        return true;
    }
  });
}; 