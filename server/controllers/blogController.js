const Blog = require('../models/Blog');
const { cloudinary } = require('../config/cloudinary');

exports.getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 9 } = req.query;
    const total = await Blog.countDocuments({ isPublished: true });
    const blogs = await Blog.find({ isPublished: true }).populate('author', 'name avatar').sort('-createdAt').skip((page - 1) * limit).limit(Number(limit));
    res.json({ success: true, data: blogs, pagination: { total, page: Number(page), pages: Math.ceil(total / limit) } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug }).populate('author', 'name avatar');
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    blog.views += 1;
    await blog.save();
    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const coverImage = req.file ? { url: req.file.path, publicId: req.file.filename } : null;
    const blog = await Blog.create({ ...req.body, author: req.user._id, coverImage, tags: req.body.tags ? JSON.parse(req.body.tags) : [] });
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) updates.coverImage = { url: req.file.path, publicId: req.file.filename };
    if (req.body.tags) updates.tags = JSON.parse(req.body.tags);
    const blog = await Blog.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    if (blog.coverImage && blog.coverImage.publicId) { await cloudinary.uploader.destroy(blog.coverImage.publicId); }
    res.json({ success: true, message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
