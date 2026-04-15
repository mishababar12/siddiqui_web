import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiPhone } from 'react-icons/fi';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass shadow-lg shadow-black/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#A88A42] via-[#C8A35F] to-[#D4B878] flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[#C8A35F]/30 transition-all duration-300">
              <span className="text-[#0A0A0A] font-black text-lg">SM</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-bold text-gradient-gold tracking-wide">SIDDIQUI</span>
              <span className="text-[10px] text-gray-500 tracking-[0.3em] uppercase">MOTORS</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path}
                className={`relative text-base font-medium transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#C8A35F] after:transition-all after:duration-300 hover:after:w-full ${isActive(link.path) ? 'text-[#C8A35F] after:w-full' : 'text-gray-300 hover:text-[#C8A35F]'}`}>
                {link.name}
              </Link>
            ))}
          </div>

          {/* Phone CTA */}
          <div className="hidden md:flex items-center">
            <a href="tel:+923323240790" className="flex items-center space-x-2 text-gray-300 hover:text-[#C8A35F] transition-colors text-base font-medium">
              <div className="w-9 h-9 rounded-full bg-[#C8A35F]/10 flex items-center justify-center">
                <FiPhone className="text-[#C8A35F]" size={16} />
              </div>
              <span>+92 332 3240790</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-gray-300 hover:text-[#C8A35F]">
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="bg-[#0A0A0A] border-t border-[#2A2A2A] px-4 py-4 space-y-3">
          {navLinks.map(link => (
            <Link key={link.path} to={link.path}
              className={`block py-2 text-base font-medium ${isActive(link.path) ? 'text-[#C8A35F]' : 'text-gray-300'}`}>
              {link.name}
            </Link>
          ))}
          <a href="tel:+923323240790" className="flex items-center space-x-2 py-2 text-[#C8A35F] font-medium">
            <FiPhone size={16} />
            <span>+92 332 3240790</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
