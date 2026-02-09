import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';
import type { QuizItem } from '../../types/gift';

interface QuizEditorProps {
  quizItems: QuizItem[];
  onChange: (items: QuizItem[]) => void;
}

export default function QuizEditor({ quizItems, onChange }: QuizEditorProps) {
  const addQuizItem = () => {
    onChange([...quizItems, { question: '', answer: '' }]);
  };

  const updateQuizItem = (index: number, field: 'question' | 'answer', value: string) => {
    const updated = [...quizItems];
    updated[index][field] = value;
    onChange(updated);
  };

  const removeQuizItem = (index: number) => {
    onChange(quizItems.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Memory Quiz Questions</Label>
        <p className="text-sm text-muted-foreground">
          Add fun questions about your relationship. Answers are optional and will be revealed on click.
        </p>
      </div>

      {quizItems.map((item, index) => (
        <Card key={index} className="p-4 space-y-3 bg-card/50 border-romantic-primary/20">
          <div className="flex justify-between items-start">
            <Label>Question {index + 1}</Label>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeQuizItem(index)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <Input
            value={item.question}
            onChange={(e) => updateQuizItem(index, 'question', e.target.value)}
            placeholder="e.g., Where did we first meet?"
            className="border-romantic-primary/30"
          />
          <Textarea
            value={item.answer}
            onChange={(e) => updateQuizItem(index, 'answer', e.target.value)}
            placeholder="Answer (optional - will be revealed on click)"
            className="min-h-[60px] border-romantic-primary/30"
          />
        </Card>
      ))}

      <Button
        onClick={addQuizItem}
        variant="outline"
        className="w-full border-romantic-primary/30 hover:bg-romantic-primary/10"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Question
      </Button>
    </div>
  );
}
