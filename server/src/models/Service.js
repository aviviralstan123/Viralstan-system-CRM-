// FILE: server/src/models/Service.js

const db = require('../config/database');

class Service {
    static async findAll(page = 1, limit = 10, category = '', activeOnly = false) {
        try {
            const offset = (page - 1) * limit;
            let query = 'SELECT * FROM services WHERE 1=1';
            let params = [];

            if (category) {
                query += ' AND category = ?';
                params.push(category);
            }

            if (activeOnly) {
                query += ' AND is_active = TRUE';
            }

            query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
            params.push(Number(limit), Number(offset));

            const [rows] = await db.query(query, params);
            
            let countQuery = 'SELECT COUNT(*) as total FROM services WHERE 1=1';
            if (category) countQuery += ' AND category = ?';
            if (activeOnly) countQuery += ' AND is_active = TRUE';
            
            const [[{ total }]] = await db.query(countQuery, category ? [category] : []);

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
            throw new Error(`Error fetching services: ${error.message}`);
        }
    }

    static async findById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM services WHERE id = ?', [id]);
            return rows[0] || null;
        } catch (error) {
            throw new Error(`Error finding service: ${error.message}`);
        }
    }

    static async create(serviceData) {
        try {
            const { title, description, price, category, image_url, is_active } = serviceData;
            const [result] = await db.query(
                'INSERT INTO services (title, description, price, category, image_url, is_active) VALUES (?, ?, ?, ?, ?, ?)',
                [title, description, price, category, image_url, is_active !== undefined ? is_active : true]
            );
            return { id: result.insertId, ...serviceData };
        } catch (error) {
            throw new Error(`Error creating service: ${error.message}`);
        }
    }

    static async update(id, serviceData) {
        try {
            const { title, description, price, category, image_url, is_active } = serviceData;
            await db.query(
                'UPDATE services SET title = ?, description = ?, price = ?, category = ?, image_url = ?, is_active = ? WHERE id = ?',
                [title, description, price, category, image_url, is_active, id]
            );
            return { id, ...serviceData };
        } catch (error) {
            throw new Error(`Error updating service: ${error.message}`);
        }
    }

    static async delete(id) {
        try {
            const [result] = await db.query('DELETE FROM services WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error deleting service: ${error.message}`);
        }
    }
}

module.exports = Service;
