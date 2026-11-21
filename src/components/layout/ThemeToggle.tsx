'use client';

import { useTheme } from 'next-themes';

/**
 * Alterna entre "Papel" (claro) e "Blueprint" (escuro).
 * O destaque da opção ativa vem do atributo data-tema no <html>, aplicado antes da pintura,
 * então o servidor e o navegador renderizam o mesmo HTML.
 */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  const opcao =
    'px-2.5 py-1 font-display text-rotulo font-medium largura-90 text-tinta-2 transition-colors duration-150';

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label="Alternar entre o tema Papel (claro) e o tema Blueprint (escuro)"
      className={`inline-flex min-h-11 items-center border border-tinta/90 p-[3px] md:min-h-0 ${className}`}
    >
      <span className={`${opcao} [[data-tema=papel]_&]:bg-tinta [[data-tema=papel]_&]:text-papel`}>Papel</span>
      <span className={`${opcao} [[data-tema=blueprint]_&]:bg-tinta [[data-tema=blueprint]_&]:text-papel`}>Blueprint</span>
    </button>
  );
}
