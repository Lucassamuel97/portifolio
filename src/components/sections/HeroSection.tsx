'use client';

import { motion } from 'framer-motion';
import { 
  ArrowDown, 
  Download, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useTypewriter } from '@/hooks/useTypewriter';
import { useVisualEffects } from '@/hooks/useVisualEffects';
import { useClientTheme } from '@/hooks/useClientTheme';
import { personalInfo, socialLinks } from '@/lib/data';
import { smoothScrollTo } from '@/lib/utils';
import Image from 'next/image';
import { useCallback } from 'react';
import type { WindowWithGtag } from '@/types';

const getIcon = (iconName: string) => {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    Github,
    Linkedin,
    Twitter,
    Instagram,
    Youtube,
    Mail,
    WhatsApp: Phone,
  };
  
  const IconComponent = icons[iconName];
  return IconComponent ? IconComponent : ExternalLink;
};

export const HeroSection = () => {
  const { isClient, dimensions, particleData, matrixData, neuralLines } = useVisualEffects();
  const { isDark } = useClientTheme();

  const { displayText } = useTypewriter({
    texts: [
      'Desenvolvedor Full-Stack',
      'Especialista em PHP',
      'Criador de Soluções Web',
      'Apaixonado por Tecnologia'
    ],
    speed: 100,
    deleteSpeed: 50,
    delayBetweenTexts: 2000,
    loop: true
  });

  // Cores dinâmicas baseadas no tema
  const themeColors = {
    background: isDark ? 'bg-black' : 'bg-gray-50',
    text: isDark ? 'text-green-500' : 'text-green-600',
    subtext: isDark ? 'text-green-400' : 'text-green-500',
    accent: isDark ? 'text-gray-400' : 'text-gray-600',
    primary: isDark ? 'green' : 'green',
    primaryRgb: isDark ? '34, 197, 94' : '37, 99, 235'
  };

  const handleDownloadCV = useCallback(() => {
    const windowWithGtag = window as WindowWithGtag;
    if (typeof window !== 'undefined' && windowWithGtag.gtag) {
      windowWithGtag.gtag('event', 'download', {
        event_category: 'CV',
        event_label: 'Resume Download',
        value: 1
      });
    }
    const link = document.createElement('a');
    link.href = personalInfo.resume || '#';
    link.download = 'lucas-samuel-pereira-curriculo.pdf';
    link.click();
  }, []);

  const handleSocialClick = useCallback((url: string, platform: string) => {
    const windowWithGtag = window as WindowWithGtag;
    if (typeof window !== 'undefined' && windowWithGtag.gtag) {
      windowWithGtag.gtag('event', 'click', {
        event_category: 'Social',
        event_label: platform,
        value: 1
      });
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <section 
      id="hero" 
      className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${themeColors.background}`}
      aria-label="Seção principal do portfólio"
    >
      {/* Futuristic Background Effects */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="futuristic-grid absolute inset-0" 
            style={{
              backgroundImage: `
                linear-gradient(rgba(${themeColors.primaryRgb}, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(${themeColors.primaryRgb}, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        {/* Static background for SSR */}
        {!isClient && (
          <div className={`absolute inset-0 ${
            isDark 
              ? 'bg-gradient-to-br from-green-900/10 via-black to-green-900/5' 
              : 'bg-gradient-to-br from-green-100/20 via-gray-50 to-green-100/10'
          }`} />
        )}

        {/* Dynamic effects only after hydration */}
        {isClient && (
          <>
            {/* Floating Particles */}
            {particleData.map((particle) => (
              <motion.div
                key={particle.id}
                className={`absolute w-1 h-1 ${isDark ? 'bg-green-400' : 'bg-green-400'} rounded-full opacity-60`}
                initial={{
                  x: (particle.initialX / 100) * dimensions.width,
                  y: (particle.initialY / 100) * dimensions.height,
                }}
                animate={{
                  x: (particle.animateX / 100) * (dimensions.width + 200),
                  y: (particle.animateY / 100) * (dimensions.height + 200),
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                  delay: particle.delay
                }}
                style={{
                  filter: `drop-shadow(0 0 6px rgba(${themeColors.primaryRgb}, 0.8))`,
                }}
              />
            ))}

            {/* Quantum Energy Waves */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  `radial-gradient(circle at 20% 50%, rgba(${themeColors.primaryRgb}, 0.1) 0%, transparent 50%)`,
                  `radial-gradient(circle at 80% 50%, rgba(${themeColors.primaryRgb}, 0.1) 0%, transparent 50%)`,
                  `radial-gradient(circle at 50% 20%, rgba(${themeColors.primaryRgb}, 0.1) 0%, transparent 50%)`,
                  `radial-gradient(circle at 50% 80%, rgba(${themeColors.primaryRgb}, 0.1) 0%, transparent 50%)`,
                  `radial-gradient(circle at 20% 50%, rgba(${themeColors.primaryRgb}, 0.1) 0%, transparent 50%)`,
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Neural Network Lines */}
            <svg 
              className="absolute inset-0 w-full h-full opacity-30" 
              style={{ zIndex: 1 }}
              aria-hidden="true"
              role="presentation"
            >
              <defs>
                <linearGradient id={`neuralGradient-${isDark ? 'dark' : 'light'}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={`rgba(${themeColors.primaryRgb}, 0)`} />
                  <stop offset="50%" stopColor={`rgba(${themeColors.primaryRgb}, 0.6)`} />
                  <stop offset="100%" stopColor={`rgba(${themeColors.primaryRgb}, 0)`} />
                </linearGradient>
              </defs>
              {neuralLines.map((line) => (
                <motion.line
                  key={line.id}
                  x1={`${line.x1}%`}
                  y1={`${line.y1}%`}
                  x2={`${line.x2}%`}
                  y2={`${line.y2}%`}
                  stroke={`url(#neuralGradient-${isDark ? 'dark' : 'light'})`}
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: [0, 1, 0],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: line.delay,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </svg>

            {/* Holographic Overlay */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  `linear-gradient(45deg, transparent 0%, rgba(${themeColors.primaryRgb}, 0.05) 25%, transparent 50%, rgba(${themeColors.primaryRgb}, 0.05) 75%, transparent 100%)`,
                  `linear-gradient(135deg, transparent 0%, rgba(${themeColors.primaryRgb}, 0.05) 25%, transparent 50%, rgba(${themeColors.primaryRgb}, 0.05) 75%, transparent 100%)`,
                  `linear-gradient(225deg, transparent 0%, rgba(${themeColors.primaryRgb}, 0.05) 25%, transparent 50%, rgba(${themeColors.primaryRgb}, 0.05) 75%, transparent 100%)`,
                  `linear-gradient(315deg, transparent 0%, rgba(${themeColors.primaryRgb}, 0.05) 25%, transparent 50%, rgba(${themeColors.primaryRgb}, 0.05) 75%, transparent 100%)`,
                  `linear-gradient(45deg, transparent 0%, rgba(${themeColors.primaryRgb}, 0.05) 25%, transparent 50%, rgba(${themeColors.primaryRgb}, 0.05) 75%, transparent 100%)`,
                ]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Cyber Glow Orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                background: `radial-gradient(circle, rgba(${themeColors.primaryRgb}, 0.2) 0%, transparent 70%)`,
                filter: 'blur(40px)',
              }}
            />

            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                background: `radial-gradient(circle, rgba(${themeColors.primaryRgb}, 0.15) 0%, transparent 70%)`,
                filter: 'blur(60px)',
              }}
            />

            {/* Matrix Rain Effect */}
            <div className="absolute inset-0 opacity-10" aria-hidden="true">
              {matrixData.map((column) => (
                <motion.div
                  key={column.id}
                  className={`absolute ${isDark ? 'text-green-400' : 'text-green-400'} text-xs font-mono`}
                  style={{ left: `${column.left}%` }}
                  animate={{
                    y: [-100, dimensions.height + 100],
                  }}
                  transition={{
                    duration: column.duration,
                    repeat: Infinity,
                    delay: column.delay,
                    ease: "linear"
                  }}
                  aria-hidden="true"
                >
                  {column.characters.map((char, j) => (
                    <div key={j} style={{ opacity: char.opacity }}>
                      {char.char}
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-left mt-16 md:mt-0"
          >
            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-lg ${themeColors.accent} mb-4`}
            >
              Olá! Eu sou
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${themeColors.text} mb-6`}
            >
              <span className={`${isDark ? 'gradient-text' : 'gradient-text-dark'}`}>
                {personalInfo.name}
              </span>
            </motion.h1>

            {/* Typewriter Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`text-xl sm:text-2xl lg:text-3xl ${themeColors.subtext} mb-8 h-12 flex items-center justify-center lg:justify-start`}
            >
              <span className={`border-r-2 ${isDark ? 'border-green-500' : 'border-green-500'} pr-2 animate-blink`}>
                {displayText}
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`${themeColors.accent} mb-8 max-w-lg mx-auto lg:mx-0`}
            >
              {personalInfo.bio}
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Button
                onClick={() => smoothScrollTo('contact', 80)}
                size="lg"
                className={`shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${
                  isDark 
                    ? 'bg-green-600 text-black hover:bg-green-500' 
                    : 'bg-green-900 text-white hover:bg-green-500'
                }`}
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Entre em Contato
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleDownloadCV}
                className={`shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
                  isDark 
                    ? 'border-green-500 text-green-400 hover:bg-green-500 hover:text-black' 
                    : 'border-green-500 text-green-600 hover:bg-green-500 hover:text-white'
                }`}
              >
                <Download className="mr-2 h-5 w-5" />
                Download CV
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex gap-4 justify-center lg:justify-start"
            >
              {socialLinks.slice(0, 4).map((social, index) => {
                const IconComponent = getIcon(social.icon);
                
                return (
                  <motion.button
                    key={social.platform}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSocialClick(social.url, social.platform)}
                    className={`p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
                      isDark 
                        ? 'bg-dark-800 text-green-400 hover:text-green-500 border border-green-600' 
                        : 'bg-white text-green-600 hover:text-green-700 border border-green-300 hover:border-green-500'
                    }`}
                    title={`Seguir no ${social.platform}`}
                  >
                    <IconComponent className="h-6 w-6" />
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Avatar/Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Background Decoration */}
              <div className={`absolute inset-0 rounded-full blur-2xl opacity-20 animate-pulse-slow ${
                isDark 
                  ? 'bg-gradient-to-r from-green-500 to-green-600' 
                  : 'bg-gradient-to-r from-green-800 to-green-900'
              }`} />
              
              {/* Avatar */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`relative z-10 w-80 h-80 rounded-full overflow-hidden shadow-2xl border-4 ${
                  isDark 
                    ? 'border-green-500 bg-dark-900' 
                    : 'border-green-900 bg-gray-100'
                }`}
              >
                <Image
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className={`absolute -top-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-md border hover:scale-110 transition-all duration-300 ${
                  isDark 
                    ? 'bg-gradient-to-br from-amber-400/30 to-green-600/50 border-amber-400/30 shadow-amber-500/20' 
                    : 'bg-gradient-to-br from-white/40 to-green-100/60 border-amber-200/40 shadow-amber-600/20'
                }`}
              >
                <span className="text-black font-bold text-xl">🐘</span>
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1
                }}
                className={`absolute -bottom-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center shadow-xl backdrop-blur-md border hover:scale-110 transition-all duration-300 ${
                  isDark 
                    ? 'bg-gradient-to-br from-amber-400/30 to-green-500/50 border-amber-400/30 shadow-amber-500/20' 
                    : 'bg-gradient-to-br from-white/40 to-amber-100/60 border-amber-200/40 shadow-amber-600/20'
                }`}
              >
                <span className="text-black font-bold">☕</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => smoothScrollTo('about', 80)}
            className={`flex flex-col items-center transition-colors ${
              isDark 
                ? 'text-green-400 hover:text-green-500' 
                : 'text-green-800 hover:text-green-700'
            }`}
          >
            <span className="text-sm mb-2">Role para baixo</span>
            <ArrowDown className="h-6 w-6" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
