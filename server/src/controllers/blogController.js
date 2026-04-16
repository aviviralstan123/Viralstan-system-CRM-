const blogService = require('../services/blogService');
const { responseHandler } = require('../utils/responseHandler');
const cloudinary = require('../config/cloudinary');

const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await blogService.getAllBlogs(req.query.status);
    responseHandler(res, 200, 'Blogs retrieved successfully', blogs);
  } catch (error) {
    next(error);
  }
};

const getPublicBlogs = async (req, res, next) => {
  try {
    const blogs = await blogService.getAllBlogs('published');
    responseHandler(res, 200, 'Blogs retrieved successfully', blogs);
  } catch (error) {
    next(error);
  }
};

const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await blogService.getBlogBySlug(req.params.slug);
    responseHandler(res, 200, 'Blog retrieved successfully', blog);
  } catch (error) {
    next(error);
  }
};

const getPublicBlogBySlug = async (req, res, next) => {
  try {
    const blog = await blogService.getBlogBySlug(req.params.slug, 'published');
    responseHandler(res, 200, 'Blog retrieved successfully', blog);
  } catch (error) {
    next(error);
  }
};

const createBlog = async (req, res, next) => {
  try {
    const blogData = { ...req.body, author_id: req.user.id };

    // Upload featured_image to Cloudinary if a file was sent
    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      const result = await cloudinary.uploader.upload(dataURI, { folder: 'blogs' });
      blogData.featured_image = result.secure_url;
    }

    const blog = await blogService.createBlog(blogData);
    responseHandler(res, 201, 'Blog created successfully', blog);
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const updateData = { ...req.body };

    // Upload featured_image to Cloudinary if a new file was sent
    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      const result = await cloudinary.uploader.upload(dataURI, { folder: 'blogs' });
      updateData.featured_image = result.secure_url;
    }

    const blog = await blogService.updateBlog(req.params.id, updateData);
    responseHandler(res, 200, 'Blog updated successfully', blog);
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    await blogService.deleteBlog(req.params.id);
    responseHandler(res, 200, 'Blog deleted successfully');
  } catch (error) {
    next(error);
  }
};

const getBlogById = async (req, res, next) => {
  try {
    const blog = await blogService.getBlogById(req.params.id);
    responseHandler(res, 200, 'Blog retrieved successfully', blog);
  } catch (error) {
    next(error);
  }
};

const getPublicBlogById = async (req, res, next) => {
  try {
    const blog = await blogService.getBlogById(req.params.id, 'published');
    responseHandler(res, 200, 'Blog retrieved successfully', blog);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBlogs,
  getPublicBlogs,
  getBlogBySlug,
  getPublicBlogBySlug,
  getBlogById,
  getPublicBlogById,
  createBlog,
  updateBlog,
  deleteBlog
};
