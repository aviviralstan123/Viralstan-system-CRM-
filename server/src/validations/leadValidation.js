// FILE: server/src/validations/leadValidation.js

const Joi = require('joi');

const leadSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9+\-\s()]*$/).allow('', null),
    service_interested: Joi.string().max(255).allow('', null),
    source: Joi.string().max(100).allow('', null),
    status: Joi.string().valid('new', 'contacted', 'qualified', 'converted', 'lost').default('new'),
    message: Joi.string().max(1000).allow('', null)
});

module.exports = { leadSchema };
