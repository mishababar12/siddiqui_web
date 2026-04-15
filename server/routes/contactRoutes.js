const express = require('express');
const router = express.Router();
const { sendMessage, getAllMessages, markAsRead } = require('../controllers/contactController');
const { protect, admin } = require('../middleware/auth');

router.post('/', sendMessage);
router.get('/', protect, admin, getAllMessages);
router.put('/:id/read', protect, admin, markAsRead);

module.exports = router;
