// FILE: server/src/models/InvoiceItem.js

const db = require('../config/database');

class InvoiceItem {
    static async findByInvoiceId(invoiceId) {
        try {
            const [rows] = await db.query('SELECT * FROM invoice_items WHERE invoice_id = ?', [invoiceId]);
            return rows;
        } catch (error) {
            throw new Error(`Error fetching invoice items: ${error.message}`);
        }
    }

    static async create(itemData) {
        try {
            const { invoice_id, description, quantity, unit_price, total_price } = itemData;
            const [result] = await db.query(
                'INSERT INTO invoice_items (invoice_id, description, quantity, unit_price, total_price) VALUES (?, ?, ?, ?, ?)',
                [invoice_id, description, quantity, unit_price, total_price]
            );
            return { id: result.insertId, ...itemData };
        } catch (error) {
            throw new Error(`Error creating invoice item: ${error.message}`);
        }
    }

    static async createMany(invoiceId, items) {
        try {
            const values = items.map(item => [
                invoiceId,
                item.description,
                item.quantity,
                item.unit_price,
                item.total_price
            ]);
            
            const [result] = await db.query(
                'INSERT INTO invoice_items (invoice_id, description, quantity, unit_price, total_price) VALUES ?',
                [values]
            );
            return result.affectedRows;
        } catch (error) {
            throw new Error(`Error creating multiple invoice items: ${error.message}`);
        }
    }

    static async deleteByInvoiceId(invoiceId) {
        try {
            await db.query('DELETE FROM invoice_items WHERE invoice_id = ?', [invoiceId]);
            return true;
        } catch (error) {
            throw new Error(`Error deleting invoice items: ${error.message}`);
        }
    }
}

module.exports = InvoiceItem;
