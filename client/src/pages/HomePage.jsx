import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HeroSection from '../components/home/HeroSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import TestimonialsSection from '../components/home/TestimonialsSection';
import NewsletterSection from '../components/home/NewsletterSection';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { calculateEMI, formatPrice } from '../utils/helpers';
import { FiArrowRight, FiArrowDown, FiAward, FiUsers, FiCheckCircle, FiDollarSign, FiStar } from 'react-icons/fi';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

/* ===== STATS SECTION ===== */
const StatsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const stats = [
    { num: 500, suffix: '+', label: 'Vehicles Sold', icon: FiCheckCircle },
    { num: 1000, suffix: '+', label: 'Happy Customers', icon: FiUsers },
    { num: 10, suffix: '+', label: 'Years Experience', icon: FiAward },
    { num: 200, suffix: '+', label: 'Bank Leases', icon: FiDollarSign },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&q=80" alt="" className="w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-[#111111]/90" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our <span className="bg-gradient-to-r from-[#A88A42] via-[#C8A35F] to-[#D4B878] bg-clip-text text-transparent">Track Record</span></h2>
          <p className="text-gray-400 text-xl">Numbers that speak for our commitment and excellence</p>
        </div>
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center card p-8 card-3d" data-aos="fade-up" data-aos-delay={i * 150}>
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
  );
};

