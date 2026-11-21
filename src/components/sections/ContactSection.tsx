import { Container, Section } from '@/components/layout/Container';
import { ContactForm } from '@/components/sections/ContactForm';
import { personalInfo, socialLinks } from '@/lib/data';

export const ContactSection = () => {
  const social = Object.fromEntries(socialLinks.map((s) => [s.platform, s]));
  const telefone = String(personalInfo.phone).replace(/^\+55(\d{2})(\d{5})(\d{4})$/, '+55 ($1) $2-$3');
  const link =
    'bg-[linear-gradient(rgb(var(--revisao)),rgb(var(--revisao)))] bg-[length:0_2px] bg-left-bottom bg-no-repeat no-underline transition-[background-size] duration-300 ease-prancha hover:bg-[length:100%_2px] focus-visible:bg-[length:100%_2px]';

  const canais = [
    { rotulo: 'E-mail', href: `mailto:${personalInfo.email}`, texto: personalInfo.email },
    social.LinkedIn && { rotulo: 'LinkedIn', href: social.LinkedIn.url, texto: `in/${social.LinkedIn.username}`, externo: true },
    social.GitHub && { rotulo: 'GitHub', href: social.GitHub.url, texto: social.GitHub.username, externo: true },
    social.WhatsApp && { rotulo: 'WhatsApp', href: social.WhatsApp.url, texto: telefone, externo: true },
    personalInfo.resume && { rotulo: 'Currículo', href: personalInfo.resume, texto: 'Baixar PDF', download: true },
  ].filter(Boolean) as { rotulo: string; href: string; texto: string; externo?: boolean; download?: boolean }[];

  return (
    <Section id="contato" titleId="contato-titulo" className="bg-papel-2">
      <Container className="grid gap-12 xl:grid-cols-12 xl:gap-x-6">
        <div className="xl:col-span-7">
          <h2 id="contato-titulo" className="font-display text-titulo font-bold largura-112">
            Contato
          </h2>
          <p className="mt-6 max-w-[14ch] font-display text-frase font-[740] largura-116">Vamos conversar sobre o seu sistema.</p>
          <p className="mt-4 text-tinta-2">Para projetos, vagas ou uma conversa técnica. Respondo em até 24 horas.</p>
          <dl className="mt-8">
            {canais.map((c) => (
              <div key={c.rotulo} className="grid grid-cols-1 gap-1 border-t border-tinta/90 py-3 last:border-b md:grid-cols-[6.5rem_minmax(0,1fr)] md:items-baseline md:gap-3">
                <dt className="rotulo">{c.rotulo}</dt>
                <dd className="min-w-0 font-display text-[clamp(1.05rem,0.95rem+0.6vw,1.4rem)] font-semibold [overflow-wrap:anywhere]">
                  <a
                    href={c.href}
                    className={link}
                    {...(c.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    {...(c.download ? { download: true } : {})}
                  >
                    {c.texto}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="xl:col-span-4 xl:col-start-9 xl:pt-2">
          <ContactForm />
        </div>
      </Container>
    </Section>
  );
};
