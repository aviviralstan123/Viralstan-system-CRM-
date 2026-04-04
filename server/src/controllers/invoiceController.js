// FILE: server/src/controllers/invoiceController.js

const Invoice = require('../models/Invoice');
const InvoiceItem = require('../models/InvoiceItem');
const { responseHandler } = require('../utils/responseHandler');
const pdfGenerator = require('../utils/pdfGenerator');
const emailService = require('../utils/emailService');

const createInvoice = async (req, res, next) => {
    try {
        const { items, ...invoiceData } = req.body;
        
        // Create invoice (returns ID)
        const invoiceId = await Invoice.create(invoiceData);
        
        // Create invoice items
        if (items && items.length > 0) {
            await InvoiceItem.createMany(invoiceId, items);
        }
        
        const fullInvoice = await Invoice.findById(invoiceId);
        const invoiceItems = await InvoiceItem.findByInvoiceId(invoiceId);
        
        responseHandler(res, 201, 'Invoice created successfully', {
            ...fullInvoice,
            items: invoiceItems
        });
    } catch (error) {
        next(error);
    }
};

const getAllInvoices = async (req, res, next) => {
    try {
        const { page, limit, clientId, status } = req.query;
        const result = await Invoice.findAll(page, limit, clientId, status);
        responseHandler(res, 200, 'Invoices fetched successfully', result);
    } catch (error) {
        next(error);
    }
};

const getInvoiceById = async (req, res, next) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) return responseHandler(res, 404, 'Invoice not found');
        
        const items = await InvoiceItem.findByInvoiceId(req.params.id);
        responseHandler(res, 200, 'Invoice details fetched', { ...invoice, items });
    } catch (error) {
        next(error);
    }
};

const updateInvoice = async (req, res, next) => {
    try {
        const { items, ...invoiceData } = req.body;
        const id = req.params.id;
        
        await Invoice.update(id, invoiceData);
        
        if (items) {
            // Simplest approach: Delete old items and insert new ones
            await InvoiceItem.deleteByInvoiceId(id);
            await InvoiceItem.createMany(id, items);
        }
        
        const updatedInvoice = await Invoice.findById(id);
        const updatedItems = await InvoiceItem.findByInvoiceId(id);
        
        responseHandler(res, 200, 'Invoice updated successfully', {
            ...updatedInvoice,
            items: updatedItems
        });
    } catch (error) {
        next(error);
    }
};

const deleteInvoice = async (req, res, next) => {
    try {
        const success = await Invoice.delete(req.params.id);
        if (!success) return responseHandler(res, 404, 'Invoice not found');
        responseHandler(res, 200, 'Invoice deleted successfully');
    } catch (error) {
        next(error);
    }
};

const generateInvoicePDF = async (req, res, next) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) return responseHandler(res, 404, 'Invoice not found');
        
        const items = await InvoiceItem.findByInvoiceId(req.params.id);
        const filePath = await pdfGenerator.generateInvoicePDF({ ...invoice, items });
        
        responseHandler(res, 200, 'PDF generated successfully', { downloadUrl: filePath });
    } catch (error) {
        next(error);
    }
};

const sendInvoiceEmail = async (req, res, next) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) return responseHandler(res, 404, 'Invoice not found');
        
        const items = await InvoiceItem.findByInvoiceId(req.params.id);
        const pdfPath = await pdfGenerator.generateInvoicePDF({ ...invoice, items });
        
        await emailService.sendInvoiceEmail(invoice.client_email, { ...invoice, items }, pdfPath);
        
        responseHandler(res, 200, 'Invoice sent via email successfully');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
    generateInvoicePDF,
    sendInvoiceEmail
};
