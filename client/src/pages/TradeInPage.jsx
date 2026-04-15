import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { submitTradeIn } from '../services/userService';
import toast from 'react-hot-toast';

const TradeInPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ vehicleMake: '', vehicleModel: '', vehicleYear: '', mileage: '', condition: '', color: '', fuelType: '', transmission: '', description: '' });
  const [images, setImages] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) { toast.error('Please login first'); navigate('/login'); return; }
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      if (images) { for (const file of images) formData.append('images', file); }
      await submitTradeIn(formData);
      toast.success('Trade-in request submitted!');
      setForm({ vehicleMake: '', vehicleModel: '', vehicleYear: '', mileage: '', condition: '', color: '', fuelType: '', transmission: '', description: '' });
      setImages(null);
    } catch (err) { toast.error(err.response?.data?.message || 'Submission failed'); }
    finally { setLoading(false); }
  };

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div className="pt-20 min-h-screen bg-[#0A0A0A]">
      <div className="bg-gradient-to-r from-[#111111] to-[#0A0A0A] py-20 text-center">
        <h1 className="text-4xl font-bold text-white">Trade-In Your <span className="gold-gradient">Vehicle</span></h1>
        <p className="text-gray-400 mt-3">Get a fair value for your current vehicle</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="card p-8">
          <h2 className="text-xl font-bold text-white mb-6">Vehicle Details</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Make (e.g. Toyota)" required value={form.vehicleMake} onChange={e => update('vehicleMake', e.target.value)} className="input-field" />
            <input type="text" placeholder="Model (e.g. Corolla)" required value={form.vehicleModel} onChange={e => update('vehicleModel', e.target.value)} className="input-field" />
            <input type="number" placeholder="Year" required value={form.vehicleYear} onChange={e => update('vehicleYear', e.target.value)} className="input-field" />
            <input type="number" placeholder="Mileage (km)" required value={form.mileage} onChange={e => update('mileage', e.target.value)} className="input-field" />
            <select value={form.condition} onChange={e => update('condition', e.target.value)} required className="input-field">
              <option value="">Condition</option>
              {['Excellent', 'Good', 'Fair', 'Poor'].map(c => <option key={c}>{c}</option>)}
            </select>
            <input type="text" placeholder="Color" value={form.color} onChange={e => update('color', e.target.value)} className="input-field" />
            <select value={form.fuelType} onChange={e => update('fuelType', e.target.value)} className="input-field">
              <option value="">Fuel Type</option>
              {['Petrol', 'Diesel', 'Hybrid', 'Electric', 'CNG'].map(f => <option key={f}>{f}</option>)}
            </select>
            <select value={form.transmission} onChange={e => update('transmission', e.target.value)} className="input-field">
              <option value="">Transmission</option>
              {['Automatic', 'Manual', 'CVT'].map(t => <option key={t}>{t}</option>)}
            </select>
            <textarea placeholder="Description of vehicle condition, history, etc." rows={4} value={form.description} onChange={e => update('description', e.target.value)} className="input-field md:col-span-2" />
            <div className="md:col-span-2">
              <label className="text-gray-400 text-base mb-2 block">Upload Images</label>
              <input type="file" multiple accept="image/*" onChange={e => setImages(e.target.files)} className="input-field" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary md:col-span-2 disabled:opacity-50">
              {loading ? 'Submitting...' : 'Submit Trade-In Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TradeInPage;
