import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getWishlist } from '../services/userService';
import VehicleCard from '../components/cars/VehicleCard';
import { FiHeart } from 'react-icons/fi';

const WishlistPage = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (!authLoading && !isAuthenticated) navigate('/login'); }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      getWishlist().then(r => setVehicles(r.data.data)).catch(() => {}).finally(() => setLoading(false));
    }
  }, [isAuthenticated]);

  return (
    <div className="pt-20 min-h-screen bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">My <span className="gold-gradient">Wishlist</span></h1>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => <div key={i} className="card animate-pulse"><div className="h-52 bg-[#1A1A1A]" /><div className="p-4 space-y-3"><div className="h-5 bg-[#1A1A1A] rounded w-3/4" /></div></div>)}
          </div>
        ) : vehicles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicles.map(v => <VehicleCard key={v._id} vehicle={v} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <FiHeart className="mx-auto text-gray-600 mb-4" size={48} />
            <p className="text-gray-500 text-lg mb-4">Your wishlist is empty</p>
            <Link to="/cars" className="btn-primary">Browse Cars</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
