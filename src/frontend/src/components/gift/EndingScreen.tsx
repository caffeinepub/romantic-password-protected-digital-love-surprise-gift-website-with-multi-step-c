import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

interface EndingScreenProps {
  message: string;
}

export default function EndingScreen({ message }: EndingScreenProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-12">
      <Card
        className={`p-12 md:p-16 text-center bg-gradient-to-br from-romantic-light/50 to-romantic-primary/10 backdrop-blur-sm border-romantic-primary/30 transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-cursive text-romantic-primary">
            Until Forever
          </h2>
          <p className="text-lg md:text-xl text-foreground leading-relaxed whitespace-pre-wrap font-serif">
            {message}
          </p>
        </div>
      </Card>
    </div>
  );
}
