import React from 'react';
import { Card } from './ui/card';

function WhyNeXLet() {
  const features = [
    {
      icon: '⚡',
      title: 'High Performance',
      description: 'Lightning-fast loading speeds and optimized code for the best user experience.'
    },
    {
      icon: '📱',
      title: 'Fully Responsive',
      description: 'Perfect display on all devices - from mobile phones to large desktop screens.'
    },
    {
      icon: '🎨',
      title: 'Modern UI/UX',
      description: 'Beautiful and intuitive design that keeps users engaged and satisfied.'
    },
    {
      icon: '🚀',
      title: 'Scalable Solutions',
      description: 'Architecture that grows with your business and adapts to future needs.'
    }
  ];

  const portfolioImages = [
    'https://static.wixstatic.com/media/7543c9_8b5ef1eb5e884ef2bcd8742bca552b75~mv2.jpg',
    'https://img.freepik.com/premium-photo/dark-mode-ui-design-mobile-app_1179475-25350.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/879478202903301.668e1baab3185.jpg',
    'https://evisionthemes.com/wp-content/uploads/edd/2017/11/bizplus-free-responsive.png',
    
    
  ];

  const techPartners = [
    'UIdeck',
    'TailGrids',
    'Lineicons',
    'Ayro UI'
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative" data-testid="why-nexlet-section">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Crafting Stunning Websites to Elevate Your Online Presence!
          </h2>
          <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
           <span className='text-white'>Why </span> <span className="text-blue-500">NeX</span><span className='text-white'>Let</span>
          </h3>
        </div>

        {/* Tech Partners */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {techPartners.map((partner, index) => (
            <div
              key={index}
              className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-300 font-bold hover:bg-white/10 transition-colors"
            >
              {partner}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              <span className="font-bold text-white">NeXLet</span> is a modern web development studio focused on building
              <span className="text-blue-400 font-semibold"> fast, responsive, and visually striking websites </span>
              for businesses, brands, and creators.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              We believe a website is more than just an online presence — it is a
              <span className="text-blue-400 font-semibold"> digital experience </span>
              that represents your brand's identity, values, and vision.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              At <span className="font-bold text-white">NeXLet</span>, every project is crafted with attention to detail,
              clean design, smooth interactions, and performance-first development.
            </p>
            <p className="text-xl text-blue-400 font-semibold mt-8">
              Our goal is to help brands stand out, grow, and succeed online.
            </p>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
             {/* Gradient Beam */}
      <div className="absolute top-[21%] left-[7%] md:left-[58%] w-[1008px] md:w-[400px] h-[40px] md:h-[700px] bg-gradient-to-br from-white/10 to-transparent blur-3xl rotate-[90deg] md:rotate-[90deg] z-0" />

            {portfolioImages.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg aspect-video group"
              >
                <img
                  src={image}
                  alt={`Portfolio showcase ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-white/5 to-white/10 border-white/10 backdrop-blur-white p-6 hover:from-white/10 hover:to-white/15 transition-all duration-300 hover:scale-105"
              data-testid={`feature-card-${index}`}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyNeXLet;