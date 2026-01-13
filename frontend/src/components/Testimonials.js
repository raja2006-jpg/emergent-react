import React from 'react';
import { Card, CardContent } from './ui/card';
import { Quote, Star } from 'lucide-react';

function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechCorp International',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 5,
      text: 'NeXLet transformed our outdated website into a modern, high-performing platform. The team was professional, responsive, and delivered beyond our expectations. Our conversion rate increased by 60%!'
    },
    {
      name: 'Michael Chen',
      role: 'Founder, HealthTrack Inc.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      text: 'Working with NeXLet was a game-changer for our startup. They understood our vision and created a stunning mobile app with incredible UX. Highly recommend their UI/UX design services!'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director, StyleHub',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      rating: 5,
      text: 'The e-commerce platform NeXLet built for us is exceptional. Fast, beautiful, and our customers love it. Sales have increased by 45% since launch. Best investment we made this year!'
    },
    {
      name: 'David Park',
      role: 'CTO, InvestPro',
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      rating: 5,
      text: 'NeXLet delivered a sophisticated financial dashboard with complex data visualizations. Their technical expertise and attention to detail impressed our entire team. True professionals!'
    },
    {
      name: 'Lisa Thompson',
      role: 'Director, EduLearn Academy',
      image: 'https://randomuser.me/api/portraits/women/55.jpg',
      rating: 5,
      text: 'Our learning management system exceeded all expectations. NeXLet integrated video streaming, live sessions, and interactive features flawlessly. Students and teachers love the platform!'
    },
    {
      name: 'James Wilson',
      role: 'Owner, Gourmet Bistro',
      image: 'https://randomuser.me/api/portraits/men/46.jpg',
      rating: 5,
      text: 'The restaurant booking system is elegant and easy to use. Our reservations have doubled, and customers appreciate the seamless experience. NeXLet truly understands hospitality businesses!'
    }
  ];

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 relative" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it - hear from the businesses we've helped succeed
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-white/5 border-white/10 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
              data-testid={`testimonial-card-${index}`}
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <Quote className="h-10 w-10 text-blue-500 mb-4 opacity-50" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                    loading="lazy"
                  />
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;