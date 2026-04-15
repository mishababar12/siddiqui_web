import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppFloat = () => {
  return (
    <a href="https://wa.me/923323240790" target="_blank" rel="noreferrer"
      className="fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:bg-green-600 transition-all duration-300 animate-pulse">
      <FaWhatsapp size={28} />
    </a>
  );
};

export default WhatsAppFloat;
