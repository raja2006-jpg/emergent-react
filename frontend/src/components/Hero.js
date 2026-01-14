import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Sparkles, Code2, Palette } from 'lucide-react';

function Hero() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      data-testid="hero-section"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 grid-background opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-gradient"></div>
      
      {/* Floating Icons */}
      <div className="absolute top-20 left-10 text-blue-500 opacity-20 animate-float">
        <Code2 size={60} />
      </div>
      <div className="absolute bottom-20 right-10 text-purple-500 opacity-20 animate-float" style={{ animationDelay: '2s' }}>
        <Palette size={60} />
      </div>
      <div className="absolute top-1/3 right-1/4 text-pink-500 opacity-20 animate-float" style={{ animationDelay: '4s' }}>
        <Sparkles size={60} />
      </div>
       <div className="absolute bottom-1/3 left-1/4 text-purple-700 opacity-20 animate-float" style={{ animationDelay: '4s' }}>
        <Sparkles size={60} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 mb-6">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium px-3 py-1 rounded-md bg-white-800 text-white-2000 shadow-sm">
  Build Unique Websites with NeXLet
</span>

          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Where Code Meets
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Creativity
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
            Web Development & Digital Solutions
          </p>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Modern Responsive Websites for Businesses & Brands
          </p>

          {/* Feature Points */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 text-sm text-gray-400">
            {[
              'responsive design',
              'Figma to Code',
              'Landing Pages',
              'UI/UX Design',
              'web development',
              'Performance Optimization'
            ].map((feature, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                • {feature}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => scrollToSection('contact')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg group"
              data-testid="hero-get-started-btn"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('portfolio')}
              className="bg-white/10 hover:bg-white/20 border-white/20 text-white px-8 py-6 text-lg"
              data-testid="hero-view-work-btn"
            >
              View Our Work
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: '10+', label: 'Projects Delivered' },
              { number: '90%', label: 'Client Satisfaction' },
              { number: '24/7', label: 'Support Available' },
              { number: '2+', label: 'Years Experience' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;