export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const formatAmount = (amount: string, assetType: string, assetCode?: string) => {
  // Handle invalid number strings
  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount)) {
    return `0.00 ${assetType === 'native' ? 'XLM' : (assetCode || assetType)}`;
  }

  // Use a more precise number formatting approach
  const formattedAmount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: false // Don't use thousands separators for consistency
  }).format(parsedAmount);

  const displayAsset = assetType === 'native' ? 'XLM' : (assetCode || assetType);
  return `${formattedAmount} ${displayAsset}`;
};

export const formatAccount = (account: string) => {
  // Handle null, undefined, or empty strings
  if (!account) {
    return '';
  }

  // Handle short account strings (8 characters or less)
  if (account.length <= 8) {
    return account;
  }

  // Format longer account strings with ellipsis
  return `${account.slice(0, 4)}...${account.slice(-4)}`;
}; 