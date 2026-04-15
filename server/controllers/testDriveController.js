const TestDrive = require('../models/TestDrive');

exports.bookTestDrive = async (req, res) => {
  try {
    const booking = await TestDrive.create({ ...req.body, user: req.user._id });
    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUserTestDrives = async (req, res) => {
  try {
    const bookings = await TestDrive.find({ user: req.user._id }).populate('vehicle', 'make model year images price slug');
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllTestDrives = async (req, res) => {
  try {
    const bookings = await TestDrive.find().populate('user', 'name email').populate('vehicle', 'make model year stockNumber').sort('-createdAt');
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateTestDriveStatus = async (req, res) => {
  try {
    const booking = await TestDrive.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
