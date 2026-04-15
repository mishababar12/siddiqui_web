import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getVehicle, getVehicles } from '../services/vehicleService';
import { bookTestDrive, addToWishlist } from '../services/userService';
import { useAuth } from '../context/AuthContext';
import { formatPrice, calculateEMI } from '../utils/helpers';
import VehicleCard from '../components/cars/VehicleCard';
import toast from 'react-hot-toast';
import { FiHeart, FiCalendar, FiX, FiCheck, FiShare2 } from 'react-icons/fi';
import { FaWhatsapp, FaGasPump, FaCogs, FaTachometerAlt, FaCar } from 'react-icons/fa';

const CarDetailsPage = () => {
  const { slug } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [showTestDrive, setShowTestDrive] = useState(false);
  const [similar, setSimilar] = useState([]);
  const [tdForm, setTdForm] = useState({ name: '', email: '', phone: '', preferredDate: '', preferredTime: '', message: '' });
  const [emi, setEmi] = useState({ downPayment: '', tenure: 36, rate: 12, result: null });

  useEffect(() => {
    setLoading(true);
    getVehicle(slug)
      .then(r => {
        setVehicle(r.data.data);
        return getVehicles({ make: r.data.data.make, limit: 4 });
      })
      .then(r => setSimilar(r.data.data.filter(v => v.slug !== slug).slice(0, 4)))
      .catch(() => toast.error('Vehicle not found'))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleWishlist = async () => {
    if (!isAuthenticated) return toast.error('Please login first');
    try { await addToWishlist(vehicle._id); toast.success('Added to wishlist'); } catch (e) { toast.error(e.response?.data?.message || 'Error'); }
  };

  const handleTestDrive = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return toast.error('Please login first');
    try {
      await bookTestDrive({ ...tdForm, vehicle: vehicle._id });
      toast.success('Test drive booked!');
      setShowTestDrive(false);
      setTdForm({ name: '', email: '', phone: '', preferredDate: '', preferredTime: '', message: '' });
    } catch (e) { toast.error(e.response?.data?.message || 'Error booking'); }
  };

  const calcEMI = () => {
    const principal = vehicle.price - (Number(emi.downPayment) || 0);
    const monthly = calculateEMI(principal, emi.rate, emi.tenure);
    const total = monthly * emi.tenure;
    setEmi(prev => ({ ...prev, result: { monthly, total, interest: total - principal } }));
  };

  if (loading) return (
    <div className="pt-20 min-h-screen bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-96 bg-[#1A1A1A] rounded-xl" />
          <div className="space-y-4">
            <div className="h-8 bg-[#1A1A1A] rounded w-3/4" />
            <div className="h-10 bg-[#1A1A1A] rounded w-1/3" />
            <div className="h-4 bg-[#1A1A1A] rounded w-1/2" />
            <div className="grid grid-cols-2 gap-3">{[...Array(8)].map((_, i) => <div key={i} className="h-12 bg-[#1A1A1A] rounded" />)}</div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!vehicle) return <div className="pt-20 min-h-screen bg-[#0A0A0A] flex items-center justify-center"><p className="text-gray-500 text-xl">Vehicle not found</p></div>;

  const images = vehicle.images?.length > 0 ? vehicle.images : [{ url: 'https://via.placeholder.com/800x500/111111/C8A35F?text=No+Image' }];
  const statusColor = { Available: 'bg-green-500', Sold: 'bg-red-500', Pending: 'bg-yellow-500', Reserved: 'bg-blue-500' };

  return (
    <div className="pt-20 min-h-screen bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-base text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#C8A35F]">Home</Link> / <Link to="/cars" className="hover:text-[#C8A35F]">Cars</Link> / <span className="text-gray-300">{vehicle.make} {vehicle.model}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Images - Left */}
          <div className="lg:col-span-3">
            <div className="rounded-xl overflow-hidden bg-[#111111] mb-4">
              <img src={images[activeImage]?.url} alt={`${vehicle.make} ${vehicle.model}`} className="w-full h-[400px] lg:h-[500px] object-cover" />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(i)}
                    className={`w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition ${activeImage === i ? 'border-[#C8A35F]' : 'border-transparent'}`}>
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details - Right */}
          <div className="lg:col-span-2">
            <div className="card p-6 sticky top-24">
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-2xl font-bold text-white">{vehicle.make} {vehicle.model}</h1>
                <span className={`${statusColor[vehicle.status]} text-white text-sm px-3 py-1 rounded-full`}>{vehicle.status}</span>
              </div>
              <div className="flex gap-2 mb-4">
                <span className="bg-[#1A1A1A] text-gray-300 text-sm px-3 py-1 rounded-full">{vehicle.year}</span>
                <span className="bg-[#1A1A1A] text-gray-300 text-sm px-3 py-1 rounded-full">{vehicle.condition}</span>
              </div>
              <div className="text-3xl font-bold text-[#C8A35F] mb-1">{formatPrice(vehicle.price)}</div>
              <p className="text-gray-500 text-base mb-6">Stock #: {vehicle.stockNumber}</p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { label: 'Fuel Type', value: vehicle.fuelType, icon: FaGasPump },
                  { label: 'Transmission', value: vehicle.transmission, icon: FaCogs },
                  { label: 'Mileage', value: `${vehicle.mileage?.toLocaleString()} km`, icon: FaTachometerAlt },
                  { label: 'Body Type', value: vehicle.bodyType, icon: FaCar },
                  { label: 'Color', value: vehicle.color },
                  { label: 'Engine', value: vehicle.engine || 'N/A' },
                  { label: 'Horsepower', value: vehicle.horsepower ? `${vehicle.horsepower} HP` : 'N/A' },
                  { label: 'Drivetrain', value: vehicle.drivetrain },
                  { label: 'Seats', value: vehicle.seats },
                  { label: 'Doors', value: vehicle.doors },
                ].map((spec, i) => (
                  <div key={i} className="bg-[#0A0A0A] rounded-lg p-3">
                    <p className="text-gray-500 text-sm">{spec.label}</p>
                    <p className="text-white text-base font-medium">{spec.value}</p>
                  </div>
                ))}
              </div>

              {/* Features */}
              {vehicle.features?.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-3">Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {vehicle.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-base text-gray-300">
                        <FiCheck className="text-[#C8A35F] flex-shrink-0" size={14} />{f}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <button onClick={() => setShowTestDrive(true)} className="btn-primary w-full flex items-center justify-center gap-2">
                  <FiCalendar /> Book Test Drive
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={handleWishlist} className="btn-outline flex items-center justify-center gap-2 text-base">
                    <FiHeart /> Wishlist
                  </button>
                  <a href={`https://wa.me/923001234567?text=Hi, I'm interested in ${vehicle.make} ${vehicle.model} ${vehicle.year} (${vehicle.stockNumber})`}
                    target="_blank" rel="noreferrer" className="bg-green-600 text-white font-semibold px-4 py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 text-base">
                    <FaWhatsapp /> WhatsApp
                  </a>
                </div>
                <Link to="/finance" className="block text-center btn-outline text-base">Apply for Finance</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {vehicle.description && (
          <div className="card p-6 mt-8">
            <h2 className="text-xl font-bold text-white mb-4">Description</h2>
            <p className="text-gray-400 leading-relaxed">{vehicle.description}</p>
          </div>
        )}

        {/* EMI Calculator */}
        <div className="card p-6 mt-8">
          <h2 className="text-xl font-bold text-white mb-6">EMI <span className="gold-gradient">Calculator</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="text-gray-400 text-base mb-1 block">Car Price (PKR)</label>
              <input type="text" value={formatPrice(vehicle.price)} disabled className="input-field opacity-60" />
            </div>
            <div>
              <label className="text-gray-400 text-base mb-1 block">Down Payment (PKR)</label>
              <input type="number" value={emi.downPayment} onChange={e => setEmi(p => ({ ...p, downPayment: e.target.value }))} placeholder="e.g. 500000" className="input-field" />
            </div>
            <div>
              <label className="text-gray-400 text-base mb-1 block">Tenure (Months)</label>
              <select value={emi.tenure} onChange={e => setEmi(p => ({ ...p, tenure: Number(e.target.value) }))} className="input-field">
                {[12, 24, 36, 48, 60].map(m => <option key={m} value={m}>{m} months</option>)}
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-base mb-1 block">Interest Rate (%)</label>
              <input type="number" value={emi.rate} onChange={e => setEmi(p => ({ ...p, rate: Number(e.target.value) }))} className="input-field" />
            </div>
          </div>
          <button onClick={calcEMI} className="btn-primary">Calculate EMI</button>
          {emi.result && (
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-[#0A0A0A] rounded-lg p-4 text-center">
                <p className="text-gray-500 text-base">Monthly EMI</p>
                <p className="text-[#C8A35F] text-xl font-bold">{formatPrice(emi.result.monthly)}</p>
              </div>
              <div className="bg-[#0A0A0A] rounded-lg p-4 text-center">
                <p className="text-gray-500 text-base">Total Payment</p>
                <p className="text-white text-xl font-bold">{formatPrice(emi.result.total)}</p>
              </div>
              <div className="bg-[#0A0A0A] rounded-lg p-4 text-center">
                <p className="text-gray-500 text-base">Total Interest</p>
                <p className="text-red-400 text-xl font-bold">{formatPrice(emi.result.interest)}</p>
              </div>
            </div>
          )}
        </div>

        {/* Similar Vehicles */}
        {similar.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Similar <span className="gold-gradient">Vehicles</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similar.map(v => <VehicleCard key={v._id} vehicle={v} />)}
            </div>
          </div>
        )}
      </div>

      {/* Test Drive Modal */}
      {showTestDrive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowTestDrive(false)} />
          <div className="relative bg-[#111111] border border-[#2A2A2A] rounded-xl w-full max-w-md p-6">
            <button onClick={() => setShowTestDrive(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><FiX size={20} /></button>
            <h3 className="text-xl font-bold text-white mb-4">Book a Test Drive</h3>
            <p className="text-gray-400 text-base mb-4">{vehicle.make} {vehicle.model} {vehicle.year}</p>
            <form onSubmit={handleTestDrive} className="space-y-3">
              <input type="text" placeholder="Your Name" required value={tdForm.name} onChange={e => setTdForm(p => ({ ...p, name: e.target.value }))} className="input-field" />
              <input type="email" placeholder="Email" required value={tdForm.email} onChange={e => setTdForm(p => ({ ...p, email: e.target.value }))} className="input-field" />
              <input type="tel" placeholder="Phone" required value={tdForm.phone} onChange={e => setTdForm(p => ({ ...p, phone: e.target.value }))} className="input-field" />
              <div className="grid grid-cols-2 gap-3">
                <input type="date" required value={tdForm.preferredDate} onChange={e => setTdForm(p => ({ ...p, preferredDate: e.target.value }))} className="input-field" />
                <input type="time" required value={tdForm.preferredTime} onChange={e => setTdForm(p => ({ ...p, preferredTime: e.target.value }))} className="input-field" />
              </div>
              <textarea placeholder="Any message..." rows={3} value={tdForm.message} onChange={e => setTdForm(p => ({ ...p, message: e.target.value }))} className="input-field" />
              <button type="submit" className="btn-primary w-full">Book Test Drive</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetailsPage;
