// FILE: server/src/validations/paymentValidation.js

const Joi = require('joi');

const paymentSchema = Joi.object({
    invoice_id: Joi.number().integer().required(),
    amount: Joi.number().precision(2).positive().required(),
    payment_date: Joi.date().default(Date.now),
    payment_method: Joi.string().valid('cash', 'bank_transfer', 'online', 'cheque').required(),
    transaction_id: Joi.string().max(100).allow('', null),
    status: Joi.string().valid('pending', 'completed', 'failed', 'refunded').default('completed'),
    notes: Joi.string().max(500).allow('', null)
});

module.exports = { paymentSchema };
