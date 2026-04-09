// FILE: server/src/utils/emailService.js

const nodemailer = require('nodemailer');
const logger = require('./logger');

/**
 * Email service for sending system emails.
 */
class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.gmail.com',
            port: process.env.EMAIL_PORT || 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    async sendEmail(to, subject, html, attachments = []) {
        try {
            const mailOptions = {
                from: `"Viralstan CMS" <${process.env.EMAIL_USER}>`,
                to,
                subject,
                html,
                attachments
            };

            const info = await this.transporter.sendMail(mailOptions);
            logger.info(`Email sent: ${info.messageId}`);
            return info;
        } catch (error) {
            logger.error(`Email sending failed: ${error.message}`);
            throw new Error('Email could not be sent');
        }
    }

    async sendInvoiceEmail(clientEmail, invoice, pdfPath) {
        const html = `
            <h1>Invoice from Viralstan</h1>
            <p>Dear Customer,</p>
            <p>Please find attached your invoice <b>${invoice.invoice_number}</b>.</p>
            <p>Total Amount: <b>$${invoice.total_amount}</b></p>
            <p>Due Date: <b>${new Date(invoice.due_date).toLocaleDateString()}</b></p>
            <p>Thank you for your business!</p>
        `;

        return this.sendEmail(
            clientEmail,
            `Invoice ${invoice.invoice_number} - Viralstan`,
            html,
            [{ filename: `Invoice_${invoice.invoice_number}.pdf`, path: pdfPath }]
        );
    }

    async sendWelcomeEmail(userEmail, userName) {
        const html = `<h1>Welcome to Viralstan, ${userName}!</h1><p>Your account has been created successfully.</p>`;
        return this.sendEmail(userEmail, 'Welcome to Viralstan CRM', html);
    }
}

module.exports = new EmailService();
