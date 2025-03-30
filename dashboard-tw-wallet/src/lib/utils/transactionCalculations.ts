import { Transaction } from '@/lib/constants';

export const calculateTotalFees = (transactions: Transaction[], timeFilter: string) => {
  const now = new Date();
  const filteredTransactions = transactions.filter(tx => {
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

  const totalFees = filteredTransactions.reduce((sum, tx) => {
    const amount = parseFloat(tx.amount);
    return sum + amount;
  }, 0);

  return `${totalFees.toFixed(2)} XLM`;
};

export const calculateTotalEscrowedAmount = (totalFees: string) => {
  const totalFeesNum = parseFloat(totalFees);
  const totalEscrowedAmount = (totalFeesNum/0.003).toFixed(2);
  return `${totalEscrowedAmount} XLM`;
}; 