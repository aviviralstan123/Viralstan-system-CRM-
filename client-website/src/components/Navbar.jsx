import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/viralstan-logo.png'
import { useSiteSettings } from '../context/SiteSettingsContext'

const Navbar = () => {
  const { settings } = useSiteSettings()
  const brandName = settings.siteName || 'Viralstan'
  const [accentWord, ...restWords] = brandName.split(/\s+/)
  const secondaryWords = restWords.join(' ')
  const brandLogo = settings.logo || logo

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand">
          <img src={brandLogo} alt={brandName} className="brand-logo" />
          <span className="brand-text">
            {accentWord}
            {secondaryWords ? <span> {secondaryWords}</span> : null}
          </span>
        </Link>

        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Home
          </NavLink>
          <NavLink to="/blogs" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Blogs
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Services
          </NavLink>
          <NavLink to="/industries" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Industries
          </NavLink>
          <NavLink to="/reviews" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Reviews
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
