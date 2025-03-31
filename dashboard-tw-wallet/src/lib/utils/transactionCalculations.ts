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

  // Use BigInt for precise financial calculations
  const totalFees = filteredTransactions.reduce((sum, tx) => {
    // Safely parse amount, defaulting to 0 if invalid
    const amount = tx.amount ? parseFloat(tx.amount) || 0 : 0;
    // Convert to smallest unit (stroops) to avoid floating point issues
    const amountInStroops = Math.round(amount * 10000000);
    return sum + BigInt(amountInStroops);
  }, BigInt(0));

  // Convert back to XLM with proper decimal places
  const totalFeesInXLM = Number(totalFees) / 10000000;
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: false
  }).format(totalFeesInXLM) + ' XLM';
};

export const calculateTotalEscrowedAmount = (totalFees: string) => {
  // Extract the numeric part by removing non-numeric characters except decimal point
  const numericPart = totalFees.replace(/[^\d.-]/g, '');
  
  // Handle empty or invalid numeric strings
  if (!numericPart || numericPart === '-') {
    return '0.00 XLM';
  }

  // Parse the numeric value with validation
  const totalFeesNum = parseFloat(numericPart);
  if (Number.isNaN(totalFeesNum) || !Number.isFinite(totalFeesNum)) {
    return '0.00 XLM';
  }

  // Calculate escrowed amount using precise decimal arithmetic
  const escrowedAmount = totalFeesNum / 0.003;
  
  // Format the result with proper decimal places
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: false
  }).format(escrowedAmount) + ' XLM';
}; 