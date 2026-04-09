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
            port: parseInt(process.env.EMAIL_PORT) || 587,
            secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    async verifyConnection() {
        try {
            await this.transporter.verify();
            logger.info('Email server connection verified');
            return true;
        } catch (error) {
            logger.error(`Email connection failed: ${error.message}`);
            return false;
        }
    }

    async sendEmail(to, subject, html, attachments = []) {
        try {
            const mailOptions = {
                from: `"Viralstan CRM" <${process.env.EMAIL_USER}>`,
                to,
                subject,
                html,
                attachments
            };

            logger.info(`Sending email to ${to}...`);
            const info = await this.transporter.sendMail(mailOptions);
            logger.info(`Email sent successfully: ${info.messageId}`);
            return info;
        } catch (error) {
            logger.error(`Email sending failed for ${to}: ${error.message}`);
            console.error('Nodemailer Error:', error);
            throw new Error(`Email could not be sent: ${error.message}`);
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

    async sendPasswordResetEmail(userEmail, userName, resetLink) {
        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 10px;">
                <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
                <p>Hello ${userName},</p>
                <p>You requested to reset your password for your Viralstan CRM account. Click the button below to set a new password:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetLink}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
                </div>
                <p>If you didn't request this, you can safely ignore this email. This link will expire in 1 hour.</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 12px; color: #888; text-align: center;">© 2026 Viralstan. All rights reserved.</p>
            </div>
        `;
        return this.sendEmail(userEmail, 'Password Reset Request - Viralstan', html);
    }
}

module.exports = new EmailService();
