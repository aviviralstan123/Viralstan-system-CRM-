const pool = require('../config/database');

const getAllPayments = async () => {
  const [rows] = await pool.query(
    'SELECT p.*, i.invoice_number, c.name as client_name FROM payments p JOIN invoices i ON p.invoice_id = i.id JOIN clients c ON i.client_id = c.id ORDER BY p.payment_date DESC'
  );
  return rows;
};

const createPayment = async (paymentData) => {
  const { invoice_id, amount, payment_method, transaction_id } = paymentData;
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    // Insert payment
    const [result] = await connection.query(
      'INSERT INTO payments (invoice_id, amount, payment_method, transaction_id) VALUES (?, ?, ?, ?)',
      [invoice_id, amount, payment_method, transaction_id]
    );
    
    // Update invoice status to paid (assuming full payment for simplicity)
    await connection.query('UPDATE invoices SET status = ? WHERE id = ?', ['paid', invoice_id]);
    
    await connection.commit();
    return { id: result.insertId, ...paymentData };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

module.exports = { getAllPayments, createPayment };
