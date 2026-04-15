const FAQ = require('../models/FAQ');

exports.getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find({ isActive: true }).sort('category order');
    const grouped = faqs.reduce((acc, faq) => {
      if (!acc[faq.category]) acc[faq.category] = [];
      acc[faq.category].push(faq);
      return acc;
    }, {});
    res.json({ success: true, data: grouped });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createFAQ = async (req, res) => {
  try { const faq = await FAQ.create(req.body); res.status(201).json({ success: true, data: faq }); }
  catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.updateFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!faq) return res.status(404).json({ success: false, message: 'FAQ not found' });
    res.json({ success: true, data: faq });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.deleteFAQ = async (req, res) => {
  try { await FAQ.findByIdAndDelete(req.params.id); res.json({ success: true, message: 'FAQ deleted' }); }
  catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
