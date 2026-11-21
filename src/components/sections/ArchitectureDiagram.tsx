'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { FlowDirection, SystemArchitecture } from '@/types';
import { cn } from '@/lib/utils';

interface Trilha {
  chave: string;
  d: string;
  nos: [string, string];
  inicio: boolean;
  fim: boolean;
}

interface Desenho {
  trilhas: Trilha[];
  juncoes: { x: number; y: number }[];
}

const DESKTOP = '(min-width: 1024px)';

function sentidoTexto(direction: FlowDirection, via: SystemArchitecture['via']) {
  const onde = via === 'worker' ? 'a fila' : 'a aplicação';
  if (direction === 'in') return `Entra pel${onde}`;
  if (direction === 'out') return `Sai d${onde}`;
  return `Ida e volta com ${onde}`;
}

/** Ligações internas mais as integrações, que saem da aplicação ou da fila. */
function arestasDe(s: SystemArchitecture): [string, string, FlowDirection][] {
  const via = s.via === 'worker' ? 'worker' : 'app';
  return [...s.edges, ...s.integrations.map((i) => [via, i.id, i.direction] as [string, string, FlowDirection])];
}

/** Calcula as linhas ortogonais entre os blocos a partir das posições reais no DOM. */
function calcular(grade: HTMLElement, arestas: [string, string, FlowDirection][]): Desenho {
  const base = grade.getBoundingClientRect();
  const caixa = (id: string) => {
    const el = grade.querySelector<HTMLElement>(`[data-no="${id}"]`);
    if (!el) return null;
    const b = el.getBoundingClientRect();
    return { x: b.left - base.left, y: b.top - base.top, w: b.width, h: b.height };
  };
  const trilhas: Trilha[] = [];
  const juncoes = new Map<string, { x: number; y: number; n: number }>();

  arestas.forEach(([de, para, sentido]) => {
    let A = caixa(de);
    let B = caixa(para);
    if (!A || !B) return;
    const horizontal = B.x >= A.x + A.w - 2 || A.x >= B.x + B.w - 2;
    let troca = false;
    if (horizontal ? A.x > B.x : A.y > B.y) {
      [A, B] = [B, A];
      troca = true;
    }
    let d: string;
    if (horizontal) {
      const x1 = A.x + A.w;
      const y1 = A.y + A.h / 2;
      const x2 = B.x - 1;
      const y2 = B.y + B.h / 2;
      const xm = Math.round((x1 + x2) / 2);
      d = Math.abs(y1 - y2) < 1 ? `M${x1} ${y1} H${x2}` : `M${x1} ${y1} H${xm} V${y2} H${x2}`;
      const chave = `${Math.round(x1)},${Math.round(y1)}`;
      const j = juncoes.get(chave) ?? { x: xm, y: y1, n: 0 };
      j.n += 1;
      juncoes.set(chave, j);
    } else {
      const xc = Math.min(Math.max(B.x + B.w / 2, A.x + 12), A.x + A.w - 12);
      d = `M${xc} ${A.y + A.h} V${B.y - 1}`;
    }
    trilhas.push({
      chave: `${de}-${para}`,
      d,
      nos: [de, para],
      fim: sentido === 'both' || (sentido === 'out') !== troca,
      inicio: sentido === 'both' || (sentido === 'in') !== troca,
    });
  });

  return {
    trilhas,
    juncoes: Array.from(juncoes.values()).filter((j) => j.n > 1),
  };
}

const blocoBase =
  'relative z-[1] grid w-full gap-0.5 border border-tinta/90 bg-papel px-3 py-2.5 text-left transition-[border-color,opacity] duration-300 ease-prancha hover:border-revisao focus-visible:border-revisao data-[ativo=true]:border-revisao motion-safe:animate-surgir';
const conector =
  'before:absolute before:-top-7 before:left-[1.4rem] before:h-7 before:border-l-[1.5px] before:border-tinta lg:before:hidden';

interface BlocoProps {
  id: string;
  papel: string;
  titulo: string;
  detalhe?: string;
  atraso: number;
  className?: string;
  children?: React.ReactNode;
  ativo: boolean;
  ligado?: boolean;
  aoFocar: (id: string | null) => void;
  aoFixar: (id: string) => void;
}

function Bloco({ id, papel, titulo, detalhe, atraso, className, children, ativo, ligado, aoFocar, aoFixar }: BlocoProps) {
  return (
    <button
      type="button"
      data-no={id}
      data-ativo={ativo || undefined}
      data-ligado={ligado === undefined ? undefined : String(ligado)}
      style={{ animationDelay: `${atraso}ms` }}
      className={cn(blocoBase, className)}
      onPointerEnter={() => aoFocar(id)}
      onPointerLeave={() => aoFocar(null)}
      onFocus={() => aoFocar(id)}
      onBlur={() => aoFocar(null)}
      onClick={() => aoFixar(id)}
    >
      <span className="font-display text-xs font-medium text-tinta-3 largura-82">{papel}</span>
      <span className="font-display text-base font-semibold leading-tight">{titulo}</span>
      {detalhe && <span className="text-rotulo text-tinta-2">{detalhe}</span>}
      {children}
    </button>
  );
}

