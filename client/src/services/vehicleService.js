import api from './api';

export const getVehicles = (params) => api.get('/vehicles', { params });
export const getVehicle = (slug) => api.get(`/vehicles/${slug}`);
export const getFeaturedVehicles = () => api.get('/vehicles/featured');
export const getMakes = () => api.get('/vehicles/makes');
