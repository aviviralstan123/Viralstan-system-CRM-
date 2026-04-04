const Joi = require('joi');

const roleUpdateSchema = Joi.object({
  role: Joi.string().valid('admin', 'editor', 'viewer').required()
});

module.exports = { roleUpdateSchema };
