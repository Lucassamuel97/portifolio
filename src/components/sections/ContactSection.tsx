'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Loading } from '@/components/ui/Loading';
import { HydratedForm } from '@/components/ui/HydratedForm';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useHydrated } from '@/hooks/useHydrated';
import { contactService } from '@/firebase/services';
import { personalInfo } from '@/lib/data';
import { validateEmail } from '@/lib/utils';
import type { WindowWithGtag } from '@/types';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactSection = () => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true
  });

  const hydrated = useHydrated();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Localização',
      value: personalInfo.location,
      color: 'text-blue-500'
    },
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: 'text-green-500'
    },
    {
      icon: Phone,
      label: 'Telefone',
      value: personalInfo.phone || '+55 (11) 99999-9999',
      href: `tel:${personalInfo.phone}`,
      color: 'text-purple-500'
    },
    {
      icon: Clock,
      label: 'Horário de Resposta',
      value: 'Dentro de 24 horas',
      color: 'text-orange-500'
    }
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Assunto é obrigatório';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Mensagem deve ter pelo menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hydrated || !validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const result = await contactService.submitMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
        ipAddress: '', // Will be filled by server if needed
      });

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Track analytics
        if (typeof window !== 'undefined' && hydrated) {
          const windowWithGtag = window as WindowWithGtag;
          if (windowWithGtag.gtag) {
            windowWithGtag.gtag('event', 'form_submit', {
              event_category: 'Contact',
              event_label: 'Contact Form',
              value: 1
            });
          }
        }
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Entre em Contato
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tem um projeto em mente? Vamos conversar sobre como posso ajudar você a alcançar seus objetivos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="h-full shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Informações de Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  const content = (
                    <motion.div
                      key={info.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      className={`flex items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
                        info.href ? 'hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer' : ''
                      } transition-colors group`}
                    >
                      <div className={`w-12 h-12 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center mr-4 ${info.color} shadow-sm group-hover:shadow-md transition-shadow`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {info.label}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {info.value}
                        </p>
                      </div>
                    </motion.div>
                  );

                  return info.href ? (
                    <a
                      key={info.label}
                      href={info.href}
                      className="block"
                      onClick={() => {
                        if (hydrated && typeof window !== 'undefined') {
                          const windowWithGtag = window as WindowWithGtag;
                          if (windowWithGtag.gtag) {
                            windowWithGtag.gtag('event', 'click', {
                              event_category: 'Contact',
                              event_label: info.label,
                              value: 1
                            });
                          }
                        }
                      }}
                    >
                      {content}
                    </a>
                  ) : content;
                })}

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg border border-primary-200 dark:border-primary-800"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Vamos trabalhar juntos!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Estou sempre interessado em novos projetos e oportunidades de colaboração. 
                    Entre em contato e vamos criar algo incrível juntos.
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="h-full shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Enviar Mensagem
                </CardTitle>
              </CardHeader>
              <CardContent>
                {submitStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-2">
                        Mensagem enviada com sucesso!
                      </h3>
                      <p className="text-green-600 dark:text-green-300 mb-6">
                        Obrigado pelo contato. Responderei em breve.
                      </p>
                    </div>
                    
                    <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                      <p>
                        Normalmente respondo dentro de 24 horas.
                      </p>
                      <p>
                        Para contato direto, envie um email para{' '}
                        <a
                          href={`mailto:${personalInfo.email}`}
                          className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
                        >
                          {personalInfo.email}
                        </a>
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center"
                      >
                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-3" />
                        <div>
                          <h4 className="font-semibold text-red-800 dark:text-red-400">
                            Erro ao enviar mensagem
                          </h4>
                          <p className="text-red-600 dark:text-red-300 text-sm">
                            Tente novamente ou envie um email diretamente.
                          </p>
                        </div>
                      </motion.div>
                    )}

                    <HydratedForm onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Nome"
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      error={errors.name}
                      required
                      disabled={isSubmitting}
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      error={errors.email}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <Input
                    label="Assunto"
                    placeholder="Assunto da sua mensagem"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    error={errors.subject}
                    required
                    disabled={isSubmitting}
                  />

                  <Textarea
                    label="Mensagem"
                    placeholder="Conte-me sobre seu projeto ou como posso ajudá-lo..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    error={errors.message}
                    required
                    disabled={isSubmitting}
                    rows={6}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    className="shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <Loading size="sm" className="mr-2" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>
                </HydratedForm>

                <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                  <p>
                    Ou envie um email diretamente para{' '}
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      {personalInfo.email}
                    </a>
                  </p>
                </div>
                </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

