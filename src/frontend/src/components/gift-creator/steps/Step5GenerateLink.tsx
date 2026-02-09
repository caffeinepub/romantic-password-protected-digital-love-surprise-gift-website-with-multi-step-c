import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Check, Copy, Loader2, ExternalLink } from 'lucide-react';
import { useCreateGift } from '../../../hooks/useQueries';
import type { GiftFormData } from '../../../types/gift';
import { copyToClipboard } from '../../../utils/clipboard';

interface Step5GenerateLinkProps {
  formData: GiftFormData;
  updateFormData: (updates: Partial<GiftFormData>) => void;
  onNext: () => void;
  generatedGiftId: string | null;
  setGeneratedGiftId: (id: string) => void;
}

export default function Step5GenerateLink({
  formData,
  generatedGiftId,
  setGeneratedGiftId,
}: Step5GenerateLinkProps) {
  const [copied, setCopied] = useState(false);
  const createGift = useCreateGift();

  const shareUrl = generatedGiftId
    ? `${window.location.origin}/gift/${generatedGiftId}`
    : '';

  const handleGenerate = async () => {
    try {
      const giftId = await createGift.mutateAsync(formData);
      setGeneratedGiftId(giftId);
    } catch (error) {
      console.error('Failed to create gift:', error);
    }
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(shareUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!generatedGiftId) {
    return (
      <div className="space-y-6 text-center">
        <div className="space-y-2">
          <h3 className="text-xl font-cursive text-romantic-primary">Ready to Create Your Gift?</h3>
          <p className="text-muted-foreground">
            Click below to generate your unique shareable link
          </p>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={createGift.isPending}
          size="lg"
          className="bg-romantic-primary hover:bg-romantic-primary/90 text-white px-8"
        >
          {createGift.isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating...
            </>
          ) : (
            'Generate Gift Link'
          )}
        </Button>

        {createGift.isError && (
          <p className="text-sm text-destructive">
            Failed to create gift. Please try again.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 mx-auto bg-romantic-primary/10 rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-romantic-primary" />
        </div>
        <h3 className="text-xl font-cursive text-romantic-primary">Your Gift is Ready!</h3>
        <p className="text-muted-foreground">Share this link with your special someone</p>
      </div>

      <Card className="p-4 bg-romantic-light/20 border-romantic-primary/30">
        <div className="flex gap-2">
          <Input value={shareUrl} readOnly className="flex-1 bg-background" />
          <Button
            onClick={handleCopy}
            variant="outline"
            className="border-romantic-primary/30 hover:bg-romantic-primary/10"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
      </Card>

      <div className="space-y-3">
        <Button
          asChild
          variant="outline"
          className="w-full border-romantic-primary/30 hover:bg-romantic-primary/10"
        >
          <a href={shareUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4 mr-2" />
            Preview Gift
          </a>
        </Button>

        <div className="text-center text-sm text-muted-foreground space-y-1">
          <p>Password: {formData.specialDate}</p>
          <p className="text-xs">(They'll need this to unlock the gift)</p>
        </div>
      </div>
    </div>
  );
}
