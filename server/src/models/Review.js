// FILE: server/src/models/Review.js

const db = require('../config/database');

class Review {
    static async findAll(page = 1, limit = 10, status = '') {
        try {
            const offset = (page - 1) * limit;
            let query = 'SELECT r.*, c.name as client_name, s.title as service_title FROM reviews r LEFT JOIN clients c ON r.client_id = c.id LEFT JOIN services s ON r.service_id = s.id WHERE 1=1';
            let params = [];

            if (status) {
                query += ' AND r.status = ?';
                params.push(status);
            }

            query += ' ORDER BY r.created_at DESC LIMIT ? OFFSET ?';
            params.push(Number(limit), Number(offset));

            const [rows] = await db.query(query, params);
            
            const [[{ total }]] = await db.query('SELECT COUNT(*) as total FROM reviews');

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
            throw new Error(`Error fetching reviews: ${error.message}`);
        }
    }

    static async findById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM reviews WHERE id = ?', [id]);
            return rows[0] || null;
        } catch (error) {
            throw new Error(`Error finding review: ${error.message}`);
        }
    }

    static async create(reviewData) {
        try {
            const { client_id, service_id, rating, review_text } = reviewData;
            const [result] = await db.query(
                'INSERT INTO reviews (client_id, service_id, rating, review_text, status) VALUES (?, ?, ?, ?, ?)',
                [client_id, service_id, rating, review_text, 'pending']
            );
            return { id: result.insertId, ...reviewData, status: 'pending' };
        } catch (error) {
            throw new Error(`Error creating review: ${error.message}`);
        }
    }

    static async updateStatus(id, status) {
        try {
            await db.query('UPDATE reviews SET status = ? WHERE id = ?', [status, id]);
            return true;
        } catch (error) {
            throw new Error(`Error updating review status: ${error.message}`);
        }
    }

    static async delete(id) {
        try {
            const [result] = await db.query('DELETE FROM reviews WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error deleting review: ${error.message}`);
        }
    }
}

module.exports = Review;
