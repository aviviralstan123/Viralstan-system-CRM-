// FILE: server/src/validations/authValidation.js

const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name must be at least 2 characters'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters'
    }),
    role: Joi.string().valid('admin', 'manager', 'editor', 'viewer').default('viewer')
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

module.exports = { registerSchema, loginSchema };
