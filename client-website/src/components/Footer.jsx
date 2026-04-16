import React from 'react'
import { Link } from 'react-router-dom'
import { useSiteSettings } from '../context/SiteSettingsContext'

const Footer = () => {
  const { settings } = useSiteSettings()
  const brandName = settings.siteName || 'Viralstan'

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>&copy; {new Date().getFullYear()} {brandName}. All rights reserved.</div>
        <div className="footer-links">
          <Link to="/blogs">Blogs</Link>
          <Link to="/services">Services</Link>
          <Link to="/industries">Industries</Link>
          <Link to="/reviews">Reviews</Link>
          {settings.email ? <a href={`mailto:${settings.email}`}>{settings.email}</a> : null}
        </div>
      </div>
    </footer>
  )
}

export default Footer
