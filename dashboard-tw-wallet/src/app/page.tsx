'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import Image from "next/image"
import { StatsOverview } from "@/components/dashboard/StatsOverview"
import { TransactionsCard } from "@/components/dashboard/TransactionsCard"
import { AnalyticsCard } from "@/components/dashboard/AnalyticsCard"
import { TimeFrameSelector } from "@/components/dashboard/TimeFrameSelector"
import { useTransactions } from "@/hooks/useTransactions"
import { formatDate, formatAmount, formatAccount } from "@/lib/utils/formatting"
import { calculateTotalFees, calculateTotalEscrowedAmount } from "@/lib/utils/transactionCalculations"

export default function Home() {
  const [timeFilter, setTimeFilter] = useState('24h');
  const {
    transactions,
    isLoading,
  } = useTransactions(timeFilter);

  const totalFees = calculateTotalFees(transactions, timeFilter);
  const totalEscrowedAmount = calculateTotalEscrowedAmount(totalFees);

  return (
    <main className="flex min-h-screen flex-col p-8">
      <div className="flex flex-col gap-6 mb-6">
        <div className="flex items-center gap-4">
          <Image src="/logo.webp" alt="Trustless Work Logo" width={40} height={40} />
          <h1 className="text-2xl font-bold">Trustless Work Wallet Dashboard</h1>
        </div>
        <TimeFrameSelector timeFilter={timeFilter} onTimeFilterChange={setTimeFilter} />
      </div>

      <Tabs defaultValue="transactions" className="w-full">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-6">
          <StatsOverview 
            totalFees={totalFees} 
            totalEscrowedAmount={totalEscrowedAmount} 
            totalTransactions={transactions.length.toString()} 
          />
          
          <div className="mt-6">
            <TransactionsCard
              transactions={transactions}
              isLoading={isLoading}
              currentPage={1}
              totalPages={1}
              onPageChange={() => {}}
              formatDate={formatDate}
              formatAmount={formatAmount}
              formatAccount={formatAccount}
            />
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsCard />
        </TabsContent>
      </Tabs>
    </main>
  )
}
