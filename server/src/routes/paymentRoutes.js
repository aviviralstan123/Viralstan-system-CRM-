const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const { validateMiddleware } = require('../middleware/validateMiddleware');
const { paymentSchema } = require('../validations/paymentValidation');
const { ROLES } = require('../utils/constants');

router.use(authMiddleware);

router.get('/', paymentController.getAllPayments);
router.post('/', roleMiddleware(ROLES.ADMIN, ROLES.EDITOR), validateMiddleware(paymentSchema), paymentController.createPayment);

module.exports = router;
