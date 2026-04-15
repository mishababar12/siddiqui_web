import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import WhatsAppFloat from './components/common/WhatsAppFloat';

// Pages
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import WishlistPage from './pages/WishlistPage';
import ComparePage from './pages/ComparePage';
import TradeInPage from './pages/TradeInPage';
import FinancePage from './pages/FinancePage';
import AdminDashboard from './pages/AdminDashboard';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Scroll to top on route change
const ScrollToTopOnRoute = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

// Scroll Progress Bar
const ScrollProgress = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setWidth(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: `${width}%` }} />;
};

// Loading Screen
const LoadingScreen = ({ onFinish }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1800);
    const remove = setTimeout(onFinish, 2400);
    return () => { clearTimeout(timer); clearTimeout(remove); };
  }, [onFinish]);

  return (
    <div className={`loading-screen ${loaded ? 'loaded' : ''}`}>
      <div className="loading-logo mb-4">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#A88A42] via-[#C8A35F] to-[#D4B878] flex items-center justify-center shadow-2xl shadow-[#C8A35F]/30">
          <span className="text-[#0A0A0A] font-black text-3xl">SM</span>
        </div>
      </div>
      <p className="text-[#C8A35F] text-lg font-semibold tracking-[0.3em] uppercase animate-fadeInUp">SIDDIQUI MOTORS</p>
      <div className="mt-6 w-48 h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#A88A42] via-[#C8A35F] to-[#D4B878] rounded-full" style={{ animation: 'loadBar 1.5s ease forwards' }} />
      </div>
    </div>
  );
};

function App() {
  const [showLoading, setShowLoading] = useState(true);

  return (
    <AuthProvider>
      <Router>
        {showLoading && <LoadingScreen onFinish={() => setShowLoading(false)} />}
        <ScrollProgress />
        <ScrollToTopOnRoute />
        <Toaster position="top-right" toastOptions={{
          style: { background: '#111111', color: '#fff', border: '1px solid #2A2A2A' },
          success: { iconTheme: { primary: '#C8A35F', secondary: '#0A0A0A' } },
        }} />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/trade-in" element={<TradeInPage />} />
          <Route path="/finance" element={<FinancePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <Footer />
        <WhatsAppFloat />
        <ScrollToTop />
      </Router>
    </AuthProvider>
  );
}

export default App;
