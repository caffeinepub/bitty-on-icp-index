import { useEffect, useState } from 'react';

export function AnimatedCoin() {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Restart animation cycle every 10 seconds (5s roll + 5s pause)
    const interval = setInterval(() => {
      setIsAnimating(false);
      setTimeout(() => setIsAnimating(true), 50);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-amber-950/20 to-amber-900/10 shadow-2xl relative flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-radial from-amber-500/5 to-transparent" />
      
      <img
        src="/assets/IMG_4570.jpeg"
        alt="BITTY Coin"
        className={`w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full object-cover shadow-2xl border-4 border-amber-500/30 ${
          isAnimating ? 'coin-roll' : ''
        }`}
      />
      
      {/* Glimmer effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-amber-400/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-yellow-400/15 rounded-full blur-2xl animate-pulse delay-500" />
      </div>
    </div>
  );
}
