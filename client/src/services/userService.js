import api from './api';

export const getWishlist = () => api.get('/wishlist');
export const addToWishlist = (vehicleId) => api.post(`/wishlist/${vehicleId}`);
export const removeFromWishlist = (vehicleId) => api.delete(`/wishlist/${vehicleId}`);
export const bookTestDrive = (data) => api.post('/test-drive', data);
export const submitTradeIn = (formData) => api.post('/trade-in', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const calculateEMI = (data) => api.post('/finance/calculate-emi', data);
export const applyForFinance = (formData) => api.post('/finance/apply', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const getUserTestDrives = () => api.get('/test-drive/my');
export const getUserTradeIns = () => api.get('/trade-in/my');
export const getUserFinanceApps = () => api.get('/finance/my');
