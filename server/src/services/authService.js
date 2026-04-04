const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');
const { jwtSecret, jwtExpiresIn } = require('../config/env');

const register = async (userData) => {
  const { name, email, password, role } = userData;
  
  // Check if user already exists
  const [existingUser] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
  if (existingUser.length > 0) {
    throw { statusCode: 400, message: 'User with this email already exists' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, hashedPassword, role || 'viewer']
  );
  
  return { id: result.insertId, name, email, role: role || 'viewer' };
};

const login = async ({ email, password }) => {
  const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  if (users.length === 0) {
    throw { statusCode: 401, message: 'Invalid credentials' };
  }

  const user = users[0];
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw { statusCode: 401, message: 'Invalid credentials' };
  }

  const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: jwtExpiresIn });
  
  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  };
};

module.exports = { register, login };
