import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className, size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl'
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary via-secondary to-primary flex items-center justify-center shadow-lg">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            className="w-6 h-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M15 7C15 5.89543 14.1046 5 13 5H6C4.89543 5 4 5.89543 4 7V17C4 18.1046 4.89543 19 6 19H13C14.1046 19 15 18.1046 15 17V7Z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
            <circle 
              cx="9.5" 
              cy="12" 
              r="2" 
              stroke="currentColor" 
              strokeWidth="2"
            />
            <path 
              d="M15 9H18C19.1046 9 20 9.89543 20 11V13C20 14.1046 19.1046 15 18 15H15" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      <h1 className={cn(
        'font-cormorant font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent',
        sizes[size]
      )}>
        KeyRider
      </h1>
    </div>
  );
}
