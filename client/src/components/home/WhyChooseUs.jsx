import { FiDollarSign, FiTrendingUp, FiTruck, FiShield } from 'react-icons/fi';

const features = [
  { icon: FiDollarSign, title: 'Bank Lease Financing', desc: 'Easy car financing through banks with competitive rates and flexible repayment plans tailored to your needs' },
  { icon: FiTrendingUp, title: 'Monthly Profit Investment', desc: 'Secure your investment with guaranteed monthly returns through our trusted vehicle investment program' },
  { icon: FiTruck, title: '24/7 Car Towing Service', desc: 'Fast, reliable towing help anytime, anywhere. Round-the-clock emergency roadside support for peace of mind' },
  { icon: FiShield, title: 'Insurance & Inspection', desc: 'Complete car insurance arrangements and professional multi-point vehicle inspection for transparency and safety' },
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-[#111111]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Choose <span className="bg-gradient-to-r from-[#A88A42] via-[#C8A35F] to-[#D4B878] bg-clip-text text-transparent">Siddiqui Motors?</span></h2>
          <p className="section-subtitle">Your trusted partner in buying, selling, and investing in cars in Karachi</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="card p-6 text-center card-3d hover-shine" data-aos="fade-up" data-aos-delay={i * 100}>
              <div className="w-20 h-20 rounded-full bg-[#C8A35F]/10 flex items-center justify-center mx-auto mb-4">
                <f.icon className="text-[#C8A35F]" size={32} />
              </div>
              <h3 className="text-white font-semibold text-xl mb-2">{f.title}</h3>
              <p className="text-gray-400 text-base">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
