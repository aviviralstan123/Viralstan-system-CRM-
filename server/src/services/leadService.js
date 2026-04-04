const pool = require('../config/database');

const getAllLeads = async () => {
  const [rows] = await pool.query('SELECT * FROM leads ORDER BY created_at DESC');
  return rows;
};

const getLeadById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM leads WHERE id = ?', [id]);
  if (rows.length === 0) throw { statusCode: 404, message: 'Lead not found' };
  return rows[0];
};

const createLead = async (leadData) => {
  const { name, email, phone, company, source, status, value, message } = leadData;
  const [result] = await pool.query(
    'INSERT INTO leads (name, email, phone, company, source, status, value, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [name, email, phone, company, source, status || 'new', value || 0, message]
  );
  return { id: result.insertId, ...leadData };
};

const updateLead = async (id, leadData) => {
  const { name, email, phone, company, source, status, value, message } = leadData;
  await pool.query(
    'UPDATE leads SET name = ?, email = ?, phone = ?, company = ?, source = ?, status = ?, value = ?, message = ? WHERE id = ?',
    [name, email, phone, company, source, status, value, message, id]
  );
  return { id, ...leadData };
};

const deleteLead = async (id) => {
  const [result] = await pool.query('DELETE FROM leads WHERE id = ?', [id]);
  if (result.affectedRows === 0) throw { statusCode: 404, message: 'Lead not found' };
  return true;
};

module.exports = { getAllLeads, getLeadById, createLead, updateLead, deleteLead };
