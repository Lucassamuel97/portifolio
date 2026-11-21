'use client';

import { useEffect, useState } from 'react';

/**
 * Devolve o id da seção que ocupa o meio da tela.
 * Inclua o id do topo (ex.: "inicio") na lista para limpar a seleção quando a página volta ao início.
 */
export const useScrollspy = (sections: string[]) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [sections]);

  return activeSection;
};
