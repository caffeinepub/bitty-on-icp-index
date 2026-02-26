import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowLeftRight, AlertCircle, TrendingUp, TrendingDown, ArrowRightLeft } from 'lucide-react';
import { useGetRecentTransactions } from '@/hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import type { TransactionWithDetail } from '../backend';

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

function TransactionTypeBadge({ type }: { type: string }) {
  const typeConfig = {
    buy: {
      icon: TrendingUp,
      variant: 'default' as const,
      className: 'bg-green-500/20 text-green-500 border-green-500/30 hover:bg-green-500/30',
    },
    sell: {
      icon: TrendingDown,
      variant: 'default' as const,
      className: 'bg-red-500/20 text-red-500 border-red-500/30 hover:bg-red-500/30',
    },
    transfer: {
      icon: ArrowRightLeft,
      variant: 'default' as const,
      className: 'bg-amber-500/20 text-amber-500 border-amber-500/30 hover:bg-amber-500/30',
    },
  };

  const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.transfer;
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className={config.className}>
      <Icon className="w-3 h-3 mr-1" />
      {type.toUpperCase()}
    </Badge>
  );
}

export function TransactionList() {
  const { data: transactions, isLoading, error } = useGetRecentTransactions(1000, 0);

  return (
    <Card className="border-amber-500/20 bg-gradient-to-br from-card to-amber-950/5 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-500">
          <ArrowLeftRight className="w-5 h-5" />
          Transaction History {!isLoading && transactions && transactions.length > 0 && `(${transactions.length})`}
        </CardTitle>
        <CardDescription>
          Recent BITTYICP token transactions on the Internet Computer
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error instanceof Error ? error.message : 'Failed to load transaction data'}
            </AlertDescription>
          </Alert>
        )}

        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : !transactions || transactions.length === 0 ? (
          <div className="p-12 text-center rounded-lg bg-muted/50 border border-border">
            <ArrowLeftRight className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium text-foreground">No transactions found</p>
            <p className="text-sm text-muted-foreground mt-2">
              Transaction history will appear here once data is available
            </p>
          </div>
        ) : (
          <div className="rounded-lg border border-amber-500/20 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-amber-500/5 hover:bg-amber-500/10">
                  <TableHead className="text-amber-500">Type</TableHead>
                  <TableHead className="text-amber-500">Timestamp</TableHead>
                  <TableHead className="text-amber-500">From</TableHead>
                  <TableHead className="text-amber-500">To</TableHead>
                  <TableHead className="text-amber-500 text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx, index) => {
                  return (
                    <TableRow key={`${tx.transaction.index}-${index}`} className="hover:bg-amber-500/5">
                      <TableCell>
                        <TransactionTypeBadge type={tx.transaction_type} />
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatTimestamp(tx.transaction.timestamp)}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {tx.transfer_from ? formatAddress(tx.transfer_from.toString()) : '-'}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {tx.transfer_to ? formatAddress(tx.transfer_to.toString()) : '-'}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatAmount(tx.amount)} BITTYICP
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
