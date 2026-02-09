import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface HeroBannerProps {
  bannerUrl: string;
  partnerName: string;
  senderName: string;
}

export default function HeroBanner({ bannerUrl, partnerName, senderName }: HeroBannerProps) {
  const [showFor, setShowFor] = useState(false);
  const [showFrom, setShowFrom] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowFor(true), 500);
    const timer2 = setTimeout(() => setShowFrom(true), 1200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      {/* Banner Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bannerUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />
      </div>

      {/* Text Overlay */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 space-y-6">
        <div
          className={`transition-all duration-1000 transform ${
            showFor ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-cursive text-white drop-shadow-lg">
            For {partnerName}
          </h1>
        </div>

        <Heart className="w-12 h-12 text-romantic-primary fill-romantic-primary drop-shadow-lg animate-pulse" />

        <div
          className={`transition-all duration-1000 transform ${
            showFrom ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <p className="text-2xl md:text-3xl font-cursive text-white drop-shadow-lg">
            From {senderName}
          </p>
        </div>
      </div>
    </div>
  );
}
