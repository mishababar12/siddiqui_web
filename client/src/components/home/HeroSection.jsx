import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80"
          alt="Luxury car"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Floating decorative gold circles */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#C8A35F]/5 blur-3xl animate-float" />
      <div className="absolute bottom-32 right-16 w-48 h-48 rounded-full bg-[#C8A35F]/5 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full bg-[#C8A35F]/5 blur-2xl animate-float" style={{ animationDelay: '4s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 sm:pt-28 md:pt-32">
        <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          <span className="inline-block animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <span className="bg-gradient-to-r from-[#A88A42] via-[#C8A35F] to-[#D4B878] bg-clip-text text-transparent">
              <Typewriter
                words={['Drive', 'Invest', 'Profit', 'Trade', 'Finance']}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={100}
                deleteSpeed={60}
                delaySpeed={2000}
              />
            </span>
          </span>
          <br />
          <span className="inline-block animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            with <span className="bg-gradient-to-r from-[#A88A42] via-[#C8A35F] to-[#D4B878] bg-clip-text text-transparent">Siddiqui Motors</span>
          </span>
        </h1>
        <p className="text-gray-300 text-xl md:text-2xl max-w-2xl mx-auto mb-10 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          Your reliable partner in bank lease car financing and vehicle trading in Karachi. We facilitate car financing, buy & sell vehicles, and offer secure investment opportunities.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
          <Link to="/services" className="btn-primary text-lg px-10 py-5">Our Services</Link>
          <Link to="/contact" className="btn-outline text-lg px-10 py-5">Contact Us</Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '1s' }}>
          {[
            { num: '500+', label: 'Vehicles' },
            { num: '1000+', label: 'Happy Clients' },
            { num: '10+', label: 'Years Experience' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#C8A35F]">{stat.num}</div>
              <div className="text-gray-400 text-base mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
    </section>
  );
};

export default HeroSection;
