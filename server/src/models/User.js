// FILE: server/src/models/User.js

const db = require('../config/database');

class User {
    /**
     * Find all users with pagination.
     */
    static async findAll(page = 1, limit = 10) {
        try {
            const offset = (page - 1) * limit;
            const [rows] = await db.query(
                'SELECT id, name, email, role, created_at, updated_at FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?',
                [Number(limit), Number(offset)]
            );
            
            const [[{ total }]] = await db.query('SELECT COUNT(*) as total FROM users');
            
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
            throw new Error(`Error fetching users: ${error.message}`);
        }
    }

    /**
     * Find user by ID.
     */
    static async findById(id) {
        try {
            const [rows] = await db.query(
                'SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = ?',
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            throw new Error(`Error finding user by ID: ${error.message}`);
        }
    }

    /**
     * Find user by Email (for Auth).
     */
    static async findByEmail(email) {
        try {
            const [rows] = await db.query(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );
            return rows[0] || null;
        } catch (error) {
            throw new Error(`Error finding user by email: ${error.message}`);
        }
    }

    /**
     * Create new user.
     */
    static async create(userData) {
        try {
            const { name, email, password, role } = userData;
            const [result] = await db.query(
                'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
                [name, email, password, role || 'viewer']
            );
            return { id: result.insertId, name, email, role };
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    /**
     * Update user details.
     */
    static async update(id, userData) {
        try {
            const { name, email, role } = userData;
            await db.query(
                'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?',
                [name, email, role, id]
            );
            return this.findById(id);
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    /**
     * Delete user.
     */
    static async delete(id) {
        try {
            const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }

    /**
     * Update Refresh Token.
     */
    static async updateRefreshToken(id, token) {
        try {
            await db.query('UPDATE users SET refresh_token = ? WHERE id = ?', [token, id]);
        } catch (error) {
            throw new Error(`Error updating refresh token: ${error.message}`);
        }
    }
}

module.exports = User;
