import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ExternalLink, Clock, User } from 'lucide-react';

function Portfolio({ items, loading }) {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Web Development', 'UI/UX Design', 'Landing Page'];

  const filteredItems = filter === 'All' 
    ? items 
    : items.filter(item => item.category === filter);

  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 relative" data-testid="portfolio-section">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Portfolio
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore our recent projects and see how we bring ideas to life
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                filter === category
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
              data-testid={`filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        {loading ? (
          <div className="text-center text-gray-400 py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
            <p className="mt-4">Loading portfolio...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p>No projects found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <Card
                key={item.id}
                className="bg-white/5 border-white/10 backdrop-blur-lg overflow-hidden group hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105"
                data-testid={`portfolio-item-${index}`}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                      >
                        <ExternalLink className="h-5 w-5 text-white" />
                      </a>
                    )}
                  </div>
                  <Badge className="absolute top-4 left-4 bg-blue-500/90 text-white">
                    {item.category}
                  </Badge>
                </div>

                {/* Content */}
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-2 mb-4 text-xs text-gray-500">
                    {item.client && (
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {item.client}
                      </span>
                    )}
                    {item.duration && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {item.duration}
                      </span>
                    )}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs rounded bg-white/5 text-gray-400 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Portfolio;