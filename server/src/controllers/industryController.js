const industryService = require('../services/industryService');
const { responseHandler } = require('../utils/responseHandler');

const getAllIndustries = async (req, res, next) => {
  try {
    const industries = await industryService.getAllIndustries();
    responseHandler(res, 200, 'Industries retrieved successfully', industries);
  } catch (error) {
    next(error);
  }
};

const getIndustryBySlug = async (req, res, next) => {
  try {
    const industry = await industryService.getIndustryBySlug(req.params.slug);
    responseHandler(res, 200, 'Industry retrieved successfully', industry);
  } catch (error) {
    next(error);
  }
};

const createIndustry = async (req, res, next) => {
  try {
    const industry = await industryService.createIndustry(req.body);
    responseHandler(res, 201, 'Industry created successfully', industry);
  } catch (error) {
    next(error);
  }
};

const updateIndustry = async (req, res, next) => {
  try {
    const industry = await industryService.updateIndustry(req.params.id, req.body);
    responseHandler(res, 200, 'Industry updated successfully', industry);
  } catch (error) {
    next(error);
  }
};

const deleteIndustry = async (req, res, next) => {
  try {
    await industryService.deleteIndustry(req.params.id);
    responseHandler(res, 200, 'Industry deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllIndustries, getIndustryBySlug, createIndustry, updateIndustry, deleteIndustry };
