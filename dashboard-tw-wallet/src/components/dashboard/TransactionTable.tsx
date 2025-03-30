import { Transaction } from "@/lib/constants";

interface TransactionTableProps {
  transactions: Transaction[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  formatDate: (date: string) => string;
  formatAmount: (amount: string, assetType: string, assetCode?: string) => string;
  formatAccount: (account: string) => string;
}

export function TransactionTable({
  transactions,
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
  formatDate,
  formatAmount,
  formatAccount,
}: TransactionTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b">
            <th className="pb-4 font-medium">Transaction ID</th>
            <th className="pb-4 font-medium">From</th>
            <th className="pb-4 font-medium">Amount</th>
            <th className="pb-4 font-medium">Asset</th>
            <th className="pb-4 font-medium">Date</th>
            <th className="pb-4 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && transactions.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-4 text-center">Loading transactions...</td>
            </tr>
          ) : transactions.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-4 text-center">No transactions found</td>
            </tr>
          ) : (
            <>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b">
                  <td className="py-4">{tx.id.slice(0, 8)}...</td>
                  <td className="py-4">{formatAccount(tx.from)}</td>
                  <td className="py-4">{formatAmount(tx.amount, tx.asset_type, tx.asset_code)}</td>
                  <td className="py-4">{tx.asset_type === 'native' ? 'XLM' : (tx.asset_code || tx.asset_type)}</td>
                  <td className="py-4">{formatDate(tx.created_at)}</td>
                  <td className="py-4">
                    <span className={tx.status === 'Completed' ? 'text-green-600' : 'text-red-600'}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
              {totalPages > 1 && (
                <tr>
                  <td colSpan={6} className="py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={isLoading || currentPage === 1}
                        className="px-3 py-1 text-sm border rounded hover:bg-gray-100 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <span className="px-3 py-1 text-sm">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={isLoading || currentPage === totalPages}
                        className="px-3 py-1 text-sm border rounded hover:bg-gray-100 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
} 