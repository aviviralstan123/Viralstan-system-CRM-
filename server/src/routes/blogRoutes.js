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

// Protected routes for admin/editor (MUST be before /:slug to avoid conflict)
router.get('/admin/all', authMiddleware, roleMiddleware(ROLES.ADMIN, ROLES.EDITOR), blogController.getAllBlogs);
router.get('/admin/id/:id', authMiddleware, roleMiddleware(ROLES.ADMIN, ROLES.EDITOR), blogController.getBlogById);
router.post('/', authMiddleware, roleMiddleware(ROLES.ADMIN, ROLES.EDITOR), upload.single('featured_image'), validateMiddleware(blogSchema), blogController.createBlog);
router.put('/:id', authMiddleware, roleMiddleware(ROLES.ADMIN, ROLES.EDITOR), upload.single('featured_image'), validateMiddleware(blogSchema), blogController.updateBlog);
router.delete('/:id', authMiddleware, roleMiddleware(ROLES.ADMIN), blogController.deleteBlog);

// Public slug route LAST (catch-all, must be after all specific routes)
router.get('/:slug', blogController.getPublicBlogBySlug);

module.exports = router;
