// server/src/validations/settingsValidation.js
const Joi = require('joi');

const updateSettingsSchema = Joi.object({
    siteName: Joi.string().max(255).allow('', null),
    logo: Joi.string().allow('', null),
    primaryColor: Joi.string().max(50).allow('', null),
    secondaryColor: Joi.string().max(50).allow('', null),
    metaTitle: Joi.string().max(255).allow('', null),
    metaDescription: Joi.string().allow('', null),
    currency: Joi.string().max(50).allow('', null),
    timezone: Joi.string().max(100).allow('', null),
    email: Joi.string().email().max(255).allow('', null)
});

module.exports = {
    updateSettingsSchema
};
