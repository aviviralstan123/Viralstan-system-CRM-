const pool = require('../config/database');

const getAllIndustries = async () => {
  const [rows] = await pool.query('SELECT i.*, s.title as service_title FROM industries i LEFT JOIN services s ON i.service_id = s.id ORDER BY i.created_at DESC');
  return rows;
};

const getIndustryBySlug = async (slug) => {
  const [rows] = await pool.query('SELECT i.*, s.title as service_title FROM industries i LEFT JOIN services s ON i.service_id = s.id WHERE i.slug = ?', [slug]);
  if (rows.length === 0) throw { statusCode: 404, message: 'Industry not found' };
  return rows[0];
};

const createIndustry = async (industryData) => {
  const { service_id, title, slug, content, meta_title, meta_description } = industryData;
  
  const [result] = await pool.query(
    'INSERT INTO industries (service_id, title, slug, content, meta_title, meta_description) VALUES (?, ?, ?, ?, ?, ?)',
    [
      service_id || null, 
      title, 
      slug, 
      content, 
      meta_title || null, 
      meta_description || null
    ]
  );
  return { id: result.insertId, ...industryData };
};

const updateIndustry = async (id, industryData) => {
  const { service_id, title, slug, content, meta_title, meta_description } = industryData;
  await pool.query(
    'UPDATE industries SET service_id = ?, title = ?, slug = ?, content = ?, meta_title = ?, meta_description = ? WHERE id = ?',
    [
      service_id || null, 
      title, 
      slug, 
      content, 
      meta_title || null, 
      meta_description || null, 
      id
    ]
  );
  return { id, ...industryData };
};

const deleteIndustry = async (id) => {
  const [result] = await pool.query('DELETE FROM industries WHERE id = ?', [id]);
  if (result.affectedRows === 0) throw { statusCode: 404, message: 'Industry not found' };
  return true;
};

module.exports = { getAllIndustries, getIndustryBySlug, createIndustry, updateIndustry, deleteIndustry };
