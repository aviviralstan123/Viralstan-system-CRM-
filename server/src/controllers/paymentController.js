const paymentService = require('../services/paymentService');
const { responseHandler } = require('../utils/responseHandler');

const getAllPayments = async (req, res, next) => {
  try {
    const payments = await paymentService.getAllPayments();
    responseHandler(res, 200, 'Payments retrieved successfully', payments);
  } catch (error) {
    next(error);
  }
};

const createPayment = async (req, res, next) => {
  try {
    const payment = await paymentService.createPayment(req.body);
    responseHandler(res, 201, 'Payment recorded successfully', payment);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllPayments, createPayment };
