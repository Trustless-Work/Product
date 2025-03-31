'use client';

import { useState, useMemo } from "react"
import { StatsOverview } from "@/components/dashboard/StatsOverview"
import { TransactionsCard } from "@/components/dashboard/TransactionsCard"
import { TimeFrameSelector } from "@/components/dashboard/TimeFrameSelector"
import { Navigation } from "@/components/dashboard/Navigation"
import { useTransactions } from "@/hooks/useTransactions"
import { formatDate, formatAmount, formatAccount } from "@/lib/utils/formatting"
import { calculateTotalFees, calculateTotalEscrowedAmount } from "@/lib/utils/transactionCalculations"

const ITEMS_PER_PAGE = 10;

export default function Home() {
  const [timeFilter, setTimeFilter] = useState('24h');
  const [currentPage, setCurrentPage] = useState(1);
  
  const {
    transactions,
    isLoading,
    loadMoreTransactions
  } = useTransactions(timeFilter);

  // Calculate total pages
  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
  
  // Get current page items
  const currentTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return transactions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [transactions, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Reset to first page when time filter changes
  const handleTimeFilterChange = (newFilter: string) => {
    setTimeFilter(newFilter);
    setCurrentPage(1);
  };

  const totalFees = calculateTotalFees(transactions, timeFilter);
  const totalEscrowedAmount = calculateTotalEscrowedAmount(totalFees);

  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 lg:ml-64 p-4 lg:p-8">
        <div className="flex flex-col gap-6 mb-6">
          <TimeFrameSelector 
            timeFilter={timeFilter} 
            onTimeFilterChange={handleTimeFilterChange} 
          />
        </div>

        <div className="space-y-6">
          <StatsOverview 
            totalFees={totalFees} 
            totalEscrowedAmount={totalEscrowedAmount} 
            totalTransactions={transactions.length.toString()} 
          />
          
          <div className="mt-6">
            <TransactionsCard
              transactions={currentTransactions}
              isLoading={isLoading}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
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
