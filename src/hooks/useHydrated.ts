'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to check if the component has been hydrated on the client side.
 * This helps prevent hydration mismatches by ensuring consistent behavior
 * between server and client rendering.
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
