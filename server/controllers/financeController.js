const FinanceApplication = require('../models/FinanceApplication');

exports.calculateEMI = async (req, res) => {
  try {
    const { principal, annualRate, tenureMonths } = req.body;
    const r = annualRate / 12 / 100;
    const n = tenureMonths;
    const emi = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - principal;
    res.json({ success: true, data: { emi: Math.round(emi), totalPayment: Math.round(totalPayment), totalInterest: Math.round(totalInterest) } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.applyForFinance = async (req, res) => {
  try {
    const documents = req.files ? req.files.map(f => ({ name: f.originalname, url: f.path, publicId: f.filename })) : [];
    const application = await FinanceApplication.create({ ...req.body, user: req.user._id, documents });
    res.status(201).json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUserApplications = async (req, res) => {
  try {
    const apps = await FinanceApplication.find({ user: req.user._id }).populate('vehicle', 'make model year price');
    res.json({ success: true, data: apps });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllApplications = async (req, res) => {
  try {
    const apps = await FinanceApplication.find().populate('user', 'name email phone').populate('vehicle', 'make model year price stockNumber').sort('-createdAt');
    res.json({ success: true, data: apps });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const app = await FinanceApplication.findByIdAndUpdate(req.params.id, { status, adminNotes }, { new: true });
    if (!app) return res.status(404).json({ success: false, message: 'Application not found' });
    res.json({ success: true, data: app });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
