import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { campoClasses } from './Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, label, error, id, ...props }, ref) => {
  const erroId = error ? `${id}-erro` : undefined;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="rotulo">
        {label}
      </label>
      <textarea
        ref={ref}
        id={id}
        className={cn(campoClasses, 'min-h-36 resize-y', className)}
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

Textarea.displayName = 'Textarea';

export { Textarea };
