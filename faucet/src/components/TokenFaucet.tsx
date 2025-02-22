import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Droplets } from "lucide-react";
import * as StellarSdk from 'stellar-sdk';
import WalletSelector from '@/components/WalletSelector';
import { WalletInfo } from '../lib/wallets';

interface TokenFaucetProps {
  stellarAddress?: string;
}

const TOKEN_CONFIG = {
  name: process.env.NEXT_PUBLIC_TOKEN_NAME,
  symbol: process.env.NEXT_PUBLIC_TOKEN_SYMBOL,
  issuer: process.env.NEXT_PUBLIC_STELLAR_ISSUER_PUBLIC_KEY,
};

const TokenFaucet = ({ stellarAddress = "" }: TokenFaucetProps) => {
  const [address, setAddress] = useState(stellarAddress);
  const [amount, setAmount] = useState("10");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [hasTrustline, setHasTrustline] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  useEffect(() => {
    setAddress(stellarAddress);
  }, [stellarAddress]);  

  useEffect(() => {
    if(address != ""){
      checkTrustline(address);      
    }
  }, [address]);

  const checkTrustline = async (stellarAddress: string) => {
    setErrorMessage(null);
    setIsLoading(true);   

    try {
      const response = await fetch('/api/faucet/check-trustline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: stellarAddress }),
      });

      if (!response.ok) {
        const errorData = await response.json();
  
        if (response.status === 404 || response.status === 500) {
          setErrorMessage('Account not found. Please check the Stellar address.');
        } else if (response.status === 400) {
          setErrorMessage('Invalid Stellar address format. Please try again.');
        } else {
          setErrorMessage(errorData.error || 'An unexpected error occurred.');
        }
      }
      else{
        const data = await response.json();
        setHasTrustline(data.hasTrustline);
      }    
    } catch (error) {
      console.error('Error checking trustline:', error);
      setHasTrustline(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWalletSelect = async (wallet: WalletInfo) => {
    setIsWalletModalOpen(false);
    await createTrustline(wallet);
  };

  const createTrustline = async (wallet: WalletInfo) => {
    setIsLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch('/api/faucet/create-trustline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      const signedTx = await wallet.sign(data.xdr);

      const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');
      const transaction = StellarSdk.TransactionBuilder.fromXDR(
        signedTx.signedXdr,
        StellarSdk.Networks.TESTNET
      );

      await server.submitTransaction(transaction);
      
      await checkTrustline(address);
      setStatus({
        type: "success",
        message: "Trustline created successfully"
      });
    } catch (error: unknown) {
      console.error('Error creating trustline:', error);
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to create trustline"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDistribution = async () => {
    setIsLoading(true);
    setStatus({ type: "", message: "" });

    try {
      if (!address.startsWith('G') || address.length !== 56) {
        throw new Error("Invalid Stellar address format");
      }

      const response = await fetch('/api/faucet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, amount }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setStatus({
        type: "success",
        message: `Successfully sent ${amount} ${TOKEN_CONFIG.symbol} tokens to ${address}`
      });
    } catch (error: unknown) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to distribute tokens"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <Card className="bg-white rounded-xl shadow-sm border">
        <div className="p-8 space-y-8">
          <div className="text-center space-y-3">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Droplets className="h-6 w-6 text-blue-500" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {TOKEN_CONFIG.name} Testnet Faucet
            </h1>
            <p className="text-gray-500 text-sm">
              Request testnet tokens for development and testing
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Stellar Address
              </label>
              <Input
                type="text"
                placeholder="Enter your Stellar address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-white"
              />
            </div>

            {errorMessage && (
              <Alert className="bg-red-50 border-red-100">
                <AlertDescription className="text-red-700">
                  {(errorMessage)}
                </AlertDescription>
              </Alert>
            )}            

            {address && !hasTrustline && !errorMessage && !isLoading && hasTrustline !== null && (
              <Alert className="bg-yellow-50 border-yellow-100">
                <AlertDescription>
                  You need to create a trustline for {TOKEN_CONFIG.symbol} tokens first
                  <Button
                    onClick={() => setIsWalletModalOpen(true)}
                    className="ml-4 bg-yellow-500 hover:bg-yellow-600 text-white"
                    disabled={isLoading}
                  >
                    Create Trustline
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Amount
              </label>
              <Select
                value={amount}
                onValueChange={setAmount}
                disabled={!hasTrustline}
              >
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select amount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 {TOKEN_CONFIG.symbol}</SelectItem>
                  <SelectItem value="25">25 {TOKEN_CONFIG.symbol}</SelectItem>
                  <SelectItem value="50">50 {TOKEN_CONFIG.symbol}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {status.message && (
              <Alert 
                variant={status.type === "error" ? "destructive" : "default"}
                className={status.type === "success" ? "bg-blue-50 border-blue-100" : ""}
              >
                <AlertDescription>{status.message}</AlertDescription>
              </Alert>
            )}

            <Button 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium"
              onClick={handleDistribution}
              disabled={isLoading || !address || !hasTrustline}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </div>
              ) : (
                `Request ${amount} ${TOKEN_CONFIG.symbol}`
              )}
            </Button>
          </div>
        </div>
      </Card>

      <WalletSelector
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onSelect={handleWalletSelect}
      />
    </div>
  );
};

export default TokenFaucet;