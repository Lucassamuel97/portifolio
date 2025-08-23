'use client';

import { motion } from 'framer-motion';
import { MapPin, Calendar, Award, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import Image from 'next/image';
import { personalInfo, education } from '@/lib/data';
import { safeFormatDate } from '@/lib/utils';
import { useState } from 'react';

export const AboutSection = () => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true
  });

  const [expandedCourses, setExpandedCourses] = useState<Record<string, boolean>>({});

  const toggleCourseExpansion = (eduId: string) => {
    setExpandedCourses(prev => ({
      ...prev,
      [eduId]: !prev[eduId]
    }));
  };

  const stats = [
    { label: 'Anos de Experiência', value: '5+' },
    { label: 'Projetos Concluídos', value: '50+' },
    { label: 'Clientes Satisfeitos', value: '30+' },
    { label: 'Tecnologias', value: '20+' }
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Sobre Mim
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Conheça mais sobre minha jornada, formação e paixão por tecnologia
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-primary-500">
                    <Image 
                      src="/avatar.png" 
                      alt={personalInfo.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {personalInfo.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {personalInfo.title}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <MapPin className="h-5 w-5 mr-3 text-primary-500" />
                    <span>{personalInfo.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Calendar className="h-5 w-5 mr-3 text-primary-500" />
                    <span>Disponível para projetos</span>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {personalInfo.bio}
                </p>

                {/* Languages */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Idiomas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {personalInfo.languages.map((language, index) => (
                      <Badge key={index} variant="outline">
                        {language.language} - {language.level}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isIntersecting ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border border-primary-100 dark:border-primary-800"
              >
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Formação Acadêmica
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary-500">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {edu.degree}
                        </h4>
                        <p className="text-primary-600 dark:text-primary-400 font-medium mb-1">
                          {edu.institution}
                        </p>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {edu.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="h-4 w-4 mr-1" />
                          {safeFormatDate(edu.period.start)} - {edu.period.end ? safeFormatDate(edu.period.end) : 'Atual'}
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>

                    {edu.description && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        {edu.description}
                      </p>
                    )}

                    {edu.gpa && (
                      <div className="flex items-center mb-3">
                        <Award className="h-4 w-4 text-yellow-500 mr-2" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          GPA: {edu.gpa}
                        </span>
                      </div>
                    )}

                    {edu.honors && edu.honors.length > 0 && (
                      <div className="mb-4">
                        <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                          Honras e Reconhecimentos:
                        </h5>
                        <div className="flex flex-wrap gap-1">
                          {edu.honors.map((honor, idx) => (
                            <Badge key={idx} variant="secondary" size="sm">
                              {honor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                      <div>
                        <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                          Disciplinas Relevantes:
                        </h5>
                        <div className="flex flex-wrap gap-1">
                          {(expandedCourses[edu.id] ? edu.relevantCourses : edu.relevantCourses.slice(0, 4)).map((course, idx) => (
                            <Badge key={idx} variant="outline" size="sm">
                              {course}
                            </Badge>
                          ))}
                          {edu.relevantCourses.length > 4 && (
                            <Badge 
                              variant="ghost" 
                              size="sm"
                              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                              onClick={() => toggleCourseExpansion(edu.id)}
                            >
                              {expandedCourses[edu.id] 
                                ? 'Mostrar menos' 
                                : `+${edu.relevantCourses.length - 4} mais`
                              }
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Interesses e Hobbies
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {personalInfo.interests.map((interest, index) => (
              <motion.div
                key={interest}
                initial={{ opacity: 0, scale: 0 }}
                animate={isIntersecting ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <Badge variant="primary" size="lg">
                  {interest}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

