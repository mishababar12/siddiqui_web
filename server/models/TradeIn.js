const mongoose = require('mongoose');

const tradeInSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vehicleMake: { type: String, required: true },
  vehicleModel: { type: String, required: true },
  vehicleYear: { type: Number, required: true },
  mileage: { type: Number, required: true },
  condition: { type: String, enum: ['Excellent', 'Good', 'Fair', 'Poor'], required: true },
  color: { type: String },
  fuelType: { type: String },
  transmission: { type: String },
  description: { type: String },
  images: [{ url: String, publicId: String }],
  estimatedValue: { type: Number },
  status: { type: String, enum: ['pending', 'reviewed', 'accepted', 'rejected'], default: 'pending' },
  adminNotes: { type: String },
  interestedVehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
}, { timestamps: true });

module.exports = mongoose.model('TradeIn', tradeInSchema);
