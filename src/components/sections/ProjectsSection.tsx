import { Container, Section, SectionHeader } from '@/components/layout/Container';
import { CaseStudy, linksDoProjeto } from '@/components/sections/CaseStudy';
import { caseStudies, projectContexts, projects } from '@/lib/data';

export const ProjectsSection = () => {
  const porId = new Map(projects.map((p) => [p.id, p]));
  const emDestaque = new Set(caseStudies.flatMap((c) => c.projectIds));
  const outros = projects
    .filter((p) => !emDestaque.has(p.id))
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const celula = 'py-4 pr-4 align-top max-md:p-0 max-md:before:font-display max-md:before:text-rotulo max-md:before:text-tinta-3 max-md:before:content-[attr(data-rotulo)_":_"]';

  return (
    <Section id="projetos" titleId="projetos-titulo">
      <Container>
        <SectionHeader
          id="projetos-titulo"
          title="Projetos"
          intro="Sistemas em produção no setor público, cujo código é privado, e projetos de estudo com código aberto."
        />
        <div>
          {caseStudies.map((caso) => (
            <CaseStudy
              key={caso.id}
              data={caso}
              projects={caso.projectIds.map((id) => porId.get(id)).filter((p): p is NonNullable<typeof p> => Boolean(p))}
            />
          ))}
        </div>

        <div className="mt-16">
          <h3 className="mb-4 font-display text-grande font-[680] largura-106">Outros projetos</h3>
          <table className="w-full border-collapse text-pequeno max-md:block">
            <thead className="hidden md:table-header-group">
              <tr className="border-b-[1.5px] border-tinta/90 text-left">
                <th scope="col" className="rotulo pb-2 pr-4 font-medium">Projeto</th>
                <th scope="col" className="rotulo pb-2 pr-4 font-medium">Contexto</th>
                <th scope="col" className="rotulo pb-2 pr-4 font-medium">Ano</th>
                <th scope="col" className="rotulo pb-2 pr-4 font-medium">Tecnologias</th>
                <th scope="col" className="pb-2">
                  <span className="sr-only">Links</span>
                </th>
              </tr>
            </thead>
            <tbody className="max-md:block">
              {outros.map((p) => {
                const links = linksDoProjeto(p);
                return (
                  <tr key={p.id} className="border-b border-tinta/15 transition-colors hover:bg-papel-2 max-md:flex max-md:flex-col max-md:gap-1 max-md:py-4">
                    <td className="py-4 pr-4 align-top max-md:p-0">
                      <span className="block font-display text-base font-semibold">{p.title}</span>
                      <span className="text-tinta-2">{p.description}</span>
                    </td>
                    <td data-rotulo="Contexto" className={`${celula} text-tinta-2`}>{projectContexts[p.id] ?? ''}</td>
                    <td data-rotulo="Ano" className={`${celula} text-tinta-2`}>{p.createdAt.getUTCFullYear()}</td>
                    <td data-rotulo="Tecnologias" className={`${celula} text-tinta-2`}>{p.technologies.slice(0, 5).join(', ')}</td>
                    <td className="py-4 align-top max-md:p-0 max-md:pt-2">
                      {links.length > 0 ? (
                        <span className="grid gap-1 whitespace-nowrap font-display font-semibold">
                          {links.map((l) => (
                            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="underline hover:decoration-revisao">
                              {l.rotulo}
                            </a>
                          ))}
                        </span>
                      ) : (
                        <span className="text-tinta-3">Código privado</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </Section>
  );
};
