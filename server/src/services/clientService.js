const pool = require('../config/database');

const getAllClients = async () => {
  const [rows] = await pool.query('SELECT * FROM clients ORDER BY created_at DESC');
  return rows;
};

const getClientById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM clients WHERE id = ?', [id]);
  if (rows.length === 0) throw { statusCode: 404, message: 'Client not found' };
  return rows[0];
};

const createClient = async (clientData) => {
  const { name, email, phone, company, address, status } = clientData;
  const [result] = await pool.query(
    'INSERT INTO clients (name, email, phone, company, address, status) VALUES (?, ?, ?, ?, ?, ?)',
    [name, email, phone, company, address, status || 'active']
  );
  return { id: result.insertId, ...clientData };
};

const updateClient = async (id, clientData) => {
  const { name, email, phone, company, address, status } = clientData;
  await pool.query(
    'UPDATE clients SET name = ?, email = ?, phone = ?, company = ?, address = ?, status = ? WHERE id = ?',
    [name, email, phone, company, address, status, id]
  );
  return { id, ...clientData };
};

const deleteClient = async (id) => {
  const [result] = await pool.query('DELETE FROM clients WHERE id = ?', [id]);
  if (result.affectedRows === 0) throw { statusCode: 404, message: 'Client not found' };
  return true;
};

module.exports = { getAllClients, getClientById, createClient, updateClient, deleteClient };
