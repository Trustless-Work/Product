---
icon: wallet
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
---

# Stellar Wallet Kit - Quick Integration

## **Building a Stellar Wallet Management System**

This guide will walk you through creating a comprehensive wallet management system for Stellar blockchain integration in your React/Next.js application. The system provides secure wallet connection, disconnection, and state management with persistence.

### **Overview**

The system consists of three main components:

1. **Wallet Provider** - Global state management for wallet information
2. **Wallet Hook** - Business logic for wallet operations
3. **Wallet Kit Configuration** - Stellar blockchain integration setup

### **Step 1: Install Dependencies**

First, install the required Stellar Wallet Kit package:

```bash
npm install @creit.tech/stellar-wallets-kit
```

### **Step 2: Configure the Stellar Wallet Kit**

Create a configuration file that sets up the Stellar Wallet Kit with support for multiple wallet types:

```tsx
import {
  StellarWalletsKit,
  WalletNetwork,
  FREIGHTER_ID,
  AlbedoModule,
  FreighterModule,
} from "@creit.tech/stellar-wallets-kit";

/**
 * Main configuration for Stellar Wallet Kit
 * This kit supports multiple wallet types including Freighter and Albedo
 * Configure for TESTNET during development and MAINNET for production
 */
export const kit: StellarWalletsKit = new StellarWalletsKit({
  network: WalletNetwork.TESTNET,
  selectedWalletId: FREIGHTER_ID,
  modules: [new FreighterModule(), new AlbedoModule()],
});

/**
 * Interface for transaction signing parameters
 */
interface signTransactionProps {
  unsignedTransaction: string;
  address: string;
}

/**
 * Sign a Stellar transaction using the connected wallet
 * This function handles the signing process and returns the signed transaction
 * 
 * @param unsignedTransaction - The XDR string of the unsigned transaction
 * @param address - The wallet address that will sign the transaction
 * @returns Promise<string> - The signed transaction XDR
 */
export const signTransaction = async ({
  unsignedTransaction,
  address,
}: signTransactionProps): Promise<string> => {
  const { signedTxXdr } = await kit.signTransaction(unsignedTransaction, {
    address,
    networkPassphrase: WalletNetwork.TESTNET,
  });

  return signedTxXdr;
};
```

### **Step 3: Create the Wallet Context Provider**

The Wallet Provider manages global wallet state and persists information in localStorage for better user experienc

```tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

/**
 * Type definition for the wallet context
 * Contains wallet address, name, and functions to manage wallet state
 */
type WalletContextType = {
  walletAddress: string | null;
  walletName: string | null;
  setWalletInfo: (address: string, name: string) => void;
  clearWalletInfo: () => void;
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
  };

  return (
    <WalletContext.Provider
      value={{ walletAddress, walletName, setWalletInfo, clearWalletInfo }}
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
```

### **Step 4: Create the Wallet Hook**

The wallet hook encapsulates all the business logic for wallet operations, providing a clean interface for components:

```tsx
import { kit } from "@/config/wallet-kit";
import { useWalletContext } from "@/providers/wallet.provider";
import { ISupportedWallet } from "@creit.tech/stellar-wallets-kit";

/**
 * Custom hook that provides wallet connection and disconnection functionality
 * Integrates with the Stellar Wallet Kit and manages wallet state through context
 */
export const useWallet = () => {
  // Get wallet management functions from the context
  const { setWalletInfo, clearWalletInfo } = useWalletContext();

  /**
   * Connect to a Stellar wallet using the Wallet Kit
   * Opens a modal for wallet selection and handles the connection process
   * Automatically sets wallet information in the context upon successful connection
   */
  const connectWallet = async () => {
    await kit.openModal({
      modalTitle: "Connect to your favorite wallet",
      onWalletSelected: async (option: ISupportedWallet) => {
        // Set the selected wallet as the active wallet
        kit.setWallet(option.id);

        // Get the wallet address and name
        const { address } = await kit.getAddress();
        const { name } = option;

        // Store wallet information in the context and localStorage
        setWalletInfo(address, name);
      },
    });
  };

  /**
   * Disconnect from the current wallet
   * Clears wallet information from the context and localStorage
   * Disconnects the wallet from the Stellar Wallet Kit
   */
  const disconnectWallet = async () => {
    await kit.disconnect();
    clearWalletInfo();
  };

  /**
   * Handle wallet connection with error handling
   * Wraps the connectWallet function in a try-catch block for better error management
   */
  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error("Error connecting wallet:", error);
      // You can add additional error handling here, such as showing user notifications
    }
  };

  /**
   * Handle wallet disconnection with error handling
   * Wraps the disconnectWallet function in a try-catch block for better error management
   */
  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
      // You can add additional error handling here, such as showing user notifications
    }
  };

  return {
    connectWallet,
    disconnectWallet,
    handleConnect,
    handleDisconnect,
  };
};
```

### **Step 5: Integrate the Provider in Your App**

Wrap your application with the WalletProvider to enable wallet state management throughout your app:

```tsx
import { WalletProvider } from "@/providers/wallet.provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
```

### **Step 6: Use the Wallet Hook in Components**

Now you can use the wallet functionality in any component. Here's an example of a wallet connection button:

```tsx
import { useWallet } from "@/hooks/wallet.hook";
import { useWalletContext } from "@/providers/wallet.provider";

/**
 * Wallet connection/disconnection button component
 * Shows different states based on wallet connection status
 */
export const WalletButton = () => {
  const { handleConnect, handleDisconnect } = useWallet();
  const { walletAddress, walletName } = useWalletContext();

  // If wallet is connected, show disconnect option
  if (walletAddress) {
    return (
      <div className="flex items-center gap-4">
        <div className="text-sm">
          <p className="font-medium">Connected: {walletName}</p>
          <p className="text-gray-500">{walletAddress}</p>
        </div>
        <button 
          onClick={handleDisconnect}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Disconnect
        </button>
      </div>
    );
  }

  // If wallet is not connected, show connect option
  return (
    <button 
      onClick={handleConnect}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Connect Wallet
    </button>
  );
};
```

### **Key Features and Benefits**

#### **State Persistence**

* Wallet information is automatically saved to localStorage
* Users don't need to reconnect their wallet every time they visit your app
* Seamless user experience across browser sessions

#### **Multi-Wallet Support**

* Supports multiple Stellar wallet types (Freighter, Albedo, etc.)
* Easy to add new wallet modules as they become available
* Users can choose their preferred wallet

#### **Error Handling**

* Comprehensive error handling for wallet operations
* Graceful fallbacks when wallet operations fail
* Easy to extend with custom error notifications

#### **Type Safety**

* Full TypeScript support with proper type definitions
* IntelliSense support for better development experience
* Compile-time error checking for wallet operations

#### **Context-Based Architecture**

* Clean separation of concerns between state management and business logic
* Easy to access wallet state from any component
* Centralized wallet state management

### **Configuration Options**

#### **Network Selection**

* **TESTNET**: Use during development and testing
* **MAINNET**: Use for production applications
