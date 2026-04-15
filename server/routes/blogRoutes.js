const express = require('express');
const router = express.Router();
const { getBlogs, getBlog, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const { protect, admin } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.get('/', getBlogs);
router.get('/:slug', getBlog);
router.post('/', protect, admin, upload.single('coverImage'), createBlog);
router.put('/:id', protect, admin, upload.single('coverImage'), updateBlog);
router.delete('/:id', protect, admin, deleteBlog);

module.exports = router;
