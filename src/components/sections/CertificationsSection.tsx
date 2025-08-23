'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, Clock, ExternalLink, Building, User, Filter, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { certifications } from '@/lib/data';
import { Certification } from '@/types';

export const CertificationsSection = () => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true
  });

  const [selectedOrganization, setSelectedOrganization] = useState<string>('all');
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);

  // Obter organizações únicas
  const organizations = [
    { key: 'all', label: 'Todas', count: certifications.length },
    ...Array.from(new Set(certifications.map(cert => cert.organization)))
      .map(org => ({
        key: org,
        label: org,
        count: certifications.filter(cert => cert.organization === org).length
      }))
  ];

  const filteredCertifications = selectedOrganization === 'all' 
    ? certifications 
    : certifications.filter(cert => cert.organization === selectedOrganization);

  const formatPeriod = (period: string) => {
    if (period.includes(' a ')) {
      const [start, end] = period.split(' a ');
      return { start, end, isSingle: false };
    }
    return { start: period, end: null, isSingle: true };
  };

  const openCertificateModal = (cert: Certification) => {
    setSelectedCertification(cert);
  };

  const closeCertificateModal = () => {
    setSelectedCertification(null);
  };

  return (
    <section id="certifications" className="py-20 bg-gradient-to-br from-gray-400/50 to-green-400/30 dark:from-gray-900/50 dark:to-green-900/20" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-green-900/50 rounded-full text-green-600 dark:text-green-400 font-medium mb-4">
            <Award className="w-4 h-4" />
            Certificações & Conquistas
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Certificações
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Cursos e certificações que demonstram meu compromisso com o aprendizado contínuo
            e especialização em tecnologias modernas.
          </p>
        </motion.div>

        {/* Filtros por Organização */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {organizations.map((org) => (
            <Button
              key={org.key}
              variant={selectedOrganization === org.key ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedOrganization(org.key)}
              className="transition-all duration-300"
            >
              <Filter className="w-4 h-4 mr-2" />
              {org.label} ({org.count})
            </Button>
          ))}
        </motion.div>

        {/* Grid de Certificações */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertifications.map((cert, index) => {
            const period = formatPeriod(cert.period);
            
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.1 + (index * 0.1),
                  ease: "easeOut"
                }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                      onClick={() => openCertificateModal(cert)}>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-2">
                      <Award className="w-8 h-8 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300" />
                      <Badge variant="info" size="sm">
                        Certificação
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                      {cert.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {cert.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Building className="w-4 h-4" />
                        <span className="font-medium">{cert.organization}</span>
                      </div>
                      
                      {cert.instructors && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <User className="w-4 h-4" />
                          <span className="truncate">{cert.instructors}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {period.isSingle ? period.start : `${period.start} - ${period.end}`}
                        </span>
                      </div>
                      
                      {cert.hours && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>{cert.hours}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                        ID: {cert.certificateCode}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Modal de Detalhes da Certificação */}
        {selectedCertification && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeCertificateModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedCertification.title}
                    </h3>
                    <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">
                      {selectedCertification.organization}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeCertificateModal}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Descrição
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {selectedCertification.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Detalhes
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Período</p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {selectedCertification.period}
                          </p>
                        </div>
                      </div>
                      
                      {selectedCertification.hours && (
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Duração</p>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {selectedCertification.hours}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {selectedCertification.instructors && (
                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Instrutores</p>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {selectedCertification.instructors}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Certificado
                    </h4>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        Código do Certificado
                      </p>
                      <p className="font-mono text-sm text-gray-900 dark:text-white break-all">
                        {selectedCertification.certificateCode}
                      </p>
                      
                      {selectedCertification.url && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 w-full"
                          onClick={() => window.open(selectedCertification.url, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Ver Certificado
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Estatísticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {certifications.length}
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Certificações Obtidas
              </p>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {organizations.length - 1}
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Organizações
              </p>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {certifications.filter(cert => cert.hours).reduce((total, cert) => {
                  const hours = cert.hours?.match(/\d+/)?.[0] || '0';
                  return total + parseInt(hours);
                }, 0)}h
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Horas de Estudo
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
