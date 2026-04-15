import api from './api';

export const getServices = () => api.get('/services');
export const getBlogs = (page = 1) => api.get(`/blogs?page=${page}`);
export const getBlog = (slug) => api.get(`/blogs/${slug}`);
export const getFAQs = () => api.get('/faqs');
export const sendContactMessage = (data) => api.post('/contact', data);
export const getTestimonials = () => api.get('/admin/testimonials');
