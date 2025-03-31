import { StatsCard } from "./StatsCard";

interface StatsOverviewProps {
  totalFees: string;
  totalEscrowedAmount: string;
  totalTransactions: string;
}

export function StatsOverview({ totalFees, totalEscrowedAmount, totalTransactions }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total escrowed amount"
        value={totalEscrowedAmount}
        description="Total escrowed amount from transactions"
      />
      <StatsCard
        title="Total fees collected"
        value={totalFees}
        description="Total amount of fees collected from transactions"
      />
      <StatsCard
        title="Total transactions"
        value={totalTransactions}
        description="Total number of transactions"
      />
    </div>
  );
} 