"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";
import { WalletProvider as ConcreteWalletProvider } from "./WalletProvider";

const WalletProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ConcreteWalletProvider>
      {children}
    </ConcreteWalletProvider>
  )
}

export default dynamic(() => Promise.resolve(WalletProvider), {
  ssr: false,
});
