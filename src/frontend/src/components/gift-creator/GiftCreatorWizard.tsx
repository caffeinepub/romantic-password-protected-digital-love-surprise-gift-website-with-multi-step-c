import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Step1Basics from './steps/Step1Basics';
import Step2Images from './steps/Step2Images';
import Step3Content from './steps/Step3Content';
import Step4Preview from './steps/Step4Preview';
import Step5GenerateLink from './steps/Step5GenerateLink';
import type { GiftFormData, PhotoWithNote } from '../../types/gift';

const STEPS = [
  { id: 1, title: 'Basic Info', component: Step1Basics },
  { id: 2, title: 'Images', component: Step2Images },
  { id: 3, title: 'Messages', component: Step3Content },
  { id: 4, title: 'Preview', component: Step4Preview },
  { id: 5, title: 'Share', component: Step5GenerateLink },
];

export default function GiftCreatorWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<GiftFormData>({
    partnerName: '',
    senderName: '',
    email: '',
    specialDate: '',
    bannerImage: null,
    photos: [],
    loveMessage: '',
    endingMessage: '',
    quizItems: [],
    hiddenMessages: [],
  });
  const [generatedGiftId, setGeneratedGiftId] = useState<string | null>(null);

  const updateFormData = (updates: Partial<GiftFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.partnerName.trim() &&
          formData.senderName.trim() &&
          formData.email.trim() &&
          formData.specialDate.length === 8 &&
          /^\d{8}$/.test(formData.specialDate)
        );
      case 2:
        return formData.bannerImage !== null;
      case 3:
        return true; // Content is optional
      case 4:
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (canProceed() && currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const CurrentStepComponent = STEPS[currentStep - 1].component;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stepper */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {STEPS.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                currentStep === step.id
                  ? 'border-romantic-primary bg-romantic-primary text-white scale-110'
                  : currentStep > step.id
                  ? 'border-romantic-primary bg-romantic-primary/20 text-romantic-primary'
                  : 'border-border bg-background text-muted-foreground'
              }`}
            >
              {step.id}
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={`w-12 h-0.5 mx-2 transition-colors ${
                  currentStep > step.id ? 'bg-romantic-primary' : 'bg-border'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step title */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-cursive text-romantic-primary">{STEPS[currentStep - 1].title}</h2>
      </div>

      {/* Step content */}
      <Card className="p-6 md:p-8 bg-card/80 backdrop-blur-sm border-romantic-primary/20">
        <CurrentStepComponent
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNext}
          generatedGiftId={generatedGiftId}
          setGeneratedGiftId={setGeneratedGiftId}
        />
      </Card>

      {/* Navigation */}
      {currentStep < 5 && (
        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="border-romantic-primary/30 hover:bg-romantic-primary/10"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-romantic-primary hover:bg-romantic-primary/90 text-white"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
