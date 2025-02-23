"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const HowToUseFaucet = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header toggleSidebar={() => setSidebarOpen(true)} />
      <div className="flex flex-1">
        <Sidebar isMobile={isMobile} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 pl-6 md:pl-8 pr-6">
          <div className="max-w-4xl py-8 space-y-10">
            {/* Header Section */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">How to Use the Faucet</h1>
              <p className="text-muted-foreground">
                Learn how to request tokens and configure your wallet for the Stellar testnet.
              </p>
            </div>

            {/* Steps to Request Tokens Section */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold tracking-tight border-b border-gray-200 pb-2">Steps to Request Tokens</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Enter your Stellar wallet address.</li>
                <li>Select the desired amount (10, 25, or 50 tokens).</li>
                <li>Click the &quot;Request Tokens&quot; button.</li>
                <li>Check your wallet balance in the Stellar testnet explorer.</li>
              </ol>
            </section>  

            {/* Trustline Configuration Section */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold tracking-tight border-b border-gray-200 pb-2">Trustline Configuration</h2>
              <p>
                The system will check if the entered wallet address has an existing trustline to the TRUST token. 
                If the trustline is missing, a message will appear prompting the user to add it automatically 
                using supported wallets such as Freighter or Albedo.
              </p>
              <p>
                If automatic addition is not possible, users can follow the detailed manual steps provided 
                in the <a href="/token-details" className="text-primary hover:underline">Token Details</a> section to 
                manually add the trustline.
              </p>
            </section>         
          </div>
        </main>
      </div>
    </div>
  );
};

export default HowToUseFaucet;