/* ===== PROCESS SECTION ===== */
const ProcessSection = () => {
  const steps = [
    { num: '01', title: 'Choose Your Vehicle', desc: 'Browse our collection of premium vehicles or tell us what you need', img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&q=80' },
    { num: '02', title: 'Get Financing', desc: 'We arrange bank lease financing with the best rates and terms', img: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&q=80' },
    { num: '03', title: 'Complete Documentation', desc: 'Minimal paperwork — our team handles everything for you', img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80' },
    { num: '04', title: 'Drive Away Happy', desc: 'Get behind the wheel and enjoy your new ride with complete peace of mind', img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80' },
  ];

  return (
    <section className="py-20 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How It <span className="bg-gradient-to-r from-[#A88A42] via-[#C8A35F] to-[#D4B878] bg-clip-text text-transparent">Works</span></h2>
          <p className="text-gray-400 text-xl">Simple 4-step process to your dream car</p>
        </div>
        {/* Desktop: horizontal grid */}
        <div className="hidden md:grid grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative" data-aos="fade-up" data-aos-delay={i * 150}>
              <div className="relative rounded-2xl overflow-hidden hover-lift h-full group">
                <img src={step.img} alt={step.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition-all duration-300" />
                <div className="relative z-10 p-8 text-center">
                  <div className="text-5xl font-black text-[#C8A35F]/30 mb-4">{step.num}</div>
                  <h3 className="text-white font-semibold text-xl mb-3">{step.title}</h3>
                  <p className="text-gray-300 text-base">{step.desc}</p>
                </div>
              </div>
              {i < 3 && (
                <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <FiArrowRight className="text-[#C8A35F]/40" size={24} />
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Mobile: vertical timeline */}
        <div className="md:hidden relative">
          <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#C8A35F] via-[#C8A35F]/40 to-transparent" />
          {steps.map((step, i) => (
            <div key={i} className="relative pl-16 pb-10 last:pb-0" data-aos="fade-up" data-aos-delay={i * 150}>
              <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#A88A42] to-[#D4B878] flex items-center justify-center z-10 shadow-lg shadow-[#C8A35F]/20">
                <span className="text-[#0A0A0A] font-black text-sm">{step.num}</span>
              </div>
              {i < 3 && (
                <div className="absolute left-[18px] top-14 z-10">
                  <FiArrowDown className="text-[#C8A35F]/40" size={16} />
                </div>
              )}
              <div className="card p-6 hover-lift hover-shine">
                <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-400 text-base">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ===== EMI CALCULATOR ===== */
const EMICalculatorSection = () => {
  const [price, setPrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [tenure, setTenure] = useState(36);
  const [rate, setRate] = useState(12);
  const [result, setResult] = useState(null);

  const handleCalc = () => {
    const principal = Number(price) - Number(downPayment || 0);
    if (principal <= 0) return;
    const monthly = calculateEMI(principal, rate, tenure);
    const total = monthly * tenure;
    setResult({ monthly, total, interest: total - principal });
  };

  return (
    <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#C8A35F]/3 blur-3xl parallax-slow" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#C8A35F]/3 blur-3xl parallax-medium" />
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">EMI <span className="bg-gradient-to-r from-[#A88A42] via-[#C8A35F] to-[#D4B878] bg-clip-text text-transparent">Calculator</span></h2>
          <p className="text-gray-400 text-xl">Calculate your monthly installments instantly</p>
        </div>
        <div className="card p-10 md:p-12 card-3d" data-aos="fade-up" data-aos-delay="200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="text-[#C8A35F] text-base font-medium mb-2 block">Vehicle Price (PKR)</label>
              <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="5,000,000" className="input-field text-lg py-4" />
            </div>
            <div>
              <label className="text-[#C8A35F] text-base font-medium mb-2 block">Down Payment (PKR)</label>
              <input type="number" value={downPayment} onChange={e => setDownPayment(e.target.value)} placeholder="1,000,000" className="input-field text-lg py-4" />
            </div>
            <div>
              <label className="text-[#C8A35F] text-base font-medium mb-2 block">Interest Rate (%)</label>
              <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="input-field text-lg py-4" />
            </div>
            <div>
              <label className="text-[#C8A35F] text-base font-medium mb-2 block">Loan Tenure</label>
              <select value={tenure} onChange={e => setTenure(Number(e.target.value))} className="input-field text-lg py-4">
                {[12, 24, 36, 48, 60].map(m => <option key={m} value={m}>{m} months</option>)}
              </select>
            </div>
          </div>
          <button onClick={handleCalc} className="btn-primary w-full text-xl py-5">Calculate EMI</button>
          {result && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-[#2A2A2A]">
              {[
                { label: 'Monthly EMI', value: formatPrice(Math.round(result.monthly)), color: 'text-[#C8A35F]' },
                { label: 'Total Amount', value: formatPrice(Math.round(result.total)), color: 'text-white' },
                { label: 'Total Interest', value: formatPrice(Math.round(result.interest)), color: 'text-red-400' },
              ].map((r, i) => (
                <div key={i} className="text-center p-6 rounded-xl bg-[#0A0A0A] border border-[#2A2A2A]">
                  <p className="text-gray-500 text-base mb-2">{r.label}</p>
                  <p className={`${r.color} font-bold text-2xl md:text-3xl`}>{r.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

/* ===== PARTNER BANKS ===== */
const PartnersSection = () => {
  const banks = [
    { name: 'HBL', color: 'from-green-600 to-green-700' },
    { name: 'UBL', color: 'from-blue-700 to-blue-800' },
    { name: 'MCB', color: 'from-yellow-500 to-yellow-600' },
    { name: 'ABL', color: 'from-blue-500 to-blue-600' },
    { name: 'Meezan', color: 'from-emerald-600 to-emerald-700' },
    { name: 'Faysal', color: 'from-red-600 to-red-700' },
    { name: 'Bank Alfalah', color: 'from-red-500 to-red-600' },
    { name: 'JS Bank', color: 'from-purple-600 to-purple-700' },
  ];
  return (
    <section className="py-16 bg-[#111111] border-y border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Our Banking <span className="bg-gradient-to-r from-[#A88A42] via-[#C8A35F] to-[#D4B878] bg-clip-text text-transparent">Partners</span></h2>
          <p className="text-gray-400 text-lg">We work with Pakistan's leading banks for your financing</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" data-aos="fade-up" data-aos-delay="200">
          {banks.map((bank, i) => (
            <div key={i} className="rounded-xl border border-[#2A2A2A] bg-[#0A0A0A] p-5 flex items-center gap-3 hover:border-[#C8A35F]/50 hover:shadow-lg hover:shadow-[#C8A35F]/10 transition-all duration-300 hover-lift" data-aos="fade-up" data-aos-delay={i * 80}>
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${bank.color} flex items-center justify-center flex-shrink-0`}>
                <span className="text-white font-black text-xs">{bank.name.charAt(0)}</span>
              </div>
              <span className="text-gray-300 font-semibold text-base">{bank.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ===== SOCIAL PROOF ===== */
const SocialProofSection = () => (
  <section className="py-16 bg-[#111111]">
    <div className="max-w-5xl mx-auto px-4">
      <div className="text-center mb-10" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Trusted by <span className="bg-gradient-to-r from-[#A88A42] via-[#C8A35F] to-[#D4B878] bg-clip-text text-transparent">Thousands</span></h2>
        <p className="text-gray-400 text-lg">See what our customers say about us online</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-aos="fade-up" data-aos-delay="150">
        {/* Google Reviews */}
        <div className="card p-8 hover-lift text-center">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4">
            <FaGoogle className="text-[#4285F4]" size={32} />
          </div>
          <h3 className="text-white font-bold text-2xl mb-2">Google Reviews</h3>
          <div className="flex items-center justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} size={22} className="text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <p className="text-[#C8A35F] font-bold text-4xl mb-1">4.9</p>
          <p className="text-gray-400 text-base">Based on 200+ reviews</p>
          <a href="https://g.co/kgs/siddique-traders" target="_blank" rel="noreferrer"
            className="inline-block mt-4 text-[#C8A35F] font-medium hover:underline">
            View on Google &rarr;
          </a>
        </div>
        {/* Facebook */}
        <div className="card p-8 hover-lift text-center">
          <div className="w-16 h-16 rounded-full bg-[#1877F2] flex items-center justify-center mx-auto mb-4">
            <FaFacebook className="text-white" size={32} />
          </div>
          <h3 className="text-white font-bold text-2xl mb-2">Facebook Rating</h3>
          <div className="flex items-center justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} size={22} className="text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <p className="text-[#C8A35F] font-bold text-4xl mb-1">4.8</p>
          <p className="text-gray-400 text-base">500+ followers recommend us</p>
          <a href="https://facebook.com/siddiquimotors" target="_blank" rel="noreferrer"
            className="inline-block mt-4 text-[#C8A35F] font-medium hover:underline">
            View on Facebook &rarr;
          </a>
        </div>
      </div>
    </div>
  </section>
);

/* ===== CTA SECTION ===== */
const CTASection = () => (
  <section className="py-20 relative overflow-hidden">
    <div className="absolute inset-0">
      <img src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80" alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/80" />
    </div>
    <div className="relative z-10 max-w-4xl mx-auto px-4 text-center" data-aos="fade-up">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to <span className="bg-gradient-to-r from-[#A88A42] via-[#C8A35F] to-[#D4B878] bg-clip-text text-transparent">Get Started?</span></h2>
      <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">Whether you want to buy, sell, invest, or need bank lease financing — Siddiqui Motors is your trusted partner.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="https://wa.me/923323240790" target="_blank" rel="noreferrer" className="btn-primary text-lg px-10 py-5">WhatsApp Us Now</a>
        <Link to="/contact" className="btn-outline text-lg px-10 py-5">Contact Us</Link>
      </div>
    </div>
  </section>
);

/* ===== HOME PAGE ===== */
const HomePage = () => {
  useEffect(() => { AOS.init({ duration: 800, once: true }); }, []);
  return (
    <div className="page-transition">
      <HeroSection />
      <WhyChooseUs />
      <StatsSection />
      <ProcessSection />
      <EMICalculatorSection />
      <PartnersSection />
      <TestimonialsSection />
      <SocialProofSection />
      <CTASection />
      <NewsletterSection />
    </div>
  );
};

export default HomePage;
