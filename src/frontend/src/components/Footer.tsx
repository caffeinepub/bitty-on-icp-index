export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            <p>© {currentYear} BITTY ON ICP INDEX. All rights reserved.</p>
            <p className="mt-1 text-xs">
              Ledger Canister: <code className="text-amber-500">qroj6-lyaaa-aaaam-qeqta-cai</code>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
