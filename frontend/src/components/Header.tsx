import { Coins, ExternalLink } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
            <Coins className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              BITTY ON ICP
            </h2>
            <p className="text-xs text-muted-foreground">Blockchain Explorer</p>
          </div>
        </div>
        
        <nav className="flex items-center gap-6">
          <a 
            href="https://bittyonicp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-bold text-amber-500 hover:text-amber-400 transition-colors"
          >
            BITTYONICP.COM
            <ExternalLink className="w-4 h-4" />
          </a>
        </nav>
      </div>
    </header>
  );
}
