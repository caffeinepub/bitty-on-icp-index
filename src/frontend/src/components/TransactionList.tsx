import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ArrowLeftRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTransactions } from '@/hooks/useTransactions';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

function formatAddress(principal: string): string {
  if (principal.length <= 16) return principal;
  return `${principal.slice(0, 8)}...${principal.slice(-8)}`;
}

function formatAmount(amount: bigint): string {
  const amountNumber = Number(amount) / 100_000_000;
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(amountNumber);
}

function formatTimestamp(timestamp: bigint): string {
  const date = new Date(Number(timestamp) / 1_000_000);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function TransactionList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { paginatedTransactions, totalPages, isLoading, error } = useTransactions(currentPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  return (
    <Card className="border-amber-500/20 bg-gradient-to-br from-card to-amber-950/5 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-500">
          <ArrowLeftRight className="w-5 h-5" />
          Recent Transactions
        </CardTitle>
        <CardDescription>
          Last 100 indexed BITTYICP token transactions with pagination
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : paginatedTransactions.length === 0 ? (
          <div className="p-12 text-center rounded-lg bg-muted/50 border border-border">
            <ArrowLeftRight className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium text-foreground">No transactions found</p>
            <p className="text-sm text-muted-foreground mt-2">
              Transaction data will appear here once indexed
            </p>
          </div>
        ) : (
          <>
            <div className="rounded-lg border border-amber-500/20 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-amber-500/5 hover:bg-amber-500/10">
                    <TableHead className="text-amber-500">From</TableHead>
                    <TableHead className="text-amber-500">To</TableHead>
                    <TableHead className="text-amber-500 text-right">Amount</TableHead>
                    <TableHead className="text-amber-500">Status</TableHead>
                    <TableHead className="text-amber-500">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedTransactions.map((tx, index) => (
                    <TableRow key={`${tx.txid}-${index}`} className="hover:bg-amber-500/5">
                      <TableCell className="font-mono text-xs">
                        {formatAddress(tx.from.toString())}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {formatAddress(tx.to.toString())}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatAmount(tx.amount)} BITTYICP
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                          {tx.status || 'Completed'}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatTimestamp(tx.block_timestamp)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4">
                <p className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="border-amber-500/20 hover:bg-amber-500/10 hover:text-amber-500"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="border-amber-500/20 hover:bg-amber-500/10 hover:text-amber-500"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
