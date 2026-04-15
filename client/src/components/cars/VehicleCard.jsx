import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { FaGasPump, FaCogs, FaTachometerAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { addToWishlist, removeFromWishlist } from '../../services/userService';
import { formatPrice } from '../../utils/helpers';
import toast from 'react-hot-toast';

const VehicleCard = ({ vehicle }) => {
  const { user, isAuthenticated } = useAuth();
  const isWishlisted = user?.wishlist?.some(w => (w._id || w) === vehicle._id);
  const imageUrl = vehicle.images?.[0]?.url || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&q=80';

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) { toast.error('Please login first'); return; }
    try {
      if (isWishlisted) {
        await removeFromWishlist(vehicle._id);
        toast.success('Removed from wishlist');
      } else {
        await addToWishlist(vehicle._id);
        toast.success('Added to wishlist');
      }
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  const statusColor = { Available: 'bg-green-500', Sold: 'bg-red-500', Pending: 'bg-yellow-500', Reserved: 'bg-blue-500' };

  return (
    <Link to={`/cars/${vehicle.slug}`} className="card group block hover-lift hover-shine">
      {/* Image */}
      <div className="relative overflow-hidden h-56">
        <img src={imageUrl} alt={`${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className={`absolute top-3 left-3 ${statusColor[vehicle.status] || 'bg-gray-500'} text-white text-sm px-3 py-1 rounded-full font-medium`}>
          {vehicle.status}
        </div>
        <button onClick={handleWishlist}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all ${isWishlisted ? 'bg-red-500 text-white' : 'bg-black/50 text-white hover:bg-[#C8A35F]'}`}>
          <FiHeart size={16} fill={isWishlisted ? 'white' : 'none'} />
        </button>
        {vehicle.isFeatured && (
          <div className="absolute bottom-3 left-3 bg-[#C8A35F] text-[#0A0A0A] text-sm px-3 py-1 rounded-full font-semibold">Featured</div>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-xl group-hover:text-[#C8A35F] transition-colors">
          {vehicle.make} {vehicle.model}
        </h3>
        <p className="text-gray-500 text-base mt-1">{vehicle.year} | {vehicle.mileage?.toLocaleString()} km | {vehicle.fuelType}</p>
        <div className="text-[#C8A35F] font-bold text-2xl mt-3">{formatPrice(vehicle.price)}</div>

        {/* Specs Row */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#2A2A2A]">
          <div className="flex items-center space-x-1.5 text-gray-400 text-sm">
            <FaGasPump size={12} /><span>{vehicle.fuelType}</span>
          </div>
          <div className="flex items-center space-x-1.5 text-gray-400 text-sm">
            <FaCogs size={12} /><span>{vehicle.transmission}</span>
          </div>
          <div className="flex items-center space-x-1.5 text-gray-400 text-sm">
            <FaTachometerAlt size={12} /><span>{vehicle.mileage?.toLocaleString()} km</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VehicleCard;
