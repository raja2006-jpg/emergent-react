import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Code, Palette, Monitor, FileCode, Zap, LayoutTemplate } from 'lucide-react';
import { Button } from './ui/button';

function Services() {
  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Custom-built websites using modern technologies with focus on speed, security, and scalability.',
      features: ['React & Next.js', 'Node.js & Python', 'Database Design', 'API Integration']
    },
    {
      icon: Palette,
      title: 'Web Design & UI/UX',
      description: 'Clean, modern, and user-focused designs that enhance usability and strengthen brand identity.',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems']
    },
    {
      icon: Monitor,
      title: 'Responsive Design',
      description: 'Websites optimized for seamless experience across mobile, tablet, and desktop devices.',
      features: ['Mobile-First', 'Cross-Browser', 'Touch-Friendly', 'Adaptive Layouts']
    },
    {
      icon: FileCode,
      title: 'Figma to Code',
      description: 'Pixel-perfect conversion of Figma designs into clean, responsive, and production-ready code.',
      features: ['100% Accurate', 'Clean Code', 'Fast Delivery', 'Component Library']
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description: 'Optimized structure and fast-loading pages for smooth user interaction and better results.',
      features: ['Speed Optimization', 'SEO Ready', 'Core Web Vitals', 'Caching Strategy']
    },
    {
      icon: LayoutTemplate,
      title: 'Landing Pages',
      description: 'High-converting landing pages crafted to capture attention and drive meaningful action.',
      features: ['A/B Testing', 'Conversion Focus', 'Fast Loading', 'Analytics Setup']
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 relative" data-testid="services-section">
      <div className="max-w-7xl mx-auto">
          {/* Black Gradient Overlay */}
      <div className="absolute inset 1 z 1 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/100" />
      
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Professional digital solutions designed to deliver performance, usability, and long-term value.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="bg-white/5 border-white/10 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl "
                data-testid={`service-card-${index}`}
              >
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-white text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-300 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={scrollToContact}
                    variant="ghost"
                    className="w-full mt-4 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                    data-testid={`service-learn-more-${index}`}
                  >
                    Learn More →
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;