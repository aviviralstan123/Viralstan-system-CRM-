const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const { validateMiddleware } = require('../middleware/validateMiddleware');
const { invoiceSchema } = require('../validations/invoiceValidation');
const { ROLES } = require('../utils/constants');

router.use(authMiddleware);

router.get('/', invoiceController.getAllInvoices);
router.get('/:id', invoiceController.getInvoiceById);
router.post('/', roleMiddleware(ROLES.ADMIN, ROLES.EDITOR), validateMiddleware(invoiceSchema), invoiceController.createInvoice);
router.put('/:id', roleMiddleware(ROLES.ADMIN, ROLES.EDITOR), validateMiddleware(invoiceSchema), invoiceController.updateInvoice);
router.delete('/:id', roleMiddleware(ROLES.ADMIN), invoiceController.deleteInvoice);

// PDF and Email routes
router.get('/:id/pdf', invoiceController.generateInvoicePDF);
router.post('/:id/send', roleMiddleware(ROLES.ADMIN, ROLES.EDITOR), invoiceController.sendInvoiceEmail);

module.exports = router;
