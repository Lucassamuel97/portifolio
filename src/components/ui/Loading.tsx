'use client';

import { cn } from '@/lib/utils';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse';
  className?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8'
};

const LoadingSpinner = ({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg'; className?: string }) => (
  <div
    className={cn(
      'inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]',
      sizeClasses[size],
      className
    )}
    role="status"
  >
    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
      Carregando...
    </span>
  </div>
);

const LoadingDots = ({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg'; className?: string }) => {
  const dotSize = size === 'sm' ? 'w-1 h-1' : size === 'md' ? 'w-2 h-2' : 'w-3 h-3';
  
  return (
    <div className={cn('flex space-x-1', className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            'bg-current rounded-full animate-pulse',
            dotSize
          )}
          style={{
            animationDelay: `${i * 0.3}s`,
            animationDuration: '1.4s'
          }}
        />
      ))}
    </div>
  );
};

const LoadingPulse = ({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg'; className?: string }) => (
  <div
    className={cn(
      'inline-block bg-current rounded-full animate-pulse',
      sizeClasses[size],
      className
    )}
  />
);

export const Loading = ({ size = 'md', variant = 'spinner', className }: LoadingProps) => {
  switch (variant) {
    case 'dots':
      return <LoadingDots size={size} className={className} />;
    case 'pulse':
      return <LoadingPulse size={size} className={className} />;
    default:
      return <LoadingSpinner size={size} className={className} />;
  }
};

