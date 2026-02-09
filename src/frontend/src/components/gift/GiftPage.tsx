import { useEffect, useState } from 'react';
import type { GiftPage as GiftPageType } from '../../backend';
import type { DecodedGiftData } from '../../utils/giftDataEncoder';
import HeroBanner from './HeroBanner';
import PhotoFlipGallery from './PhotoFlipGallery';
import LoveLetter from './LoveLetter';
import MemoryQuiz from './MemoryQuiz';
import HiddenMessages from './HiddenMessages';
import EndingScreen from './EndingScreen';
import FloatingHearts from './FloatingHearts';

interface GiftPageProps {
  giftPage: GiftPageType;
  decodedData: DecodedGiftData | null;
}

export default function GiftPage({ giftPage, decodedData }: GiftPageProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Smooth entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!decodedData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-destructive">Unable to load gift data</p>
      </div>
    );
  }

  // Convert Uint8Array to proper ArrayBuffer for Blob
  const bannerArray = new Uint8Array(giftPage.mainBlob);
  const bannerBlob = new Blob([bannerArray.buffer], { type: 'image/jpeg' });
  const bannerUrl = URL.createObjectURL(bannerBlob);

  const photos = giftPage.collagePositions.map((item, index) => {
    const photoArray = new Uint8Array(item[2]);
    const blob = new Blob([photoArray.buffer], { type: 'image/jpeg' });
    return {
      file: new File([blob], `photo-${index}.jpg`, { type: 'image/jpeg' }),
      note: decodedData.photoNotes[index] || '',
      preview: URL.createObjectURL(blob),
    };
  });

  return (
    <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <FloatingHearts />
      
      <div className="space-y-16 pb-16">
        <HeroBanner
          bannerUrl={bannerUrl}
          partnerName={decodedData.partnerName}
          senderName={decodedData.senderName}
        />

        {photos.length > 0 && (
          <section className="container mx-auto px-4">
            <PhotoFlipGallery photos={photos} />
          </section>
        )}

        {decodedData.loveMessage && (
          <section className="container mx-auto px-4">
            <LoveLetter message={decodedData.loveMessage} />
          </section>
        )}

        {decodedData.quizItems.length > 0 && (
          <section className="container mx-auto px-4">
            <MemoryQuiz quizItems={decodedData.quizItems} />
          </section>
        )}

        {decodedData.hiddenMessages.length > 0 && (
          <section className="container mx-auto px-4">
            <HiddenMessages messages={decodedData.hiddenMessages} />
          </section>
        )}

        {decodedData.endingMessage && (
          <section className="container mx-auto px-4">
            <EndingScreen message={decodedData.endingMessage} />
          </section>
        )}
      </div>
    </div>
  );
}
