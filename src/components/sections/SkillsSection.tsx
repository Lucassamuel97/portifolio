'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Smartphone, Database, Cloud, Wrench, Layers } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { skills } from '@/lib/data';

export const SkillsSection = () => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true
  });

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = [
    { 
      key: 'frontend', 
      label: 'Frontend', 
      icon: Code, 
      color: 'from-blue-500 to-cyan-500',
      description: 'Criação de interfaces modernas e responsivas'
    },
    { 
      key: 'backend', 
      label: 'Backend', 
      icon: Server, 
      color: 'from-green-500 to-emerald-500',
      description: 'Desenvolvimento de APIs e lógica de negócio'
    },
    { 
      key: 'other', 
      label: 'Other', 
      icon: Layers, 
      color: 'from-purple-500 to-pink-500',
      description: 'Outras tecnologias e ferramentas que utilizo'
    },
    { 
      key: 'database', 
      label: 'Database', 
      icon: Database, 
      color: 'from-orange-500 to-red-500',
      description: 'Bancos de dados relacionais e NoSQL'
    },
    { 
      key: 'devops', 
      label: 'DevOps', 
      icon: Cloud, 
      color: 'from-indigo-500 to-purple-500',
      description: 'Deploy, containerização e cloud'
    },
    { 
      key: 'tools', 
      label: 'Tools', 
      icon: Wrench, 
      color: 'from-gray-500 to-slate-500',
      description: 'Ferramentas de desenvolvimento'
    }
  ];

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  const getSkillColor = (level: number) => {
    if (level >= 90) return 'bg-green-500';
    if (level >= 75) return 'bg-blue-500';
    if (level >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getLevelLabel = (level: number) => {
    if (level >= 90) return 'Avançado';
    if (level >= 75) return 'Intermediário+';
    if (level >= 60) return 'Intermediário';
    return 'Básico';
  };

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Habilidades Técnicas
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tecnologias e ferramentas que utilizo para criar soluções eficientes
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category, index) => {
            const categorySkills = getSkillsByCategory(category.key);
            const Icon = category.icon;
            
            return (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 30 }}
                animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 ${
                    activeCategory === category.key 
                      ? 'ring-2 ring-primary-500 shadow-xl' 
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setActiveCategory(
                    activeCategory === category.key ? null : category.key
                  )}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="outline">
                        {categorySkills.length} skills
                      </Badge>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {category.label}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {category.description}
                    </p>

                    {/* Preview de skills */}
                    <div className="flex flex-wrap gap-1">
                      {categorySkills.slice(0, 3).map((skill) => (
                        <Badge key={skill.id} variant="ghost" size="sm">
                          {skill.name}
                        </Badge>
                      ))}
                      {categorySkills.length > 3 && (
                        <Badge variant="ghost" size="sm">
                          +{categorySkills.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Skills Detail */}
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  {(() => {
                    const category = categories.find(c => c.key === activeCategory);
                    const Icon = category?.icon || Code;
                    return (
                      <>
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${category?.color} flex items-center justify-center mr-4`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {category?.label}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {category?.description}
                          </p>
                        </div>
                      </>
                    );
                  })()}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getSkillsByCategory(activeCategory).map((skill, index) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {skill.name}
                        </h4>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline" 
                            size="sm"
                            className={`${getSkillColor(skill.level)} text-white border-0`}
                          >
                            {getLevelLabel(skill.level)}
                          </Badge>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {skill.experience}
                          </span>
                        </div>
                      </div>
                      
                      <ProgressBar
                        value={skill.level}
                        color={getSkillColor(skill.level)}
                        animated={true}
                        showValue={true}
                        size="md"
                      />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* All Skills Overview */}
        {/*<motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Visão Geral das Tecnologias
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {skills.slice(0, 18).map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={isIntersecting ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 1 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer group"
                onClick={() => {
                  const category = categories.find(c => c.key === skill.category);
                  if (category) {
                    setActiveCategory(skill.category);
                  }
                }}
              >
                <div className="w-12 h-12 mx-auto mb-2 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                  <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {skill.name.charAt(0)}
                  </span>
                </div>
                <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-1">
                  {skill.name}
                </h4>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1">
                  <motion.div
                    className={`h-1 rounded-full ${getSkillColor(skill.level)}`}
                    initial={{ width: 0 }}
                    animate={isIntersecting ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: 1.2 + index * 0.05 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>*/}

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-16 text-center"
        >
          <Card className="p-8 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-primary-200 dark:border-primary-800">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Sempre Aprendendo
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Acredito que o aprendizado contínuo é fundamental na área de tecnologia. 
                Estou sempre explorando novas ferramentas e metodologias para entregar 
                soluções ainda melhores.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

