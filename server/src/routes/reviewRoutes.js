const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const { ROLES } = require('../utils/constants');

router.get('/', reviewController.getPublicReviews);

router.use(authMiddleware);
router.get('/admin/all', roleMiddleware(ROLES.ADMIN, ROLES.EDITOR), reviewController.getAllReviews);
router.patch('/:id/status', roleMiddleware(ROLES.ADMIN, ROLES.EDITOR), reviewController.updateReviewStatus);
router.delete('/:id', roleMiddleware(ROLES.ADMIN), reviewController.deleteReview);

module.exports = router;
