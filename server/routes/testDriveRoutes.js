const express = require('express');
const router = express.Router();
const { bookTestDrive, getUserTestDrives, getAllTestDrives, updateTestDriveStatus } = require('../controllers/testDriveController');
const { protect, admin } = require('../middleware/auth');

router.post('/', protect, bookTestDrive);
router.get('/my', protect, getUserTestDrives);
router.get('/', protect, admin, getAllTestDrives);
router.put('/:id', protect, admin, updateTestDriveStatus);

module.exports = router;
