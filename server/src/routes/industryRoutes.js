const express = require('express');
const router = express.Router();
const industryController = require('../controllers/industryController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/', industryController.getAllIndustries);
router.get('/:slug', industryController.getIndustryBySlug);

// Protected routes
router.post('/', authMiddleware, industryController.createIndustry);
router.put('/:id', authMiddleware, industryController.updateIndustry);
router.delete('/:id', authMiddleware, industryController.deleteIndustry);

module.exports = router;
