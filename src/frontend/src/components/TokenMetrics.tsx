import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, DollarSign, Activity } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface TokenMetricsProps {
  price?: number;
  marketCap?: number;
  volume24h?: number;
  isLoading?: boolean;
  isError?: boolean;
}

function formatPrice(price: number): string {
  return `$${price.toFixed(6)}`;
}

function formatLargeNumber(num: number): string {
  if (num >= 1_000_000) {
    return `$${(num / 1_000_000).toFixed(2)}M`;
  } else if (num >= 1_000) {
    return `$${(num / 1_000).toFixed(2)}K`;
  }
  return `$${num.toFixed(2)}`;
}

export function TokenMetrics({ price, marketCap, volume24h, isLoading, isError }: TokenMetricsProps) {
  if (isError) {
    return (
      <Card className="border-amber-500/20 bg-gradient-to-br from-card to-amber-950/5 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-500">
            <Activity className="w-5 h-5" />
            Token Metrics
          </CardTitle>
          <CardDescription>Live market data</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            Unable to load metrics data
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-amber-500/20 bg-gradient-to-br from-card to-amber-950/5 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-500">
          <Activity className="w-5 h-5" />
          Token Metrics
        </CardTitle>
        <CardDescription>Live market data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Live Price */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Live Price</span>
            <DollarSign className="w-4 h-4 text-amber-500" />
          </div>
          {isLoading ? (
            <Skeleton className="h-9 w-32" />
          ) : (
            <p className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              {price !== undefined ? formatPrice(price) : '--'}
            </p>
          )}
          <p className="text-xs text-muted-foreground">USD per BITTY</p>
        </div>

        <div className="h-px bg-border" />

        {/* Market Cap */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Market Cap</span>
            <TrendingUp className="w-4 h-4 text-amber-500" />
          </div>
          {isLoading ? (
            <Skeleton className="h-9 w-32" />
          ) : (
            <p className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              {marketCap !== undefined ? formatLargeNumber(marketCap) : '--'}
            </p>
          )}
          <p className="text-xs text-muted-foreground">Total Market Value</p>
        </div>

        <div className="h-px bg-border" />

        {/* 24hr Volume */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">24hr Volume</span>
            <Activity className="w-4 h-4 text-amber-500" />
          </div>
          {isLoading ? (
            <Skeleton className="h-9 w-32" />
          ) : (
            <p className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              {volume24h !== undefined ? formatLargeNumber(volume24h) : '--'}
            </p>
          )}
          <p className="text-xs text-muted-foreground">Trading Volume</p>
        </div>
      </CardContent>
    </Card>
  );
}
