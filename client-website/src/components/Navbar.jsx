import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand">
          <img src="/src/assets/viralstan-logo.png" alt="Viralstan" className="brand-logo" />
          <span className="brand-text">Viral<span>stan</span></span>
        </Link>
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
          <NavLink to="/blogs" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Blogs</NavLink>
          <NavLink to="/services" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Services</NavLink>
          <NavLink to="/industries" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Industries</NavLink>
          <NavLink to="/reviews" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Reviews</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
