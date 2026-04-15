const Vehicle = require('../models/Vehicle');
const User = require('../models/User');
const TestDrive = require('../models/TestDrive');
const TradeIn = require('../models/TradeIn');
const FinanceApplication = require('../models/FinanceApplication');
const ContactMessage = require('../models/ContactMessage');
const Testimonial = require('../models/Testimonial');

exports.getDashboardStats = async (req, res) => {
  try {
    const [totalVehicles, availableVehicles, soldVehicles, totalUsers, pendingTestDrives, pendingTradeIns, pendingFinance, unreadMessages] = await Promise.all([
      Vehicle.countDocuments(),
      Vehicle.countDocuments({ status: 'Available' }),
      Vehicle.countDocuments({ status: 'Sold' }),
      User.countDocuments({ role: 'user' }),
      TestDrive.countDocuments({ status: 'pending' }),
      TradeIn.countDocuments({ status: 'pending' }),
      FinanceApplication.countDocuments({ status: 'pending' }),
      ContactMessage.countDocuments({ isRead: false }),
    ]);
    const revenueResult = await Vehicle.aggregate([{ $match: { status: 'Sold' } }, { $group: { _id: null, total: { $sum: '$price' } } }]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;
    res.json({ success: true, data: { totalVehicles, availableVehicles, soldVehicles, totalUsers, pendingTestDrives, pendingTradeIns, pendingFinance, unreadMessages, totalRevenue } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true }).sort('-createdAt');
    res.json({ success: true, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createTestimonial = async (req, res) => {
  try { const t = await Testimonial.create(req.body); res.status(201).json({ success: true, data: t }); }
  catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const t = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: t });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.deleteTestimonial = async (req, res) => {
  try { await Testimonial.findByIdAndDelete(req.params.id); res.json({ success: true, message: 'Deleted' }); }
  catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
