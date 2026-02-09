import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Heart, Lock } from 'lucide-react';
import { validateDate } from '../../utils/validation';

interface PasswordGateProps {
  onUnlock: (password: string) => void;
}

export default function PasswordGate({ onUnlock }: PasswordGateProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateDate(password)) {
      setError('Please enter exactly 8 digits in DDMMYYYY format');
      return;
    }

    onUnlock(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        {/* Decorative hearts */}
        <div className="text-center space-y-4">
          <div className="flex justify-center gap-2">
            <Heart className="w-8 h-8 text-romantic-primary fill-romantic-primary animate-float" />
            <Heart className="w-6 h-6 text-romantic-primary fill-romantic-primary animate-float-delayed" />
            <Heart className="w-8 h-8 text-romantic-primary fill-romantic-primary animate-float" />
          </div>
          <h1 className="text-3xl md:text-4xl font-cursive text-romantic-primary">
            A Special Gift Awaits
          </h1>
          <p className="text-muted-foreground">Enter the special date to unlock your surprise</p>
        </div>

        <Card className="border-romantic-primary/30 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto bg-romantic-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-romantic-primary" />
            </div>
            <CardTitle className="font-cursive text-romantic-primary">Enter Password</CardTitle>
            <CardDescription>Use the special date in DDMMYYYY format</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Special Date</Label>
                <Input
                  id="password"
                  type="text"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value.replace(/\D/g, '').slice(0, 8));
                    setError('');
                  }}
                  placeholder="DDMMYYYY"
                  maxLength={8}
                  className="text-center text-lg tracking-wider border-romantic-primary/30 focus:border-romantic-primary"
                  autoFocus
                />
                {error && <p className="text-sm text-destructive text-center">{error}</p>}
              </div>
              <Button
                type="submit"
                className="w-full bg-romantic-primary hover:bg-romantic-primary/90 text-white"
                disabled={password.length !== 8}
              >
                Unlock Gift
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          This gift was created with love just for you
        </p>
      </div>
    </div>
  );
}
