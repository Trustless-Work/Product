"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  StellarWalletsKit,
  WalletNetwork,
  FreighterModule,
  xBullModule,
  AlbedoModule,
} from "@creit.tech/stellar-wallets-kit";

/**
 * Type definition for the wallet context
 * Contains wallet address, name, and functions to manage wallet state
 */
type WalletContextType = {
  walletAddress: string | null;
  walletName: string | null;
  setWalletInfo: (address: string, name: string) => void;
  clearWalletInfo: () => void;
  stellarKit: StellarWalletsKit | null;
};

/**
 * Create the React context for wallet state management
 */
const WalletContext = createContext<WalletContextType | undefined>(undefined);

/**
 * Wallet Provider component that wraps the application
 * Manages wallet state and provides wallet information to child components
 * Automatically loads saved wallet information from localStorage on initialization
 */
export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletName, setWalletName] = useState<string | null>(null);
  const [stellarKit, setStellarKit] = useState<StellarWalletsKit | null>(null);

  useEffect(() => {
    // Prefer persisted walletId (e.g., "freighter") over display name
    const rawId = (typeof window !== "undefined"
      ? localStorage.getItem("walletId")
      : null) as string | null;

    const normalizeWalletId = (id: string | null): string | undefined => {
      if (!id) return undefined;
      const lower = id.toLowerCase();
      if (["freighter", "xbull", "albedo"].includes(lower)) return lower;
      // Some earlier versions stored display names like "Freighter"; ignore unsupported values
      return undefined;
    };

    const selectedId = normalizeWalletId(rawId) as any;

    try {
      const kit = new StellarWalletsKit({
        network: WalletNetwork.TESTNET,
        selectedWalletId: selectedId,
        modules: [
          new FreighterModule(),
          new xBullModule(),
          new AlbedoModule(),
        ],
      });
      setStellarKit(kit);
    } catch (e) {
      // Fallback without preselected wallet if an invalid id slipped through
      const kit = new StellarWalletsKit({
        network: WalletNetwork.TESTNET,
        modules: [new FreighterModule(), new xBullModule(), new AlbedoModule()],
      } as any);
      setStellarKit(kit);
    }
  }, [walletName]);

  /**
   * Load saved wallet information from localStorage when the component mounts
   * This ensures the wallet state persists across browser sessions
   */
  useEffect(() => {
    const storedAddress = localStorage.getItem("walletAddress");
    const storedName = localStorage.getItem("walletName");

    if (storedAddress) setWalletAddress(storedAddress);
    if (storedName) setWalletName(storedName);
  }, []);

  /**
   * Set wallet information and save it to localStorage
   * This function is called when a wallet is successfully connected
   *
   * @param address - The wallet's public address
   * @param name - The name/identifier of the wallet (e.g., "Freighter", "Albedo")
   */
  const setWalletInfo = (address: string, name: string) => {
    setWalletAddress(address);
    setWalletName(name);
    localStorage.setItem("walletAddress", address);
    localStorage.setItem("walletName", name);
  };

  /**
   * Clear wallet information and remove it from localStorage
   * This function is called when disconnecting a wallet
   */
  const clearWalletInfo = () => {
    setWalletAddress(null);
    setWalletName(null);
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("walletName");
    localStorage.removeItem("walletId");
  };

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        walletName,
        setWalletInfo,
        clearWalletInfo,
        stellarKit,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

/**
 * Custom hook to access the wallet context
 * Provides wallet state and functions to components
 * Throws an error if used outside of WalletProvider
 */
export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWalletContext must be used within WalletProvider");
  }
  return context;
};
