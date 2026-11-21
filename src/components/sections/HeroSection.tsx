import { Container } from '@/components/layout/Container';
import { ArchitectureDiagram } from '@/components/sections/ArchitectureDiagram';
import { buttonVariants } from '@/components/ui/Button';
import { education, personalInfo, systemArchitectures } from '@/lib/data';
import { cn } from '@/lib/utils';

const LINHAS = ['Sistemas que', 'modernizam e', 'automatizam a', 'gestão pública.'];
const ATRASOS = ['', 'motion-safe:[animation-delay:90ms]', 'motion-safe:[animation-delay:180ms]', 'motion-safe:[animation-delay:270ms]'];

export const HeroSection = () => {
  const mba = education.find((e) => e.degree.startsWith('MBA'));
  const ficha = [
    { rotulo: 'Responsável técnico', valor: personalInfo.name },
    { rotulo: 'Atuação', valor: 'Desenvolvedor full-stack' },
    { rotulo: 'Especialidade', valor: 'Sistemas de gestão pública' },
    { rotulo: 'Em produção desde', valor: '2018' },
    ...(mba ? [{ rotulo: 'Em formação', valor: 'MBA em Engenharia de Software com IA' }] : []),
    { rotulo: 'Situação', valor: 'Disponível para projetos', sinal: true },
  ];

  return (
    <section id="inicio" aria-labelledby="hero-titulo" className="pb-24 pt-[clamp(2.5rem,1.5rem+5vw,6rem)]">
      <Container>
        <div className="grid gap-8 xl:grid-cols-12 xl:items-end xl:gap-x-6">
          <div className="xl:col-span-9">
            <p className="mb-6 max-w-[48ch] font-display text-medio font-medium text-tinta-2">
              {personalInfo.name}, desenvolvedor full&#8209;stack em Palmital, PR.
            </p>
            <h1 id="hero-titulo" className="font-display text-display font-[760] largura-116">
              {LINHAS.map((linha, i) => (
                <span key={linha} className={cn('block motion-safe:animate-revelar', ATRASOS[i])}>
                  {linha}
                </span>
              ))}
            </h1>
          </div>

          <div className="grid max-w-[34rem] gap-6 xl:col-span-3 xl:pb-2.5">
            <p className="text-tinta-2">
              Desde 2018 desenvolvo, de ponta a ponta, sistemas usados pela assistência social, pela saúde pública e no
              controle de contratos e licitações. Hoje reescrevo sistemas legados em Laravel, React e Inertia e aplico IA
              generativa, tema do MBA que curso na Full Cycle.
            </p>
            <div className="flex flex-col gap-3 md:flex-row md:flex-wrap">
              <a href="#projetos" className={cn(buttonVariants({ variant: 'primary' }), 'w-full md:w-auto')}>
                Ver projetos
              </a>
              <a href="#contato" className={cn(buttonVariants({ variant: 'secondary' }), 'w-full md:w-auto')}>
                Enviar mensagem
              </a>
            </div>
            <a href={personalInfo.resume} download className="text-pequeno text-tinta-2 underline hover:decoration-revisao">
              Baixar currículo (PDF)
            </a>
          </div>
        </div>

        <ArchitectureDiagram systems={systemArchitectures} />

        <dl aria-label="Ficha resumida" className="mt-6 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-[1.45fr_1fr_1.2fr_0.8fr_1.45fr_1.1fr]">
          {ficha.map((item) => (
            <div key={item.rotulo} className="-mb-px -mr-px border border-tinta/90 px-4 py-3">
              <dt className="rotulo">{item.rotulo}</dt>
              <dd className="font-display text-[1.0625rem] font-semibold leading-snug">
                {item.sinal && <span aria-hidden="true" className="mr-2 inline-block h-2.5 w-2.5 bg-revisao align-[0.05em]" />}
                {item.valor}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
};
