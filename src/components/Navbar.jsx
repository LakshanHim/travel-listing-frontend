import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Menu, X, LogOut } from 'lucide-react';
import Button from './Button';
import styles from './Navbar.module.css';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.inner}>
          {/* Logo */}
          <Link to="/" className={styles.logoLink}>
            <div className={styles.logoIconWrapper}>
              <Compass className={styles.logoIcon} />
            </div>
            <span className={styles.logoText}>
              Wander<span className={styles.logoHighlight}>lust</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className={styles.desktopNav}>
            <Link 
              to="/" 
              className={`${styles.navLink} ${location.pathname === '/' ? styles.navLinkActive : ''}`}
            >
              Discover
            </Link>
            {user ? (
              <>
                <Link 
                  to="/my-posts" 
                  className={`${styles.navLink} ${location.pathname === '/my-posts' ? styles.navLinkActive : ''}`}
                >
                  My Posts
                </Link>
                <div className={styles.divider}></div>
                <Link to="/create-listing">
                  <Button variant="outline" size="sm">Host an Experience</Button>
                </Link>
                <button onClick={logout} className={styles.navLink} style={{display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.5rem', border: 'none', background: 'none', cursor: 'pointer'}}>
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <>
                <div className={styles.divider}></div>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">Sign up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className={styles.mobileContainer}>
            <button
              onClick={toggleMenu}
              className={styles.mobileMenuBtn}
            >
              {isMenuOpen ? <X className={styles.mobileIcon} /> : <Menu className={styles.mobileIcon} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link 
            to="/" 
            className={styles.mobileLink}
            onClick={() => setIsMenuOpen(false)}
          >
            Discover
          </Link>
          {user && (
            <Link 
              to="/my-posts" 
              className={styles.mobileLink}
              onClick={() => setIsMenuOpen(false)}
            >
              My Posts
            </Link>
          )}
          <div className={styles.mobileDivider}>
            <Link 
              to="/create-listing" 
              className={`${styles.mobileLink} ${styles.mobileLinkPrimary}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Host an Experience
            </Link>
          </div>
          {user ? (
            <div className={styles.mobileAuthBtns}>
              <button 
                onClick={() => { logout(); setIsMenuOpen(false); }} 
                className={styles.mobileLink} 
                style={{textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'}}
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          ) : (
            <div className={styles.mobileAuthBtns}>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" fullWidth>Log in</Button>
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                <Button variant="primary" fullWidth>Sign up</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
