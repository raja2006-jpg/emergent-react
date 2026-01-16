import React from 'react';
import { Quote, Star } from 'lucide-react';

function Testimonials() {
  const testimonials = [
    {
      name: 'Sarath',
      image: 'https://i.pinimg.com/originals/69/a5/60/69a5602fb6377d1fef9bb45e8db9e415.jpg',
      rating: 5,
      text: 'NeXLet transformed our outdated website into a modern, high-performing platform. Our conversion rate increased by 60%!'
    },
    {
      name: 'Michel',
      image: 'https://photos.bandsintown.com/thumb/17909044.jpeg',
      rating: 5,
      text: 'They understood our vision and created a stunning product with incredible UX.'
    },
   
    {
      name: 'David',
      image: 'https://www.electromaker.io/uploads/images/profile_pictures/Dhrumil_Makadia_profile_picture_1602094460.jpg',
      rating: 5,
      text: 'Their technical expertise and attention to detail impressed our entire team.'
    },
   
    {
      name: 'Jagan',
      image: 'https://i.etsystatic.com/iusa/b0c9e1/63888009/iusa_600x600.63888009_g3iz.jpg?version=0',
      rating: 5,
      text: 'Reservations doubled. NeXLet truly understands business needs.'
    }
  ];

  return (
    <section id="testimonials" className="py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Real feedback from businesses we’ve helped grow
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          <div className="flex gap-6 animate-testimonial-slide hover:[animation-play-state:paused]">
            
            {/* Duplicate list for infinite effect */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={index}
                className="min-w-[320px] max-w-[320px] bg-white  backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-lg"
              >
                <Quote className="h-8 w-8 text-black-500 opacity-80 mb-1  bg-black-500"  />

                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-600" />
                  ))}
                </div>

                <p className="text-black opacity-100 text-sm mb-5 leading-relaxed ">
                  “{testimonial.text}”
                </p>

                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-17 h-12 rounded-full object-cover border-0 border-blue-500"
                  />
                  <div>
                    <div className="text-black font-bold text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-black">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>

      {/* Animation Styles */}
      <style>
        {`
          @keyframes testimonial-slide {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-80%);
            }
          }
          .animate-testimonial-slide {
            animation: testimonial-slide 35s linear infinite;
          }
        `}
      </style>
    </section>
  );
}

export default Testimonials;
