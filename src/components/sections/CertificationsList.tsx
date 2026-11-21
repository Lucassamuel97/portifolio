'use client';

import { useState } from 'react';
import type { Certification } from '@/types';
import { Button } from '@/components/ui/Button';
import { horasDe } from '@/lib/certificacoes';
import { cn } from '@/lib/utils';

const VISIVEIS = 8;

const fmtHoras = (h: number) => `${(Math.round(h * 10) / 10).toString().replace('.', ',')} h`;

/** Aceita "dd/mm/aaaa", "dd/mm/aaaa a dd/mm/aaaa" e "mm/aaaa"; devolve a data final. */
function conclusao(periodo: string) {
  const datas = periodo.match(/(\d{2}\/)?\d{2}\/\d{4}/g) ?? [];
  const texto = datas[datas.length - 1] ?? '';
  const p = texto.split('/').map(Number);
  const valor = p.length === 3 ? Date.UTC(p[2], p[1] - 1, p[0]) : p.length === 2 ? Date.UTC(p[1], p[0] - 1, 28) : 0;
  return { texto, valor };
}

export function CertificationsList({ certifications }: { certifications: Certification[] }) {
  const [filtro, setFiltro] = useState('Todas');
  const [expandido, setExpandido] = useState(false);

  const cursos = certifications
    .map((c) => ({ c, fim: conclusao(c.period), horas: horasDe(c) }))
    .sort((a, b) => b.fim.valor - a.fim.valor);
  const orgs = ['Todas', ...Array.from(new Set(cursos.map((x) => x.c.organization)))];
  const lista = cursos.filter((x) => filtro === 'Todas' || x.c.organization === filtro);
  const soma = lista.reduce((s, x) => s + x.horas, 0);
  const visiveis = expandido ? lista : lista.slice(0, VISIVEIS);
  const celula = 'py-4 pr-4 align-top max-md:p-0 max-md:before:font-display max-md:before:text-rotulo max-md:before:text-tinta-3 max-md:before:content-[attr(data-rotulo)_":_"]';

  return (
    <>
      <div role="group" aria-label="Filtrar por instituição" className="mb-6 flex flex-wrap gap-2">
        {orgs.map((o) => {
          const n = o === 'Todas' ? cursos.length : cursos.filter((x) => x.c.organization === o).length;
          return (
            <button
              key={o}
              type="button"
              aria-pressed={filtro === o}
              onClick={() => setFiltro(o)}
              className="min-h-11 border border-tinta/90 px-3.5 font-display text-pequeno font-medium transition-colors duration-150 hover:border-revisao hover:text-revisao aria-pressed:bg-tinta aria-pressed:text-papel aria-pressed:hover:border-tinta aria-pressed:hover:text-papel md:min-h-0 md:py-1.5"
            >
              {o} ({n})
            </button>
          );
        })}
      </div>

      <table className="w-full border-collapse text-pequeno max-md:block">
        <thead className="hidden md:table-header-group">
          <tr className="border-b-[1.5px] border-tinta/90 text-left">
            <th scope="col" className="rotulo pb-2 pr-4 font-medium">Curso</th>
            <th scope="col" className="rotulo pb-2 pr-4 font-medium">Instituição</th>
            <th scope="col" className="rotulo pb-2 pr-4 font-medium">Conclusão</th>
            <th scope="col" className="rotulo pb-2 text-right font-medium">Carga</th>
          </tr>
        </thead>
        <tbody className="max-md:block">
          {visiveis.map(({ c, fim, horas }) => (
            <tr key={c.id} className="border-b border-tinta/15 transition-colors hover:bg-papel-2 max-md:flex max-md:flex-col max-md:gap-1 max-md:py-4">
              <td className="py-4 pr-4 align-top font-display text-base font-semibold max-md:p-0">
                {c.url ? (
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="no-underline hover:underline hover:decoration-revisao">
                    {c.title}
                  </a>
                ) : (
                  c.title
                )}
              </td>
              <td data-rotulo="Instituição" className={cn(celula, 'text-tinta-2')}>{c.organization}</td>
              <td data-rotulo="Conclusão" className={cn(celula, 'text-tinta-2 tabular-nums')}>{fim.texto}</td>
              <td data-rotulo="Carga" className={cn(celula, 'text-tinta-2 tabular-nums md:pr-0 md:text-right')}>
                {horas ? fmtHoras(horas) : 'não informada'}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="max-md:block">
          <tr className="border-t-[1.5px] border-tinta/90 font-display font-semibold max-md:flex max-md:justify-between max-md:py-3">
            <td className="py-3 max-md:p-0" colSpan={3}>
              Total: {lista.length} cursos
            </td>
            <td className="py-3 text-right tabular-nums max-md:p-0">{fmtHoras(soma)}</td>
          </tr>
        </tfoot>
      </table>

      {lista.length > VISIVEIS && (
        <Button variant="secondary" className="mt-6 w-full md:w-auto" aria-expanded={expandido} onClick={() => setExpandido((v) => !v)}>
          {expandido ? 'Mostrar menos' : `Mostrar todos os ${lista.length} cursos`}
        </Button>
      )}
    </>
  );
}
