import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { sendContactMessage } from '../services/contentService';
import toast from 'react-hot-toast';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ContactPage = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => { AOS.init({ duration: 800, once: true }); }, []);

  const onSubmit = async (data) => {
    try { await sendContactMessage(data); toast.success('Message sent!'); reset(); }
    catch (err) { toast.error('Failed to send'); }
  };

  return (
    <div className="pt-20 min-h-screen bg-[#0A0A0A] page-transition">
      {/* Hero */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=1920&q=80" alt="Contact" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="absolute top-10 left-10 w-56 h-56 rounded-full bg-[#C8A35F]/5 blur-3xl animate-float" />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" data-aos="fade-up">
            Get In <span className="bg-gradient-to-r from-[#A88A42] via-[#C8A35F] to-[#D4B878] bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-gray-300 text-xl" data-aos="fade-up" data-aos-delay="100">We'd love to hear from you. Reach out anytime.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div data-aos="fade-right">
            <div className="card p-8 hover-glow-border">
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#A88A42] via-[#C8A35F] to-[#D4B878] flex items-center justify-center">
                  <span className="text-[#0A0A0A] font-black text-lg">SM</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">Send us a Message</h3>
                  <p className="text-gray-500 text-sm">We'll respond within 24 hours</p>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input {...register('name', { required: true })} placeholder="Your Name" className="input-field" />
                    {errors.name && <p className="text-red-400 text-sm mt-1">Required</p>}
                  </div>
                  <div>
                    <input {...register('email', { required: true })} type="email" placeholder="Email Address" className="input-field" />
                    {errors.email && <p className="text-red-400 text-sm mt-1">Required</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input {...register('phone')} placeholder="Phone (optional)" className="input-field" />
                  <input {...register('subject')} placeholder="Subject" className="input-field" />
                </div>
                <div>
                  <textarea {...register('message', { required: true })} placeholder="Your Message..." rows={5} className="input-field" />
                  {errors.message && <p className="text-red-400 text-sm mt-1">Required</p>}
                </div>
                <button type="submit" className="btn-primary w-full text-lg flex items-center justify-center space-x-2">
                  <FiSend size={18} />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-6" data-aos="fade-left">
            {/* Contact Cards */}
            {[
              { icon: FiMapPin, title: 'Visit Us', text: '123 Main Street, Karachi, Pakistan', color: 'from-blue-500/20 to-blue-600/10' },
              { icon: FiPhone, title: 'Call Us', text: '+92 332 3240790', color: 'from-green-500/20 to-green-600/10' },
              { icon: FiMail, title: 'Email Us', text: 'info@siddiquimotors.com', color: 'from-purple-500/20 to-purple-600/10' },
              { icon: FiClock, title: 'Working Hours', text: 'Mon - Sat: 9AM - 7PM', color: 'from-orange-500/20 to-orange-600/10' },
            ].map((item, i) => (
              <div key={i} className="card p-5 flex items-center gap-4 hover-lift" data-aos="fade-up" data-aos-delay={i * 100}>
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                  <item.icon className="text-[#C8A35F]" size={22} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                  <p className="text-gray-400 text-base">{item.text}</p>
                </div>
              </div>
            ))}

            {/* Map */}
            <div className="card overflow-hidden h-48 rounded-xl" data-aos="fade-up" data-aos-delay="400">
              <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462118.0254564!2d66.89!3d25.19!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bbf%3A0x9cf92f44555a0c23!2sKarachi%2C+Pakistan!5e0!3m2!1sen!2s!4v1"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" />
            </div>

            {/* WhatsApp */}
            <a href="https://wa.me/923323240790" target="_blank" rel="noreferrer" data-aos="fade-up" data-aos-delay="500"
              className="flex items-center justify-center space-x-3 w-full bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold py-5 rounded-xl hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 hover:-translate-y-1">
              <FaWhatsapp size={24} />
              <span className="text-lg">Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
