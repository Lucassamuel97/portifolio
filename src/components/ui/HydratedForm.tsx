'use client';

import { forwardRef, FormHTMLAttributes } from 'react';
import { useHydrated } from '@/hooks/useHydrated';

interface HydratedFormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

const HydratedForm = forwardRef<HTMLFormElement, HydratedFormProps>(
  ({ children, ...props }, ref) => {
    const hydrated = useHydrated();

    if (!hydrated) {
      // Render a simplified version on the server/before hydration
      return (
        <form {...props} ref={ref} suppressHydrationWarning>
          {children}
        </form>
      );
    }

    // Render the full interactive form after hydration
    return (
      <form {...props} ref={ref}>
        {children}
      </form>
    );
  }
);

HydratedForm.displayName = 'HydratedForm';

export { HydratedForm };
