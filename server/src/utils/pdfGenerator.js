// FILE: server/src/utils/pdfGenerator.js

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

class PDFGenerator {
    static async generateInvoicePDF(invoiceData) {
        return new Promise((resolve, reject) => {
            try {
                const uploadsDir = path.join(__dirname, '../../uploads/invoices');
                if (!fs.existsSync(uploadsDir)) {
                    fs.mkdirSync(uploadsDir, { recursive: true });
                }

                const fileName = `invoice_${invoiceData.invoice_number}.pdf`;
                const filePath = path.join(uploadsDir, fileName);
                const doc = new PDFDocument({ margin: 50 });

                doc.pipe(fs.createWriteStream(filePath));

                // Header
                doc.fontSize(25).text('VIRALSTAN CRM', { align: 'center' });
                doc.fontSize(10).text('Digital Marketing Agency', { align: 'center' });
                doc.moveDown();

                // Invoice Info
                doc.fontSize(20).text('INVOICE', { underline: true });
                doc.fontSize(12).text(`Invoice Number: ${invoiceData.invoice_number}`);
                doc.text(`Date: ${new Date(invoiceData.issue_date).toLocaleDateString()}`);
                doc.text(`Due Date: ${new Date(invoiceData.due_date).toLocaleDateString()}`);
                doc.moveDown();

                // Client Info
                doc.text('Bill To:', { bold: true });
                doc.text(invoiceData.client_name);
                doc.text(invoiceData.client_email);
                if (invoiceData.client_company) doc.text(invoiceData.client_company);
                doc.moveDown();

                // Items Table Header
                doc.fontSize(12).text('Description', 50, 300);
                doc.text('Qty', 300, 300);
                doc.text('Price', 350, 300);
                doc.text('Total', 450, 300);
                doc.moveTo(50, 315).lineTo(550, 315).stroke();

                // Items
                let y = 330;
                invoiceData.items.forEach(item => {
                    doc.text(item.description, 50, y);
                    doc.text(item.quantity.toString(), 300, y);
                    doc.text(`$${item.unit_price}`, 350, y);
                    doc.text(`$${item.total_price}`, 450, y);
                    y += 20;
                });

                // Totals
                doc.moveTo(50, y).lineTo(550, y).stroke();
                y += 20;
                doc.text('Subtotal:', 350, y);
                doc.text(`$${invoiceData.subtotal}`, 450, y);
                y += 20;
                doc.text('Tax:', 350, y);
                doc.text(`$${invoiceData.tax}`, 450, y);
                y += 20;
                doc.text('Discount:', 350, y);
                doc.text(`$${invoiceData.discount}`, 450, y);
                y += 20;
                doc.fontSize(14).text('TOTAL AMOUNT:', 350, y, { bold: true });
                doc.text(`$${invoiceData.total_amount}`, 450, y);

                doc.end();
                resolve(filePath);
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = PDFGenerator;
