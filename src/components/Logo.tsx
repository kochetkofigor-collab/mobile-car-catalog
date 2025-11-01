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

  const subtitleSizes = {
    sm: 'text-[0.65rem]',
    md: 'text-xs',
    lg: 'text-sm'
  };

  return (
    <div className={cn('flex flex-col items-center text-center', className)}>
      <h1 className={cn(
        'font-cormorant font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent',
        titleSizes[size]
      )}>
        KeyRider
      </h1>
      <p className={cn(
        'text-muted-foreground font-medium -mt-1',
        subtitleSizes[size]
      )}>
        Клуб проката автомобилей
      </p>
    </div>
  );
}