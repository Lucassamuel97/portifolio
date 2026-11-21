'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface TimelineItem {
  id: string;
  tipo: 'trabalho' | 'formacao';
  titulo: string;
  onde: string;
  local: string;
  inicio: string;
  fim: string | null;
  descricao?: string;
  lista?: { rotulo: string; itens: string[] };
  tags?: { rotulo: string; itens: string[] };
}

const dia = (iso: string) => new Date(`${iso.slice(0, 10)}T00:00:00Z`);
const mesAno = new Intl.DateTimeFormat('pt-BR', { month: 'short', year: 'numeric', timeZone: 'UTC' });

function duracao(ini: Date, fim: Date) {
  const meses = (fim.getUTCFullYear() - ini.getUTCFullYear()) * 12 + (fim.getUTCMonth() - ini.getUTCMonth());
  const a = Math.floor(meses / 12);
  const m = meses % 12;
  const partes = [];
  if (a) partes.push(`${a} ${a === 1 ? 'ano' : 'anos'}`);
  if (m) partes.push(`${m} ${m === 1 ? 'mês' : 'meses'}`);
  return partes.join(' e ') || 'menos de 1 mês';
}

const COLUNAS = 'md:grid md:grid-cols-[16rem_minmax(0,1fr)] md:gap-x-5';

