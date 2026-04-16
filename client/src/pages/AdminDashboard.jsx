import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { formatPrice, formatDate } from '../utils/helpers';
import toast from 'react-hot-toast';
import { FiTruck, FiUsers, FiCalendar, FiMail, FiDollarSign, FiRefreshCw, FiTool, FiFileText, FiHelpCircle, FiStar, FiTrash2 } from 'react-icons/fi';

const AdminDashboard = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [modalForm, setModalForm] = useState({});

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || (user?.role !== 'admin' && user?.role !== 'superadmin'))) {
      navigate('/');
    }
  }, [isAuthenticated, authLoading, user, navigate]);

  useEffect(() => { if (activeTab === 'dashboard') fetchStats(); else fetchData(); }, [activeTab]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchStats = async () => {
    setLoading(true);
    try { const r = await api.get('/admin/dashboard'); setStats(r.data.data); }
    catch { toast.error('Failed to load stats'); }
    finally { setLoading(false); }
  };

  const fetchData = async () => {
    setLoading(true);
    const endpoints = {
      vehicles: '/vehicles?limit=100',
      testdrives: '/test-drive',
      tradeins: '/trade-in',
      finance: '/finance',
      services: '/services',
      blogs: '/blogs',
      faqs: '/faqs',
      messages: '/contact',
      testimonials: '/admin/testimonials',
    };
    try { const r = await api.get(endpoints[activeTab]); setData(r.data.data || []); }
    catch { setData([]); }
    finally { setLoading(false); }
  };

  const updateStatus = async (endpoint, id, status) => {
    try { await api.put(`${endpoint}/${id}`, { status }); toast.success('Updated!'); fetchData(); }
    catch { toast.error('Update failed'); }
  };

  const deleteItem = async (endpoint, id) => {
    if (!window.confirm('Are you sure?')) return;
    try { await api.delete(`${endpoint}/${id}`); toast.success('Deleted!'); fetchData(); }
    catch { toast.error('Delete failed'); }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: FiDollarSign },
    { id: 'vehicles', label: 'Vehicles', icon: FiTruck },
    { id: 'testdrives', label: 'Test Drives', icon: FiCalendar },
    { id: 'tradeins', label: 'Trade-Ins', icon: FiRefreshCw },
    { id: 'finance', label: 'Finance', icon: FiDollarSign },
    { id: 'services', label: 'Services', icon: FiTool },
    { id: 'blogs', label: 'Blogs', icon: FiFileText },
    { id: 'faqs', label: 'FAQs', icon: FiHelpCircle },
    { id: 'messages', label: 'Messages', icon: FiMail },
    { id: 'testimonials', label: 'Testimonials', icon: FiStar },
  ];

  const statCards = stats ? [
    { label: 'Total Vehicles', value: stats.totalVehicles, icon: FiTruck, color: 'text-blue-400' },
    { label: 'Available', value: stats.availableVehicles, icon: FiTruck, color: 'text-green-400' },
    { label: 'Sold', value: stats.soldVehicles, icon: FiTruck, color: 'text-red-400' },
    { label: 'Total Users', value: stats.totalUsers, icon: FiUsers, color: 'text-purple-400' },
    { label: 'Pending Test Drives', value: stats.pendingTestDrives, icon: FiCalendar, color: 'text-yellow-400' },
    { label: 'Pending Trade-Ins', value: stats.pendingTradeIns, icon: FiRefreshCw, color: 'text-orange-400' },
    { label: 'Pending Finance', value: stats.pendingFinance, icon: FiDollarSign, color: 'text-cyan-400' },
    { label: 'Unread Messages', value: stats.unreadMessages, icon: FiMail, color: 'text-pink-400' },
    { label: 'Total Revenue', value: formatPrice(stats.totalRevenue), icon: FiDollarSign, color: 'text-[#C8A35F]' },
  ] : [];

  const statusBadge = (status) => {
    const colors = { pending: 'bg-yellow-500/20 text-yellow-400', confirmed: 'bg-blue-500/20 text-blue-400', completed: 'bg-green-500/20 text-green-400', cancelled: 'bg-red-500/20 text-red-400', approved: 'bg-green-500/20 text-green-400', rejected: 'bg-red-500/20 text-red-400', under_review: 'bg-blue-500/20 text-blue-400', reviewed: 'bg-blue-500/20 text-blue-400', accepted: 'bg-green-500/20 text-green-400', Available: 'bg-green-500/20 text-green-400', Sold: 'bg-red-500/20 text-red-400', Pending: 'bg-yellow-500/20 text-yellow-400' };
    return <span className={`px-2 py-1 rounded-full text-xs ${colors[status] || 'bg-gray-500/20 text-gray-400'}`}>{status}</span>;
  };

  return (
    <div className="pt-20 min-h-screen bg-[#0A0A0A]">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-56 min-h-screen bg-[#111111] border-r border-[#2A2A2A] p-4 hidden lg:block fixed top-20">
          <h2 className="text-[#C8A35F] font-bold text-lg mb-6">Admin Panel</h2>
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${activeTab === tab.id ? 'bg-[#C8A35F]/10 text-[#C8A35F]' : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]'}`}>
                <tab.icon size={16} />{tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile Tab Bar */}
        <div className="lg:hidden fixed top-20 left-0 right-0 z-40 bg-[#111111] border-b border-[#2A2A2A] overflow-x-auto">
          <div className="flex px-2 py-2 gap-1">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-lg text-xs whitespace-nowrap ${activeTab === tab.id ? 'bg-[#C8A35F] text-[#0A0A0A]' : 'text-gray-400'}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-56 p-6 mt-12 lg:mt-0">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => <div key={i} className="card p-6 animate-pulse"><div className="h-6 bg-[#1A1A1A] rounded w-1/2 mb-2" /><div className="h-8 bg-[#1A1A1A] rounded w-1/3" /></div>)}
            </div>
          ) : activeTab === 'dashboard' ? (
            <div>
              <h1 className="text-2xl font-bold text-white mb-6">Dashboard <span className="gold-gradient">Overview</span></h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {statCards.map((s, i) => (
                  <div key={i} className="card p-5">
                    <div className="flex items-center justify-between">
                      <div><p className="text-gray-400 text-sm">{s.label}</p><p className={`text-2xl font-bold ${s.color} mt-1`}>{s.value}</p></div>
                      <s.icon className={s.color} size={24} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : activeTab === 'vehicles' ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Vehicle <span className="gold-gradient">Management</span></h1>
              </div>
              <div className="card overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-[#2A2A2A]">
                    <th className="text-left text-gray-400 p-4">Vehicle</th><th className="text-left text-gray-400 p-4">Price</th><th className="text-left text-gray-400 p-4">Status</th><th className="text-left text-gray-400 p-4">Stock #</th><th className="text-right text-gray-400 p-4">Actions</th>
                  </tr></thead>
                  <tbody>
                    {data.map(v => (
                      <tr key={v._id} className="border-b border-[#2A2A2A]/50 hover:bg-[#1A1A1A]">
                        <td className="p-4 text-white">{v.make} {v.model} {v.year}</td>
                        <td className="p-4 text-[#C8A35F]">{formatPrice(v.price)}</td>
                        <td className="p-4">{statusBadge(v.status)}</td>
                        <td className="p-4 text-gray-400">{v.stockNumber}</td>
                        <td className="p-4 text-right space-x-2">
                          <button onClick={() => updateStatus('/vehicles', v._id, v.status === 'Available' ? 'Sold' : 'Available')} className="text-blue-400 hover:text-blue-300 text-xs">{v.status === 'Available' ? 'Mark Sold' : 'Mark Available'}</button>
                          <button onClick={() => deleteItem('/vehicles', v._id)} className="text-red-400 hover:text-red-300"><FiTrash2 size={14} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {data.length === 0 && <p className="text-gray-500 text-center py-8">No vehicles found</p>}
              </div>
            </div>
          ) : activeTab === 'testdrives' ? (
            <div>
              <h1 className="text-2xl font-bold text-white mb-6">Test Drive <span className="gold-gradient">Requests</span></h1>
              <div className="card overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-[#2A2A2A]">
                    <th className="text-left text-gray-400 p-4">Customer</th><th className="text-left text-gray-400 p-4">Vehicle</th><th className="text-left text-gray-400 p-4">Date</th><th className="text-left text-gray-400 p-4">Status</th><th className="text-right text-gray-400 p-4">Actions</th>
                  </tr></thead>
                  <tbody>
                    {data.map(td => (
                      <tr key={td._id} className="border-b border-[#2A2A2A]/50">
                        <td className="p-4"><p className="text-white">{td.name}</p><p className="text-gray-500 text-xs">{td.email}</p></td>
                        <td className="p-4 text-gray-300">{td.vehicle?.make} {td.vehicle?.model} {td.vehicle?.year}</td>
                        <td className="p-4 text-gray-400">{formatDate(td.preferredDate)} {td.preferredTime}</td>
                        <td className="p-4">{statusBadge(td.status)}</td>
                        <td className="p-4 text-right space-x-1">
                          {['confirmed', 'completed', 'cancelled'].map(s => (
                            <button key={s} onClick={() => updateStatus('/test-drive', td._id, s)}
                              className="text-xs px-2 py-1 border border-[#2A2A2A] rounded text-gray-400 hover:text-white capitalize">{s}</button>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {data.length === 0 && <p className="text-gray-500 text-center py-8">No test drive requests</p>}
              </div>
            </div>
          ) : activeTab === 'tradeins' ? (
            <div>
              <h1 className="text-2xl font-bold text-white mb-6">Trade-In <span className="gold-gradient">Requests</span></h1>
              <div className="card overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-[#2A2A2A]">
                    <th className="text-left text-gray-400 p-4">Customer</th><th className="text-left text-gray-400 p-4">Vehicle</th><th className="text-left text-gray-400 p-4">Condition</th><th className="text-left text-gray-400 p-4">Status</th><th className="text-right text-gray-400 p-4">Actions</th>
                  </tr></thead>
                  <tbody>
                    {data.map(ti => (
                      <tr key={ti._id} className="border-b border-[#2A2A2A]/50">
                        <td className="p-4 text-white">{ti.user?.name || 'N/A'}</td>
                        <td className="p-4 text-gray-300">{ti.vehicleMake} {ti.vehicleModel} {ti.vehicleYear}</td>
                        <td className="p-4 text-gray-400">{ti.condition}</td>
                        <td className="p-4">{statusBadge(ti.status)}</td>
                        <td className="p-4 text-right space-x-1">
                          {['reviewed', 'accepted', 'rejected'].map(s => (
                            <button key={s} onClick={() => updateStatus('/trade-in', ti._id, s)}
                              className="text-xs px-2 py-1 border border-[#2A2A2A] rounded text-gray-400 hover:text-white capitalize">{s}</button>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {data.length === 0 && <p className="text-gray-500 text-center py-8">No trade-in requests</p>}
              </div>
            </div>
          ) : activeTab === 'finance' ? (
            <div>
              <h1 className="text-2xl font-bold text-white mb-6">Finance <span className="gold-gradient">Applications</span></h1>
              <div className="card overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-[#2A2A2A]">
                    <th className="text-left text-gray-400 p-4">Applicant</th><th className="text-left text-gray-400 p-4">Vehicle</th><th className="text-left text-gray-400 p-4">Loan Amount</th><th className="text-left text-gray-400 p-4">Status</th><th className="text-right text-gray-400 p-4">Actions</th>
                  </tr></thead>
                  <tbody>
                    {data.map(fa => (
                      <tr key={fa._id} className="border-b border-[#2A2A2A]/50">
                        <td className="p-4"><p className="text-white">{fa.fullName}</p><p className="text-gray-500 text-xs">{fa.email}</p></td>
                        <td className="p-4 text-gray-300">{fa.vehicle?.make} {fa.vehicle?.model}</td>
                        <td className="p-4 text-[#C8A35F]">{formatPrice(fa.loanAmount)}</td>
                        <td className="p-4">{statusBadge(fa.status)}</td>
                        <td className="p-4 text-right space-x-1">
                          {['under_review', 'approved', 'rejected'].map(s => (
                            <button key={s} onClick={() => updateStatus('/finance', fa._id, s)}
                              className="text-xs px-2 py-1 border border-[#2A2A2A] rounded text-gray-400 hover:text-white capitalize">{s.replace('_', ' ')}</button>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {data.length === 0 && <p className="text-gray-500 text-center py-8">No finance applications</p>}
              </div>
            </div>
          ) : activeTab === 'messages' ? (
            <div>
              <h1 className="text-2xl font-bold text-white mb-6">Contact <span className="gold-gradient">Messages</span></h1>
              <div className="space-y-3">
                {data.map(msg => (
                  <div key={msg._id} className={`card p-5 ${!msg.isRead ? 'border-l-4 border-l-[#C8A35F]' : ''}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-medium">{msg.name} <span className="text-gray-500 text-xs ml-2">{msg.email}</span></p>
                        {msg.subject && <p className="text-[#C8A35F] text-sm mt-1">{msg.subject}</p>}
                        <p className="text-gray-400 text-sm mt-2">{msg.message}</p>
                        <p className="text-gray-600 text-xs mt-2">{formatDate(msg.createdAt)}</p>
                      </div>
                      {!msg.isRead && (
                        <button onClick={() => api.put(`/contact/${msg._id}/read`).then(fetchData)} className="text-xs text-[#C8A35F] border border-[#C8A35F]/30 px-3 py-1 rounded hover:bg-[#C8A35F]/10">Mark Read</button>
                      )}
                    </div>
                  </div>
                ))}
                {data.length === 0 && <p className="text-gray-500 text-center py-8">No messages</p>}
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold text-white mb-6 capitalize">{activeTab} <span className="gold-gradient">Management</span></h1>
              <div className="card overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-[#2A2A2A]">
                    <th className="text-left text-gray-400 p-4">Title / Name</th><th className="text-left text-gray-400 p-4">Details</th><th className="text-left text-gray-400 p-4">Date</th><th className="text-right text-gray-400 p-4">Actions</th>
                  </tr></thead>
                  <tbody>
                    {(Array.isArray(data) ? data : Object.values(data).flat()).map(item => (
                      <tr key={item._id} className="border-b border-[#2A2A2A]/50">
                        <td className="p-4 text-white">{item.title || item.name || item.question || '-'}</td>
                        <td className="p-4 text-gray-400 text-xs max-w-xs truncate">{item.description || item.shortDescription || item.answer || item.review || item.content || '-'}</td>
                        <td className="p-4 text-gray-500 text-xs">{formatDate(item.createdAt)}</td>
                        <td className="p-4 text-right">
                          <button onClick={() => deleteItem(`/${activeTab === 'testimonials' ? 'admin/testimonials' : activeTab}`, item._id)} className="text-red-400 hover:text-red-300"><FiTrash2 size={14} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {(Array.isArray(data) ? data : Object.values(data).flat()).length === 0 && <p className="text-gray-500 text-center py-8">No data found</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
