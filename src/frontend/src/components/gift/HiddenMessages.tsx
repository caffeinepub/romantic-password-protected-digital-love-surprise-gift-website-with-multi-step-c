import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Gift } from 'lucide-react';

interface HiddenMessagesProps {
  messages: string[];
}

export default function HiddenMessages({ messages }: HiddenMessagesProps) {
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());

  const toggleReveal = (index: number) => {
    setRevealedIndices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-3xl md:text-4xl font-cursive text-romantic-primary text-center">
        Hidden Surprises
      </h2>
      <p className="text-center text-muted-foreground">Click each gift to reveal a surprise message</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {messages.map((message, index) => (
          <Card
            key={index}
            className="p-6 cursor-pointer transition-all hover:scale-105 bg-card/80 backdrop-blur-sm border-romantic-primary/30"
            onClick={() => toggleReveal(index)}
          >
            {revealedIndices.has(index) ? (
              <div className="animate-fade-in text-center space-y-2">
                <p className="text-foreground leading-relaxed">{message}</p>
              </div>
            ) : (
              <div className="text-center space-y-3">
                <Gift className="w-12 h-12 mx-auto text-romantic-primary" />
                <p className="text-muted-foreground">Surprise {index + 1}</p>
                <p className="text-sm text-romantic-primary">Click to reveal</p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
