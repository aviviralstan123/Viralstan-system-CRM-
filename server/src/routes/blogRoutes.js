const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const { validateMiddleware } = require('../middleware/validateMiddleware');
const { blogSchema } = require('../validations/blogValidation');
const { ROLES } = require('../utils/constants');
const upload = require('../utils/imageUpload');

// Public routes for blog website
router.get('/', blogController.getPublicBlogs);
router.get('/id/:id', blogController.getPublicBlogById);
router.get('/:slug', blogController.getPublicBlogBySlug);

// Protected routes for admin/editor
router.use(authMiddleware);
router.get('/admin/all', roleMiddleware(ROLES.ADMIN, ROLES.EDITOR), blogController.getAllBlogs);
router.get('/admin/id/:id', roleMiddleware(ROLES.ADMIN, ROLES.EDITOR), blogController.getBlogById);
router.post('/', roleMiddleware(ROLES.ADMIN, ROLES.EDITOR), upload.single('featured_image'), validateMiddleware(blogSchema), blogController.createBlog);
router.put('/:id', roleMiddleware(ROLES.ADMIN, ROLES.EDITOR), upload.single('featured_image'), validateMiddleware(blogSchema), blogController.updateBlog);
router.delete('/:id', roleMiddleware(ROLES.ADMIN), blogController.deleteBlog);

module.exports = router;
