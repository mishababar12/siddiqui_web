const express = require('express');
const router = express.Router();
const { submitTradeIn, getUserTradeIns, getAllTradeIns, updateTradeInStatus } = require('../controllers/tradeInController');
const { protect, admin } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.post('/', protect, upload.array('images', 5), submitTradeIn);
router.get('/my', protect, getUserTradeIns);
router.get('/', protect, admin, getAllTradeIns);
router.put('/:id', protect, admin, updateTradeInStatus);

module.exports = router;
