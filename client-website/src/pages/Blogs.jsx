import React, { useState, useEffect } from 'react';
import { getBlogs } from '../services/api';
import BlogCard from '../components/BlogCard';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch (err) {
        setError('Failed to load blogs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div className="status">Loading articles...</div>;
  if (error) return <div className="status error">{error}</div>;

  return (
    <div className="page">
      <h1>Latest Insights</h1>
      <p className="hero-text" style={{ marginBottom: '32px' }}>
        Stay updated with our latest industry reports, marketing tips, and agency success stories.
      </p>
      
      {blogs.length === 0 ? (
        <div className="status">No blogs found.</div>
      ) : (
        <div className="grid blogs-grid">
          {blogs.map(blog => (
            <BlogCard key={blog._id || blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
