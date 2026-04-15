import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getVehicles, getMakes } from '../services/vehicleService';
import VehicleCard from '../components/cars/VehicleCard';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';

const CarsPage = () => {
  const [searchParams] = useSearchParams();
  const [vehicles, setVehicles] = useState([]);
  const [makes, setMakesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    make: searchParams.get('make') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    year: searchParams.get('year') || '',
    fuelType: searchParams.get('fuelType') || '',
    transmission: searchParams.get('transmission') || '',
    condition: searchParams.get('condition') || '',
    bodyType: searchParams.get('bodyType') || '',
    sort: searchParams.get('sort') || '',
  });

  useEffect(() => { getMakes().then(r => setMakesList(r.data.data)).catch(() => {}); }, []);

  useEffect(() => {
    setLoading(true);
    const params = { ...filters, page: pagination.page, limit: 12 };
    Object.keys(params).forEach(k => { if (!params[k]) delete params[k]; });
    getVehicles(params)
      .then(r => { setVehicles(r.data.data); setPagination(r.data.pagination); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [filters, pagination.page]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({ search: '', make: '', minPrice: '', maxPrice: '', year: '', fuelType: '', transmission: '', condition: '', bodyType: '', sort: '' });
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const FilterPanel = () => (
    <div className="space-y-4">
      <div>
        <label className="text-gray-400 text-base mb-1 block">Search</label>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input type="text" placeholder="Search cars..." value={filters.search} onChange={e => updateFilter('search', e.target.value)}
            className="input-field pl-10" />
        </div>
      </div>
      <div>
        <label className="text-gray-400 text-base mb-1 block">Make</label>
        <select value={filters.make} onChange={e => updateFilter('make', e.target.value)} className="input-field">
          <option value="">All Makes</option>
          {makes.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-gray-400 text-base mb-1 block">Min Price</label>
          <input type="number" placeholder="Min" value={filters.minPrice} onChange={e => updateFilter('minPrice', e.target.value)} className="input-field" />
        </div>
        <div>
          <label className="text-gray-400 text-base mb-1 block">Max Price</label>
          <input type="number" placeholder="Max" value={filters.maxPrice} onChange={e => updateFilter('maxPrice', e.target.value)} className="input-field" />
        </div>
      </div>
      <div>
        <label className="text-gray-400 text-base mb-1 block">Year</label>
        <input type="number" placeholder="e.g. 2024" value={filters.year} onChange={e => updateFilter('year', e.target.value)} className="input-field" />
      </div>
      <div>
        <label className="text-gray-400 text-base mb-1 block">Fuel Type</label>
        <select value={filters.fuelType} onChange={e => updateFilter('fuelType', e.target.value)} className="input-field">
          <option value="">All</option>
          {['Petrol', 'Diesel', 'Hybrid', 'Electric', 'CNG', 'LPG'].map(f => <option key={f}>{f}</option>)}
        </select>
      </div>
      <div>
        <label className="text-gray-400 text-base mb-1 block">Transmission</label>
        <select value={filters.transmission} onChange={e => updateFilter('transmission', e.target.value)} className="input-field">
          <option value="">All</option>
          {['Automatic', 'Manual', 'CVT'].map(t => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label className="text-gray-400 text-base mb-1 block">Condition</label>
        <select value={filters.condition} onChange={e => updateFilter('condition', e.target.value)} className="input-field">
          <option value="">All</option>
          {['New', 'Used', 'Certified Pre-Owned'].map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className="text-gray-400 text-base mb-1 block">Body Type</label>
        <select value={filters.bodyType} onChange={e => updateFilter('bodyType', e.target.value)} className="input-field">
          <option value="">All</option>
          {['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Truck', 'Van', 'Convertible', 'Wagon'].map(b => <option key={b}>{b}</option>)}
        </select>
      </div>
      <div>
        <label className="text-gray-400 text-base mb-1 block">Sort By</label>
        <select value={filters.sort} onChange={e => updateFilter('sort', e.target.value)} className="input-field">
          <option value="">Newest First</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="year_desc">Year: Newest</option>
          <option value="year_asc">Year: Oldest</option>
          <option value="mileage_asc">Mileage: Low to High</option>
        </select>
      </div>
      <button onClick={clearFilters} className="w-full py-2 text-base text-red-400 border border-red-400/30 rounded-lg hover:bg-red-400/10 transition">Clear All Filters</button>
    </div>
  );

  return (
    <div className="pt-20 min-h-screen bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Our <span className="gold-gradient">Vehicles</span></h1>
            <p className="text-gray-400 mt-1">Showing {vehicles.length} of {pagination.total} vehicles</p>
          </div>
          <button onClick={() => setFiltersOpen(!filtersOpen)} className="md:hidden btn-outline flex items-center gap-2 text-base">
            <FiFilter /> Filters
          </button>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-72 flex-shrink-0">
            <div className="sticky top-24 card p-5">
              <h3 className="text-white font-semibold mb-4">Filters</h3>
              <FilterPanel />
            </div>
          </div>

          {/* Mobile Filter Overlay */}
          {filtersOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div className="absolute inset-0 bg-black/70" onClick={() => setFiltersOpen(false)} />
              <div className="absolute right-0 top-0 bottom-0 w-80 bg-[#111111] p-5 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white font-semibold">Filters</h3>
                  <button onClick={() => setFiltersOpen(false)} className="text-gray-400"><FiX size={20} /></button>
                </div>
                <FilterPanel />
              </div>
            </div>
          )}

          {/* Vehicle Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="card animate-pulse">
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
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vehicles.map(v => <VehicleCard key={v._id} vehicle={v} />)}
                </div>
                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-10">
                    <button disabled={pagination.page === 1} onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}
                      className="px-4 py-2 rounded-lg border border-[#2A2A2A] text-gray-400 hover:border-[#C8A35F] disabled:opacity-30 transition">Prev</button>
                    {[...Array(pagination.pages)].map((_, i) => (
                      <button key={i} onClick={() => setPagination(p => ({ ...p, page: i + 1 }))}
                        className={`w-10 h-10 rounded-lg text-base font-medium transition ${pagination.page === i + 1 ? 'bg-[#C8A35F] text-[#0A0A0A]' : 'border border-[#2A2A2A] text-gray-400 hover:border-[#C8A35F]'}`}>
                        {i + 1}
                      </button>
                    ))}
                    <button disabled={pagination.page === pagination.pages} onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}
                      className="px-4 py-2 rounded-lg border border-[#2A2A2A] text-gray-400 hover:border-[#C8A35F] disabled:opacity-30 transition">Next</button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No vehicles found matching your criteria</p>
                <button onClick={clearFilters} className="btn-primary mt-4">Clear Filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarsPage;
