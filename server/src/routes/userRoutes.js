const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const { validateMiddleware } = require('../middleware/validateMiddleware');
const { roleUpdateSchema } = require('../validations/userValidation');
const { ROLES } = require('../utils/constants');

router.use(authMiddleware);
router.use(roleMiddleware(ROLES.ADMIN)); // Only admin can manage users

router.get('/', userController.getAllUsers);
router.patch('/:id/role', validateMiddleware(roleUpdateSchema), userController.updateUserRole);
router.delete('/:id', userController.deleteUser);

module.exports = router;
