import { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', toggle);
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-[#A88A42] via-[#C8A35F] to-[#D4B878] text-[#0A0A0A] flex items-center justify-center shadow-lg shadow-[#C8A35F]/30 hover:shadow-xl hover:shadow-[#C8A35F]/50 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-75 pointer-events-none'}`}>
      <FiArrowUp size={20} strokeWidth={3} />
    </button>
  );
};

export default ScrollToTop;
