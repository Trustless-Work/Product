---
description: Providers that you'll need.
icon: earth-africa
---

# Context API

## Overview

This section will show the code for the providers we will use, such as for tabs, wallet and escrows .&#x20;



## Tabs Global State Management

Tabs global state management involves maintaining and synchronizing the state of tab components across an application to ensure consistency and efficiency.

```typescript
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Tabs = "deploy" | "escrow" | "helper";

interface TabsContextType {
  activeTab: Tabs;
  setActiveTab: (tab: Tabs) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabsContext must be used within TabsProvider");
  }
  return context;
}

export function TabsProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<Tabs>("deploy");

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
}

```



## Escrow Global State Management

Escrow global state management involves handling the state related to escrow functionalities within an application. It ensures that all components engaging with escrow operations maintain a synchronized state.

```typescript
"use client";

import { Escrow } from "@/@types/escrows/escrow.entity";
import { createContext, useContext, useState, ReactNode } from "react";

/**
 *
 * Escrow Context
 *
 */
interface EscrowContextProps {
  escrow: Escrow | null;
  setEscrow: (escrow: Escrow) => void;
  resetEscrow: () => void;
}

const EscrowContext = createContext<EscrowContextProps | undefined>(undefined);

/**
 * Escrow Provider
 *
 * @Note:
 * - We're using useContext to provide the unique escrow in the whole project. But in your case, you
 *   can use Redux or Zustand to store the escrow.
 *
 */
export const EscrowProvider = ({ children }: { children: ReactNode }) => {
  const [escrow, setEscrowState] = useState<Escrow | null>(null);

  /**
   * Set Escrow
   *
   * @param newEscrow - New escrow
   */
  const setEscrow = (newEscrow: Escrow) => {
    setEscrowState(newEscrow);
  };

  /**
   * Reset Escrow
   */
  const resetEscrow = () => {
    setEscrowState(null);
  };

  return (
    <EscrowContext.Provider value={{ escrow, setEscrow, resetEscrow }}>
      {children}
    </EscrowContext.Provider>
  );
};

export const useEscrowContext = () => {
  const context = useContext(EscrowContext);
  if (!context) {
    throw new Error("useEscrowContext must be used within EscrowProvider");
  }
  return context;
};

```



## Wallet Global State Management

Wallet global state management ensures the consistent handling of wallet-related states across the application.

```typescript
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type WalletContextType = {
  walletAddress: string | null;
  walletName: string | null;
  setWalletInfo: (address: string, name: string) => void;
  clearWalletInfo: () => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletName, setWalletName] = useState<string | null>(null);

  // Load or set wallet info from localStorage
  useEffect(() => {
    const storedAddress = localStorage.getItem("walletAddress");
    const storedName = localStorage.getItem("walletName");

    if (storedAddress) setWalletAddress(storedAddress);
    if (storedName) setWalletName(storedName);
  }, []);

  /**
   * Set wallet info
   *
   * @param address - Wallet address
   * @param name - Wallet name
   */
  const setWalletInfo = (address: string, name: string) => {
    setWalletAddress(address);
    setWalletName(name);
    localStorage.setItem("walletAddress", address);
    localStorage.setItem("walletName", name);
  };

  /**
   * Clear wallet info
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

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWalletContext must be used within WalletProvider");
  }
  return context;
};

```



## Global Provider

We built a global provider in order to manage the providers.

```typescript
import { EscrowProvider } from "./escrow.provider";
import { WalletProvider } from "./wallet.provider";
import { TabsProvider } from "./tabs.provider";

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WalletProvider>
      <TabsProvider>
        <EscrowProvider>{children}</EscrowProvider>
      </TabsProvider>
    </WalletProvider>
  );
};

```

