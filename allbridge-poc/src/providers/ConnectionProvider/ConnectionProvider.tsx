import React, { createContext, useState } from "react";
import { ChainSymbol } from "@allbridge/bridge-core-sdk";
import EvmWallet from "./Evm";
import SolanaWallet from "./Solana";
import TronWallet from "./Tron";

type Wallet = EvmWallet | SolanaWallet | TronWallet;

interface ConnectContextI {
  account?: string;
  walletProvider?: Wallet;
  connect: (chainSymbol: ChainSymbol) => Promise<void>;
  disconnect: () => Promise<void>;
}

const defaultValue: ConnectContextI = {
  connect: () => Promise.resolve(),
  disconnect: () => Promise.resolve(),
};

export const ConnectionContext = createContext<ConnectContextI>(defaultValue);

interface Props {
  children: React.ReactNode;
}

const ConnectionProvider: React.FC<Props> = ({ children }) => {
  const [account, setAccount] = useState<string | undefined>();
  const [walletProvider, setWalletProvider] = useState<Wallet | undefined>();

  const connect = async (chainSymbol: ChainSymbol): Promise<void> => {
    try {
      const walletProvider = getWalletProvider(chainSymbol);
      const account = await walletProvider.connect();
      setAccount(account);
      setWalletProvider(walletProvider);
    } catch (error) {
      console.error("Connection error", error);
      disconnect();
    }
  };

  const disconnect = async (): Promise<void> => {
    setAccount(undefined);
    setWalletProvider(undefined);
  };

  return (
    <ConnectionContext.Provider
      value={{ account, connect, disconnect, walletProvider }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

export default ConnectionProvider;

function getWalletProvider(chainSymbol: ChainSymbol): Wallet {
  switch (chainSymbol) {
    case ChainSymbol.SOL: {
      return new SolanaWallet();
    }
    case ChainSymbol.TRX: {
      return new TronWallet();
    }

    default: {
      return new EvmWallet(chainSymbol);
    }
  }
}
