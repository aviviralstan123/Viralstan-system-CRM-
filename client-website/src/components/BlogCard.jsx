import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
    <article className="card">
      <Link to={`/blogs/${blog._id || blog.id}`} className="blog-card-link">
        <img 
          src={blog.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=500&auto=format&fit=crop'} 
          alt={blog.title} 
          className="blog-image" 
        />
        <div className="card-body">
          <h3>{blog.title}</h3>
          <p>{blog.description?.substring(0, 100)}...</p>
          <div className="meta">Read more &rarr;</div>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
