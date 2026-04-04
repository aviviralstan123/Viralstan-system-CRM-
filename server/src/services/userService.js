const pool = require('../config/database');

const getAllUsers = async () => {
  const [rows] = await pool.query('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC');
  return rows;
};

const updateUserRole = async (id, role) => {
  const [result] = await pool.query('UPDATE users SET role = ? WHERE id = ?', [role, id]);
  if (result.affectedRows === 0) throw { statusCode: 404, message: 'User not found' };
  return { id, role };
};

const deleteUser = async (id) => {
  const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
  if (result.affectedRows === 0) throw { statusCode: 404, message: 'User not found' };
  return true;
};

module.exports = { getAllUsers, updateUserRole, deleteUser };
