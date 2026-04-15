import { useState, useEffect } from 'react';
import { getFAQs } from '../services/contentService';
import { FiPlus, FiMinus, FiHelpCircle } from 'react-icons/fi';
import AOS from 'aos';
import 'aos/dist/aos.css';

const fallbackFAQs = {
  General: [
    { _id: '1', question: 'How do I buy a car from Siddiqui Motors?', answer: 'Browse our inventory, select a vehicle, and contact us via WhatsApp or phone. Our team will guide you through the entire purchase process with full transparency.' },
    { _id: '2', question: 'Do you offer vehicle warranty?', answer: 'Yes, all certified pre-owned vehicles come with a warranty. New vehicles include manufacturer warranty. We ensure complete peace of mind with every purchase.' },
  ],
  Financing: [
    { _id: '3', question: 'What financing options are available?', answer: 'We offer bank lease financing with competitive interest rates, flexible tenure options from 12 to 60 months, and minimal documentation requirements through our partnered banks.' },
    { _id: '4', question: 'What documents do I need for financing?', answer: 'You need CNIC, income proof (salary slip or business documents), bank statements of last 6 months, and employment verification documents.' },
  ],
  Investment: [
    { _id: '5', question: 'How does the investment program work?', answer: 'Our vehicle investment program lets you invest capital in our vehicle trading business. You earn guaranteed monthly returns through our profit-sharing model, backed by real vehicle assets.' },
    { _id: '7', question: 'Is the investment secure?', answer: 'Yes, all investments are backed by real vehicle assets. We provide complete transparency with regular reports and your capital is secured through our established business operations.' },
  ],
  Services: [
    { _id: '6', question: 'What services do you offer?', answer: 'We offer bank lease financing, monthly profit investment, 24/7 car towing service, car insurance arrangements, and professional vehicle inspection services.' },
  ],
};

const FAQPage = () => {
  const [faqs, setFaqs] = useState({});
  const [activeCategory, setActiveCategory] = useState('All');
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
    getFAQs().then(r => setFaqs(Object.keys(r.data.data).length > 0 ? r.data.data : fallbackFAQs)).catch(() => setFaqs(fallbackFAQs));
  }, []);

  const categories = ['All', ...Object.keys(faqs)];
  const filteredFaqs = activeCategory === 'All' ? Object.values(faqs).flat() : (faqs[activeCategory] || []);

  return (
    <div className="pt-20 min-h-screen bg-[#0A0A0A]">
      {/* Hero */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#111111] via-[#0A0A0A] to-[#0A0A0A]" />
          <div className="absolute top-10 right-20 w-72 h-72 rounded-full bg-[#C8A35F]/5 blur-3xl animate-float" />
          <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full bg-[#C8A35F]/5 blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        </div>
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <div className="w-20 h-20 rounded-full bg-[#C8A35F]/10 flex items-center justify-center mx-auto mb-6" data-aos="zoom-in">
            <FiHelpCircle className="text-[#C8A35F]" size={36} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" data-aos="fade-up">
            Frequently Asked <span className="bg-gradient-to-r from-[#A88A42] via-[#C8A35F] to-[#D4B878] bg-clip-text text-transparent">Questions</span>
          </h1>
          <p className="text-gray-400 text-xl" data-aos="fade-up" data-aos-delay="100">Everything you need to know about our services</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center" data-aos="fade-up">
          {categories.map(cat => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setOpenId(null); }}
              className={`px-6 py-3 rounded-full text-base font-medium transition-all duration-300 ${activeCategory === cat
                ? 'bg-gradient-to-r from-[#A88A42] via-[#C8A35F] to-[#D4B878] text-[#0A0A0A] shadow-lg shadow-[#C8A35F]/20'
                : 'border border-[#2A2A2A] text-gray-400 hover:border-[#C8A35F] hover:text-[#C8A35F]'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div key={faq._id}
              className={`rounded-xl border overflow-hidden transition-all duration-500 ${openId === faq._id
                ? 'bg-gradient-to-r from-[#C8A35F]/5 to-[#111111] border-[#C8A35F]/40 shadow-lg shadow-[#C8A35F]/10'
                : 'bg-[#111111] border-[#2A2A2A] hover:border-[#C8A35F]/30'}`}
              data-aos="fade-up" data-aos-delay={index * 50}>
              <button onClick={() => setOpenId(openId === faq._id ? null : faq._id)}
                className="w-full flex items-center justify-between p-6 text-left group">
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openId === faq._id ? 'bg-[#C8A35F] rotate-0' : 'bg-[#C8A35F]/10 group-hover:bg-[#C8A35F]/20'}`}>
                    <span className={`font-bold text-sm ${openId === faq._id ? 'text-[#0A0A0A]' : 'text-[#C8A35F]'}`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <span className={`font-semibold text-lg transition-colors duration-300 ${openId === faq._id ? 'text-[#C8A35F]' : 'text-white group-hover:text-[#C8A35F]'}`}>
                    {faq.question}
                  </span>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${openId === faq._id ? 'bg-[#C8A35F] rotate-180' : 'bg-[#1A1A1A]'}`}>
                  {openId === faq._id
                    ? <FiMinus className="text-[#0A0A0A]" size={16} />
                    : <FiPlus className="text-gray-500" size={16} />}
                </div>
              </button>
              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openId === faq._id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-6 pl-[4.5rem]">
                  <div className="w-12 h-[2px] bg-gradient-to-r from-[#C8A35F] to-transparent mb-4" />
                  <p className="text-gray-300 text-base leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 card p-10" data-aos="fade-up">
          <h3 className="text-2xl font-bold text-white mb-3">Still have questions?</h3>
          <p className="text-gray-400 text-lg mb-6">We're here to help. Reach out to us anytime.</p>
          <a href="https://wa.me/923323240790" target="_blank" rel="noreferrer" className="btn-primary text-lg px-8 py-4 inline-block">
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
