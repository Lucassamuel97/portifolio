import { Container, Section, SectionHeader } from '@/components/layout/Container';
import { skills } from '@/lib/data';
import { cn } from '@/lib/utils';

// Agrupamento por área de atuação (os nomes batem com `skills` em src/lib/data.ts)
const GRUPOS: [string, string[]][] = [
  ['Back-end', ['PHP', 'Laravel', 'CodeIgniter', 'Java', 'Spring Boot', 'Python', 'Node.js', 'Express.js', 'Composer']],
  ['Front-end', ['JavaScript', 'TypeScript', 'React', 'Inertia.js', 'Next.js', 'jQuery', 'Tailwind CSS', 'Bootstrap', 'HTML5', 'CSS3', 'Sass/SCSS', 'Material UI', 'Vue.js']],
  ['Inteligência artificial', ['Prompt Engineering', 'Agentes de IA', 'Claude Code', 'RAG (Retrieval-Augmented Generation)', 'APIs de LLM (OpenAI e Gemini)', 'Embeddings e busca semântica', 'MCP (Model Context Protocol)', 'LangChain', 'pgVector', 'LangSmith']],
  ['Arquitetura e qualidade', ['Clean Architecture', 'DDD', 'SOLID Principles', 'Microservices', 'API Gateway', 'PHPUnit', 'Jest']],
  ['Banco de dados', ['MySQL', 'SQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Firebase']],
  ['Integrações e mensageria', ['REST APIs', 'RabbitMQ', 'GraphQL']],
  ['Infraestrutura e entrega', ['Linux', 'Docker', 'GitHub Actions', 'CI/CD', 'Apache', 'Nginx', 'AWS', 'Travis CI']],
  ['Mobile', ['Ionic', 'Flutter']],
  ['Ferramentas', ['Git', 'Visual Studio Code', 'Postman', 'Swagger', 'Trello', 'Cursor', 'Figma', 'ESLint', 'Prettier', 'Webpack', 'Vite']],
];

const NOME_EXIBIDO: Record<string, string> = {
  'SOLID Principles': 'SOLID',
  Microservices: 'Microsserviços',
  'REST APIs': 'APIs REST',
};

export const SkillsSection = () => {
  const porNome = new Map(skills.map((s) => [s.name, s]));
  const agrupadas = new Set(GRUPOS.flatMap(([, nomes]) => nomes));
  const sobra = skills.filter((s) => !agrupadas.has(s.name)).map((s) => s.name);
  const grupos = sobra.length ? [...GRUPOS, ['Outras', sobra] as [string, string[]]] : GRUPOS;

  return (
    <Section id="tecnologias" titleId="tecnologias-titulo">
      <Container>
        <SectionHeader id="tecnologias-titulo" title="Tecnologias" intro="Em destaque, as que domino melhor. Ao lado de cada uma, o tempo de uso." />
        <dl>
          {grupos.map(([grupo, nomes], i) => (
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
                      className={cn('font-display text-medio', s.level >= 85 ? 'font-[650] text-tinta' : 'text-tinta-2')}
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
