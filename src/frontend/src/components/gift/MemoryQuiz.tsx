import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import type { QuizItem } from '../../types/gift';

interface MemoryQuizProps {
  quizItems: QuizItem[];
}

export default function MemoryQuiz({ quizItems }: MemoryQuizProps) {
  const [revealedAnswers, setRevealedAnswers] = useState<Set<number>>(new Set());

  const toggleAnswer = (index: number) => {
    setRevealedAnswers((prev) => {
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
        Our Story Quiz
      </h2>
      <div className="space-y-4">
        {quizItems.map((item, index) => (
          <Card
            key={index}
            className="p-6 bg-card/80 backdrop-blur-sm border-romantic-primary/30 space-y-4"
          >
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-romantic-primary text-white rounded-full flex items-center justify-center font-semibold">
                {index + 1}
              </span>
              <p className="flex-1 text-lg font-medium">{item.question}</p>
            </div>
            {item.answer && (
              <div className="ml-11">
                {revealedAnswers.has(index) ? (
                  <div className="space-y-2 animate-fade-in">
                    <p className="text-muted-foreground italic">{item.answer}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleAnswer(index)}
                      className="text-romantic-primary hover:text-romantic-primary hover:bg-romantic-primary/10"
                    >
                      <EyeOff className="w-4 h-4 mr-2" />
                      Hide Answer
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleAnswer(index)}
                    className="border-romantic-primary/30 hover:bg-romantic-primary/10"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Reveal Answer
                  </Button>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
