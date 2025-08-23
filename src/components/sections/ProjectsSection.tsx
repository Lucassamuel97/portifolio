'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Eye, Calendar, Filter, X } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { projects } from '@/lib/data';
import { safeFormatDate } from '@/lib/utils';
import { Project } from '@/types';
import type { WindowWithGtag } from '@/types';

export const ProjectsSection = () => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { key: 'all', label: 'Todos', count: projects.length },
    { key: 'web', label: 'Web Apps', count: projects.filter(p => p.category === 'web').length },
    { key: 'api', label: 'APIs', count: projects.filter(p => p.category === 'api').length },
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const getStatusColor = (status: string) => {
    const colors = {
      'completed': 'success',
      'in-progress': 'warning',
      'planned': 'info'
    };
    return colors[status as keyof typeof colors] || 'primary';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      'completed': 'Concluído',
      'in-progress': 'Em Desenvolvimento',
      'planned': 'Planejado'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const handleProjectClick = (url: string, type: 'github' | 'live' | 'demo') => {
    // Track analytics
    const windowWithGtag = window as WindowWithGtag;
    if (typeof window !== 'undefined' && windowWithGtag.gtag) {
      windowWithGtag.gtag('event', 'click', {
        event_category: 'Project',
        event_label: type,
        value: 1
      });
    }
    
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Projetos em Destaque
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Uma seleção dos principais sistemas, APIs e soluções que desenvolvi ao longo da minha jornada.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Filtrar por categoria:
            </span>
          </div>
          <div className="flex flex-wrap gap-2 w-full justify-center">
            {categories.map((category) => (
              <Button
                key={category.key}
                variant={selectedCategory === category.key ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.key)}
                className="transition-all duration-200"
              >
                {category.label} ({category.count})
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleProjectClick('https://github.com/Lucassamuel97?tab=repositories', 'github')}
              className="transition-all duration-200"
            >
              <Github className="h-4 w-4 mr-1" />
              Mais projetos no GitHub
            </Button>
          </div>
        </motion.div>

        {/* All Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isIntersecting ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-32 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center overflow-hidden">
                  {project.image ? (
                    <Image 
                      src={project.image} 
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="text-gray-600 dark:text-gray-400 text-2xl font-bold">
                      {project.title.split(' ').map(word => word[0]).join('').slice(0, 2)}
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge variant={getStatusColor(project.status) as 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'outline' | 'ghost'} size="sm">
                      {getStatusLabel(project.status)}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <Calendar className="h-3 w-3" />
                    <span>{safeFormatDate(project.updatedAt)}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="outline" size="sm" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="ghost" size="sm" className="text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleProjectClick(project.githubUrl!, 'github')}
                        className="flex-1"
                      >
                        <Github className="h-3 w-3" />
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button
                        size="sm"
                        onClick={() => handleProjectClick(project.liveUrl!, 'live')}
                        className="flex-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedProject(project)}
                      className="flex-1 text-xs"
                    >
                      Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Modal */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedProject.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusColor(selectedProject.status) as 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'outline' | 'ghost'}>
                        {getStatusLabel(selectedProject.status)}
                      </Badge>
                      <Badge variant="outline">
                        {selectedProject.category}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedProject(null)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {selectedProject.longDescription || selectedProject.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">Criado em:</span>
                    <p className="text-gray-600 dark:text-gray-400">
                      {safeFormatDate(selectedProject.createdAt)}
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">Atualizado em:</span>
                    <p className="text-gray-600 dark:text-gray-400">
                      {safeFormatDate(selectedProject.updatedAt)}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Tecnologias utilizadas:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  {selectedProject.githubUrl && (
                    <Button
                      variant="outline"
                      onClick={() => handleProjectClick(selectedProject.githubUrl!, 'github')}
                    >
                      <Github className="h-4 w-4 mr-2" />
                      Ver Código
                    </Button>
                  )}
                  {selectedProject.liveUrl && (
                    <Button
                      onClick={() => handleProjectClick(selectedProject.liveUrl!, 'live')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ver Projeto
                    </Button>
                  )}
                  {selectedProject.demoUrl && (
                    <Button
                      variant="secondary"
                      onClick={() => handleProjectClick(selectedProject.demoUrl!, 'demo')}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Demo
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

