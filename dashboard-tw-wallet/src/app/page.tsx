'use client';

import { useState } from "react"
import { StatsOverview } from "@/components/dashboard/StatsOverview"
import { TransactionsCard } from "@/components/dashboard/TransactionsCard"
import { TimeFrameSelector } from "@/components/dashboard/TimeFrameSelector"
import { Navigation } from "@/components/dashboard/Navigation"
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
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 lg:ml-64 p-4 lg:p-8">
        <div className="flex flex-col gap-6 mb-6">
          <TimeFrameSelector timeFilter={timeFilter} onTimeFilterChange={setTimeFilter} />
        </div>

        <div className="space-y-6">
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
        </div>
      </main>
    </div>
  )
}
