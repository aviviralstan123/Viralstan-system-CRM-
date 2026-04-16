import React from 'react'
import { Link } from 'react-router-dom'

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=500&auto=format&fit=crop'

const BlogCard = ({ blog }) => {
  const imageSrc = blog.featured_image || blog.coverImage || blog.image || FALLBACK_IMAGE
  const description = blog.excerpt || blog.description || blog.content || 'No description available.'

  return (
    <article className="card">
      <Link to={`/blogs/${blog._id || blog.id}`} className="blog-card-link">
        <img
          src={imageSrc}
          alt={blog.title || 'Blog image'}
          className="blog-image"
          onError={(event) => {
            event.currentTarget.src = FALLBACK_IMAGE
          }}
        />
        <div className="card-body">
          <h3>{blog.title || 'Untitled Blog'}</h3>
          <p>{String(description).replace(/<[^>]+>/g, '').slice(0, 110)}...</p>
          <div className="meta">Read more &rarr;</div>
        </div>
      </Link>
    </article>
  )
}

export default BlogCard
