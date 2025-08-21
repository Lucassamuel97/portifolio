'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink, Award, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { experiences } from '@/lib/data';
import { formatDate } from '@/lib/utils';

export const ExperienceSection = () => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true
  });

  const getTypeColor = (type: string) => {
    const colors = {
      'full-time': 'primary',
      'part-time': 'secondary',
      'freelance': 'success',
      'contract': 'warning',
      'internship': 'info'
    };
    return colors[type as keyof typeof colors] || 'primary';
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      'full-time': 'Tempo Integral',
      'part-time': 'Meio Período',
      'freelance': 'Freelance',
      'contract': 'Contrato',
      'internship': 'Estágio'
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Experiência Profissional
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Minha jornada profissional e os projetos que ajudei a criar
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-800"></div>

          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-500 border-4 border-white dark:border-gray-800 rounded-full z-10"></div>

              {/* Content */}
              <div className={`w-full md:w-5/12 pl-20 md:pl-0 ${
                index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
              }`}>
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {experience.title}
                          </h3>
                          <Badge 
                            variant={getTypeColor(experience.type) as any}
                            size="sm"
                          >
                            {getTypeLabel(experience.type)}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-lg font-medium text-primary-600 dark:text-primary-400">
                            {experience.company}
                          </h4>
                          {experience.companyUrl && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => window.open(experience.companyUrl, '_blank')}
                              className="h-6 w-6 hover:scale-110 transition-transform"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          )}
                        </div>

                        <div className="flex flex-col gap-1 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            {experience.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            {formatDate(experience.period.start)} - {
                              experience.period.end ? formatDate(experience.period.end) : 'Atual'
                            }
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {experience.description}
                    </p>

                    {/* Responsibilities */}
                    <div className="mb-6">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-3">
                        Principais Responsabilidades:
                      </h5>
                      <ul className="space-y-2">
                        {experience.responsibilities.map((responsibility, idx) => (
                          <li key={idx} className="flex items-start text-gray-600 dark:text-gray-300 text-sm">
                            <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-primary-500 flex-shrink-0" />
                            {responsibility}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Achievements */}
                    {experience.achievements && experience.achievements.length > 0 && (
                      <div className="mb-6">
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-3">
                          Principais Conquistas:
                        </h5>
                        <ul className="space-y-2">
                          {experience.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start text-gray-600 dark:text-gray-300 text-sm">
                              <Award className="h-4 w-4 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Technologies */}
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-3">
                        Tecnologias Utilizadas:
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={isIntersecting ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.3, delay: 0.8 + index * 0.2 + idx * 0.05 }}
                            whileHover={{ scale: 1.1 }}
                          >
                            <Badge variant="outline" size="sm">
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Empty space for alternating layout */}
              <div className="hidden md:block w-5/12"></div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: experiences.length * 0.2 + 0.5 }}
          className="text-center mt-12"
        >
          <Card className="p-8 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-primary-200 dark:border-primary-800">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Interessado em trabalhar comigo?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                Estou sempre aberto a novas oportunidades e projetos interessantes. 
                Vamos conversar sobre como posso ajudar sua empresa a alcançar seus objetivos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => window.location.href = '#contact'}>
                  Entre em Contato
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.open('/documents/lucas-samuel-pereira-curriculo.pdf', '_blank')}
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Ver Currículo Completo
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

