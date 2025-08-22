'use client';

import { motion } from 'framer-motion';
import { Code2, Heart, ExternalLink } from 'lucide-react';
import { personalInfo, socialLinks } from '@/lib/data';
import { smoothScrollTo } from '@/lib/utils';

// Importar ícones do Lucide React dinamicamente
const getIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    Github: require('lucide-react').Github,
    Linkedin: require('lucide-react').Linkedin,
    Twitter: require('lucide-react').Twitter,
    Instagram: require('lucide-react').Instagram,
    Youtube: require('lucide-react').Youtube,
    Facebook: require('lucide-react').Facebook,
    Mail: require('lucide-react').Mail,
    WhatsApp: require('lucide-react').Phone,
  };
  
  const IconComponent = icons[iconName];
  return IconComponent ? IconComponent : ExternalLink;
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleSocialClick = (url: string, platform: string) => {
    // Track analytics se disponível
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click', {
        event_category: 'Social',
        event_label: platform,
        value: 1
      });
    }
    
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-2 mb-4"
            >
              <Code2 className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                SamucaDev
              </span>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 dark:text-gray-400 mb-6 max-w-md"
            >
              {personalInfo.bio}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm text-gray-500 dark:text-gray-500 flex items-center"
            >
              Feito com <Heart className="h-4 w-4 text-red-500 mx-1" /> usando Next.js e Tailwind CSS
            </motion.p>
          </div>

          {/* Links Rápidos */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg font-semibold text-gray-900 dark:text-white mb-4"
            >
              Links Rápidos
            </motion.h3>
            <ul className="space-y-2">
              {[
                { label: 'Sobre', href: '#about' },
                { label: 'Projetos', href: '#projects' },
                { label: 'Experiência', href: '#experience' },
                { label: 'Contato', href: '#contact' }
              ].map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => smoothScrollTo(link.href.slice(1), 80)}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg font-semibold text-gray-900 dark:text-white mb-4"
            >
              Redes Sociais
            </motion.h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => {
                const IconComponent = getIcon(social.icon);
                
                return (
                  <motion.button
                    key={social.platform}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSocialClick(social.url, social.platform)}
                    className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    title={`Seguir no ${social.platform}`}
                  >
                    <IconComponent className="h-5 w-5" />
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {currentYear} {personalInfo.name} (SamucaDev). Todos os direitos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

