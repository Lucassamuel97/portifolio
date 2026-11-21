import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/** Largura máxima da página e margens laterais fluidas (16px no celular, 56px em telas largas). */
export function Container({ children, className }: ContainerProps) {
  return <div className={cn('mx-auto w-full max-w-pagina px-4 sm:px-6 lg:px-10 xl:px-14', className)}>{children}</div>;
}

interface SectionProps {
  id: string;
  titleId: string;
  children: React.ReactNode;
  className?: string;
}

/** Seção da página: abre com uma régua forte, como uma nova prancha. */
export function Section({ id, titleId, children, className }: SectionProps) {
  return (
    <section id={id} aria-labelledby={titleId} className={cn('border-t border-tinta/90 py-secao', className)}>
      {children}
    </section>
  );
}

interface SectionHeaderProps {
  id: string;
  title: string;
  intro?: React.ReactNode;
}

export function SectionHeader({ id, title, intro }: SectionHeaderProps) {
  return (
    <header className="mb-[clamp(2.5rem,1.5rem+4vw,5rem)] grid gap-4 xl:grid-cols-12 xl:items-end xl:gap-x-6">
      <h2 id={id} className="font-display text-titulo font-bold largura-112 xl:col-span-5">
        {title}
      </h2>
      {intro && <p className="max-w-[52ch] text-tinta-2 xl:col-span-5 xl:col-start-6">{intro}</p>}
    </header>
  );
}
