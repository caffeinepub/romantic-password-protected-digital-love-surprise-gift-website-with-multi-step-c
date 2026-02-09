import { useState } from 'react';
import { useParams } from '@tanstack/react-router';
import PasswordGate from '../components/gift/PasswordGate';
import GiftPage from '../components/gift/GiftPage';
import { useGetGiftPage } from '../hooks/useQueries';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { decodeGiftData } from '../utils/giftDataEncoder';
import type { DecodedGiftData } from '../utils/giftDataEncoder';

export default function GiftUnlockPage() {
  const { giftId } = useParams({ from: '/gift/$giftId' });
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const { data: giftPage, isLoading, error } = useGetGiftPage(giftId, isUnlocked);

  const decodedData: DecodedGiftData | null = giftPage ? decodeGiftData(giftPage.tldr) : null;
  const partnerName = decodedData?.partnerName || '';

  useDocumentMeta(
    isUnlocked && partnerName ? `For ${partnerName}` : 'A Special Gift Awaits',
    'A romantic surprise created just for you'
  );

  const handleUnlock = (enteredPassword: string) => {
    setPassword(enteredPassword);
    setIsUnlocked(true);
  };

  if (!isUnlocked) {
    return <PasswordGate onUnlock={handleUnlock} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-pulse text-romantic-primary">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <p className="text-muted-foreground">Loading your gift...</p>
        </div>
      </div>
    );
  }

  if (error || !giftPage) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-md">
          <p className="text-destructive">
            {password !== giftPage?.dateHint
              ? 'Incorrect password. Please try again.'
              : 'Gift not found or an error occurred.'}
          </p>
          <button
            onClick={() => setIsUnlocked(false)}
            className="text-romantic-primary hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (password !== giftPage.dateHint) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-md">
          <p className="text-destructive">Incorrect password. Please try again.</p>
          <button
            onClick={() => setIsUnlocked(false)}
            className="text-romantic-primary hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return <GiftPage giftPage={giftPage} decodedData={decodedData} />;
}
