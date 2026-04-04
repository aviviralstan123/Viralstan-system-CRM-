const Joi = require('joi');

const blogSchema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    slug: Joi.string().min(5).max(255).required(),
    content: Joi.string().min(10).allow('', null).optional(),
    description: Joi.string().min(10).allow('', null).optional(), // Mapping for frontend
    excerpt: Joi.string().max(500).allow('', null),
    category: Joi.string().max(100).allow('', null),
    status: Joi.string().valid('draft', 'published', 'archived').default('draft'),
    featured_image: Joi.string().allow('', null),
    coverImage: Joi.string().allow('', null), // Mapping for frontend
    metaTitle: Joi.string().allow('', null),
    metaDescription: Joi.string().allow('', null),
    wordCount: Joi.number().integer().allow(null)
}).unknown(true); // Allow other fields like author or wordCount

module.exports = { blogSchema };
