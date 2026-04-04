const leadService = require('../services/leadService');
const { responseHandler } = require('../utils/responseHandler');

const getAllLeads = async (req, res, next) => {
  try {
    const leads = await leadService.getAllLeads();
    responseHandler(res, 200, 'Leads retrieved successfully', leads);
  } catch (error) {
    next(error);
  }
};

const getLeadById = async (req, res, next) => {
  try {
    const lead = await leadService.getLeadById(req.params.id);
    responseHandler(res, 200, 'Lead retrieved successfully', lead);
  } catch (error) {
    next(error);
  }
};

const createLead = async (req, res, next) => {
  try {
    const lead = await leadService.createLead(req.body);
    responseHandler(res, 201, 'Lead created successfully', lead);
  } catch (error) {
    next(error);
  }
};

const updateLead = async (req, res, next) => {
  try {
    const lead = await leadService.updateLead(req.params.id, req.body);
    responseHandler(res, 200, 'Lead updated successfully', lead);
  } catch (error) {
    next(error);
  }
};

const deleteLead = async (req, res, next) => {
  try {
    await leadService.deleteLead(req.params.id);
    responseHandler(res, 200, 'Lead deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllLeads, getLeadById, createLead, updateLead, deleteLead };
