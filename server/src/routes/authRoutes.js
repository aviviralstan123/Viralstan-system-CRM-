const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateMiddleware } = require('../middleware/validateMiddleware');
const { loginSchema, registerSchema } = require('../validations/authValidation');

router.post('/register', validateMiddleware(registerSchema), authController.register);
router.post('/login', validateMiddleware(loginSchema), authController.login);

module.exports = router;
