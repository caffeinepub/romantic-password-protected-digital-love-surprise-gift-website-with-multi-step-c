import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { GiftFormData } from '../../../types/gift';
import { validateDate, validateEmail } from '../../../utils/validation';

interface Step1BasicsProps {
  formData: GiftFormData;
  updateFormData: (updates: Partial<GiftFormData>) => void;
  onNext: () => void;
}

export default function Step1Basics({ formData, updateFormData }: Step1BasicsProps) {
  const dateError = formData.specialDate && !validateDate(formData.specialDate);
  const emailError = formData.email && !validateEmail(formData.email);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="partnerName">Partner's Name *</Label>
        <Input
          id="partnerName"
          value={formData.partnerName}
          onChange={(e) => updateFormData({ partnerName: e.target.value })}
          placeholder="Their name"
          className="border-romantic-primary/30 focus:border-romantic-primary"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="senderName">Your Name *</Label>
        <Input
          id="senderName"
          value={formData.senderName}
          onChange={(e) => updateFormData({ senderName: e.target.value })}
          placeholder="Your name"
          className="border-romantic-primary/30 focus:border-romantic-primary"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Your Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          placeholder="your@email.com"
          className="border-romantic-primary/30 focus:border-romantic-primary"
        />
        {emailError && <p className="text-sm text-destructive">Please enter a valid email address</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialDate">Special Date (Password) *</Label>
        <Input
          id="specialDate"
          value={formData.specialDate}
          onChange={(e) => updateFormData({ specialDate: e.target.value.replace(/\D/g, '').slice(0, 8) })}
          placeholder="DDMMYYYY (e.g., 14022024)"
          maxLength={8}
          className="border-romantic-primary/30 focus:border-romantic-primary"
        />
        <p className="text-sm text-muted-foreground">
          This will be the password to unlock the gift (format: DDMMYYYY)
        </p>
        {dateError && (
          <p className="text-sm text-destructive">Please enter exactly 8 digits in DDMMYYYY format</p>
        )}
      </div>
    </div>
  );
}
