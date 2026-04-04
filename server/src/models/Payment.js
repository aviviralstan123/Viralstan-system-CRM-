// FILE: server/src/models/Payment.js

const db = require('../config/database');

class Payment {
    static async findAll(page = 1, limit = 10, invoiceId = '') {
        try {
            const offset = (page - 1) * limit;
            let query = 'SELECT p.*, i.invoice_number FROM payments p JOIN invoices i ON p.invoice_id = i.id WHERE 1=1';
            let params = [];

            if (invoiceId) {
                query += ' AND p.invoice_id = ?';
                params.push(invoiceId);
            }

            query += ' ORDER BY p.payment_date DESC LIMIT ? OFFSET ?';
            params.push(Number(limit), Number(offset));

            const [rows] = await db.query(query, params);
            
            const [[{ total }]] = await db.query('SELECT COUNT(*) as total FROM payments');

            return {
                data: rows,
                pagination: {
                    total,
                    page: Number(page),
                    limit: Number(limit),
                    totalPages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            throw new Error(`Error fetching payments: ${error.message}`);
        }
    }

    static async findById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM payments WHERE id = ?', [id]);
            return rows[0] || null;
        } catch (error) {
            throw new Error(`Error finding payment: ${error.message}`);
        }
    }

    static async create(paymentData) {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
            const { invoice_id, amount, payment_date, payment_method, transaction_id, status, notes } = paymentData;
            
            const [result] = await connection.query(
                'INSERT INTO payments (invoice_id, amount, payment_date, payment_method, transaction_id, status, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [invoice_id, amount, payment_date || new Date(), payment_method, transaction_id, status || 'completed', notes]
            );

            // Update invoice status if fully paid
            // Logic can be more complex (partial payments), but for now:
            await connection.query('UPDATE invoices SET status = "paid" WHERE id = ?', [invoice_id]);
            
            await connection.commit();
            return { id: result.insertId, ...paymentData };
        } catch (error) {
            await connection.rollback();
            throw new Error(`Error creating payment: ${error.message}`);
        } finally {
            connection.release();
        }
    }

    static async delete(id) {
        try {
            const [result] = await db.query('DELETE FROM payments WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error deleting payment: ${error.message}`);
        }
    }
}

module.exports = Payment;
