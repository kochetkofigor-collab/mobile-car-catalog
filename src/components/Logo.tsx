import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className, size = 'md' }: LogoProps) {
  const titleSizes = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl'
  };

  return (
    <h1 className={cn(
      'font-cormorant font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent uppercase',
      titleSizes[size],
      className
    )}>
      KeyRider
    </h1>
  );
}