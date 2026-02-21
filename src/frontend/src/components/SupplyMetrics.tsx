import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins, TrendingUp } from 'lucide-react';

const TOTAL_SUPPLY = 999_999_999.92;
const CIRCULATING_SUPPLY = 999_999_999.92;

function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

export function SupplyMetrics() {
  return (
    <Card className="border-amber-500/20 bg-gradient-to-br from-card to-amber-950/5 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-500">
          <Coins className="w-5 h-5" />
          Supply Metrics
        </CardTitle>
        <CardDescription>Total and circulating BITTY tokens</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Supply</span>
            <TrendingUp className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            {formatNumber(TOTAL_SUPPLY)}M
          </p>
          <p className="text-xs text-muted-foreground">BITTY Tokens</p>
        </div>

        <div className="h-px bg-border" />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Circulating Supply</span>
            <TrendingUp className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            {formatNumber(CIRCULATING_SUPPLY)}M
          </p>
          <p className="text-xs text-muted-foreground">BITTY Tokens</p>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <p className="text-xs text-center text-muted-foreground">
            100% of tokens are in circulation
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
