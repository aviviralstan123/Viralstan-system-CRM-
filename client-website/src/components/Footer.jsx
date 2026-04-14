import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          &copy; {new Date().getFullYear()} Viralstan. All rights reserved.
        </div>
        <div className="footer-links">
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Terms of Service</Link>
          <Link to="/">Contact us</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
