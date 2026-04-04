// FILE: server/src/models/Client.js

const db = require('../config/database');

class Client {
    static async findAll(page = 1, limit = 10, search = '') {
        try {
            const offset = (page - 1) * limit;
            let query = 'SELECT * FROM clients';
            let params = [];

            if (search) {
                query += ' WHERE name LIKE ? OR email LIKE ? OR company LIKE ?';
                const searchTerm = `%${search}%`;
                params.push(searchTerm, searchTerm, searchTerm);
            }

            query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
            params.push(Number(limit), Number(offset));

            const [rows] = await db.query(query, params);
            
            const countQuery = search 
                ? 'SELECT COUNT(*) as total FROM clients WHERE name LIKE ? OR email LIKE ? OR company LIKE ?'
                : 'SELECT COUNT(*) as total FROM clients';
            
            const [[{ total }]] = await db.query(countQuery, search ? [`%${search}%`, `%${search}%`, `%${search}%`] : []);

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
            throw new Error(`Error fetching clients: ${error.message}`);
        }
    }

    static async findById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM clients WHERE id = ?', [id]);
            return rows[0] || null;
        } catch (error) {
            throw new Error(`Error finding client: ${error.message}`);
        }
    }

    static async create(clientData) {
        try {
            const { name, email, phone, company, address } = clientData;
            const [result] = await db.query(
                'INSERT INTO clients (name, email, phone, company, address) VALUES (?, ?, ?, ?, ?)',
                [name, email, phone, company, address]
            );
            return { id: result.insertId, ...clientData };
        } catch (error) {
            throw new Error(`Error creating client: ${error.message}`);
        }
    }

    static async update(id, clientData) {
        try {
            const { name, email, phone, company, address } = clientData;
            await db.query(
                'UPDATE clients SET name = ?, email = ?, phone = ?, company = ?, address = ? WHERE id = ?',
                [name, email, phone, company, address, id]
            );
            return { id, ...clientData };
        } catch (error) {
            throw new Error(`Error updating client: ${error.message}`);
        }
    }

    static async delete(id) {
        try {
            const [result] = await db.query('DELETE FROM clients WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error deleting client: ${error.message}`);
        }
    }
}

module.exports = Client;
