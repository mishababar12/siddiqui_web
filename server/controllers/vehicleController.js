const Vehicle = require('../models/Vehicle');
const { cloudinary } = require('../config/cloudinary');

exports.getVehicles = async (req, res) => {
  try {
    const { search, make, model, year, minPrice, maxPrice, fuelType, transmission, condition, status, bodyType, sort, page = 1, limit = 12 } = req.query;
    const query = {};
    if (search) { query.$or = [{ make: { $regex: search, $options: 'i' } }, { model: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }]; }
    if (make) query.make = { $regex: make, $options: 'i' };
    if (model) query.model = { $regex: model, $options: 'i' };
    if (year) query.year = Number(year);
    if (minPrice || maxPrice) { query.price = {}; if (minPrice) query.price.$gte = Number(minPrice); if (maxPrice) query.price.$lte = Number(maxPrice); }
    if (fuelType) query.fuelType = fuelType;
    if (transmission) query.transmission = transmission;
    if (condition) query.condition = condition;
    if (status) query.status = status; else query.status = 'Available';
    if (bodyType) query.bodyType = bodyType;

    let sortOption = { createdAt: -1 };
    if (sort === 'price_asc') sortOption = { price: 1 };
    else if (sort === 'price_desc') sortOption = { price: -1 };
    else if (sort === 'year_desc') sortOption = { year: -1 };
    else if (sort === 'year_asc') sortOption = { year: 1 };
    else if (sort === 'mileage_asc') sortOption = { mileage: 1 };

    const total = await Vehicle.countDocuments(query);
    const vehicles = await Vehicle.find(query).sort(sortOption).skip((page - 1) * limit).limit(Number(limit));
    res.json({ success: true, data: vehicles, pagination: { total, page: Number(page), pages: Math.ceil(total / limit) } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ slug: req.params.slug });
    if (!vehicle) return res.status(404).json({ success: false, message: 'Vehicle not found' });
    vehicle.views += 1;
    await vehicle.save();
    res.json({ success: true, data: vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getFeaturedVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ isFeatured: true, status: 'Available' }).limit(8);
    res.json({ success: true, data: vehicles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMakes = async (req, res) => {
  try {
    const makes = await Vehicle.distinct('make');
    res.json({ success: true, data: makes.sort() });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createVehicle = async (req, res) => {
  try {
    const images = req.files ? req.files.map(f => ({ url: f.path, publicId: f.filename })) : [];
    const vehicle = await Vehicle.create({ ...req.body, images, features: req.body.features ? JSON.parse(req.body.features) : [] });
    res.status(201).json({ success: true, data: vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    let vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ success: false, message: 'Vehicle not found' });
    const newImages = req.files ? req.files.map(f => ({ url: f.path, publicId: f.filename })) : [];
    const updates = { ...req.body };
    if (req.body.features) updates.features = JSON.parse(req.body.features);
    if (newImages.length > 0) updates.images = [...vehicle.images, ...newImages];
    if (req.body.removeImages) {
      const removeIds = JSON.parse(req.body.removeImages);
      for (const id of removeIds) { await cloudinary.uploader.destroy(id); }
      updates.images = (updates.images || vehicle.images).filter(img => !removeIds.includes(img.publicId));
    }
    vehicle = await Vehicle.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    res.json({ success: true, data: vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ success: false, message: 'Vehicle not found' });
    for (const img of vehicle.images) { if (img.publicId) await cloudinary.uploader.destroy(img.publicId); }
    await vehicle.deleteOne();
    res.json({ success: true, message: 'Vehicle deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
