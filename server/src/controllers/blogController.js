const blogService = require('../services/blogService');
const { responseHandler } = require('../utils/responseHandler');

const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await blogService.getAllBlogs(req.query.status);
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

const createBlog = async (req, res, next) => {
  try {
    const blogData = { ...req.body, author_id: req.user.id };
    const blog = await blogService.createBlog(blogData);
    responseHandler(res, 201, 'Blog created successfully', blog);
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const blog = await blogService.updateBlog(req.params.id, req.body);
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

module.exports = { getAllBlogs, getBlogBySlug, getBlogById, createBlog, updateBlog, deleteBlog };
