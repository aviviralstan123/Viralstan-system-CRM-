const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const { validateMiddleware } = require('../middleware/validateMiddleware');
const { clientSchema } = require('../validations/clientValidation');
const { ROLES } = require('../utils/constants');

router.use(authMiddleware);

router.get('/', clientController.getAllClients);
router.get('/:id', clientController.getClientById);
router.post('/', roleMiddleware(ROLES.ADMIN, ROLES.EDITOR), validateMiddleware(clientSchema), clientController.createClient);
router.put('/:id', roleMiddleware(ROLES.ADMIN, ROLES.EDITOR), validateMiddleware(clientSchema), clientController.updateClient);
router.delete('/:id', roleMiddleware(ROLES.ADMIN), clientController.deleteClient);

module.exports = router;
