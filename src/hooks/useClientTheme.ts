import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export const useClientTheme = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Durante SSR ou antes da hidratação, sempre retorna 'dark'
  // Após hidratação, retorna o tema real
  const safeResolvedTheme = mounted ? resolvedTheme : 'dark';
  const isDark = safeResolvedTheme === 'dark';

  return {
    mounted,
    theme,
    setTheme,
    resolvedTheme: safeResolvedTheme,
    isDark,
  };
};
