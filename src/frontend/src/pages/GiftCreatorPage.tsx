import { useEffect } from 'react';
import GiftCreatorWizard from '../components/gift-creator/GiftCreatorWizard';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function GiftCreatorPage() {
  useDocumentMeta('Create Your Surprise Gift', 'Create a beautiful romantic digital gift for someone special');

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-4xl md:text-5xl font-cursive text-romantic-primary">
            Create Your Love Gift
          </h1>
          <p className="text-muted-foreground">
            A personalized romantic surprise that will touch their heart
          </p>
        </div>
        <GiftCreatorWizard />
      </div>
    </div>
  );
}
