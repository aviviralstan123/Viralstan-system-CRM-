import React, { useEffect, useState } from 'react'
import { getReviews } from '../services/api'

const Reviews = () => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews()
        setReviews(Array.isArray(data) ? data : [])
      } catch (err) {
        setError('Failed to load reviews.')
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  if (loading) return <div className="status">Loading reviews...</div>
  if (error) return <div className="status error">{error}</div>

  return (
    <div className="page">
      <h1>Client Reviews</h1>
      <p className="hero-text" style={{ marginBottom: '28px' }}>
        Feedback from businesses who partnered with Viralstan.
      </p>

      {reviews.length === 0 ? (
        <div className="status">No reviews found.</div>
      ) : (
        <div className="grid">
          {reviews.map((review) => (
            <article className="card" key={review.id || review._id}>
              <div className="card-body">
                <h3>{review.client_name || review.name || 'Client'}</h3>
                <p>{review.review_text || review.comment || review.message || 'No review text available.'}</p>
                <div className="meta">Rating: {review.rating || 'N/A'}</div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default Reviews
