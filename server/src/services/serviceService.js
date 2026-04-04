const pool = require('../config/database');

const getAllServices = async () => {
  const [rows] = await pool.query('SELECT * FROM services ORDER BY title ASC');
  return rows;
};

const getServiceById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM services WHERE id = ?', [id]);
  if (rows.length === 0) throw { statusCode: 404, message: 'Service not found' };
  return rows[0];
};

const createService = async (serviceData) => {
  const { title, name, description, price, category, status, is_active, metaTitle, metaDescription } = serviceData;
  const finalTitle = title || name;
  const isActive = is_active !== undefined ? is_active : (status === 'active' || status === undefined);
  const meta_title = metaTitle || finalTitle;
  const meta_description = metaDescription || description;

  const [result] = await pool.query(
    'INSERT INTO services (title, description, price, category, is_active, meta_title, meta_description) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [finalTitle, description, price, category, isActive, meta_title, meta_description]
  );
  return { id: result.insertId, ...serviceData };
};

const updateService = async (id, serviceData) => {
  const { title, name, description, price, category, status, is_active, metaTitle, metaDescription } = serviceData;
  const finalTitle = title || name;
  const isActive = is_active !== undefined ? is_active : (status === 'active' || status === undefined);
  
  await pool.query(
    'UPDATE services SET title = ?, description = ?, price = ?, category = ?, is_active = ?, meta_title = ?, meta_description = ? WHERE id = ?',
    [finalTitle, description, price, category, isActive, metaTitle, metaDescription, id]
  );
  return { id, ...serviceData };
};

const deleteService = async (id) => {
  const [result] = await pool.query('DELETE FROM services WHERE id = ?', [id]);
  if (result.affectedRows === 0) throw { statusCode: 404, message: 'Service not found' };
  return true;
};

module.exports = { getAllServices, getServiceById, createService, updateService, deleteService };
