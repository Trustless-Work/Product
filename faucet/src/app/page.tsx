"use client"

import React from 'react';
import Sidebar from '@/components/Sidebar';
import TokenFaucet from "@/components/TokenFaucet";
import Header from "@/components/Header";
import { useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const Page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header toggleSidebar={() => setSidebarOpen(true)} />
      <div className="flex flex-1 overflow-hidden">
      <Sidebar 
      isMobile={isMobile} 
      open={sidebarOpen} 
      onClose={() => setSidebarOpen(false)} 
    />
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-4xl space-y-6">
            <TokenFaucet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;