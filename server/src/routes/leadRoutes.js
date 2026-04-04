const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const { validateMiddleware } = require('../middleware/validateMiddleware');
const { leadSchema } = require('../validations/leadValidation');
const { ROLES } = require('../utils/constants');

// Public route for lead generation (e.g., from website)
router.post('/public', validateMiddleware(leadSchema), leadController.createLead);

// Protected routes
router.use(authMiddleware);
router.get('/', leadController.getAllLeads);
router.get('/:id', leadController.getLeadById);
router.post('/', roleMiddleware(ROLES.ADMIN, ROLES.EDITOR), validateMiddleware(leadSchema), leadController.createLead);
router.put('/:id', roleMiddleware(ROLES.ADMIN, ROLES.EDITOR), validateMiddleware(leadSchema), leadController.updateLead);
router.delete('/:id', roleMiddleware(ROLES.ADMIN), leadController.deleteLead);

module.exports = router;