export function ArchitectureDiagram({ systems }: { systems: SystemArchitecture[] }) {
  const [atual, setAtual] = useState(systems[0].id);
  const [foco, setFoco] = useState<string | null>(null);
  const [fixo, setFixo] = useState<string | null>(null);
  const [desenho, setDesenho] = useState<Desenho>({ trilhas: [], juncoes: [] });
  const gradeRef = useRef<HTMLDivElement>(null);
  const abasRef = useRef<(HTMLButtonElement | null)[]>([]);

  const sistema = systems.find((s) => s.id === atual) ?? systems[0];
  const arestas = arestasDe(sistema);
  const destaque = fixo ?? foco;

  const redesenhar = useCallback(() => {
    const grade = gradeRef.current;
    if (!grade) return;
    if (!window.matchMedia(DESKTOP).matches) {
      setDesenho({ trilhas: [], juncoes: [] });
      return;
    }
    setDesenho(calcular(grade, arestasDe(sistema)));
  }, [sistema]);

  // Linhas só existem no navegador: o HTML do servidor e o da primeira renderização são iguais
  useLayoutEffect(() => {
    redesenhar();
  }, [redesenhar]);

  useEffect(() => {
    const grade = gradeRef.current;
    if (!grade) return;
    const observador = new ResizeObserver(() => redesenhar());
    observador.observe(grade);
    document.fonts?.ready.then(redesenhar);
    return () => observador.disconnect();
  }, [redesenhar]);

  useEffect(() => {
    if (!fixo) return;
    const aoTeclar = (e: KeyboardEvent) => e.key === 'Escape' && setFixo(null);
    document.addEventListener('keydown', aoTeclar);
    return () => document.removeEventListener('keydown', aoTeclar);
  }, [fixo]);

  const vizinhos = new Set<string>();
  if (destaque) {
    vizinhos.add(destaque);
    arestas.forEach(([a, b]) => {
      if (a === destaque || b === destaque) {
        vizinhos.add(a);
        vizinhos.add(b);
      }
    });
  }
  const ligado = (id: string) => (destaque ? vizinhos.has(id) : undefined);

  const trocar = (id: string) => {
    setAtual(id);
    setFoco(null);
    setFixo(null);
  };

  const comum = {
    aoFocar: (id: string | null) => !fixo && setFoco(id),
    aoFixar: (id: string) => setFixo((f) => (f === id ? null : id)),
  };

  return (
    <figure className="mt-[clamp(3rem,2rem+4vw,5.5rem)]" aria-labelledby="diagrama-legenda">
      <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="rotulo" id="diagrama-titulo">
          Arquitetura dos sistemas em produção
        </p>
        <div role="tablist" aria-labelledby="diagrama-titulo" className="flex flex-wrap gap-2">
          {systems.map((s, i) => (
            <button
              key={s.id}
              ref={(el) => {
                abasRef.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`aba-${s.id}`}
              aria-selected={s.id === atual}
              aria-controls="painel-arquitetura"
              tabIndex={s.id === atual ? 0 : -1}
              onClick={() => trocar(s.id)}
              onKeyDown={(e) => {
                if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
                e.preventDefault();
                const j = (i + (e.key === 'ArrowRight' ? 1 : -1) + systems.length) % systems.length;
                abasRef.current[j]?.focus();
                trocar(systems[j].id);
              }}
              className="min-h-11 border border-tinta/90 px-3.5 font-display text-pequeno font-semibold transition-colors duration-150 hover:border-revisao hover:text-revisao aria-selected:bg-tinta aria-selected:text-papel aria-selected:hover:border-tinta aria-selected:hover:text-papel"
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      <div
        id="painel-arquitetura"
        role="tabpanel"
        aria-labelledby={`aba-${atual}`}
        data-foco={destaque ?? undefined}
        className="quadricula relative border border-tinta/90 bg-papel px-4 py-8 lg:px-[clamp(1.5rem,3vw,3rem)] lg:py-12"
      >
        <div
          key={sistema.id}
          ref={gradeRef}
          className="relative grid gap-7 [grid-template-areas:'pessoas'_'cliente'_'app'_'infra'_'externos'] lg:grid-cols-[minmax(0,0.75fr)_minmax(0,0.95fr)_minmax(0,1.4fr)_minmax(0,1.2fr)] lg:items-center lg:gap-x-[clamp(2.25rem,4.5vw,4.5rem)] lg:gap-y-11 lg:[grid-template-areas:'pessoas_cliente_app_externos'_'._._infra_externos']"
        >
          <div className="relative grid [grid-area:pessoas]">
            <Bloco id="people" papel="Pessoas" titulo={sistema.people.title} detalhe={sistema.people.detail} atraso={0} ativo={fixo === 'people'} ligado={ligado('people')} {...comum} />
          </div>
          <div className={cn('relative grid [grid-area:cliente]', conector)}>
            <Bloco id="client" papel="Interface" titulo={sistema.client.title} detalhe={sistema.client.detail} atraso={80} ativo={fixo === 'client'} ligado={ligado('client')} {...comum} />
          </div>
          <div className={cn('relative grid [grid-area:app]', conector)}>
            <Bloco
              id="app"
              papel="Aplicação"
              titulo={sistema.app.title}
              atraso={160}
              className="border-2 px-4 py-3.5 [&>span:nth-child(2)]:text-xl [&>span:nth-child(2)]:font-bold [&>span:nth-child(2)]:largura-112"
              ativo={fixo === 'app'}
              ligado={ligado('app')}
              {...comum}
            >
              <span className="mt-2 block border-t border-tinta/15 pt-2 text-rotulo text-tinta-2">
                <span className="block font-display font-medium text-tinta-3 largura-82">Regras de negócio</span>
                {sistema.app.detail}
              </span>
            </Bloco>
          </div>
          <div className={cn('relative [grid-area:infra]', conector)}>
            <div className={cn('grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-8', !sistema.worker && 'md:grid-cols-1')}>
              <Bloco id="database" papel="Banco de dados" titulo={sistema.database.title} detalhe={sistema.database.detail} atraso={240} ativo={fixo === 'database'} ligado={ligado('database')} {...comum} />
              {sistema.worker && (
                <Bloco id="worker" papel={sistema.worker.kind} titulo={sistema.worker.title} detalhe={sistema.worker.detail} atraso={300} ativo={fixo === 'worker'} ligado={ligado('worker')} {...comum} />
              )}
            </div>
          </div>
          <div className={cn('relative grid gap-3 [grid-area:externos] before:border-dashed', conector)}>
            {sistema.integrations.map((integracao, i) => (
              <Bloco
                key={integracao.id}
                id={integracao.id}
                papel={integracao.kind}
                titulo={integracao.title}
                detalhe={integracao.detail}
                atraso={380 + i * 70}
                className="border-dashed"
                ativo={fixo === integracao.id}
                ligado={ligado(integracao.id)}
                {...comum}
              >
                <span className="mt-0.5 font-display text-xs font-semibold text-revisao largura-90">
                  {sentidoTexto(integracao.direction, sistema.via)}
                </span>
              </Bloco>
            ))}
          </div>

          <svg aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full overflow-visible lg:block">
            <defs>
              <marker id="seta" viewBox="0 0 8 8" refX="7.5" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                <path d="M0 0 L8 4 L0 8 z" fill="rgb(var(--tinta))" />
              </marker>
              <marker id="seta-ativa" viewBox="0 0 8 8" refX="7.5" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                <path d="M0 0 L8 4 L0 8 z" fill="rgb(var(--revisao))" />
              </marker>
            </defs>
            {desenho.trilhas.map((t, i) => {
              const lig = destaque ? t.nos.includes(destaque) : false;
              const seta = lig ? 'url(#seta-ativa)' : 'url(#seta)';
              return (
                <g key={t.chave}>
                  <path
                    d={t.d}
                    pathLength={1}
                    className="traco motion-safe:[animation:desenhar_650ms_cubic-bezier(0.2,0.7,0.2,1)_both] [stroke-dasharray:1]"
                    style={{ animationDelay: `${150 + i * 60}ms` }}
                    data-ligado={String(lig)}
                    markerEnd={t.fim ? seta : undefined}
                    markerStart={t.inicio ? seta : undefined}
                  />
                  <path d={t.d} className="pulso" data-ligado={String(lig)} />
                </g>
              );
            })}
            {desenho.juncoes.map((j) => (
              <rect key={`${j.x}-${j.y}`} x={j.x - 3} y={j.y - 3} width={6} height={6} className="juncao" />
            ))}
          </svg>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center md:gap-3">
        <p className="rotulo">Em todo o sistema</p>
        <ul className="flex flex-wrap gap-1.5">
          {sistema.crossCutting.map((item) => (
            <li key={item} className="border border-tinta/90 bg-papel px-2 py-0.5 font-display text-rotulo font-medium largura-90">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <figcaption id="diagrama-legenda" className="mt-3 max-w-[76ch] text-pequeno text-tinta-3">
        Visão simplificada, levantada do código de cada sistema. O sentido dos dados aparece nas setas e no texto de
        cada integração; blocos tracejados ficam fora da aplicação. Passe o cursor ou toque em um bloco para ver as
        ligações.
      </figcaption>
    </figure>
  );
}
