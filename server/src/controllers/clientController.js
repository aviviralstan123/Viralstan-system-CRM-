const clientService = require('../services/clientService');
const { responseHandler } = require('../utils/responseHandler');

const getAllClients = async (req, res, next) => {
  try {
    const clients = await clientService.getAllClients();
    responseHandler(res, 200, 'Clients retrieved successfully', clients);
  } catch (error) {
    next(error);
  }
};

const getClientById = async (req, res, next) => {
  try {
    const client = await clientService.getClientById(req.params.id);
    responseHandler(res, 200, 'Client retrieved successfully', client);
  } catch (error) {
    next(error);
  }
};

const createClient = async (req, res, next) => {
  try {
    const client = await clientService.createClient(req.body);
    responseHandler(res, 201, 'Client created successfully', client);
  } catch (error) {
    next(error);
  }
};

const updateClient = async (req, res, next) => {
  try {
    const client = await clientService.updateClient(req.params.id, req.body);
    responseHandler(res, 200, 'Client updated successfully', client);
  } catch (error) {
    next(error);
  }
};

const deleteClient = async (req, res, next) => {
  try {
    await clientService.deleteClient(req.params.id);
    responseHandler(res, 200, 'Client deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllClients, getClientById, createClient, updateClient, deleteClient };
