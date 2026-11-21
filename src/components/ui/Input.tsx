import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const campoClasses =
  'w-full min-h-12 rounded-none border border-tinta/90 bg-papel px-3.5 py-3 text-base text-tinta transition-colors placeholder:text-tinta-3 focus-visible:border-revisao focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-revisao aria-[invalid=true]:border-2 aria-[invalid=true]:border-revisao disabled:opacity-60';

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, error, id, ...props }, ref) => {
  const erroId = error ? `${id}-erro` : undefined;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="rotulo">
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        className={cn(campoClasses, className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={erroId}
        {...props}
      />
      {error && (
        <p id={erroId} className="text-rotulo font-semibold text-revisao">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export { Input };
