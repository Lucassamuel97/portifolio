'use client';

import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';



export default function HomePage() {
  

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="relative">
        <HeroSection />
        <AboutSection />
      </div>
      
    </main>
  );
}