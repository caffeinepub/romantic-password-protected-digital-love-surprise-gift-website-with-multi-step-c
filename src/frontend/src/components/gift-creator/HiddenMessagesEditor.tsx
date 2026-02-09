import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';

interface HiddenMessagesEditorProps {
  messages: string[];
  onChange: (messages: string[]) => void;
}

export default function HiddenMessagesEditor({ messages, onChange }: HiddenMessagesEditorProps) {
  const addMessage = () => {
    onChange([...messages, '']);
  };

  const updateMessage = (index: number, value: string) => {
    const updated = [...messages];
    updated[index] = value;
    onChange(updated);
  };

  const removeMessage = (index: number) => {
    onChange(messages.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Hidden Surprise Messages</Label>
        <p className="text-sm text-muted-foreground">
          Add secret messages that will be hidden and revealed one by one when clicked
        </p>
      </div>

      {messages.map((message, index) => (
        <Card key={index} className="p-4 space-y-3 bg-card/50 border-romantic-primary/20">
          <div className="flex justify-between items-start">
            <Label>Message {index + 1}</Label>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeMessage(index)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <Textarea
            value={message}
            onChange={(e) => updateMessage(index, e.target.value)}
            placeholder="Write a surprise message..."
            className="min-h-[80px] border-romantic-primary/30"
          />
        </Card>
      ))}

      <Button
        onClick={addMessage}
        variant="outline"
        className="w-full border-romantic-primary/30 hover:bg-romantic-primary/10"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Hidden Message
      </Button>
    </div>
  );
}
