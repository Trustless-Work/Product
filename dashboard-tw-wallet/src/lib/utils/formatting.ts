export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const formatAmount = (amount: string, assetType: string, assetCode?: string) => {
  const formattedAmount = parseFloat(amount).toFixed(2);
  const displayAsset = assetType === 'native' ? 'XLM' : (assetCode || assetType);
  return `${formattedAmount} ${displayAsset}`;
};

export const formatAccount = (account: string) => {
  return `${account.slice(0, 4)}...${account.slice(-4)}`;
}; 