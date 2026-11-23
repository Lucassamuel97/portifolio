'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import type { Screenshot } from '@/types';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

/** Telas reais dos sistemas (dados fictícios), com ampliação em um <dialog> nativo. */
export function Screenshots({ items }: { items: Screenshot[] }) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const origem = useRef<HTMLButtonElement | null>(null);
  const [atual, setAtual] = useState<Screenshot | null>(null);

  const abrir = (item: Screenshot, botao: HTMLButtonElement) => {
    origem.current = botao;
    setAtual(item);
    dialogo.current?.showModal();
  };
  const fechar = () => dialogo.current?.close();

  return (
    <div className="grid gap-3">
      <div className={cn('grid grid-cols-[repeat(auto-fit,minmax(min(100%,26rem),1fr))] gap-6', items.length === 1 && 'max-w-[60rem]')}>
        {items.map((item) => (
          <figure key={item.src} className="grid content-start gap-2">
            <button
              type="button"
              onClick={(e) => abrir(item, e.currentTarget)}
              aria-label={`Ampliar a tela: ${item.caption}`}
              className="block w-full cursor-zoom-in overflow-hidden border border-tinta/90 bg-papel-2 transition-colors duration-150 hover:border-revisao"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(min-width: 1280px) 45vw, (min-width: 768px) 90vw, 100vw"
                className="h-auto w-full"
              />
            </button>
            <figcaption className="max-w-[64ch] text-pequeno text-tinta-2">{item.caption}</figcaption>
          </figure>
        ))}
      </div>
      <p className="text-rotulo text-tinta-3">Telas reais do sistema, com dados fictícios de demonstração. Clique para ampliar.</p>

      <dialog
        ref={dialogo}
        aria-label="Tela ampliada"
        onClick={(e) => e.target === dialogo.current && fechar()}
        onClose={() => origem.current?.focus()}
        className="max-h-[94vh] w-[min(96vw,100rem)] max-w-none border border-tinta/90 bg-papel p-4 text-tinta outline-none backdrop:bg-[rgb(10_16_30/0.75)]"
      >
        {atual && (
          <>
            <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p className="text-pequeno text-tinta-2">{atual.caption}</p>
              <Button variant="secondary" onClick={fechar} className="w-full md:w-auto">
                Fechar
              </Button>
            </div>
            <Image
              src={atual.src}
              alt={atual.alt}
              width={atual.width}
              height={atual.height}
              sizes="96vw"
              className="h-auto max-h-[80vh] w-full border border-tinta/15 object-contain"
            />
          </>
        )}
      </dialog>
    </div>
  );
}
