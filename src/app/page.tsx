'use client';

import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { CertificationsSection } from '@/components/sections/CertificationsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/layout/Footer';
import { analyticsService } from '@/firebase/services';
import { useEffect } from 'react';



export default function HomePage() {
  useEffect(() => {
    // Track page view
    analyticsService.trackPageView('Home');
    
    // Track user engagement
    const startTime = Date.now();
    
    const handleBeforeUnload = () => {
      const engagementTime = Date.now() - startTime;
      analyticsService.trackUserEngagement('page_engagement', engagementTime);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Track scroll depth
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > 0 && scrollPercent % 25 === 0) {
        analyticsService.trackEvent('scroll_depth', {
          scroll_depth: scrollPercent
        });
      }
    };
    
    let scrollTimeout: NodeJS.Timeout;
    const throttledScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 100);
    };
    
    window.addEventListener('scroll', throttledScroll);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="relative">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificationsSection />
        <ContactSection />
      </div>
      
      <Footer />
    </main>
  );
}