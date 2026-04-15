import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FiTarget, FiEye, FiHeart, FiDollarSign, FiTrendingUp, FiTruck, FiShield, FiAward, FiUsers, FiCheckCircle } from 'react-icons/fi';
import { Typewriter } from 'react-simple-typewriter';

const AboutPage = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => { AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' }); }, []);

  const stats = [
    { num: 10, suffix: '+', label: 'Years Experience', icon: FiAward },
    { num: 500, suffix: '+', label: 'Cars Sold', icon: FiCheckCircle },
    { num: 1000, suffix: '+', label: 'Happy Customers', icon: FiUsers },
    { num: 200, suffix: '+', label: 'Bank Leases', icon: FiDollarSign },
  ];

  const services = [
    { icon: FiDollarSign, title: 'Bank Lease Financing', desc: 'Easy car financing through leading banks with competitive rates' },
    { icon: FiTrendingUp, title: 'Monthly Profit Investment', desc: 'Secure investment with guaranteed monthly returns' },
    { icon: FiTruck, title: '24/7 Car Towing', desc: 'Fast, reliable towing help anytime, anywhere in Karachi' },
    { icon: FiShield, title: 'Insurance & Inspection', desc: 'Complete insurance and professional vehicle inspection' },
  ];

  return (
    <div className="pt-20 min-h-screen bg-[#0A0A0A] page-transition">
      {/* Hero with parallax-style background */}
      <div className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80" alt="Luxury Car" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-[#0A0A0A]" />
        </div>
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#C8A35F]/5 blur-3xl animate-float" />
        <div className="absolute bottom-10 right-20 w-56 h-56 rounded-full bg-[#C8A35F]/5 blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fadeInUp">
            About <span className="bg-gradient-to-r from-[#A88A42] via-[#C8A35F] to-[#D4B878] bg-clip-text text-transparent">Siddiqui Motors</span>
          </h1>
          <p className="text-gray-300 text-xl md:text-2xl animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            Your trusted partner for{' '}
            <span className="text-[#C8A35F] font-semibold">
              <Typewriter
                words={['Bank Lease Financing', 'Vehicle Trading', 'Monthly Profit Investment', 'Car Towing Service', 'Vehicle Inspection']}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </span>
          </p>
        </div>
      </div>

      {/* Logo / Brand Section */}
      <section className="py-20 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2" data-aos="fade-right">
              <div className="relative">
                <div className="w-full h-96 rounded-2xl bg-gradient-to-br from-[#C8A35F]/20 via-[#111111] to-[#C8A35F]/10 flex items-center justify-center border border-[#C8A35F]/20 overflow-hidden">
                  <div className="text-center">
                    <div className="text-7xl md:text-8xl font-black bg-gradient-to-r from-[#A88A42] via-[#C8A35F] to-[#D4B878] bg-clip-text text-transparent mb-2">SM</div>
                    <div className="text-2xl md:text-3xl font-bold text-white tracking-wider">SIDDIQUI MOTORS</div>
                    <div className="text-[#C8A35F] text-base tracking-[0.4em] mt-2 uppercase">Since 2014</div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-[#C8A35F]/10 blur-2xl animate-float" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-[#C8A35F]/10 blur-2xl animate-float" style={{ animationDelay: '2s' }} />
              </div>
            </div>
            <div className="lg:w-1/2" data-aos="fade-left">
              <h2 className="text-4xl font-bold text-white mb-6">Our <span className="bg-gradient-to-r from-[#A88A42] via-[#C8A35F] to-[#D4B878] bg-clip-text text-transparent">Story</span></h2>
              <p className="text-gray-400 text-lg mb-4 leading-relaxed">Siddiqui Motors was founded with a simple vision: to make the car buying, selling, and investment experience transparent, enjoyable, and trustworthy in Karachi.</p>
              <p className="text-gray-400 text-lg mb-4 leading-relaxed">With over a decade of experience, we specialize in bank lease car financing, vehicle trading, and secure monthly profit investment programs. Our team ensures every transaction meets the highest standards of quality and trust.</p>
              <p className="text-gray-400 text-lg leading-relaxed">We believe in building lasting relationships through integrity, transparency, and a commitment to excellence in everything we do.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Car Gallery Section */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Premium <span className="bg-gradient-to-r from-[#A88A42] via-[#C8A35F] to-[#D4B878] bg-clip-text text-transparent">Vehicles</span></h2>
            <p className="text-gray-400 text-xl">We deal in the finest automobiles</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80', label: 'Luxury Sedans' },
              { img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80', label: 'Sports Cars' },
              { img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80', label: 'Premium SUVs' },
              { img: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=600&q=80', label: 'Classic Models' },
              { img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80', label: 'Executive Cars' },
              { img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80', label: 'Performance Vehicles' },
            ].map((car, i) => (
              <div key={i} className="relative group rounded-2xl overflow-hidden hover-lift" data-aos="zoom-in" data-aos-delay={i * 100}>
                <img src={car.img} alt={car.label} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-bold text-xl">{car.label}</h3>
                  <div className="w-12 h-1 bg-[#C8A35F] rounded mt-2 group-hover:w-24 transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-20 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What <span className="bg-gradient-to-r from-[#A88A42] via-[#C8A35F] to-[#D4B878] bg-clip-text text-transparent">Drives Us</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: FiTarget, title: 'Our Mission', desc: 'To provide the best automotive buying, selling, and investment experience with transparency, quality, and customer satisfaction at the core.', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80' },
              { icon: FiEye, title: 'Our Vision', desc: "To become Pakistan's most trusted automotive dealership and investment partner, setting new standards in the industry.", img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80' },
              { icon: FiHeart, title: 'Our Values', desc: 'Integrity, excellence, customer-first approach, and continuous innovation drive every decision we make.', img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&q=80' },
            ].map((item, i) => (
              <div key={i} className="card overflow-hidden hover-lift hover-shine" data-aos="fade-up" data-aos-delay={i * 150}>
                <img src={item.img} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#C8A35F]/10 flex items-center justify-center mx-auto mb-4 -mt-12 relative z-10 border-4 border-[#111111]">
                    <item.icon className="text-[#C8A35F]" size={28} />
                  </div>
                  <h3 className="text-white font-semibold text-xl mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-base leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats with animations */}
      <section className="py-20 bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&q=80" alt="Background" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our <span className="bg-gradient-to-r from-[#A88A42] via-[#C8A35F] to-[#D4B878] bg-clip-text text-transparent">Achievements</span></h2>
            <p className="text-gray-400 text-xl">Numbers that reflect our dedication</p>
          </div>
          <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i} className="text-center card p-8 hover-lift hover-shine" data-aos="fade-up" data-aos-delay={i * 150}>
                <div className="w-16 h-16 rounded-full bg-[#C8A35F]/10 flex items-center justify-center mx-auto mb-4">
                  <s.icon className="text-[#C8A35F]" size={28} />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-[#C8A35F] mb-2">
                  {inView ? <CountUp end={s.num} duration={2.5} /> : '0'}{s.suffix}
                </div>
                <p className="text-gray-400 text-lg">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What We <span className="bg-gradient-to-r from-[#A88A42] via-[#C8A35F] to-[#D4B878] bg-clip-text text-transparent">Offer</span></h2>
            <p className="text-gray-400 text-xl">Complete automotive solutions under one roof</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <div key={i} className="card p-8 text-center hover-lift hover-shine" data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="w-20 h-20 rounded-full bg-[#C8A35F]/10 flex items-center justify-center mx-auto mb-4">
                  <s.icon className="text-[#C8A35F]" size={32} />
                </div>
                <h3 className="text-white font-semibold text-xl mb-2">{s.title}</h3>
                <p className="text-gray-400 text-base">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#0A0A0A] to-[#111111] border-t border-[#C8A35F]/20">
        <div className="max-w-4xl mx-auto px-4 text-center" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to <span className="bg-gradient-to-r from-[#A88A42] via-[#C8A35F] to-[#D4B878] bg-clip-text text-transparent">Get Started?</span></h2>
          <p className="text-gray-400 text-xl mb-8">Whether you want to buy, sell, invest, or need financing — we're here to help.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/923323240790" target="_blank" rel="noreferrer" className="btn-primary text-lg px-10 py-5">
              WhatsApp Us Now
            </a>
            <a href="/contact" className="btn-outline text-lg px-10 py-5">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
