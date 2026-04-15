const express = require('express');
const router = express.Router();
const { getVehicles, getVehicle, getFeaturedVehicles, getMakes, createVehicle, updateVehicle, deleteVehicle } = require('../controllers/vehicleController');
const { protect, admin } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.get('/featured', getFeaturedVehicles);
router.get('/makes', getMakes);
router.get('/', getVehicles);
router.get('/:slug', getVehicle);
router.post('/', protect, admin, upload.array('images', 10), createVehicle);
router.put('/:id', protect, admin, upload.array('images', 10), updateVehicle);
router.delete('/:id', protect, admin, deleteVehicle);

module.exports = router;
