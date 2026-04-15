import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { applyForFinance } from '../services/userService';
import { getVehicles } from '../services/vehicleService';
import { formatPrice, calculateEMI } from '../utils/helpers';
import toast from 'react-hot-toast';
import { FiPercent, FiClock, FiCheck } from 'react-icons/fi';

const FinancePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [vehicles, setVehiclesList] = useState([]);
  const [loading, setLoading] = useState(false);

  // EMI Calculator
  const [calc, setCalc] = useState({ price: '', downPayment: '', tenure: 36, rate: 12, result: null });

  // Finance Form
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', cnic: '', employmentStatus: '', employerName: '', monthlyIncome: '', vehicle: '', loanAmount: '', downPayment: '', tenure: 36 });
  const [docs, setDocs] = useState(null);

  useEffect(() => { getVehicles({ limit: 100, status: 'Available' }).then(r => setVehiclesList(r.data.data)).catch(() => {}); }, []);

  const doCalc = () => {
    const principal = Number(calc.price) - Number(calc.downPayment || 0);
    if (principal <= 0) return toast.error('Invalid amounts');
    const monthly = calculateEMI(principal, calc.rate, calc.tenure);
    const total = monthly * calc.tenure;
    setCalc(p => ({ ...p, result: { monthly, total, interest: total - principal } }));
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) { toast.error('Please login first'); navigate('/login'); return; }
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      if (docs) { for (const f of docs) formData.append('documents', f); }
      await applyForFinance(formData);
      toast.success('Application submitted!');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="pt-20 min-h-screen bg-[#0A0A0A]">
      <div className="bg-gradient-to-r from-[#111111] to-[#0A0A0A] py-20 text-center">
        <h1 className="text-4xl font-bold text-white">Vehicle <span className="gold-gradient">Financing</span></h1>
        <p className="text-gray-400 mt-3">Flexible financing options for your dream car</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: FiPercent, title: 'Low Interest Rates', desc: 'Competitive rates starting from 10% per annum' },
            { icon: FiClock, title: 'Quick Approval', desc: 'Get approved within 48 hours of application' },
            { icon: FiCheck, title: 'Flexible Tenure', desc: 'Choose from 12 to 60 months repayment period' },
          ].map((b, i) => (
            <div key={i} className="card p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-[#C8A35F]/10 flex items-center justify-center mx-auto mb-4"><b.icon className="text-[#C8A35F]" size={24} /></div>
              <h3 className="text-white font-semibold mb-2">{b.title}</h3>
              <p className="text-gray-400 text-base">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* EMI Calculator */}
        <div className="card p-8 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">EMI <span className="gold-gradient">Calculator</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div><label className="text-gray-400 text-base mb-1 block">Vehicle Price (PKR)</label>
              <input type="number" value={calc.price} onChange={e => setCalc(p => ({ ...p, price: e.target.value }))} placeholder="e.g. 5000000" className="input-field" /></div>
            <div><label className="text-gray-400 text-base mb-1 block">Down Payment (PKR)</label>
              <input type="number" value={calc.downPayment} onChange={e => setCalc(p => ({ ...p, downPayment: e.target.value }))} placeholder="e.g. 1000000" className="input-field" /></div>
            <div><label className="text-gray-400 text-base mb-1 block">Tenure (Months)</label>
              <select value={calc.tenure} onChange={e => setCalc(p => ({ ...p, tenure: Number(e.target.value) }))} className="input-field">
                {[12, 24, 36, 48, 60].map(m => <option key={m} value={m}>{m} months</option>)}
              </select></div>
            <div><label className="text-gray-400 text-base mb-1 block">Interest Rate (%)</label>
              <input type="number" value={calc.rate} onChange={e => setCalc(p => ({ ...p, rate: Number(e.target.value) }))} className="input-field" /></div>
          </div>
          <button onClick={doCalc} className="btn-primary">Calculate EMI</button>
          {calc.result && (
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-[#0A0A0A] rounded-lg p-4 text-center"><p className="text-gray-500 text-base">Monthly EMI</p><p className="text-[#C8A35F] text-xl font-bold">{formatPrice(calc.result.monthly)}</p></div>
              <div className="bg-[#0A0A0A] rounded-lg p-4 text-center"><p className="text-gray-500 text-base">Total Payment</p><p className="text-white text-xl font-bold">{formatPrice(calc.result.total)}</p></div>
              <div className="bg-[#0A0A0A] rounded-lg p-4 text-center"><p className="text-gray-500 text-base">Total Interest</p><p className="text-red-400 text-xl font-bold">{formatPrice(calc.result.interest)}</p></div>
            </div>
          )}
        </div>

        {/* Application Form */}
        <div className="card p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Apply for <span className="gold-gradient">Finance</span></h2>
          <form onSubmit={handleApply} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name" required value={form.fullName} onChange={e => setForm(p => ({ ...p, fullName: e.target.value }))} className="input-field" />
            <input type="email" placeholder="Email" required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="input-field" />
            <input type="tel" placeholder="Phone" required value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className="input-field" />
            <input type="text" placeholder="CNIC Number" required value={form.cnic} onChange={e => setForm(p => ({ ...p, cnic: e.target.value }))} className="input-field" />
            <select value={form.employmentStatus} onChange={e => setForm(p => ({ ...p, employmentStatus: e.target.value }))} required className="input-field">
              <option value="">Employment Status</option>
              {['Employed', 'Self-Employed', 'Business Owner', 'Other'].map(s => <option key={s}>{s}</option>)}
            </select>
            <input type="text" placeholder="Employer Name" value={form.employerName} onChange={e => setForm(p => ({ ...p, employerName: e.target.value }))} className="input-field" />
            <input type="number" placeholder="Monthly Income (PKR)" required value={form.monthlyIncome} onChange={e => setForm(p => ({ ...p, monthlyIncome: e.target.value }))} className="input-field" />
            <select value={form.vehicle} onChange={e => setForm(p => ({ ...p, vehicle: e.target.value }))} required className="input-field">
              <option value="">Select Vehicle</option>
              {vehicles.map(v => <option key={v._id} value={v._id}>{v.make} {v.model} {v.year} - {formatPrice(v.price)}</option>)}
            </select>
            <input type="number" placeholder="Loan Amount (PKR)" required value={form.loanAmount} onChange={e => setForm(p => ({ ...p, loanAmount: e.target.value }))} className="input-field" />
            <input type="number" placeholder="Down Payment (PKR)" required value={form.downPayment} onChange={e => setForm(p => ({ ...p, downPayment: e.target.value }))} className="input-field" />
            <select value={form.tenure} onChange={e => setForm(p => ({ ...p, tenure: e.target.value }))} className="input-field">
              {[12, 24, 36, 48, 60].map(m => <option key={m} value={m}>{m} months</option>)}
            </select>
            <div><label className="text-gray-400 text-base mb-2 block">Upload Documents (CNIC, Income Proof)</label>
              <input type="file" multiple onChange={e => setDocs(e.target.files)} className="input-field" /></div>
            <button type="submit" disabled={loading} className="btn-primary md:col-span-2 disabled:opacity-50">{loading ? 'Submitting...' : 'Submit Application'}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FinancePage;
