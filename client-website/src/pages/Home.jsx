import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/viralstan-logo.png'
import { useSiteSettings } from '../context/SiteSettingsContext'

const Home = () => {
  const { settings } = useSiteSettings()
  const brandName = settings.siteName || 'Viralstan'
  const heroLogo = settings.logo || logo

  return (
    <div className="page home-page">
      <div className="hero-surface">
        <div className="hero-grid">
          <div className="hero-content">
            <p className="eyebrow">Digital Growth Agency</p>
            <h1>Scale Your Brand with {brandName}</h1>
            <p className="hero-text">
              {settings.metaDescription ||
                'We help businesses achieve measurable growth through data-driven strategy, creative execution, and strong digital presence.'}
            </p>
            <div className="hero-actions">
              <Link to="/services" className="btn btn-primary">
                Our Services
              </Link>
              <Link to="/blogs" className="btn btn-ghost">
                Read Blogs
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <img src={heroLogo} alt={`${brandName} Hero`} className="hero-logo" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
