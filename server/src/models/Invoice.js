// FILE: server/src/models/Invoice.js

const db = require('../config/database');

class Invoice {
    static async findAll(page = 1, limit = 10, clientId = '', status = '') {
        try {
            const offset = (page - 1) * limit;
            let query = 'SELECT i.*, c.name as client_name, c.company as client_company FROM invoices i JOIN clients c ON i.client_id = c.id WHERE 1=1';
            let params = [];

            if (clientId) {
                query += ' AND i.client_id = ?';
                params.push(clientId);
            }

            if (status) {
                query += ' AND i.status = ?';
                params.push(status);
            }

            query += ' ORDER BY i.created_at DESC LIMIT ? OFFSET ?';
            params.push(Number(limit), Number(offset));

            const [rows] = await db.query(query, params);
            
            let countQuery = 'SELECT COUNT(*) as total FROM invoices WHERE 1=1';
            if (clientId) countQuery += ' AND client_id = ?';
            if (status) countQuery += ' AND status = ?';
            
            const [[{ total }]] = await db.query(countQuery, params.slice(0, params.length - 2));

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
            throw new Error(`Error fetching invoices: ${error.message}`);
        }
    }

    static async findById(id) {
        try {
            const [rows] = await db.query(
                'SELECT i.*, c.name as client_name, c.email as client_email, c.address as client_address, c.company as client_company FROM invoices i JOIN clients c ON i.client_id = c.id WHERE i.id = ?',
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            throw new Error(`Error finding invoice: ${error.message}`);
        }
    }

    static async create(invoiceData) {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
            const { client_id, invoice_number, issue_date, due_date, subtotal, tax, discount, total_amount, status, notes } = invoiceData;
            
            const [result] = await connection.query(
                'INSERT INTO invoices (client_id, invoice_number, issue_date, due_date, subtotal, tax, discount, total_amount, status, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [client_id, invoice_number, issue_date, due_date, subtotal, tax, discount, total_amount, status || 'draft', notes]
            );
            
            await connection.commit();
            return result.insertId;
        } catch (error) {
            await connection.rollback();
            throw new Error(`Error creating invoice: ${error.message}`);
        } finally {
            connection.release();
        }
    }

    static async update(id, invoiceData) {
        try {
            const { issue_date, due_date, subtotal, tax, discount, total_amount, status, notes } = invoiceData;
            await db.query(
                'UPDATE invoices SET issue_date = ?, due_date = ?, subtotal = ?, tax = ?, discount = ?, total_amount = ?, status = ?, notes = ? WHERE id = ?',
                [issue_date, due_date, subtotal, tax, discount, total_amount, status, notes, id]
            );
            return this.findById(id);
        } catch (error) {
            throw new Error(`Error updating invoice: ${error.message}`);
        }
    }

    static async updateStatus(id, status) {
        try {
            await db.query('UPDATE invoices SET status = ? WHERE id = ?', [status, id]);
            return true;
        } catch (error) {
            throw new Error(`Error updating invoice status: ${error.message}`);
        }
    }

    static async delete(id) {
        try {
            const [result] = await db.query('DELETE FROM invoices WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error deleting invoice: ${error.message}`);
        }
    }
}

module.exports = Invoice;
