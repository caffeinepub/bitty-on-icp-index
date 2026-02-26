import { ExternalLink } from 'lucide-react';

export function NavigationTabs() {
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-2xl mx-auto">
      {/* LIQUIDITY Tab */}
      <a
        href="https://app.icpswap.com/info-tools/positions?pair=wkyqn-qqaaa-aaaar-qbyxq-cai"
        target="_blank"
        rel="noopener noreferrer"
        className="group w-full bg-gradient-to-r from-amber-500/20 via-amber-400/20 to-amber-500/20 hover:from-amber-500/30 hover:via-amber-400/30 hover:to-amber-500/30 border-2 border-amber-500/50 hover:border-amber-400 rounded-xl px-8 py-6 transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 hover:scale-[1.02]"
      >
        <div className="flex items-center justify-center gap-3">
          <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            LIQUIDITY
          </span>
          <ExternalLink className="w-6 h-6 text-amber-500 group-hover:text-amber-400 transition-colors" />
        </div>
      </a>

      {/* TRADE ON ICPSWAP Tab */}
      <a
        href="https://app.icpswap.com/swap/pro"
        target="_blank"
        rel="noopener noreferrer"
        className="group w-full bg-gradient-to-r from-amber-500/20 via-amber-400/20 to-amber-500/20 hover:from-amber-500/30 hover:via-amber-400/30 hover:to-amber-500/30 border-2 border-amber-500/50 hover:border-amber-400 rounded-xl px-8 py-6 transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 hover:scale-[1.02]"
      >
        <div className="flex items-center justify-center gap-3">
          <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            TRADE ON ICPSWAP
          </span>
          <ExternalLink className="w-6 h-6 text-amber-500 group-hover:text-amber-400 transition-colors" />
        </div>
      </a>
    </div>
  );
}
