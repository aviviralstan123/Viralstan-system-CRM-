// FILE: server/src/validations/clientValidation.js

const Joi = require('joi');

const clientSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9+\-\s()]*$/).allow('', null),
    company: Joi.string().max(100).allow('', null),
    address: Joi.string().max(500).allow('', null)
});

module.exports = { clientSchema };
