import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedVehicles } from '../../services/vehicleService';
import VehicleCard from '../cars/VehicleCard';
import { FiArrowRight } from 'react-icons/fi';

const FeaturedCars = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedVehicles()
      .then(res => setVehicles(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Featured <span className="bg-gradient-to-r from-[#A88A42] via-[#C8A35F] to-[#D4B878] bg-clip-text text-transparent">Vehicles</span></h2>
          <p className="text-xl text-gray-400">Handpicked premium vehicles for you</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card animate-pulse shimmer">
                <div className="h-52 bg-[#1A1A1A]" />
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-[#1A1A1A] rounded w-3/4" />
                  <div className="h-4 bg-[#1A1A1A] rounded w-1/2" />
                  <div className="h-6 bg-[#1A1A1A] rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : vehicles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicles.slice(0, 8).map((v, i) => (
              <div key={v._id} data-aos="fade-up" data-aos-delay={i * 100}>
                <VehicleCard vehicle={v} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No featured vehicles available</p>
        )}

        <div className="text-center mt-10" data-aos="fade-up" data-aos-delay="200">
          <Link to="/cars" className="btn-outline inline-flex items-center gap-2 text-lg">
            View All Cars <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
