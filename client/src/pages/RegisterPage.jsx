import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { if (isAuthenticated) navigate('/'); }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    if (form.password !== form.confirmPassword) return toast.error('Passwords do not match');
    setLoading(true);
    try { await register(form.name, form.email, form.password, form.phone); toast.success('Account created!'); navigate('/'); }
    catch (err) { toast.error(err.response?.data?.message || 'Registration failed'); }
    finally { setLoading(false); }
  };

  const update = (key, val) => setForm(p => ({ ...p, [key]: val }));

  return (
    <div className="pt-20 min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4 py-12">
      <div className="card w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Create <span className="gold-gradient">Account</span></h1>
          <p className="text-gray-400 text-sm mt-2">Join Siddiqui Motors today</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="text-gray-400 text-sm mb-1 block">Full Name</label>
            <input type="text" value={form.name} onChange={e => update('name', e.target.value)} required placeholder="John Doe" className="input-field" /></div>
          <div><label className="text-gray-400 text-sm mb-1 block">Email</label>
            <input type="email" value={form.email} onChange={e => update('email', e.target.value)} required placeholder="your@email.com" className="input-field" /></div>
          <div><label className="text-gray-400 text-sm mb-1 block">Phone</label>
            <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+92 300 1234567" className="input-field" /></div>
          <div><label className="text-gray-400 text-sm mb-1 block">Password</label>
            <div className="relative">
              <input type={showPass ? 'text' : 'password'} value={form.password} onChange={e => update('password', e.target.value)} required placeholder="Min 6 characters" className="input-field pr-10" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">{showPass ? <FiEyeOff /> : <FiEye />}</button>
            </div></div>
          <div><label className="text-gray-400 text-sm mb-1 block">Confirm Password</label>
            <input type="password" value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} required placeholder="Repeat password" className="input-field" /></div>
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">{loading ? 'Creating...' : 'Create Account'}</button>
        </form>
        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account? <Link to="/login" className="text-[#C8A35F] hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
