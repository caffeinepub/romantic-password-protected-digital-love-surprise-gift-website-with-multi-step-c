import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

interface LoveLetterProps {
  message: string;
}

export default function LoveLetter({ message }: LoveLetterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!message) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= message.length) {
        setDisplayedText(message.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [message]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-3xl md:text-4xl font-cursive text-romantic-primary text-center">
        A Letter From My Heart
      </h2>
      <Card className="p-8 md:p-12 bg-card/80 backdrop-blur-sm border-romantic-primary/30">
        <div className="prose prose-lg max-w-none">
          <p className="whitespace-pre-wrap text-foreground leading-relaxed font-serif">
            {displayedText}
            {!isComplete && <span className="animate-pulse">|</span>}
          </p>
        </div>
      </Card>
    </div>
  );
}
