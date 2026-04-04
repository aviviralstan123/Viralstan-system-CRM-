const pool = require('../config/database');

const getAllInvoices = async () => {
  const [rows] = await pool.query(
    'SELECT i.*, c.name as client_name FROM invoices i JOIN clients c ON i.client_id = c.id ORDER BY i.created_at DESC'
  );
  return rows;
};

const getInvoiceById = async (id) => {
  const [invoices] = await pool.query(
    'SELECT i.*, c.name as client_name, c.email as client_email FROM invoices i JOIN clients c ON i.client_id = c.id WHERE i.id = ?',
    [id]
  );
  
  if (invoices.length === 0) throw { statusCode: 404, message: 'Invoice not found' };
  
  const [items] = await pool.query('SELECT * FROM invoice_items WHERE invoice_id = ?', [id]);
  
  return { ...invoices[0], items };
};

const createInvoice = async (invoiceData) => {
  const { invoice_number, client_id, due_date, items } = invoiceData;
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    // Calculate total amount
    const total_amount = items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
    
    // Insert invoice
    const [invoiceResult] = await connection.query(
      'INSERT INTO invoices (invoice_number, client_id, total_amount, status, due_date) VALUES (?, ?, ?, ?, ?)',
      [invoice_number, client_id, total_amount, 'sent', due_date]
    );
    
    const invoice_id = invoiceResult.insertId;
    
    // Insert items
    for (const item of items) {
      const itemTotal = item.quantity * item.unit_price;
      await connection.query(
        'INSERT INTO invoice_items (invoice_id, description, quantity, unit_price, total) VALUES (?, ?, ?, ?, ?)',
        [invoice_id, item.description, item.quantity, item.unit_price, itemTotal]
      );
    }
    
    await connection.commit();
    return { id: invoice_id, ...invoiceData, total_amount };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const updateInvoiceStatus = async (id, status) => {
  const [result] = await pool.query('UPDATE invoices SET status = ? WHERE id = ?', [status, id]);
  if (result.affectedRows === 0) throw { statusCode: 404, message: 'Invoice not found' };
  return { id, status };
};

const deleteInvoice = async (id) => {
  const [result] = await pool.query('DELETE FROM invoices WHERE id = ?', [id]);
  if (result.affectedRows === 0) throw { statusCode: 404, message: 'Invoice not found' };
  return true;
};

module.exports = { getAllInvoices, getInvoiceById, createInvoice, updateInvoiceStatus, deleteInvoice };
