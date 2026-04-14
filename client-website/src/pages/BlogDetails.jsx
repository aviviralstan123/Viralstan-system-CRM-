import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSingleBlog } from '../services/api';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getSingleBlog(id);
        setBlog(data);
      } catch (err) {
        setError('Failed to load the blog post. It might have been removed.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <div className="status">Fetching blog content...</div>;
  if (error) return <div className="status error">{error}</div>;
  if (!blog) return <div className="status">Blog not found.</div>;

  return (
    <div className="page" style={{ display: 'flex', justifyContent: 'center' }}>
      <article className="blog-details">
        <Link to="/blogs" className="btn btn-ghost" style={{ marginBottom: '24px', paddingLeft: 0, border: 0 }}>
          &larr; Back to Blogs
        </Link>
        <img 
          src={blog.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200' } 
          alt={blog.title} 
          className="blog-details-image" 
        />
        <h1>{blog.title}</h1>
        <div className="meta" style={{ marginBottom: '20px' }}>
          Published on {new Date(blog.createdAt || Date.now()).toLocaleDateString()}
        </div>
        <div 
          className="blog-content" 
          dangerouslySetInnerHTML={{ __html: blog.content || blog.description }} 
        />
      </article>
    </div>
  );
};

export default BlogDetails;
