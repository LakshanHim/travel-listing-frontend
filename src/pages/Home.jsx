import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import { api } from '../services/api';
import Button from '../components/Button';
import { Search } from 'lucide-react';
import styles from './Home.module.css';

const Home = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await api.getPosts();
        setListings(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch listings');
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img 
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop" 
            alt="Beautiful landscape" 
            className={styles.heroImage}
          />
          <div className={styles.heroGradient} />
        </div>
        
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Discover the World's Most <span className={styles.heroTitleHighlight}>Extraordinary</span> Experiences
          </h1>
          <p className={styles.heroSubtitle}>
            Connect with local guides, explore hidden gems, and create memories that will last a lifetime.
          </p>
          
          {/* Simple Search Bar Mockup */}
          <div className={styles.searchContainer}>
            <div className={styles.searchInputWrapper}>
              <Search className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Where to next?" 
                className={styles.searchInput}
              />
            </div>
            <Button size="lg" className={styles.searchBtn}>Search</Button>
          </div>
        </div>
      </section>

      {/* Recommended Listings Section */}
      <section className={styles.listingsSection}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Trending Experiences</h2>
              <p className={styles.sectionSubtitle}>Handpicked adventures around the globe</p>
            </div>
            <div className={styles.viewAllDesktop}>
              <Button variant="ghost">View all</Button>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-600 bg-red-50 rounded-lg">
              {error}
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No experiences found. Be the first to host one!
            </div>
          ) : (
            <div className={styles.listingsGrid}>
              {listings.map(listing => (
                // Assuming backend uses _id for MongoDB documents
                <ListingCard 
                  key={listing._id || listing.id} 
                  listing={{...listing, id: listing._id || listing.id}} 
                  showActions={false}
                />
              ))}
            </div>
          )}
          
          <div className={styles.viewAllMobile}>
            <Button variant="outline" fullWidth>View all experiences</Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBg}>
          <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,200 C200,100 600,300 800,200 L800,400 L0,400 Z" fill="#ffffff" />
          </svg>
        </div>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Become a Host Today</h2>
          <p className={styles.ctaSubtitle}>
            Share your passion with travelers from around the world and earn extra income.
          </p>
          <Link to="/create-listing">
            <Button variant="secondary" size="lg" className={styles.ctaBtn}>
              Start Hosting
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
