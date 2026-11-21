import { AnalyticsTracker } from '@/components/layout/AnalyticsTracker';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { AboutSection } from '@/components/sections/AboutSection';
import { CertificationsSection } from '@/components/sections/CertificationsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';

// Componente de servidor: só o cabeçalho, o diagrama, a linha do tempo, os filtros,
// as telas ampliáveis e o formulário são componentes de cliente.
export default function HomePage() {
  return (
    <>
      <a
        href="#conteudo"
        className="absolute -top-16 left-4 z-50 bg-tinta px-4 py-3 font-display font-semibold text-papel no-underline focus:top-4"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <Footer />
      <AnalyticsTracker />
    </>
  );
}
