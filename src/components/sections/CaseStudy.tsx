import Image from 'next/image';
import type { CaseStudy as CaseStudyData, Project } from '@/types';
import { CaseSchematic } from '@/components/sections/CaseSchematic';
import { Screenshots } from '@/components/ui/Screenshots';
import { cn } from '@/lib/utils';

const ESTADOS: Record<Project['status'], { rotulo: string; marca: string }> = {
  production: { rotulo: 'Em produção', marca: 'before:bg-revisao' },
  'in-progress': { rotulo: 'Em desenvolvimento', marca: 'before:border-[1.5px] before:border-revisao' },
  completed: { rotulo: 'Concluído', marca: 'before:bg-tinta' },
  planned: { rotulo: 'Planejado', marca: 'before:border-[1.5px] before:border-revisao' },
};

export function linksDoProjeto(p: Project) {
  const links: { href: string; rotulo: string }[] = [];
  if (p.liveUrl) {
    const rotulo = /hub\.docker/.test(p.liveUrl) ? 'Imagem no Docker Hub' : /\.pdf$/.test(p.liveUrl) ? 'Monografia (PDF)' : 'Site publicado';
    links.push({ href: p.liveUrl, rotulo });
  }
  if (p.githubUrl) links.push({ href: p.githubUrl, rotulo: 'Código no GitHub' });
  return links;
}

const anoDe = (d: Date) => String(d.getUTCFullYear());

export function Tags({ items, max }: { items: string[]; max?: number }) {
  const visiveis = max ? items.slice(0, max) : items;
  const resto = max && items.length > max ? items.length - max : 0;
  const tag = 'border border-tinta/90 px-2 py-0.5 font-display text-rotulo font-medium leading-normal largura-90';
  return (
    <ul className="flex flex-wrap gap-1.5">
      {visiveis.map((t) => (
        <li key={t} className={tag}>
          {t}
        </li>
      ))}
      {resto > 0 && <li className={tag}>+{resto}</li>}
    </ul>
  );
}

function Links({ items }: { items: { href: string; rotulo: string }[] }) {
  return (
    <p className="flex flex-wrap gap-x-5 gap-y-2 font-display text-pequeno font-semibold">
      {items.map((l) => (
        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="underline hover:decoration-revisao">
          {l.rotulo}
        </a>
      ))}
    </p>
  );
}

export function CaseStudy({ data, projects }: { data: CaseStudyData; projects: Project[] }) {
  const principal = projects[0];
  const anos = projects.map((p) => anoDe(p.createdAt)).sort();
  const anoInicio = anos[0];
  const anoFim = anos[anos.length - 1];
  const estado = ESTADOS[principal.status];
  const tituloId = `caso-${data.id}`;
  const varios = projects.length > 1;
  const links = linksDoProjeto(principal);

  return (
    <article
      aria-labelledby={tituloId}
      className="grid gap-6 border-t border-tinta/15 py-[clamp(2.5rem,1.5rem+3vw,4.5rem)] first:border-t-0 first:pt-0 md:grid-cols-8 md:gap-x-5 xl:grid-cols-12 xl:gap-x-6"
    >
      {/* Ano, estado e contexto */}
      <div className="grid content-start gap-1 md:col-span-3 md:row-start-1 xl:col-span-4">
        <p className="mb-3 font-display text-[clamp(3rem,2rem+3vw,5.5rem)] font-[250] leading-[0.9] tracking-[-0.04em] largura-125">{anoInicio}</p>
        {anoFim !== anoInicio && <p className="font-display text-pequeno text-tinta-2 largura-90">{anoInicio} a {anoFim}</p>}
        <p
          className={cn(
            'inline-flex items-center gap-2 font-display text-pequeno text-tinta-2 largura-90 before:h-2 before:w-2 before:shrink-0 before:content-[""]',
            estado.marca
          )}
        >
          {estado.rotulo}
        </p>
        {data.context && <p className="font-display text-pequeno text-tinta-2 largura-90">{data.context}</p>}
      </div>

      {/* Esquema técnico ou imagem de capa */}
      <figure className="quadricula-fina self-start border border-tinta/90 bg-papel p-4 md:col-span-8 md:row-start-2 md:max-w-[30rem] xl:col-span-4 xl:max-w-none">
        {data.cover ? (
          <Image
            src={data.cover.src}
            alt={data.cover.alt}
            width={data.cover.width}
            height={data.cover.height}
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 30rem, 100vw"
            className="mb-3 h-auto w-full border border-tinta/15"
          />
        ) : (
          data.schematic && <CaseSchematic id={data.schematic} />
        )}
        <figcaption className="mt-3 text-rotulo text-tinta-3">{data.cover?.caption ?? data.schematicCaption}</figcaption>
      </figure>

      {/* Texto do caso */}
      <div className="grid content-start gap-6 md:col-span-5 md:col-start-4 md:row-start-1 xl:col-span-7 xl:col-start-6 xl:row-span-2">
        <h3 id={tituloId} className="max-w-[24ch] font-display text-[clamp(1.6rem,1.15rem+1.6vw,2.5rem)] font-[680] leading-[1.05] tracking-[-0.02em] largura-106">
          {data.title ?? principal.title}
        </h3>
        <p>{data.description ?? principal.description}</p>

        <dl className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,13rem),1fr))] gap-x-6 gap-y-4">
          {[
            ['Desafio', data.challenge],
            ['Solução', data.solution],
            ...(data.role ? [['Meu papel', data.role]] : []),
          ].map(([rotulo, texto]) => (
            <div key={rotulo} className="border-t border-tinta/90 pt-3">
              <dt className="rotulo">{rotulo}</dt>
              <dd className="mt-1 text-pequeno">{texto}</dd>
            </div>
          ))}
        </dl>

        {data.decisions && (
          <div className="grid gap-3 border-l-[3px] border-revisao bg-papel-2 px-5 py-4">
            <p className="rotulo">Decisões técnicas</p>
            <ul className="grid gap-3">
              {data.decisions.map((d) => (
                <li
                  key={d.title}
                  className="relative max-w-[72ch] pl-5 text-pequeno before:absolute before:left-0 before:top-[0.72em] before:h-[1.5px] before:w-2.5 before:bg-revisao before:content-['']"
                >
                  <b className="font-display font-[650]">{d.title}</b> {d.text}
                </li>
              ))}
            </ul>
            <p className="text-rotulo text-tinta-3">Registradas nos documentos de design e no código do projeto.</p>
          </div>
        )}

        {varios ? (
          <dl className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,13rem),1fr))] gap-x-6 gap-y-4">
            {projects.map((p) => (
              <div key={p.id} className="border-t border-tinta/90 pt-3">
                <dt className="rotulo">{data.partLabels?.[p.id] ?? p.title}</dt>
                <dd className="mt-2 grid gap-3">
                  <Tags items={p.technologies} max={6} />
                  {linksDoProjeto(p).length > 0 && <Links items={linksDoProjeto(p)} />}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <>
            <Tags items={principal.technologies} />
            {links.length > 0 ? <Links items={links} /> : <p className="text-pequeno text-tinta-3">Código não público.</p>}
          </>
        )}
      </div>

      {data.screenshots && (
        <div className="md:col-span-8 md:row-start-3 xl:col-span-12">
          <Screenshots items={data.screenshots} />
        </div>
      )}
    </article>
  );
}
