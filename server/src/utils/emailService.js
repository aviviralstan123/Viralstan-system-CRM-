const nodemailer = require('nodemailer');
const logger = require('./logger');

/**
 * Email service for sending system emails.
 */
class EmailService {
    constructor() {
        const port = parseInt(process.env.EMAIL_PORT) || 465;
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.gmail.com',
            port: port,
            secure: port === 465,
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
            throw new Error(`Email could not be sent: ${error.message}`);
        }
    }

    async sendPasswordResetEmail(email, name, resetLink) {
        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #4f46e5; text-align: center;">Password Reset Request</h2>
                <p>Hello <strong>${name}</strong>,</p>
                <p>You requested to reset your password for your Viralstan CRM account. Click the button below to set a new password. This link is valid for 1 hour.</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetLink}" style="background-color: #4f46e5; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
                </div>
                <p>If you did not request this, please ignore this email or contact support.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 12px; color: #777; text-align: center;">&copy; 2026 Viralstan CRM. All rights reserved.</p>
            </div>
        `;

        return this.sendEmail(email, 'Password Reset - Viralstan CRM', html);
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
