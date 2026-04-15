const express = require('express');
const router = express.Router();
const { getFAQs, createFAQ, updateFAQ, deleteFAQ } = require('../controllers/faqController');
const { protect, admin } = require('../middleware/auth');

router.get('/', getFAQs);
router.post('/', protect, admin, createFAQ);
router.put('/:id', protect, admin, updateFAQ);
router.delete('/:id', protect, admin, deleteFAQ);

module.exports = router;
