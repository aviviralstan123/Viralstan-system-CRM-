const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const { validateMiddleware } = require('../middleware/validateMiddleware');
const { blogSchema } = require('../validations/blogValidation');
const { ROLES } = require('../utils/constants');

// Public routes for blog website
router.get('/', blogController.getAllBlogs);
router.get('/id/:id', blogController.getBlogById);
router.get('/:slug', blogController.getBlogBySlug);

// Protected routes for admin/editor
router.use(authMiddleware);
router.post('/', roleMiddleware(ROLES.ADMIN, ROLES.EDITOR), validateMiddleware(blogSchema), blogController.createBlog);
router.put('/:id', roleMiddleware(ROLES.ADMIN, ROLES.EDITOR), validateMiddleware(blogSchema), blogController.updateBlog);
router.delete('/:id', roleMiddleware(ROLES.ADMIN), blogController.deleteBlog);

module.exports = router;
