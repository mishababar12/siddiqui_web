const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String },
  coverImage: { url: String, publicId: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags: [String],
  category: { type: String },
  isPublished: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
}, { timestamps: true });

blogSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true }) + '-' + Date.now().toString(36);
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
