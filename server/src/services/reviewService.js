const pool = require('../config/database');

const baseReviewSelect = `
  SELECT
    r.*,
    c.name AS client_name,
    s.title AS service_title
  FROM reviews r
  LEFT JOIN clients c ON r.client_id = c.id
  LEFT JOIN services s ON r.service_id = s.id
`;

const getAllReviews = async (status) => {
  let query = baseReviewSelect;
  const params = [];

  if (status) {
    query += ' WHERE r.status = ?';
    params.push(status);
  }

  query += ' ORDER BY r.created_at DESC';
  const [rows] = await pool.query(query, params);
  return rows;
};

const updateReviewStatus = async (id, status) => {
  const [result] = await pool.query('UPDATE reviews SET status = ? WHERE id = ?', [status, id]);

  if (result.affectedRows === 0) {
    throw { statusCode: 404, message: 'Review not found' };
  }

  return true;
};

const deleteReview = async (id) => {
  const [result] = await pool.query('DELETE FROM reviews WHERE id = ?', [id]);

  if (result.affectedRows === 0) {
    throw { statusCode: 404, message: 'Review not found' };
  }

  return true;
};

module.exports = {
  getAllReviews,
  updateReviewStatus,
  deleteReview
};
