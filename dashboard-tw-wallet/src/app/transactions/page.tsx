'use client';

import { useState } from "react"
import { TransactionsCard } from "@/components/dashboard/TransactionsCard"
import { TimeFrameSelector } from "@/components/dashboard/TimeFrameSelector"
import { Navigation } from "@/components/dashboard/Navigation"
import { useTransactions } from "@/hooks/useTransactions"
import { formatDate, formatAmount, formatAccount } from "@/lib/utils/formatting"

export default function TransactionsPage() {
  const [timeFilter, setTimeFilter] = useState('24h');
  const {
    transactions,
    isLoading,
    currentPage,
    totalPages,
    loadMoreTransactions,
    error
  } = useTransactions(timeFilter);

  const handlePageChange = (page: number) => {
    loadMoreTransactions(page);
  };

  if (error) {
    return (
      <div className="flex min-h-screen">
        <Navigation />
        <main className="flex-1 lg:ml-64 p-4 lg:p-8">
          <div className="flex flex-col gap-6 mb-6">
            <TimeFrameSelector timeFilter={timeFilter} onTimeFilterChange={setTimeFilter} />
          </div>
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            <p className="font-medium">Error loading transactions</p>
            <p className="text-sm mt-1">{error.message}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 lg:ml-64 p-4 lg:p-8">
        <div className="flex flex-col gap-6 mb-6">
          <TimeFrameSelector timeFilter={timeFilter} onTimeFilterChange={setTimeFilter} />
        </div>

        <TransactionsCard
          transactions={transactions}
          isLoading={isLoading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          formatDate={formatDate}
          formatAmount={formatAmount}
          formatAccount={formatAccount}
        />
      </main>
    </div>
  )
} 