import { Container } from '@/components/layout/Container';
import { personalInfo } from '@/lib/data';
import { SITE_URL } from '@/lib/site';

// Componente de servidor: o ano é calculado no build e não passa pela hidratação.
export const Footer = () => {
  const ano = new Date().getFullYear();
  return (
    <footer className="border-t border-tinta/90 py-8 text-pequeno text-tinta-2">
      <Container className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-6">
        <p className="font-display font-semibold text-tinta">{personalInfo.name}</p>
        <p>{new URL(SITE_URL).host}</p>
        <p>Feito com Next.js e Tailwind CSS</p>
        <p>© {ano}</p>
      </Container>
    </footer>
  );
};
