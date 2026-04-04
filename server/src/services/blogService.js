const pool = require('../config/database');

const getAllBlogs = async (status) => {
  let query = 'SELECT b.*, u.name as author_name FROM blogs b LEFT JOIN users u ON b.author_id = u.id';
  const params = [];

  if (status) {
    query += ' WHERE b.status = ?';
    params.push(status);
  }

  query += ' ORDER BY b.created_at DESC';
  const [rows] = await pool.query(query, params);
  return rows;
};

const getBlogBySlug = async (slug) => {
  const [rows] = await pool.query(
    'SELECT b.*, u.name as author_name FROM blogs b LEFT JOIN users u ON b.author_id = u.id WHERE b.slug = ?',
    [slug]
  );
  if (rows.length === 0) throw { statusCode: 404, message: 'Blog not found' };
  return rows[0];
};

const getBlogById = async (id) => {
  const [rows] = await pool.query(
    'SELECT b.*, u.name as author_name FROM blogs b LEFT JOIN users u ON b.author_id = u.id WHERE b.id = ?',
    [id]
  );
  if (rows.length === 0) throw { statusCode: 404, message: 'Blog not found' };
  return rows[0];
};

const createBlog = async (blogData) => {
  const { 
    title, slug, content, description, author_id, status, 
    excerpt, category, featured_image, coverImage,
    meta_title, metaTitle, meta_description, metaDescription, word_count, wordCount 
  } = blogData;
  
  // Use either frontend or backend naming
  const finalContent = content || description;
  const finalExcerpt = excerpt || '';
  const finalCategory = category || 'Uncategorized';
  const finalFeaturedImage = featured_image || coverImage || null;
  const finalMetaTitle = meta_title || metaTitle || title;
  const finalMetaDescription = meta_description || metaDescription || finalExcerpt;
  const finalWordCount = word_count || wordCount || 0;

  const [result] = await pool.query(
    `INSERT INTO blogs 
    (title, slug, content, excerpt, author_id, featured_image, category, status, word_count, meta_title, meta_description, published_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      title, slug, finalContent, finalExcerpt, author_id, 
      finalFeaturedImage, finalCategory, status || 'draft', 
      finalWordCount, finalMetaTitle, finalMetaDescription,
      status === 'published' ? new Date() : null
    ]
  );
  return { id: result.insertId, ...blogData };
};

const updateBlog = async (id, blogData) => {
  const { 
    title, slug, content, description, status, 
    excerpt, category, featured_image, coverImage,
    meta_title, metaTitle, meta_description, metaDescription, word_count, wordCount 
  } = blogData;
  
  const finalContent = content || description;
  const finalFeaturedImage = featured_image || coverImage;
  const finalMetaTitle = meta_title || metaTitle;
  const finalMetaDescription = meta_description || metaDescription;
  const finalWordCount = word_count || wordCount;
  const published_at = status === 'published' ? new Date() : null;
  
  await pool.query(
    `UPDATE blogs SET 
      title = ?, slug = ?, content = ?, excerpt = ?, status = ?, 
      featured_image = COALESCE(?, featured_image), 
      category = ?, word_count = ?, meta_title = ?, meta_description = ?, 
      published_at = COALESCE(?, published_at) 
    WHERE id = ?`,
    [
      title, slug, finalContent, excerpt, status, 
      finalFeaturedImage, category, finalWordCount, 
      finalMetaTitle, finalMetaDescription, published_at, id
    ]
  );
  return { id, ...blogData };
};

const deleteBlog = async (id) => {
  const [result] = await pool.query('DELETE FROM blogs WHERE id = ?', [id]);
  if (result.affectedRows === 0) throw { statusCode: 404, message: 'Blog not found' };
  return true;
};

module.exports = { getAllBlogs, getBlogBySlug, getBlogById, createBlog, updateBlog, deleteBlog };
