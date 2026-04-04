// FILE: server/src/validations/invoiceValidation.js

const Joi = require('joi');

const itemSchema = Joi.object({
    description: Joi.string().required(),
    quantity: Joi.number().integer().min(1).required(),
    unit_price: Joi.number().precision(2).min(0).required(),
    total_price: Joi.number().precision(2).min(0).required()
});

const invoiceSchema = Joi.object({
    client_id: Joi.number().integer().required(),
    invoice_number: Joi.string().required(),
    issue_date: Joi.date().required(),
    due_date: Joi.date().greater(Joi.ref('issue_date')).required(),
    subtotal: Joi.number().precision(2).min(0).required(),
    tax: Joi.number().precision(2).min(0).default(0),
    discount: Joi.number().precision(2).min(0).default(0),
    total_amount: Joi.number().precision(2).min(0).required(),
    status: Joi.string().valid('draft', 'sent', 'paid', 'partially_paid', 'overdue', 'cancelled').default('draft'),
    notes: Joi.string().max(1000).allow('', null),
    items: Joi.array().items(itemSchema).min(1).required()
});

module.exports = { invoiceSchema };
