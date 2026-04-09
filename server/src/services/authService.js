const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const pool = require('../config/database');
const { jwtSecret, jwtExpiresIn, frontendUrl } = require('../config/env');
const emailService = require('../utils/emailService');

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

const forgotPassword = async (email) => {
  const [users] = await pool.query('SELECT id, name, email FROM users WHERE email = ?', [email]);
  
  if (users.length === 0) {
    throw { statusCode: 404, message: 'User not found with this email' };
  }

  const user = users[0];
  const resetToken = crypto.randomBytes(32).toString('hex');
  const tokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

  await pool.query(
    'UPDATE users SET reset_password_token = ?, reset_password_expires = ? WHERE id = ?',
    [resetToken, tokenExpiry, user.id]
  );

  const resetLink = `${frontendUrl || 'https://viralstan-system-crm-test.vercel.app'}/reset-password?token=${resetToken}`;
  
  // Send email in background to keep response fast
  emailService.sendPasswordResetEmail(user.email, user.name, resetLink)
    .catch(async (error) => {
      logger.error(`Background email failed for ${user.email}: ${error.message}`);
      // Optional: Logic to handle persistent failure if needed
    });

  return { message: 'Password reset link sent to your email' };
};

const resetPassword = async (token, newPassword) => {
  const [users] = await pool.query(
    'SELECT id FROM users WHERE reset_password_token = ? AND reset_password_expires > NOW()',
    [token]
  );

  if (users.length === 0) {
    throw { statusCode: 400, message: 'Invalid or expired reset token' };
  }

  const user = users[0];
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await pool.query(
    'UPDATE users SET password = ?, reset_password_token = NULL, reset_password_expires = NULL WHERE id = ?',
    [hashedPassword, user.id]
  );

  return { message: 'Password reset successful. You can now login with your new password.' };
};

module.exports = { register, login, forgotPassword, resetPassword };
