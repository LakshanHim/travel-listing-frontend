import React from 'react';
import { Compass, Instagram, Twitter, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <Link to="/" className={styles.logoLink}>
              <Compass className={styles.logoIcon} />
              <span className={styles.logoText}>
                Wander<span className={styles.logoHighlight}>lust</span>
              </span>
            </Link>
            <p className={styles.brandDesc}>
              Discover unique travel experiences curated by locals. Go off the beaten path and create unforgettable memories.
            </p>
            <div className={styles.socials}>
              <a href="#"><Instagram className={styles.socialIcon} /></a>
              <a href="#"><Twitter className={styles.socialIcon} /></a>
              <a href="#"><Facebook className={styles.socialIcon} /></a>
            </div>
          </div>
          
          <div>
            <h4 className={styles.columnTitle}>Explore</h4>
            <ul className={styles.linkList}>
              <li><Link to="/">All Experiences</Link></li>
              <li><a href="#">Destinations</a></li>
              <li><a href="#">Travel Guides</a></li>
              <li><a href="#">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className={styles.columnTitle}>Host</h4>
            <ul className={styles.linkList}>
              <li><Link to="/create-listing">Create a Listing</Link></li>
              <li><a href="#">Hosting Guidelines</a></li>
              <li><a href="#">Host Protection</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className={styles.columnTitle}>Support</h4>
            <ul className={styles.linkList}>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Safety Information</a></li>
              <li><a href="#">Cancellation Options</a></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.bottomBar}>
          <p>© {new Date().getFullYear()} Wanderlust Inc. All rights reserved.</p>
          <div className={styles.bottomLinks}>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
