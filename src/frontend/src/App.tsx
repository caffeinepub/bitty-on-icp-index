import { AnimatedCoin } from './components/AnimatedCoin';
import { SupplyMetrics } from './components/SupplyMetrics';
import { TokenMetrics } from './components/TokenMetrics';
import { NavigationTabs } from './components/NavigationTabs';
import { HolderList } from './components/HolderList';
import { VideoSection } from './components/VideoSection';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useGetMetrics } from './hooks/useQueries';

export default function App() {
  const { data: metrics, isLoading: metricsLoading, isError: metricsError } = useGetMetrics();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-accent/5">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section with 2D Coin */}
        <section className="flex flex-col items-center justify-center py-8">
          <div className="w-full max-w-2xl aspect-square mx-auto">
            <AnimatedCoin />
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
            BITTY ON ICP INDEX
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground text-center max-w-2xl">
            Your complete blockchain explorer for $BITTYICP token transactions, balances, and live market data
          </p>
        </section>

        {/* Notice about indexing status */}
        <section className="max-w-2xl mx-auto">
          <Alert className="border-amber-500/50 bg-amber-500/10">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            <AlertTitle className="text-amber-500">Indexing Active</AlertTitle>
            <AlertDescription className="text-muted-foreground">
              Historical transaction data has been loaded. The system continues to index new transactions every 5 minutes to keep holder information up to date.
            </AlertDescription>
          </Alert>
        </section>

        {/* Metrics Grid */}
        <section className="grid grid-cols-1 md:grid-cols-1 gap-6 max-w-2xl mx-auto">
          <SupplyMetrics />
        </section>

        {/* Token Metrics */}
        <section className="max-w-2xl mx-auto">
          <TokenMetrics
            price={metrics?.price}
            marketCap={metrics?.marketCap}
            volume24h={metrics?.volume24h}
            isLoading={metricsLoading}
            isError={metricsError}
          />
        </section>

        {/* Navigation Tabs */}
        <section className="max-w-2xl mx-auto">
          <NavigationTabs />
        </section>

        {/* Video Section */}
        <VideoSection />

        {/* Token Holders */}
        <section className="mb-8">
          <HolderList />
        </section>
      </main>

      <Footer />
    </div>
  );
}
