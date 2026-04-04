// FILE: server/src/models/Blog.js

const db = require('../config/database');

class Blog {
    static async findAll(page = 1, limit = 10, status = '', category = '') {
        try {
            const offset = (page - 1) * limit;
            let query = 'SELECT b.*, u.name as author_name FROM blogs b LEFT JOIN users u ON b.author_id = u.id WHERE 1=1';
            let params = [];

            if (status) {
                query += ' AND b.status = ?';
                params.push(status);
            }

            if (category) {
                query += ' AND b.category = ?';
                params.push(category);
            }

            query += ' ORDER BY b.created_at DESC LIMIT ? OFFSET ?';
            params.push(Number(limit), Number(offset));

            const [rows] = await db.query(query, params);
            
            let countQuery = 'SELECT COUNT(*) as total FROM blogs WHERE 1=1';
            if (status) countQuery += ' AND status = ?';
            if (category) countQuery += ' AND category = ?';
            
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
            throw new Error(`Error fetching blogs: ${error.message}`);
        }
    }

    static async findBySlug(slug) {
        try {
            const [rows] = await db.query(
                'SELECT b.*, u.name as author_name FROM blogs b LEFT JOIN users u ON b.author_id = u.id WHERE b.slug = ?',
                [slug]
            );
            return rows[0] || null;
        } catch (error) {
            throw new Error(`Error finding blog by slug: ${error.message}`);
        }
    }

    static async findById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM blogs WHERE id = ?', [id]);
            return rows[0] || null;
        } catch (error) {
            throw new Error(`Error finding blog by ID: ${error.message}`);
        }
    }

    static async create(blogData) {
        try {
            const { title, slug, content, excerpt, author_id, featured_image, category, status } = blogData;
            const published_at = status === 'published' ? new Date() : null;
            const [result] = await db.query(
                'INSERT INTO blogs (title, slug, content, excerpt, author_id, featured_image, category, status, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [title, slug, content, excerpt, author_id, featured_image, category, status || 'draft', published_at]
            );
            return { id: result.insertId, ...blogData, published_at };
        } catch (error) {
            throw new Error(`Error creating blog: ${error.message}`);
        }
    }

    static async update(id, blogData) {
        try {
            const { title, slug, content, excerpt, featured_image, category, status } = blogData;
            let query = 'UPDATE blogs SET title = ?, slug = ?, content = ?, excerpt = ?, featured_image = ?, category = ?, status = ?';
            let params = [title, slug, content, excerpt, featured_image, category, status];

            if (status === 'published') {
                query += ', published_at = COALESCE(published_at, CURRENT_TIMESTAMP)';
            }

            query += ' WHERE id = ?';
            params.push(id);

            await db.query(query, params);
            return this.findById(id);
        } catch (error) {
            throw new Error(`Error updating blog: ${error.message}`);
        }
    }

    static async delete(id) {
        try {
            const [result] = await db.query('DELETE FROM blogs WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error deleting blog: ${error.message}`);
        }
    }
}

module.exports = Blog;
