import { Container, Section, SectionHeader } from '@/components/layout/Container';
import { Timeline, type TimelineItem } from '@/components/sections/Timeline';
import { education, experiences } from '@/lib/data';

const iso = (d: Date | null) => (d ? d.toISOString().slice(0, 10) : null);

/** Trabalho e formação na mesma escala de anos. */
export const ExperienceSection = () => {
  const itens: TimelineItem[] = [
    ...experiences.map((e) => ({
      id: `exp-${e.id}`,
      tipo: 'trabalho' as const,
      titulo: e.title,
      onde: e.company,
      local: e.location,
      inicio: iso(e.period.start)!,
      fim: iso(e.period.end),
      descricao: e.description,
      lista: { rotulo: 'Responsabilidades', itens: e.responsibilities },
      tags: { rotulo: 'Tecnologias', itens: e.technologies },
    })),
    ...education.map((e) => ({
      id: `edu-${e.id}`,
      tipo: 'formacao' as const,
      titulo: e.degree,
      onde: e.institution,
      local: e.location,
      inicio: iso(e.period.start)!,
      fim: iso(e.period.end),
      descricao: e.description,
      tags: e.relevantCourses ? { rotulo: 'Disciplinas relevantes', itens: e.relevantCourses } : undefined,
    })),
  ];

  return (
    <Section id="trajetoria" titleId="trajetoria-titulo">
      <Container>
        <SectionHeader
          id="trajetoria-titulo"
          title="Trajetória"
          intro="Trabalho e formação na mesma linha do tempo. Selecione uma barra para ver os detalhes."
        />
        <Timeline items={itens} referencia={new Date().toISOString()} />
      </Container>
    </Section>
  );
};
