'use client';

import React, { useState } from 'react';
import SorobanHooksActivity from '@/components/SorobanHooksActivity';
import { Contract, Clock, Shield, Users } from 'lucide-react';

export default function Home() {
  const [contractAddress, setContractAddress] = useState('');
  const [chainType, setChainType] = useState<'testnet' | 'mainnet'>('testnet');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLookup = async () => {
    if (!contractAddress.trim()) {
      setError('Please enter a contract address');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    // Simulate loading - in production this would fetch from your API
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Trustless Work</h1>
                <p className="text-sm text-gray-500">Escrow Viewer</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              SorobanHooks Integration
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Escrow Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Contract className="w-5 h-5 text-primary-600" />
                Contract Lookup
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contract Address
                  </label>
                  <input
                    type="text"
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                    placeholder="Enter contract address..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chain Type
                  </label>
                  <select
                    value={chainType}
                    onChange={(e) => setChainType(e.target.value as 'testnet' | 'mainnet')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="testnet">Testnet</option>
                    <option value="mainnet">Mainnet</option>
                  </select>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <button
                  onClick={handleLookup}
                  disabled={isLoading || !contractAddress.trim()}
                  className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Looking up...' : 'Lookup Contract'}
                </button>
              </div>
            </div>

            {/* Mock Escrow Data Display */}
            {contractAddress && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary-600" />
                  Escrow Details
                </h2>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      Open
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Amount</span>
                    <span className="font-medium">100 USDC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Created</span>
                    <span className="text-gray-600">2024-01-15</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500 break-all">
                      <span className="font-medium">Address:</span>
                      <br />
                      {contractAddress}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Activity Timeline */}
          <div className="lg:col-span-2">
            {contractAddress ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <SorobanHooksActivity
                  contractAddress={contractAddress}
                  chainType={chainType}
                />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Contract Selected
                </h3>
                <p className="text-gray-500">
                  Enter a contract address to view its transaction history on SorobanHooks
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
