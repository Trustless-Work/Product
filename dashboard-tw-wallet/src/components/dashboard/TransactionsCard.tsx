import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TransactionTable } from "./TransactionTable";
import { Transaction } from "@/lib/constants";

interface TransactionsCardProps {
  transactions: Transaction[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  formatDate: (date: string) => string;
  formatAmount: (amount: string, assetType: string, assetCode?: string) => string;
  formatAccount: (account: string) => string;
}

export function TransactionsCard({
  transactions,
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
  formatDate,
  formatAmount,
  formatAccount,
}: TransactionsCardProps) {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Recent Transactions</CardTitle>
          <p className="text-sm text-muted-foreground">
            View your most recent transactions on the Stellar network.
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <TransactionTable
          transactions={transactions}
          isLoading={isLoading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          formatDate={formatDate}
          formatAmount={formatAmount}
          formatAccount={formatAccount}
        />
      </CardContent>
    </Card>
  );
} 