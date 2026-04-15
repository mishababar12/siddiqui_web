import { useState } from 'react';
import toast from 'react-hot-toast';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return toast.error('Please enter your email');
    toast.success('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <section className="py-16 bg-gradient-to-r from-[#111111] to-[#0A0A0A] border-t border-[#C8A35F]/20 animate-border-glow">
      <div className="max-w-4xl mx-auto px-4 text-center" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-white mb-3">Subscribe to Our <span className="gold-gradient">Newsletter</span></h2>
        <p className="text-gray-400 text-lg mb-8">Stay updated with our latest vehicles and exclusive offers</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)}
            className="input-field flex-1" />
          <button type="submit" className="btn-primary whitespace-nowrap">Subscribe</button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
