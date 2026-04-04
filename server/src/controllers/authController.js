const authService = require('../services/authService');
const { responseHandler } = require('../utils/responseHandler');

const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    responseHandler(res, 201, 'User registered successfully', user);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    responseHandler(res, 200, 'Login successful', result);
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
