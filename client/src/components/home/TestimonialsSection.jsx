import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FiStar } from 'react-icons/fi';
import { getTestimonials } from '../../services/contentService';
import 'swiper/css';
import 'swiper/css/pagination';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    getTestimonials()
      .then(res => setTestimonials(res.data.data))
      .catch(() => {
        setTestimonials([
          { _id: '1', name: 'Ahmed Khan', rating: 5, review: 'Best car dealership in Karachi! Got my dream car at an amazing price. The bank lease process was incredibly smooth.', designation: 'Business Owner', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
          { _id: '2', name: 'Sara Ali', rating: 5, review: 'Excellent service and transparent dealing. The investment program gives me great monthly returns. Highly recommend Siddiqui Motors.', designation: 'Doctor', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
          { _id: '3', name: 'Usman Sheikh', rating: 4, review: 'Great financing options and the documentation process was minimal. Professional team that truly cares about customers.', designation: 'Engineer', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80' },
          { _id: '4', name: 'Fatima Riaz', rating: 5, review: 'The 24/7 towing service saved me at midnight! Fastest response time. Their vehicle inspection gave me complete confidence in my purchase.', designation: 'Teacher', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
        ]);
      });
  }, []);

  return (
    <section className="section-padding bg-[#111111]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="section-title">What Our <span className="gold-gradient">Customers Say</span></h2>
          <p className="section-subtitle">Real experiences from real customers</p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          className="pb-12"
        >
          {testimonials.map(t => (
            <SwiperSlide key={t._id}>
              <div className="card p-8 h-full hover-lift hover-shine">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} size={20} className={i < t.rating ? 'text-[#C8A35F] fill-[#C8A35F]' : 'text-gray-600'} />
                  ))}
                </div>
                <p className="text-gray-300 text-base italic mb-6 leading-relaxed">"{t.review}"</p>
                <div className="flex items-center space-x-3 pt-4 border-t border-[#2A2A2A]">
                  {t.avatar ? (
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#C8A35F]/20 flex items-center justify-center text-[#C8A35F] font-bold text-lg">
                      {t.name?.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-white font-medium text-base">{t.name}</p>
                    <p className="text-gray-500 text-sm">{t.designation}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialsSection;
