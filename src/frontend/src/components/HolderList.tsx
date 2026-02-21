import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Users } from 'lucide-react';
import { useHolderData } from '@/hooks/useHolderData';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

function formatAddress(principal: string): string {
  if (principal.length <= 16) return principal;
  return `${principal.slice(0, 8)}...${principal.slice(-8)}`;
}

function formatBalance(balance: bigint): string {
  const amountNumber = Number(balance) / 100_000_000;
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(amountNumber);
}

function formatPercentage(percentage: number): string {
  return percentage.toFixed(2);
}

export function HolderList() {
  const { holders, isLoading, error } = useHolderData();

  // Sort holders by balance descending (largest holders first)
  const sortedHolders = [...holders].sort((a, b) => {
    if (a.balance > b.balance) return -1;
    if (a.balance < b.balance) return 1;
    return 0;
  });

  return (
    <Card className="border-amber-500/20 bg-gradient-to-br from-card to-amber-950/5 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-500">
          <Users className="w-5 h-5" />
          Token Holders {!isLoading && holders.length > 0 && `(${holders.length})`}
        </CardTitle>
        <CardDescription>
          All addresses holding BITTYICP tokens with their balances and supply percentage
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
        ) : sortedHolders.length === 0 ? (
          <div className="p-12 text-center rounded-lg bg-muted/50 border border-border">
            <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium text-foreground">No holders found</p>
            <p className="text-sm text-muted-foreground mt-2">
              Holder data will appear here once transactions are processed
            </p>
          </div>
        ) : (
          <div className="rounded-lg border border-amber-500/20 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-amber-500/5 hover:bg-amber-500/10">
                  <TableHead className="text-amber-500">Address</TableHead>
                  <TableHead className="text-amber-500 text-right">Balance</TableHead>
                  <TableHead className="text-amber-500 text-right">% of Supply</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedHolders.map((holder) => (
                  <TableRow key={holder.principal.toString()} className="hover:bg-amber-500/5">
                    <TableCell className="font-mono text-xs">
                      {formatAddress(holder.principal.toString())}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatBalance(holder.balance)} BITTYICP
                    </TableCell>
                    <TableCell className="text-right font-semibold text-amber-500">
                      {formatPercentage(holder.percentage)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
