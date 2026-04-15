const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar: { type: String },
  rating: { type: Number, min: 1, max: 5, required: true },
  review: { type: String, required: true },
  designation: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
