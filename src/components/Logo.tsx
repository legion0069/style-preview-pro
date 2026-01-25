import { Scissors } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className, size = 'md' }: LogoProps) => {
  const sizes = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl',
  };

  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 40,
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative">
        <Scissors className="text-primary" size={iconSizes[size]} />
        <div className="absolute inset-0 blur-lg bg-primary/30" />
      </div>
      <span className={cn('font-serif font-bold text-gradient-gold', sizes[size])}>
        Looksee<span className="text-foreground/80">AI</span>
      </span>
    </div>
  );
};

export default Logo;
