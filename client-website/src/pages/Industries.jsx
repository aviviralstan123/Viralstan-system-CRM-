import React, { useEffect, useState } from 'react'
import { getIndustries } from '../services/api'

const Industries = () => {
  const [industries, setIndustries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const data = await getIndustries()
        setIndustries(Array.isArray(data) ? data : [])
      } catch (err) {
        setError('Failed to load industries.')
      } finally {
        setLoading(false)
      }
    }

    fetchIndustries()
  }, [])

  if (loading) return <div className="status">Loading industries...</div>
  if (error) return <div className="status error">{error}</div>

  return (
    <div className="page">
      <h1>Industries We Serve</h1>
      <p className="hero-text" style={{ marginBottom: '28px' }}>
        Explore how Viralstan supports different industries with tailored growth strategies.
      </p>

      {industries.length === 0 ? (
        <div className="status">No industries found.</div>
      ) : (
        <div className="grid">
          {industries.map((industry) => (
            <article className="card" key={industry.id || industry._id}>
              <div className="card-body">
                <h3>{industry.title || industry.name || 'Untitled Industry'}</h3>
                <p>{industry.content || industry.description || 'No description available.'}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default Industries
