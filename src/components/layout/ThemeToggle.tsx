'use client';

import { useCallback } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useClientTheme } from '@/hooks/useClientTheme';

export const ThemeToggle = () => {
  const { mounted, setTheme, isDark } = useClientTheme();

  const handleThemeToggle = useCallback(() => {
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
  }, [isDark, setTheme]);

  // Sempre renderizar o mesmo HTML inicial para evitar hidratação mismatch
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleThemeToggle}
      className="relative overflow-hidden transition-all duration-300 hover:scale-110"
      aria-label={mounted ? `Alternar para tema ${isDark ? 'claro' : 'escuro'}` : 'Alternador de tema'}
      disabled={!mounted}
    >
      <Sun 
        className={`h-5 w-5 transition-all duration-500 ease-in-out ${
          mounted && isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`} 
      />
      <Moon 
        className={`absolute h-5 w-5 transition-all duration-500 ease-in-out ${
          mounted && isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
        }`} 
      />
      <span className="sr-only">
        {mounted 
          ? (isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro')
          : 'Carregando tema'
        }
      </span>
    </Button>
  );
};

