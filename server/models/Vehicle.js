const mongoose = require('mongoose');
const slugify = require('slugify');

const vehicleSchema = new mongoose.Schema({
  make: { type: String, required: [true, 'Make is required'], trim: true },
  model: { type: String, required: [true, 'Model is required'], trim: true },
  year: { type: Number, required: [true, 'Year is required'] },
  price: { type: Number, required: [true, 'Price is required'] },
  mileage: { type: Number, default: 0 },
  fuelType: { type: String, enum: ['Petrol', 'Diesel', 'Hybrid', 'Electric', 'CNG', 'LPG'], required: true },
  transmission: { type: String, enum: ['Automatic', 'Manual', 'CVT'], required: true },
  bodyType: { type: String, enum: ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Truck', 'Van', 'Convertible', 'Wagon'], default: 'Sedan' },
  color: { type: String, required: true },
  condition: { type: String, enum: ['New', 'Used', 'Certified Pre-Owned'], required: true },
  status: { type: String, enum: ['Available', 'Sold', 'Pending', 'Reserved'], default: 'Available' },
  images: [{ url: String, publicId: String }],
  features: [String],
  description: { type: String },
  stockNumber: { type: String, unique: true },
  vin: { type: String },
  engine: { type: String },
  horsepower: { type: Number },
  seats: { type: Number, default: 5 },
  doors: { type: Number, default: 4 },
  drivetrain: { type: String, enum: ['FWD', 'RWD', 'AWD', '4WD'], default: 'FWD' },
  slug: { type: String, unique: true },
  isFeatured: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
}, { timestamps: true });

vehicleSchema.pre('save', function (next) {
  if (this.isModified('make') || this.isModified('model') || this.isModified('year')) {
    this.slug = slugify(`${this.make}-${this.model}-${this.year}-${Date.now()}`, { lower: true });
  }
  if (!this.stockNumber) {
    this.stockNumber = `PAT-${Date.now().toString(36).toUpperCase()}`;
  }
  next();
});

vehicleSchema.index({ make: 1, model: 1, year: 1 });
vehicleSchema.index({ price: 1 });
vehicleSchema.index({ status: 1 });
vehicleSchema.index({ slug: 1 });

module.exports = mongoose.model('Vehicle', vehicleSchema);
