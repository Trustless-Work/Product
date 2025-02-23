"use client"

import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

const TokenDetailsPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header toggleSidebar={() => setSidebarOpen(true)} />
      <div className="flex flex-1">
        <Sidebar 
          isMobile={isMobile} 
          open={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        
        <main className="flex-1 pl-6 md:pl-8 pr-6">
          <div className="max-w-4xl py-8 space-y-10">
            {/* Header Section */}
            <div className="space-y-2">
              <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Token Details</h1>
              <p className="text-muted-foreground">
                Technical documentation for the TRUSTLESS (TRUST) testnet token
              </p>
            </div>

            {/* Token Overview Section */}
            <section className="space-y-6">
              <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight border-b border-gray-200 pb-2">Token Overview</h2>
              <div className="flex gap-6 w-full">
                {/* Token Information Card */}
                <Card className="bg-white shadow-sm w-1/2">
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                        <p className="text-lg font-semibold">TRUSTLESS</p>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Symbol</h3>
                        <p className="text-lg font-semibold">TRUST</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Network Information Card */}
                <Card className="bg-white shadow-sm w-1/2">
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Network</h3>
                        <p className="text-lg font-semibold">Stellar Testnet</p>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Total Supply</h3>
                        <p className="text-lg font-semibold">1,000,000,000 TRUST</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Account Information Section */}
            <section className="space-y-6">
              <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight border-b border-gray-200 pb-2">Account Information</h2>
              <p className="text-muted-foreground">Key accounts involved in token management and distribution.</p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2 font-semibold">Issuing Account</h3>
                  <pre className="bg-muted p-3 rounded-md font-mono text-sm">
                    GCHKE3TPY7NSJJFGBN5PC3NB3RORS6JK73BRV3XFJ2HYBP4GEYQ25SPS
                  </pre>
                  <p className="text-sm text-muted-foreground mt-2">
                    The account that created and issued the TRUST token.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2 font-semibold">Distribution Account</h3>
                  <pre className="bg-muted p-3 rounded-md font-mono text-sm">
                    GBHUUVKLAM3WOLV3CCTW6QHMDQWI7XIULDDKE4IL4RBNFKZWYVF4SIWB
                  </pre>
                  <p className="text-sm text-muted-foreground mt-2">
                    The account that holds and distributes tokens via the faucet.
                  </p>
                </div>
              </div>
            </section>

            {/* Trustline Validation Section */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold tracking-tight border-b border-gray-200 pb-2">Trustline Validation</h2>
              <p>
                Before requesting tokens, ensure your wallet has a trustline to the TRUST token. If not, you can add it
                automatically or manually:
              </p>
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-semibold">Automatic setup</h3>
                  <p className="ml-6">
                    From the faucet section, you can connect your wallet using Freighter or Albedo
                    and add the trustline with a single click. The faucet will detect if your wallet lacks the trustline and provide
                    an option to add it automatically.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-semibold">Manual setup</h3>
                  <div className="ml-6 space-y-2">
                    <p>If you prefer to add the trustline manually, follow these steps:</p>
                    <ol className="list-decimal list-inside space-y-2 ml-4">
                      <li>Open your Stellar wallet.</li>
                      <li>Navigate to the &quot;Manage Assets&quot; section.</li>
                      <li>Add a new asset by entering the following details:</li>
                      <ul className="ml-6 space-y-2 mt-2">
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span><strong>Asset Code:</strong> TRUST</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span><strong>Issuer Account:</strong> GCHKE3TPY7NSJJFGBN5PC3NB3RORS6JK73BRV3XFJ2HYBP4GEYQ25SPS</span>
                        </li>
                      </ul>
                      <li>Confirm and save the asset to establish the trustline.</li>
                    </ol>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold">Using Stellar Laboratory</h3>
                  <div className="ml-6 space-y-2">
                    <p>You can also add the trustline via Stellar Lab by following these detailed steps:</p>
                    <ol className="list-decimal list-inside space-y-2 ml-4">
                      <li>Go to <a href="https://laboratory.stellar.org/" className="text-primary hover:underline">Stellar Laboratory</a>.</li>
                      <li>On the top right corner, select &quot;Testnet&quot; to ensure you are interacting with the testnet network.</li>
                      <li>Click on &quot;Transactions&quot; to start creating a new transaction.</li>
                      <li>In the &quot;Source Account&quot; field, enter your Stellar wallet address and click &quot;Fetch next sequence&quot; to load your account data.</li>
                      <li>Under &quot;Operation Type&quot;, select &quot;Change Trust&quot; from the dropdown list.</li>
                      <li>In the &quot;Asset&quot; section, provide the asset details:</li>
                      <ul className="ml-6 space-y-2 mt-2">
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span><strong>Asset Code:</strong> TRUST</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span><strong>Issuer Account ID:</strong> GCHKE3TPY7NSJJFGBN5PC3NB3RORS6JK73BRV3XFJ2HYBP4GEYQ25SPS</span>
                        </li>
                      </ul>
                      <li>Set the limit if required or leave it blank for the default value.</li>
                      <li>Click &quot;Sign with wallet extension&quot; and sign the transaction using your Stellar wallet.</li>
                      <li>Submit the transaction and wait for the confirmation.</li>
                      <li>Verify the trustline addition by checking your account balance in the Stellar Testnet Explorer.</li>
                    </ol>
                  </div>
                </div>
              </div>
            </section>

            {/* Additional Resources Section */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight border-b border-gray-200 pb-2">Additional Resources</h2>
              <ul className="space-y-3">                
                <li className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  <a
                    href="https://laboratory.stellar.org/" className="text-primary hover:underline"
                  >
                    Stellar Laboratory
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TokenDetailsPage;