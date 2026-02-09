import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { GiftFormData } from '../../../types/gift';
import QuizEditor from '../QuizEditor';
import HiddenMessagesEditor from '../HiddenMessagesEditor';

interface Step3ContentProps {
  formData: GiftFormData;
  updateFormData: (updates: Partial<GiftFormData>) => void;
  onNext: () => void;
}

export default function Step3Content({ formData, updateFormData }: Step3ContentProps) {
  return (
    <Tabs defaultValue="love" className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-6">
        <TabsTrigger value="love">Love Letter</TabsTrigger>
        <TabsTrigger value="ending">Ending</TabsTrigger>
        <TabsTrigger value="quiz">Quiz</TabsTrigger>
        <TabsTrigger value="hidden">Surprises</TabsTrigger>
      </TabsList>

      <TabsContent value="love" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="loveMessage">Love Message</Label>
          <Textarea
            id="loveMessage"
            value={formData.loveMessage}
            onChange={(e) => updateFormData({ loveMessage: e.target.value })}
            placeholder="Pour your heart out... Write a beautiful love letter that will make them smile."
            className="min-h-[300px] border-romantic-primary/30 focus:border-romantic-primary"
          />
          <p className="text-sm text-muted-foreground">
            This will be displayed with a romantic typing animation
          </p>
        </div>
      </TabsContent>

      <TabsContent value="ending" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="endingMessage">Final Message</Label>
          <Textarea
            id="endingMessage"
            value={formData.endingMessage}
            onChange={(e) => updateFormData({ endingMessage: e.target.value })}
            placeholder="End with a beautiful message... This will be the last thing they see with floating hearts."
            className="min-h-[200px] border-romantic-primary/30 focus:border-romantic-primary"
          />
          <p className="text-sm text-muted-foreground">
            This appears as the final screen with floating hearts animation
          </p>
        </div>
      </TabsContent>

      <TabsContent value="quiz">
        <QuizEditor
          quizItems={formData.quizItems}
          onChange={(items) => updateFormData({ quizItems: items })}
        />
      </TabsContent>

      <TabsContent value="hidden">
        <HiddenMessagesEditor
          messages={formData.hiddenMessages}
          onChange={(messages) => updateFormData({ hiddenMessages: messages })}
        />
      </TabsContent>
    </Tabs>
  );
}
