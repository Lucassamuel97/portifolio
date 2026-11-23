import { Container, Section, SectionHeader } from '@/components/layout/Container';
import { skills } from '@/lib/data';
import { cn } from '@/lib/utils';

// Seleção das tecnologias que aparecem nos sistemas e projetos da página, por área de atuação.
// Os nomes batem com `skills` em src/lib/data.ts, que guarda o inventário completo.
const GRUPOS: [string, string[]][] = [
  ['Back-end', ['PHP', 'Laravel', 'CodeIgniter', 'Java', 'Spring Boot']],
  ['Front-end', ['JavaScript', 'TypeScript', 'React', 'Inertia.js', 'Next.js', 'Tailwind CSS']],
  ['Inteligência artificial', ['RAG (Retrieval-Augmented Generation)', 'APIs de LLM (OpenAI e Gemini)', 'Agentes de IA', 'Claude Code', 'MCP (Model Context Protocol)']],
  ['Arquitetura e qualidade', ['Clean Architecture', 'DDD', 'SOLID Principles', 'PHPUnit']],
  ['Dados e integrações', ['MySQL', 'PostgreSQL', 'REST APIs', 'RabbitMQ']],
  ['Infraestrutura e entrega', ['Linux', 'Docker', 'GitHub Actions', 'Git']],
];

// Em destaque: nível alto e pelo menos dois anos de uso.
const NIVEL_DESTAQUE = 85;
const ANOS_DESTAQUE = 2;
const anosDeUso = (experiencia: string) => Number(/^(\d+) anos?$/.exec(experiencia)?.[1] ?? 0);

const NOME_EXIBIDO: Record<string, string> = {
  'SOLID Principles': 'SOLID',
  Microservices: 'Microsserviços',
  'REST APIs': 'APIs REST',
};

export const SkillsSection = () => {
  const porNome = new Map(skills.map((s) => [s.name, s]));
  return (
    <Section id="tecnologias" titleId="tecnologias-titulo">
      <Container>
        <SectionHeader id="tecnologias-titulo" title="Tecnologias" intro="As que uso nos sistemas e projetos desta página. Em destaque, as que domino melhor; ao lado de cada uma, o tempo de uso." />
        <dl>
          {GRUPOS.map(([grupo, nomes], i) => (
            <div
              key={grupo}
              className={cn(
                'grid gap-x-5 gap-y-2 border-t py-6 md:grid-cols-8 xl:grid-cols-12 xl:gap-x-6',
                i === 0 ? 'border-t-[1.5px] border-tinta/90' : 'border-tinta/15'
              )}
            >
              <dt className="font-display text-pequeno font-semibold largura-90 md:col-span-2 md:pt-1 xl:col-span-3">{grupo}</dt>
              <dd className="flex flex-wrap gap-x-6 gap-y-2 md:col-span-6 xl:col-span-9">
                {nomes
                  .map((n) => porNome.get(n))
                  .filter((s): s is NonNullable<typeof s> => Boolean(s))
                  .map((s) => (
                    <span
                      key={s.id}
                      className={cn('font-display text-medio', s.level >= NIVEL_DESTAQUE && anosDeUso(s.experience) >= ANOS_DESTAQUE ? 'font-[650] text-tinta' : 'text-tinta-2')}
                    >
                      {NOME_EXIBIDO[s.name] ?? s.name}
                      <span className="ml-1 whitespace-nowrap align-[0.55em] font-sans text-[0.72rem] font-medium text-tinta-3">
                        {s.experience.replace(/^1 anos$/, '1 ano')}
                      </span>
                    </span>
                  ))}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
};
