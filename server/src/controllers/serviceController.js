const serviceService = require('../services/serviceService');
const { responseHandler } = require('../utils/responseHandler');

const getAllServices = async (req, res, next) => {
  try {
    const services = await serviceService.getAllServices();
    responseHandler(res, 200, 'Services retrieved successfully', services);
  } catch (error) {
    next(error);
  }
};

const getServiceById = async (req, res, next) => {
  try {
    const service = await serviceService.getServiceById(req.params.id);
    responseHandler(res, 200, 'Service retrieved successfully', service);
  } catch (error) {
    next(error);
  }
};

const createService = async (req, res, next) => {
  try {
    const service = await serviceService.createService(req.body);
    responseHandler(res, 201, 'Service created successfully', service);
  } catch (error) {
    next(error);
  }
};

const updateService = async (req, res, next) => {
  try {
    const service = await serviceService.updateService(req.params.id, req.body);
    responseHandler(res, 200, 'Service updated successfully', service);
  } catch (error) {
    next(error);
  }
};

const deleteService = async (req, res, next) => {
  try {
    await serviceService.deleteService(req.params.id);
    responseHandler(res, 200, 'Service deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllServices, getServiceById, createService, updateService, deleteService };
