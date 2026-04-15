import { useState, useEffect } from 'react';
import { getVehicles } from '../services/vehicleService';
import { formatPrice } from '../utils/helpers';
import { FiPlus, FiX } from 'react-icons/fi';

const ComparePage = () => {
  const [allVehicles, setAllVehicles] = useState([]);
  const [selected, setSelected] = useState([null, null, null]);

  useEffect(() => {
    getVehicles({ limit: 100 }).then(r => setAllVehicles(r.data.data)).catch(() => {});
  }, []);

  const selectVehicle = (index, vehicleId) => {
    const vehicle = allVehicles.find(v => v._id === vehicleId);
    setSelected(prev => { const n = [...prev]; n[index] = vehicle; return n; });
  };

  const removeVehicle = (index) => {
    setSelected(prev => { const n = [...prev]; n[index] = null; return n; });
  };

  const specs = [
    { label: 'Make', key: 'make' }, { label: 'Model', key: 'model' }, { label: 'Year', key: 'year' },
    { label: 'Price', key: 'price', format: v => formatPrice(v) },
    { label: 'Mileage', key: 'mileage', format: v => v ? `${v.toLocaleString()} km` : 'N/A' },
    { label: 'Fuel Type', key: 'fuelType' }, { label: 'Transmission', key: 'transmission' },
    { label: 'Body Type', key: 'bodyType' }, { label: 'Engine', key: 'engine' },
    { label: 'Horsepower', key: 'horsepower', format: v => v ? `${v} HP` : 'N/A' },
    { label: 'Drivetrain', key: 'drivetrain' }, { label: 'Seats', key: 'seats' },
    { label: 'Doors', key: 'doors' }, { label: 'Color', key: 'color' }, { label: 'Condition', key: 'condition' },
  ];

  return (
    <div className="pt-20 min-h-screen bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">Compare <span className="gold-gradient">Vehicles</span></h1>

        {/* Vehicle Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {selected.map((vehicle, i) => (
            <div key={i} className="card p-4">
              {vehicle ? (
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-white font-semibold">{vehicle.make} {vehicle.model}</h3>
                    <button onClick={() => removeVehicle(i)} className="text-gray-500 hover:text-red-400"><FiX /></button>
                  </div>
                  <img src={vehicle.images?.[0]?.url || 'https://via.placeholder.com/300x180/111/C8A35F?text=Car'} alt="" className="w-full h-40 object-cover rounded-lg mb-2" />
                  <p className="text-[#C8A35F] font-bold">{formatPrice(vehicle.price)}</p>
                </div>
              ) : (
                <div>
                  <select onChange={e => e.target.value && selectVehicle(i, e.target.value)} className="input-field mb-3" defaultValue="">
                    <option value="">Select Vehicle {i + 1}</option>
                    {allVehicles.filter(v => !selected.find(s => s?._id === v._id)).map(v => (
                      <option key={v._id} value={v._id}>{v.make} {v.model} {v.year}</option>
                    ))}
                  </select>
                  <div className="h-40 bg-[#0A0A0A] rounded-lg flex items-center justify-center">
                    <FiPlus className="text-gray-600" size={32} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        {selected.some(Boolean) && (
          <div className="card overflow-hidden">
            <table className="w-full">
              <tbody>
                {specs.map((spec, i) => (
                  <tr key={spec.key} className={i % 2 === 0 ? 'bg-[#0A0A0A]' : ''}>
                    <td className="px-4 py-3 text-gray-400 text-base font-medium w-1/4 border-r border-[#2A2A2A]">{spec.label}</td>
                    {selected.map((v, j) => (
                      <td key={j} className="px-4 py-3 text-white text-base text-center border-r border-[#2A2A2A] last:border-r-0">
                        {v ? (spec.format ? spec.format(v[spec.key]) : (v[spec.key] || 'N/A')) : '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparePage;
