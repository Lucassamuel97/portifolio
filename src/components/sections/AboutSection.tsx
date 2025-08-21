'use client';

import { motion } from 'framer-motion';

export const AboutSection = () => {
  return (
    <section 
      id="about" 
      className="py-20 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Sobre Mim
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo voluptas velit ipsa aliquam reiciendis laborum totam et sequi nobis dolorem, vitae repudiandae aliquid quia assumenda corrupti voluptates alias necessitatibus quae?
          </p>
        </motion.div>
      </div>
    </section>
  );
};
