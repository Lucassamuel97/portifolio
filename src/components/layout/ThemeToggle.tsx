'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon">
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative overflow-hidden"
    >
      <Sun className={`h-5 w-5 transition-all duration-300 ${
        isDark ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
      }`} />
      <Moon className={`absolute h-5 w-5 transition-all duration-300 ${
        isDark ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
      }`} />
      <span className="sr-only">Alternar tema</span>
    </Button>
  );
};

