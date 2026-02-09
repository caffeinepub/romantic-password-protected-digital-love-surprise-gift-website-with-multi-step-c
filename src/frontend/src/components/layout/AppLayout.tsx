import { SiCaffeine } from 'react-icons/si';
import { Heart } from 'lucide-react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'url(/assets/generated/romantic-heart-pattern.dim_2048x2048.png)',
          backgroundSize: '512px 512px',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-romantic-light via-background to-romantic-light/30 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Footer */}
      <footer className="relative z-10 py-8 mt-16 border-t border-border/50">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2 flex-wrap">
            © 2026. Built with{' '}
            <Heart className="w-4 h-4 text-romantic-primary fill-romantic-primary inline-block" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-romantic-primary hover:underline inline-flex items-center gap-1"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
