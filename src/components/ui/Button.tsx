import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Botão da prancha: sem raio, borda de 1,5px, marcas de registro nos cantos ao focar ou passar o cursor
export const buttonVariants = cva(
  'marcas-registro relative inline-flex min-h-12 items-center justify-center gap-2 border-[1.5px] px-5 py-3 font-display text-pequeno font-semibold leading-tight no-underline transition-colors duration-150 ease-prancha hover:border-revisao hover:bg-revisao hover:text-revisao-texto disabled:cursor-not-allowed disabled:opacity-60',
  {
    variants: {
      variant: {
        primary: 'border-tinta bg-tinta text-papel',
        secondary: 'border-tinta bg-transparent text-tinta',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, fullWidth, loading = false, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, fullWidth }), className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = 'Button';

export { Button };
