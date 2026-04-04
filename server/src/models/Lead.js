// FILE: server/src/models/Lead.js

const db = require('../config/database');

class Lead {
    static async findAll(page = 1, limit = 10, status = '') {
        try {
            const offset = (page - 1) * limit;
            let query = 'SELECT * FROM leads';
            let params = [];

            if (status) {
                query += ' WHERE status = ?';
                params.push(status);
            }

            query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
            params.push(Number(limit), Number(offset));

            const [rows] = await db.query(query, params);
            
            const countQuery = status 
                ? 'SELECT COUNT(*) as total FROM leads WHERE status = ?'
                : 'SELECT COUNT(*) as total FROM leads';
            
            const [[{ total }]] = await db.query(countQuery, status ? [status] : []);

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
            throw new Error(`Error fetching leads: ${error.message}`);
        }
    }

    static async findById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM leads WHERE id = ?', [id]);
            return rows[0] || null;
        } catch (error) {
            throw new Error(`Error finding lead: ${error.message}`);
        }
    }

    static async create(leadData) {
        try {
            const { name, email, phone, service_interested, source, message } = leadData;
            const [result] = await db.query(
                'INSERT INTO leads (name, email, phone, service_interested, source, status) VALUES (?, ?, ?, ?, ?, ?)',
                [name, email, phone, service_interested, source || 'website', 'new']
            );
            return { id: result.insertId, ...leadData, status: 'new' };
        } catch (error) {
            throw new Error(`Error creating lead: ${error.message}`);
        }
    }

    static async update(id, leadData) {
        try {
            const { name, email, phone, service_interested, status, source } = leadData;
            await db.query(
                'UPDATE leads SET name = ?, email = ?, phone = ?, service_interested = ?, status = ?, source = ? WHERE id = ?',
                [name, email, phone, service_interested, status, source, id]
            );
            return { id, ...leadData };
        } catch (error) {
            throw new Error(`Error updating lead: ${error.message}`);
        }
    }

    static async delete(id) {
        try {
            const [result] = await db.query('DELETE FROM leads WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error deleting lead: ${error.message}`);
        }
    }
}

module.exports = Lead;
