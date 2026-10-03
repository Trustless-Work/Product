'use client';

import React, { useState, useEffect } from 'react';
import { fetchContractTransactions, createContractWatcher } from '@/lib/soroban-hooks';
import { Transaction, WatcherResponse } from '@/types';
import { Clock, RefreshCw, Plus, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

interface SorobanHooksActivityProps {
  contractAddress: string;
  chainType: 'testnet' | 'mainnet';
  onRefresh?: () => void;
}

const SorobanHooksActivity: React.FC<SorobanHooksActivityProps> = ({
  contractAddress,
  chainType,
  onRefresh,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showWatcherModal, setShowWatcherModal] = useState<boolean>(false);
  const [watcherSuccess, setWatcherSuccess] = useState<boolean>(false);
  const [watcherError, setWatcherError] = useState<string | null>(null);
  const [webhookUrl, setWebhookUrl] = useState<string>('');
  const [creatingWatcher, setCreatingWatcher] = useState<boolean>(false);

  useEffect(() => {
    loadTransactions();
  }, [contractAddress]);

  const loadTransactions = async () => {
    setLoading(true);
    setError(null);
    
    const response = await fetchContractTransactions(contractAddress);
    
    if (response.success && response.data.transactions) {
      setTransactions(response.data.transactions);
    } else {
      setError(response.message || 'Failed to load transactions');
    }
    
    setLoading(false);
  };

  const handleEnableWatcher = () => {
    setShowWatcherModal(true);
    setWatcherSuccess(false);
    setWatcherError(null);
  };

  const handleCloseModal = () => {
    setShowWatcherModal(false);
    setWebhookUrl('');
  };

  const handleSubmitWatcher = async () => {
    if (!webhookUrl.trim()) {
      setWatcherError('Please enter a valid webhook URL');
      return;
    }

    setCreatingWatcher(true);
    setWatcherError(null);

    const response: WatcherResponse = await createContractWatcher(
      contractAddress,
      chainType,
      webhookUrl.trim()
    );

    if (response.success) {
      setWatcherSuccess(true);
      setTimeout(() => {
        setShowWatcherModal(false);
        loadTransactions();
        if (onRefresh) onRefresh();
      }, 2000);
    } else {
      setWatcherError(response.message || 'Failed to create watcher');
    }

    setCreatingWatcher(false);
  };

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const truncateHash = (hash: string): string => {
    if (hash.length <= 16) return hash;
    return `${hash.slice(0, 8)}...${hash.slice(-8)}`;
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary-600" />
          Activity Timeline
        </h2>
        <button
          onClick={loadTransactions}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {loading && transactions.length === 0 ? (
        <div className="flex items-center justify-center py-12 bg-gray-50 rounded-lg">
          <RefreshCw className="w-6 h-6 text-gray-400 animate-spin mr-2" />
          <span className="text-gray-500">Loading transactions...</span>
        </div>
      ) : transactions.length > 0 ? (
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:border-primary-200 transition-colors"
            >
              <div className="flex-shrink-0 mt-0.5">
                {getStatusIcon(tx.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900">
                    {tx.functionCall}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                    {tx.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mb-1">
                  {formatTimestamp(tx.timestamp)}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>TX:</span>
                  <a
                    href={`https://stellar.expert/explorer/testnet/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-600 flex items-center gap-1"
                  >
                    {truncateHash(tx.hash)}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={handleEnableWatcher}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Enable Watcher
          </button>
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-gray-600 mb-4">No history found for this contract on SorobanHooks.</p>
          <button
            onClick={handleEnableWatcher}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Enable Watcher
          </button>
        </div>
      )}

      {showWatcherModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Create Contract Watcher
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Enable SorobanHooks to start indexing transactions for this contract.
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Webhook URL
              </label>
              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://your-webhook-url.com/hook"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="mb-4 p-3 bg-gray-50 rounded-md">
              <div className="text-sm">
                <span className="font-medium text-gray-700">Contract:</span>
                <span className="text-gray-600 ml-2">{contractAddress}</span>
              </div>
              <div className="text-sm mt-1">
                <span className="font-medium text-gray-700">Chain:</span>
                <span className="text-gray-600 ml-2 capitalize">{chainType}</span>
              </div>
            </div>

            {watcherError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{watcherError}</p>
              </div>
            )}

            {watcherSuccess && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-600 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Watcher created successfully! Loading transactions...
                </p>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitWatcher}
                disabled={creatingWatcher || !webhookUrl.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {creatingWatcher ? 'Creating...' : 'Create Watcher'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SorobanHooksActivity;