export function Timeline({ items, referencia }: { items: TimelineItem[]; referencia: string }) {
  // Primeiro render usa a data do build (igual ao HTML do servidor); depois, a data real.
  const [hoje, setHoje] = useState(() => new Date(referencia));
  const [selecionado, setSelecionado] = useState(items[0]?.id);
  const [visto, setVisto] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => setHoje(new Date()), []);

  useEffect(() => {
    const el = raiz.current;
    if (!el || !('IntersectionObserver' in window)) {
      setVisto(true);
      return;
    }
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && (setVisto(true), obs.disconnect()), { threshold: 0.35 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const datas = items.map((i) => ({ ...i, ini: dia(i.inicio), fimData: i.fim ? dia(i.fim) : null }));
  const anoIni = Math.min(...datas.map((i) => i.ini.getUTCFullYear()));
  const anoFim = Math.max(hoje.getUTCFullYear(), ...datas.map((i) => (i.fimData ?? hoje).getUTCFullYear())) + 1;
  const t0 = Date.UTC(anoIni, 0, 1);
  const t1 = Date.UTC(anoFim, 0, 1);
  const pct = (d: Date) => `${(((d.getTime() - t0) / (t1 - t0)) * 100).toFixed(3)}%`;
  const anos = Array.from({ length: anoFim - anoIni }, (_, i) => anoIni + i);
  const futuro = (d: Date | null) => Boolean(d && d.getTime() > hoje.getTime());
  const periodo = (i: (typeof datas)[number]) =>
    `${mesAno.format(i.ini)} a ${i.fimData ? mesAno.format(i.fimData) : 'hoje'}${futuro(i.fimData) ? ' (previsão)' : ''}`;
  const trilha = { backgroundSize: `calc(100% / ${anos.length}) 100%` };

  const atual = datas.find((i) => i.id === selecionado) ?? datas[0];

  const grupos: [string, typeof datas][] = [
    ['Trabalho', datas.filter((i) => i.tipo === 'trabalho')],
    ['Formação', datas.filter((i) => i.tipo === 'formacao')],
  ];

  let ordem = 0;

  return (
    <>
      <div ref={raiz} className="border-t-[1.5px] border-tinta/90">
        <div className={COLUNAS}>
          <div className="relative col-start-2 mb-2 h-8">
            {anos.map((ano, i) => (
              <span
                key={ano}
                className={cn(
                  'absolute bottom-0 font-display text-rotulo text-tinta-3 tabular-nums largura-82',
                  i === 0 ? '' : '-translate-x-1/2',
                  i % 3 !== 0 && 'max-md:hidden'
                )}
                style={{ left: pct(new Date(Date.UTC(ano, 0, 1))) }}
              >
                {ano}
              </span>
            ))}
          </div>
        </div>

        <div className="relative">
          {/* Linha do "hoje" sobre as trilhas */}
          <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0', COLUNAS)}>
            <div className="relative h-full md:col-start-2">
              <span className="absolute inset-y-0 border-l-[1.5px] border-dashed border-revisao" style={{ left: pct(hoje) }}>
                <span className="absolute -bottom-7 right-1.5 whitespace-nowrap font-display text-rotulo text-revisao largura-82">hoje</span>
              </span>
            </div>
          </div>

          {grupos.map(([rotulo, lista]) => (
            <div key={rotulo} className="border-b border-tinta/15 py-3">
              <p className="rotulo mb-2">{rotulo}</p>
              {lista.map((i) => {
                const atraso = ordem++ * 120;
                const ativo = i.id === selecionado;
                const formacao = i.tipo === 'formacao';
                return (
                  <button
                    key={i.id}
                    type="button"
                    aria-pressed={ativo}
                    onClick={() => setSelecionado(i.id)}
                    className={cn('group grid w-full gap-2 py-2 text-left md:items-center', COLUNAS)}
                  >
                    <span className="font-display text-pequeno font-medium leading-snug group-hover:text-revisao group-aria-pressed:text-revisao">
                      {i.titulo}
                      <small className="block text-rotulo font-normal text-tinta-3">
                        {i.onde}, {periodo(i)}
                      </small>
                    </span>
                    <span
                      className="relative h-5 bg-[linear-gradient(90deg,rgb(var(--tinta)/0.16)_1px,transparent_1px)]"
                      style={trilha}
                    >
                      <span
                        className={cn(
                          'absolute top-1 h-3 origin-left transition-[transform,background-color] duration-[900ms] ease-prancha',
                          formacao
                            ? 'hachura outline outline-[1.25px] -outline-offset-[1.25px] outline-tinta group-hover:hachura-revisao group-hover:outline-revisao group-aria-pressed:hachura-revisao group-aria-pressed:outline-revisao'
                            : 'bg-tinta group-hover:bg-revisao group-aria-pressed:bg-revisao',
                          !i.fimData &&
                            'after:absolute after:-right-2 after:-top-1 after:border-y-[0.625rem] after:border-l-[0.5rem] after:border-y-transparent after:border-l-tinta after:content-[""] group-hover:after:border-l-revisao group-aria-pressed:after:border-l-revisao',
                          !visto && 'motion-safe:scale-x-0'
                        )}
                        style={{
                          left: pct(i.ini),
                          width: `calc(${pct(i.fimData ?? hoje)} - ${pct(i.ini)})`,
                          transitionDelay: visto ? `${atraso}ms, 0ms` : undefined,
                        }}
                      />
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {atual && (
        <div aria-live="polite" className="mt-14 grid gap-6 xl:grid-cols-12 xl:gap-x-6">
          <div className="grid content-start gap-2 xl:col-span-4">
            <h3 className="font-display text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] font-[680] leading-tight largura-106">{atual.titulo}</h3>
            <p className="font-display text-medio text-tinta-2">{atual.onde}</p>
            <p className="text-pequeno text-tinta-3">
              {periodo(atual)}
              {futuro(atual.fimData) ? '. Em andamento' : ` (${duracao(atual.ini, atual.fimData ?? hoje)})`}. {atual.local}.
            </p>
          </div>
          <div className="grid gap-6 xl:col-span-7 xl:col-start-6">
            {atual.descricao && <p className="max-w-[64ch]">{atual.descricao}</p>}
            {atual.lista && (
              <div>
                <p className="rotulo mb-2.5">{atual.lista.rotulo}</p>
                <ul className="grid gap-2">
                  {atual.lista.itens.map((item) => (
                    <li
                      key={item}
                      className="relative max-w-[70ch] pl-5 text-pequeno before:absolute before:left-0 before:top-[0.72em] before:h-[1.5px] before:w-2.5 before:bg-revisao before:content-['']"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {atual.tags && (
              <div>
                <p className="rotulo mb-2.5">{atual.tags.rotulo}</p>
                <ul className="flex flex-wrap gap-1.5">
                  {atual.tags.itens.map((t) => (
                    <li key={t} className="border border-tinta/90 px-2 py-0.5 font-display text-rotulo font-medium largura-90">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
