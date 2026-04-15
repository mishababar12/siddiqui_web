const TradeIn = require('../models/TradeIn');

exports.submitTradeIn = async (req, res) => {
  try {
    const images = req.files ? req.files.map(f => ({ url: f.path, publicId: f.filename })) : [];
    const tradeIn = await TradeIn.create({ ...req.body, user: req.user._id, images });
    res.status(201).json({ success: true, data: tradeIn });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUserTradeIns = async (req, res) => {
  try {
    const tradeIns = await TradeIn.find({ user: req.user._id }).populate('interestedVehicle', 'make model year price');
    res.json({ success: true, data: tradeIns });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllTradeIns = async (req, res) => {
  try {
    const tradeIns = await TradeIn.find().populate('user', 'name email phone').sort('-createdAt');
    res.json({ success: true, data: tradeIns });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateTradeInStatus = async (req, res) => {
  try {
    const { status, estimatedValue, adminNotes } = req.body;
    const tradeIn = await TradeIn.findByIdAndUpdate(req.params.id, { status, estimatedValue, adminNotes }, { new: true });
    if (!tradeIn) return res.status(404).json({ success: false, message: 'Trade-in not found' });
    res.json({ success: true, data: tradeIn });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
