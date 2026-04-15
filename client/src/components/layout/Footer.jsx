import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-[#A88A42] via-[#C8A35F] to-[#D4B878] bg-clip-text text-transparent mb-4">SIDDIQUI MOTORS</h3>
            <p className="text-gray-400 text-base mb-6">Your trusted partner for premium vehicles. Drive, invest, and profit with us.</p>
            <div className="flex space-x-4">
              {[{ icon: FaFacebook, href: '#' }, { icon: FaInstagram, href: '#' }, { icon: FaLinkedin, href: '#' }, { icon: FaWhatsapp, href: 'https://wa.me/923323240790' }].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-[#2A2A2A] flex items-center justify-center text-gray-400 hover:text-[#C8A35F] hover:border-[#C8A35F] transition-all hover-lift">
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: 'About Us', path: '/about' }, { name: 'Contact', path: '/contact' }].map(link => (
                <li key={link.path}><Link to={link.path} className="text-gray-400 text-base hover:text-[#C8A35F] transition-colors">{link.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Our Services</h4>
            <ul className="space-y-3">
              {['Bank Lease Financing', 'Monthly Profit Investment', '24/7 Car Towing', 'Insurance & Inspection', 'Car Buy & Sell', 'Vehicle Trading'].map(s => (
                <li key={s}><Link to="/services" className="text-gray-400 text-base hover:text-[#C8A35F] transition-colors">{s}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-4">
              {[
                { icon: FiMapPin, text: '123 Main Street, Karachi, Pakistan' },
                { icon: FiPhone, text: '+92 332 3240790' },
                { icon: FiMail, text: 'info@siddiquimotors.com' },
                { icon: FiClock, text: 'Mon - Sat: 9AM - 7PM' },
              ].map((item, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <item.icon className="text-[#C8A35F] mt-1 flex-shrink-0" size={16} />
                  <span className="text-gray-400 text-base">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#2A2A2A] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-base">&copy; {new Date().getFullYear()} Siddiqui Motors. All rights reserved.</p>
          <div className="flex space-x-6 mt-3 md:mt-0">
            <Link to="/privacy" className="text-gray-500 text-base hover:text-gray-300">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-500 text-base hover:text-gray-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
