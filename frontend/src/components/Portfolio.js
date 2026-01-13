import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Clock, User } from 'lucide-react';

/* ===================== DATA ===================== */
const PROJECTS = [
  {
    id: 1,
    title: 'FullStack Development',
    category: 'Web Development',
    description: 'Modern agency website with responsive UI and animations.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    link: 'https://nexlet.vercel.app',
    client: 'NeXLet',
    duration: '2 Weeks',
    tech: ['React','Angular', 'Tailwind', 'APIs','etc..'],
  },
  {
    id: 2,
    title: 'Startup Landing Page',
    category: 'Landing Page',
    description: 'High-conversion landing page for startups.',
    image: 'https://images.unsplash.com/photo-1519337265831-281ec6cc8514',
    link: 'https://nexlet.vercel.app',
    client: 'Startup Client',
    duration: '5 Days',
    tech: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 3,
    title: 'Mobile App UI',
    category: 'UI/UX Design',
    description: 'Clean and modern mobile app UI/UX design.',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d',
    link: 'https://nexlet.vercel.app',
    client: 'Design Studio',
    duration: '1 Week',
    tech: ['Figma', 'UX'],
  },
  
];

/* ===================== ANIMATIONS ===================== */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

/* ===================== COMPONENT ===================== */
function Portfolio() {
  const [active, setActive] = useState('All');
  const categories = ['All', 'Web Development', 'UI/UX Design', 'Landing Page'];

  const visible =
    active === 'All'
      ? PROJECTS
      : PROJECTS.filter(p => p.category === active);

  return (
    <section
      id="portfolio"
      className="py-24 px-4 bg-gradient-to-b from-black via-gray-900 to-black"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Portfolio
          </h2>
          <p className="text-lg text-gray-400">
            Explore our recent projects and see how we bring ideas to life
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex justify-center flex-wrap gap-4 mb-16">
          {categories.map(cat => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActive(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all
                ${
                  active === cat
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/40'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {visible.map(project => (
            <motion.div
              key={project.id}
              variants={item}
              whileHover={{ y: -8, scale: 1.03 }}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 bg-black/60 p-2 rounded-full hover:bg-black/80"
                  >
                    <ExternalLink className="w-5 h-5 text-white" />
                  </a>
                )}

                <span className="absolute top-4 left-4 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                  {project.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {project.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4">
                  {project.description}
                </p>

                <div className="flex gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {project.client}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {project.duration}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default Portfolio;
