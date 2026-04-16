const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const { validateMiddleware } = require('../middleware/validateMiddleware');
const { serviceSchema } = require('../validations/serviceValidation');
const { ROLES } = require('../utils/constants');

// Public route for website
router.get('/', serviceController.getPublicServices);

// Protected routes
router.use(authMiddleware);
router.get('/admin/all', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);
router.post('/', roleMiddleware(ROLES.ADMIN, ROLES.EDITOR), validateMiddleware(serviceSchema), serviceController.createService);
router.put('/:id', roleMiddleware(ROLES.ADMIN, ROLES.EDITOR), validateMiddleware(serviceSchema), serviceController.updateService);
router.delete('/:id', roleMiddleware(ROLES.ADMIN), serviceController.deleteService);

module.exports = router;
