'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { useScrollspy } from '@/hooks/useScrollspy';
import { navigationItems } from '@/lib/data';
import { cn } from '@/lib/utils';

const SECOES = ['inicio', 'projetos', 'sobre', 'tecnologias', 'trajetoria', 'formacao', 'contato'];

const sublinhado =
  'bg-[linear-gradient(rgb(var(--revisao)),rgb(var(--revisao)))] bg-[length:0_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 ease-prancha hover:bg-[length:100%_2px] aria-[current=true]:bg-[length:100%_2px]';

export const Header = () => {
  const ativa = useScrollspy(SECOES);
  const [rolado, setRolado] = useState(false);
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    const aoRolar = () => setRolado(window.scrollY > 8);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => e.key === 'Escape' && setAberto(false);
    document.addEventListener('keydown', aoTeclar);
    return () => document.removeEventListener('keydown', aoTeclar);
  }, [aberto]);

  const itens = navigationItems;

  return (
    <header
      className={cn(
        'sticky top-0 z-30 border-b bg-papel transition-colors duration-300',
        rolado ? 'border-tinta/90' : 'border-transparent'
      )}
    >
      <Container className="flex min-h-16 items-center justify-between gap-6">
        <a
          href="#inicio"
          className="font-display text-lg font-extrabold tracking-tight no-underline largura-125"
          aria-label="SamucaDev, voltar ao início"
        >
          Samuca<span className="font-light">Dev</span>
        </a>

        <nav aria-label="Seções" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-6">
            {itens.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={ativa === item.href.slice(1) ? 'true' : undefined}
                  className={cn('py-2 font-display text-pequeno font-medium no-underline', sublinhado)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle className="max-sm:hidden" />
          <button
            type="button"
            className="min-h-11 border border-tinta/90 px-3 font-display text-pequeno font-semibold lg:hidden"
            aria-expanded={aberto}
            aria-controls="menu-movel"
            onClick={() => setAberto((v) => !v)}
          >
            {aberto ? 'Fechar' : 'Menu'}
          </button>
        </div>
      </Container>

      {aberto && (
        <div id="menu-movel" className="border-y border-tinta/90 bg-papel lg:hidden">
          <Container className="pb-8 pt-4">
            <div className="mb-4 flex items-center justify-between gap-4 sm:hidden">
              <span className="rotulo">Tema</span>
              <ThemeToggle />
            </div>
            <ul>
              {itens.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setAberto(false)}
                    className="block border-b border-tinta/15 py-3 font-display text-grande font-semibold no-underline largura-112"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      )}
    </header>
  );
};
