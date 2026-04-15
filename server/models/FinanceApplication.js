const mongoose = require('mongoose');

const financeApplicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  cnic: { type: String, required: true },
  monthlyIncome: { type: Number, required: true },
  employmentStatus: { type: String, enum: ['Employed', 'Self-Employed', 'Business Owner', 'Other'], required: true },
  employerName: { type: String },
  loanAmount: { type: Number, required: true },
  downPayment: { type: Number, required: true },
  tenure: { type: Number, required: true },
  interestRate: { type: Number },
  monthlyEmi: { type: Number },
  documents: [{ name: String, url: String, publicId: String }],
  status: { type: String, enum: ['pending', 'under_review', 'approved', 'rejected'], default: 'pending' },
  adminNotes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('FinanceApplication', financeApplicationSchema);
