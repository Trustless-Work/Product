import { useState, useEffect } from 'react';
import { Transaction } from '@/lib/constants';
import { fetchRecentTransactions } from '@/lib/services/transactions';

export const useTransactions = (timeFilter: string) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const loadMoreTransactions = async (page: number = 1) => {
    try {
      const { transactions: newTransactions, totalPages } = await fetchRecentTransactions(page);
      
      const filteredTransactions = filterTransactionsByTime(newTransactions, timeFilter);
      setTransactions(prev => page > 1 ? [...prev, ...filteredTransactions] : filteredTransactions);
      setCurrentPage(page);
      setHasMore(page < totalPages);
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTransactions([]);
    setCurrentPage(1);
    setHasMore(true);
    loadMoreTransactions(1);
  }, [timeFilter]);

  return {
    transactions,
    isLoading,
    hasMore,
    currentPage,
    loadMoreTransactions
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