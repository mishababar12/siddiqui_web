const express = require('express');
const router = express.Router();
const { getDashboardStats, getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

router.get('/dashboard', protect, admin, getDashboardStats);
router.get('/testimonials', getTestimonials);
router.post('/testimonials', protect, admin, createTestimonial);
router.put('/testimonials/:id', protect, admin, updateTestimonial);
router.delete('/testimonials/:id', protect, admin, deleteTestimonial);

module.exports = router;
