import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getSingleBlog } from '../services/api'

const BlogDetails = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getSingleBlog(id)
        setBlog(data)
      } catch (err) {
        setError('Failed to load the blog post. It might have been removed.')
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [id])

  if (loading) return <div className="status">Fetching blog content...</div>
  if (error) return <div className="status error">{error}</div>
  if (!blog) return <div className="status">Blog not found.</div>

  const imageSrc =
    blog.featured_image ||
    blog.coverImage ||
    blog.image ||
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200'

  return (
    <div className="page" style={{ display: 'flex', justifyContent: 'center' }}>
      <article className="blog-details">
        <Link to="/blogs" className="btn btn-ghost" style={{ marginBottom: '24px', paddingLeft: 0, border: 0 }}>
          &larr; Back to Blogs
        </Link>

        <img src={imageSrc} alt={blog.title || 'Blog'} className="blog-details-image" />

        <h1>{blog.title}</h1>
        <div className="meta" style={{ marginBottom: '20px' }}>
          Published on {new Date(blog.published_at || blog.created_at || Date.now()).toLocaleDateString()}
        </div>

        {blog.content ? (
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
        ) : (
          <p>{blog.description || blog.excerpt || 'No content available.'}</p>
        )}
      </article>
    </div>
  )
}

export default BlogDetails
