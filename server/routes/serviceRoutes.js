const express = require('express');
const router = express.Router();
const { getServices, getService, createService, updateService, deleteService, bookAppointment, getAllAppointments } = require('../controllers/serviceController');
const { protect, admin } = require('../middleware/auth');

router.get('/', getServices);
router.get('/:id', getService);
router.post('/', protect, admin, createService);
router.put('/:id', protect, admin, updateService);
router.delete('/:id', protect, admin, deleteService);
router.post('/book-appointment', bookAppointment);
router.get('/appointments/all', protect, admin, getAllAppointments);

module.exports = router;
