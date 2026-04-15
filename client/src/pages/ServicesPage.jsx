import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FiDollarSign, FiTrendingUp, FiTruck, FiShield } from 'react-icons/fi';

const services = [
  {
    icon: FiDollarSign,
    title: 'Bank Lease Financing',
    description: 'We facilitate easy car financing through leading banks in Pakistan. Get competitive rates, flexible tenure options, and hassle-free documentation. Whether you want a new or pre-owned vehicle, our bank lease service makes it affordable and accessible.',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&q=80',
    features: ['Competitive bank rates', 'Flexible repayment plans', 'Quick approval process', 'Minimal documentation'],
  },
  {
    icon: FiTrendingUp,
    title: 'Monthly Profit Investment',
    description: 'Secure your capital with our trusted vehicle investment program. Earn guaranteed monthly returns through our profit-sharing model. A safe and transparent investment opportunity backed by real vehicle assets.',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80',
    features: ['Guaranteed monthly returns', 'Secure investment', 'Transparent profit sharing', 'Asset-backed security'],
  },
  {
    icon: FiTruck,
    title: '24/7 Car Towing Service',
    description: 'Stranded on the road? Our 24/7 towing service provides fast, reliable help anytime, anywhere in Karachi. Professional towing equipment and trained operators ensure your vehicle is handled with care.',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80',
    features: ['Available 24 hours', 'Fast response time', 'Professional equipment', 'City-wide coverage'],
  },
  {
    icon: FiShield,
    title: 'Insurance & Inspection',
    description: 'Complete car insurance arrangements and professional vehicle inspection services. We ensure every vehicle meets the highest standards of safety and quality through our comprehensive multi-point inspection process.',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=600&q=80',
    features: ['Comprehensive inspection', 'Insurance facilitation', 'Safety certification', 'Detailed reports'],
  },
];

const ServicesPage = () => {
  useEffect(() => { AOS.init({ duration: 800, once: true }); }, []);

  return (
    <div className="pt-20 min-h-screen bg-[#0A0A0A] page-transition">
      {/* Hero with background image */}
      <div className="relative py-24 text-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80" alt="Services" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/75" />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white" data-aos="fade-down">Our <span className="bg-gradient-to-r from-[#A88A42] via-[#C8A35F] to-[#D4B878] bg-clip-text text-transparent">Services</span></h1>
          <p className="text-gray-300 mt-4 text-xl max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">We provide a wide range of services to make your car experience smooth, secure, and profitable</p>
        </div>
      </div>

      {/* Services */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        {services.map((s, i) => (
          <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 mb-20 items-center`}>
            {/* Image */}
            <div className="w-full lg:w-1/2" data-aos={i % 2 === 0 ? 'fade-right' : 'fade-left'} data-aos-delay="0">
              <div className="relative rounded-2xl overflow-hidden group">
                <img src={s.image} alt={s.title} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 w-14 h-14 rounded-full bg-[#C8A35F]/90 flex items-center justify-center">
                  <s.icon className="text-white" size={24} />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-bold text-white mb-4" data-aos="fade-up" data-aos-delay="100">
                {s.title}
              </h2>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed" data-aos="fade-up" data-aos-delay="200">
                {s.description}
              </p>
              <ul className="space-y-3">
                {s.features.map((feat, j) => (
                  <li key={j} className="flex items-center text-gray-300 text-base" data-aos="fade-up" data-aos-delay={300 + j * 100}>
                    <span className="w-2 h-2 rounded-full bg-[#C8A35F] mr-3 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ - Simple details/summary */}
      <section className="py-20 bg-[#111111]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked <span className="bg-gradient-to-r from-[#A88A42] via-[#C8A35F] to-[#D4B878] bg-clip-text text-transparent">Questions</span></h2>
            <p className="text-gray-400 text-xl">Everything you need to know about our services</p>
          </div>
          <div className="space-y-4">
            {[
              { q: 'How does bank lease financing work?', a: 'We facilitate car financing through leading banks in Pakistan. Choose your vehicle, we handle the documentation, and you drive away with easy monthly installments at competitive rates.' },
              { q: 'What is the monthly profit investment program?', a: 'Invest your capital in our vehicle trading business and earn guaranteed monthly returns. Your investment is secured by real vehicle assets with complete transparency.' },
              { q: 'Do you offer 24/7 towing service?', a: 'Yes! Our professional towing service is available round the clock across Karachi. Fast response time with professional equipment to handle your vehicle with care.' },
              { q: 'What documents are needed for financing?', a: 'You need CNIC, income proof (salary slip or business documents), bank statements of last 6 months, and employment verification. We keep documentation minimal.' },
              { q: 'Do you provide vehicle inspection?', a: 'Every vehicle goes through our comprehensive multi-point inspection process. We also arrange complete car insurance for your peace of mind.' },
            ].map((faq, i) => (
              <details key={i} className="group rounded-xl border border-[#2A2A2A] bg-[#0A0A0A] hover:border-[#C8A35F]/30 transition-all duration-300 open:border-[#C8A35F]/40 open:shadow-lg open:shadow-[#C8A35F]/10" data-aos="fade-up" data-aos-delay={i * 80}>
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span className="text-white font-semibold text-lg group-open:text-[#C8A35F] transition-colors">{faq.q}</span>
                  <svg className="w-5 h-5 text-gray-500 group-open:text-[#C8A35F] group-open:rotate-180 transition-transform duration-300 flex-shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5">
                  <div className="w-12 h-[2px] bg-gradient-to-r from-[#C8A35F] to-transparent mb-3" />
                  <p className="text-gray-300 text-base leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="bg-gradient-to-r from-[#111111] to-[#0A0A0A] py-20 text-center border-t border-[#C8A35F]/20" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Interested in Our Services?</h2>
        <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">Get in touch with us today. We're here to help you with all your automotive needs.</p>
        <a href="https://wa.me/923323240790" target="_blank" rel="noreferrer" className="btn-primary text-lg px-10 py-4 inline-block">
          WhatsApp Us Now
        </a>
      </div>
    </div>
  );
};

export default ServicesPage;
