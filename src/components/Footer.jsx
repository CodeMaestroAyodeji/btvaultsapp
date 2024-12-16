import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerLinks}>
        <Link to="/about-us">About Us</Link>
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/terms-of-use">Terms of Use</Link>
      </div>
      <p className={styles.copyright}>
        © {new Date().getFullYear()} BTVaults. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
