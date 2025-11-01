import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className, size = 'md' }: LogoProps) {
  const titleSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  const subtitleSizes = {
    sm: 'text-[0.5rem]',
    md: 'text-xs',
    lg: 'text-sm'
  };

  return (
    <div className={cn('flex flex-col', className)}>
      <h1 className={cn(
        'font-bold tracking-wider uppercase',
        titleSizes[size]
      )}>
        KeyRider
      </h1>
      <p className={cn(
        'text-muted-foreground uppercase tracking-widest font-medium',
        subtitleSizes[size]
      )}>
        Клуб проката автомобилей
      </p>
    </div>
  );
}