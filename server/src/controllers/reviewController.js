const reviewService = require('../services/reviewService');
const { responseHandler } = require('../utils/responseHandler');

const REVIEW_STATUSES = new Set(['pending', 'approved', 'rejected']);

const getPublicReviews = async (req, res, next) => {
  try {
    const reviews = await reviewService.getAllReviews('approved');
    responseHandler(res, 200, 'Reviews retrieved successfully', reviews);
  } catch (error) {
    next(error);
  }
};

const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await reviewService.getAllReviews(req.query.status);
    responseHandler(res, 200, 'Reviews retrieved successfully', reviews);
  } catch (error) {
    next(error);
  }
};

const updateReviewStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!REVIEW_STATUSES.has(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid review status'
      });
    }

    await reviewService.updateReviewStatus(req.params.id, status);
    responseHandler(res, 200, 'Review status updated successfully');
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    await reviewService.deleteReview(req.params.id);
    responseHandler(res, 200, 'Review deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPublicReviews,
  getAllReviews,
  updateReviewStatus,
  deleteReview
};
