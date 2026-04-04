const Joi = require('joi');

const serviceSchema = Joi.object({
    title: Joi.string().min(3).max(255).optional(),
    name: Joi.string().min(3).max(255).optional(), // mapping for frontend
    description: Joi.string().max(2000).allow('', null),
    price: Joi.number().precision(2).required(),
    category: Joi.string().max(100).allow('', null),
    image_url: Joi.string().allow('', null),
    is_active: Joi.boolean().default(true),
    status: Joi.string().allow('', null)
}).or('title', 'name').unknown(true);

module.exports = { serviceSchema };
