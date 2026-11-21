import { Container, Section, SectionHeader } from '@/components/layout/Container';
import { CertificationsList } from '@/components/sections/CertificationsList';
import { horasDe } from '@/lib/certificacoes';
import { certifications } from '@/lib/data';

export const CertificationsSection = () => {
  const totalHoras = Math.round(certifications.reduce((s, c) => s + horasDe(c), 0));
  const semCarga = certifications.filter((c) => !horasDe(c)).length;
  const resumo =
    `${certifications.length} cursos concluídos desde 2024, somando ${totalHoras} horas` +
    (semCarga ? ` (${semCarga} sem carga horária informada)` : '') +
    '. Cada título leva ao certificado original.';

  return (
    <Section id="formacao" titleId="formacao-titulo">
      <Container>
        <SectionHeader id="formacao-titulo" title="Formação contínua" intro={resumo} />
        <CertificationsList certifications={certifications} />
      </Container>
    </Section>
  );
};
