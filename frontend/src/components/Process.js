import React from 'react';
import { Card, CardContent } from './ui/card';
import { CheckCircle2 } from 'lucide-react';

function Process() {
  const steps = [
    {
      number: '01',
      title: 'Discovery & Planning',
      description: 'We start by understanding your business, goals, target audience, and requirements to create a comprehensive project roadmap.',
      highlights: ['Requirement Analysis', 'Competitor Research', 'Project Timeline', 'Technology Selection']
    },
    {
      number: '02',
      title: 'Design & Prototyping',
      description: 'Our designers create wireframes and high-fidelity mockups, ensuring every detail aligns with your brand and vision.',
      highlights: ['Wireframes', 'UI/UX Design', 'Interactive Prototypes', 'Design Review']
    },
    {
      number: '03',
      title: 'Development',
      description: 'Our developers bring designs to life with clean, scalable code using the latest technologies and best practices.',
      highlights: ['Frontend Development', 'Backend APIs', 'Database Setup', 'Integration']
    },
    {
      number: '04',
      title: 'Testing & Launch',
      description: 'Rigorous testing ensures everything works perfectly. Then we launch your project and provide ongoing support.',
      highlights: ['Quality Assurance', 'Performance Testing', 'Deployment', '24/7 Support']
    }
  ];

  return (
    <section id="process" className="py-20 px-4 sm:px-6 lg:px-8 relative" data-testid="process-section">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Process
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A systematic approach to ensure your project's success from start to finish
          </p>
        </div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform -translate-x-1/2"></div>

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex flex-col lg:flex-row gap-8 items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
                data-testid={`process-step-${index}`}
              >
                {/* Content Card */}
                <div className="flex-1 w-full">
                  <Card className="bg-white/5 border-white/10 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-400">
                          {step.number}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                          <p className="text-gray-400 leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        {step.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Center Dot */}
                <div className="hidden lg:block relative z-10 flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-4 border-black shadow-lg"></div>
                </div>

                {/* Spacer */}
                <div className="hidden lg:block flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Process;