const userService = require('../services/userService');
const { responseHandler } = require('../utils/responseHandler');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    responseHandler(res, 200, 'Users retrieved successfully', users);
  } catch (error) {
    next(error);
  }
};

const updateUserRole = async (req, res, next) => {
  try {
    const user = await userService.updateUserRole(req.params.id, req.body.role);
    responseHandler(res, 200, 'User role updated successfully', user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id);
    responseHandler(res, 200, 'User deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, updateUserRole, deleteUser };
