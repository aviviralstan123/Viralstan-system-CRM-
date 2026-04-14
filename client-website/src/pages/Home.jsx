import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="page home-page">
      <div className="hero-surface">
        <div className="hero-grid">
          <div className="hero-content">
            <p className="eyebrow">Digital Growth Agency</p>
            <h1>Scale Your Brand with Viralstan</h1>
            <p className="hero-text">
              We help businesses achieve viral growth through data-driven strategies, 
              cutting-edge marketing, and exceptional content creation. Explore our success stories.
            </p>
            <div className="hero-actions">
              <Link to="/services" className="btn btn-primary">Our Services</Link>
              <Link to="/blogs" className="btn btn-ghost">Read Blogs</Link>
            </div>
          </div>
          <div className="hero-visual">
            <img src="/src/assets/viralstan-logo.png" alt="Viralstan Hero" className="hero-logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
