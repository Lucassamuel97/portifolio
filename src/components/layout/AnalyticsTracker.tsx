'use client';

import { useEffect } from 'react';
import { analyticsService } from '@/firebase/services';

/** Registra visualização, profundidade de rolagem e tempo na página (Firebase Analytics). */
export function AnalyticsTracker() {
  useEffect(() => {
    analyticsService.trackPageView('Home');
    const inicio = Date.now();

    const aoSair = () => analyticsService.trackUserEngagement('page_engagement', Date.now() - inicio);

    const medirRolagem = () => {
      const percentual = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (percentual > 0 && percentual % 25 === 0) {
        analyticsService.trackEvent('scroll_depth', { scroll_depth: percentual });
      }
    };

    let espera: ReturnType<typeof setTimeout>;
    const aoRolar = () => {
      clearTimeout(espera);
      espera = setTimeout(medirRolagem, 100);
    };

    window.addEventListener('beforeunload', aoSair);
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => {
      window.removeEventListener('beforeunload', aoSair);
      window.removeEventListener('scroll', aoRolar);
      clearTimeout(espera);
    };
  }, []);

  return null;
}
