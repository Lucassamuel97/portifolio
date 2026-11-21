import Image from 'next/image';
import { Container, Section } from '@/components/layout/Container';
import { horasDe } from '@/lib/certificacoes';
import { certifications, education, experiences, personalInfo } from '@/lib/data';

// Commits no GitHub de 20/11/2025 a 20/11/2026: 296 públicos + 2.469 em repositórios privados.
const COMMITS_12_MESES = '2.765';


// Componente de servidor: os números são calculados no build, a partir de src/lib/data.ts.
export const AboutSection = () => {
  const inicio = experiences.find((e) => e.title === 'Full-stack Developer')?.period.start ?? new Date('2018-03-01');
  const anos = Math.floor((Date.now() - inicio.getTime()) / (365.25 * 864e5));
  const graduacoes = education.filter((e) => e.degree.startsWith('Tecnólogo')).length;
  const mbaEmAndamento = education.some((e) => e.degree.startsWith('MBA') && e.period.end && e.period.end.getTime() > Date.now());
  const totalHoras = Math.round(certifications.reduce((soma, c) => soma + horasDe(c), 0));
  const idiomas = personalInfo.languages.map((l) => `${l.language} ${l.level.split('/')[0].toLowerCase()}`).join(', ');

  const fatos = [
    { rotulo: 'Desenvolvendo software', valor: `${anos} anos` },
    { rotulo: 'Commits nos últimos 12 meses', valor: COMMITS_12_MESES },
    { rotulo: 'Formação', valor: `${graduacoes} graduações em TI${mbaEmAndamento ? ' e MBA em andamento' : ''}` },
    { rotulo: 'Formação contínua', valor: `${certifications.length} cursos, ${totalHoras} h` },
    { rotulo: 'Idiomas', valor: idiomas },
  ];

  return (
    <Section id="sobre" titleId="sobre-titulo">
      <Container className="grid gap-8 md:grid-cols-8 md:gap-x-5 xl:grid-cols-12 xl:gap-x-6">
        <h2 id="sobre-titulo" className="font-display text-titulo font-bold largura-112 md:col-span-8 xl:col-span-3">
          Sobre
        </h2>
        <p className="max-w-[30ch] font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)] leading-[1.18] tracking-[-0.015em] md:col-span-8 xl:col-span-9">
          Trabalho perto de quem usa o sistema. Levanto requisitos, desenvolvo, mantenho o que já está em produção e dou
          suporte a quem atende a população na ponta.
        </p>

        <div className="grid max-w-[64ch] gap-4 text-tinta-2 md:col-span-5 xl:col-span-6 xl:col-start-4 xl:max-w-none xl:grid-cols-2 xl:gap-x-6">
          <p>
            Sou desenvolvedor full-stack e, desde 2018, construo sistemas de gestão para o setor público na Boeing &amp;
            Rocha. Em 2026 passei a reescrever sistemas legados em Laravel 13, React e Inertia: o IMASP Saúde, de
            assistência à saúde do servidor, e o Controle Social, que concentra a operação do SUAS de um município.
          </p>
          <p>
            Aprofundei arquitetura de software, com DDD, Clean Architecture e TDD, e hoje curso o MBA em Engenharia de
            Software com Inteligência Artificial da Full Cycle. Levo isso para os sistemas: no Sicoli, a IA confere se o
            parecer de uma licitação bate com os dados oficiais do processo; na central de chamados, um assistente
            responde a partir dos manuais que escrevi com IA e passa para a equipe o que foge do escopo.
          </p>
        </div>

        <figure className="w-full max-w-64 md:col-span-3 md:justify-self-end xl:col-span-3 xl:col-start-10 xl:max-w-none xl:justify-self-stretch">
          <Image
            src={personalInfo.avatar}
            alt={`Foto de ${personalInfo.name}`}
            width={400}
            height={400}
            sizes="(min-width: 1280px) 22vw, 16rem"
            className="h-auto w-full border border-tinta/90 bg-papel-2"
          />
          <figcaption className="mt-2 text-rotulo text-tinta-3">Lucas Samuel, Palmital (PR)</figcaption>
        </figure>

        <dl className="grid grid-cols-1 md:col-span-8 md:grid-cols-3 xl:col-span-9 xl:col-start-4 xl:grid-cols-5">
          {fatos.map((f) => (
            <div key={f.rotulo} className="-mb-px -mr-px border border-tinta/90 p-4">
              <dt className="rotulo">{f.rotulo}</dt>
              <dd className="mt-1 font-display text-[clamp(1.05rem,0.95rem+0.45vw,1.35rem)] font-[650] leading-tight">{f.valor}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
};
