import { Card } from '@/components/ui/card';
import type { GiftFormData } from '../../../types/gift';
import HeroBanner from '../../gift/HeroBanner';
import PhotoFlipGallery from '../../gift/PhotoFlipGallery';
import LoveLetter from '../../gift/LoveLetter';
import MemoryQuiz from '../../gift/MemoryQuiz';
import HiddenMessages from '../../gift/HiddenMessages';
import EndingScreen from '../../gift/EndingScreen';

interface Step4PreviewProps {
  formData: GiftFormData;
  updateFormData: (updates: Partial<GiftFormData>) => void;
  onNext: () => void;
}

export default function Step4Preview({ formData }: Step4PreviewProps) {
  const bannerUrl = formData.bannerImage ? URL.createObjectURL(formData.bannerImage) : '';

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2 mb-6">
        <h3 className="text-xl font-cursive text-romantic-primary">Preview Your Gift</h3>
        <p className="text-sm text-muted-foreground">
          This is how your gift will appear after unlocking
        </p>
      </div>

      <div className="space-y-12 border border-romantic-primary/20 rounded-lg p-4 bg-background/50">
        {formData.bannerImage && (
          <HeroBanner
            bannerUrl={bannerUrl}
            partnerName={formData.partnerName}
            senderName={formData.senderName}
          />
        )}

        {formData.photos.length > 0 && <PhotoFlipGallery photos={formData.photos} />}

        {formData.loveMessage && <LoveLetter message={formData.loveMessage} />}

        {formData.quizItems.length > 0 && <MemoryQuiz quizItems={formData.quizItems} />}

        {formData.hiddenMessages.length > 0 && <HiddenMessages messages={formData.hiddenMessages} />}

        {formData.endingMessage && <EndingScreen message={formData.endingMessage} />}
      </div>
    </div>
  );
}
