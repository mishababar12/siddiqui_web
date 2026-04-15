const express = require('express');
const router = express.Router();
const { calculateEMI, applyForFinance, getUserApplications, getAllApplications, updateApplicationStatus } = require('../controllers/financeController');
const { protect, admin } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.post('/calculate-emi', calculateEMI);
router.post('/apply', protect, upload.array('documents', 5), applyForFinance);
router.get('/my', protect, getUserApplications);
router.get('/', protect, admin, getAllApplications);
router.put('/:id', protect, admin, updateApplicationStatus);

module.exports = router;
