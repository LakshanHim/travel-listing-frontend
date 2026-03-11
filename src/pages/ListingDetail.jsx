import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { api, BASE_URL } from '../services/api';
import { MapPin, Clock, Star, Share, Heart, Shield, Award } from 'lucide-react';
import styles from './ListingDetail.module.css';

const ListingDetail = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Helper to get full image URL
  const getImageUrl = (url) => {
    if (!url) return 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop';
    if (url.startsWith('http')) return url;
    return `${BASE_URL}${url}`;
  };

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const data = await api.getPostById(id);
        setListing(data);
      } catch (err) {
        setError(err.message || 'Listing not found');
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.page}>
        <Navbar />
        <main className={styles.notFoundContainer} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className={styles.page}>
        <Navbar />
        <main className={styles.notFoundContainer}>
          <div className={styles.notFoundContent}>
            <h2 className={styles.notFoundTitle}>Listing not found</h2>
            <Link to="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Navbar />
      
      <main className={styles.main}>
        {/* Title and Header Actions */}
        <div className={styles.headerSection}>
          <h1 className={styles.title}>
            {listing.title}
          </h1>
          
          <div className={styles.metaBar}>
            <div className={styles.metaInfo}>
              <span className={styles.metaItem}>
                <Star className={`${styles.icon} ${styles.starIcon}`} />
                <span className={styles.metaItemPrimary}>4.95</span> · 128 reviews
              </span>
              <span className={styles.metaItem}>
                <Award className={styles.icon} />
                Superhost
              </span>
              <span className={`${styles.metaItem} ${styles.underline}`}>
                <MapPin className={`${styles.icon} ${styles.mapIcon}`} />
                {listing.location}
              </span>
            </div>
            
            <div className={styles.actionBtns}>
              <button className={styles.actionBtn}>
                <Share className={styles.icon} /> Share
              </button>
              <button className={styles.actionBtn}>
                <Heart className={styles.icon} /> Save
              </button>
            </div>
          </div>
        </div>

        {/* Hero Image Gallery Mockup */}
        <div className={styles.gallerySection}>
          <div className={styles.heroImageContainer}>
            <img 
              src={getImageUrl(listing.imageUrl)} 
              alt={listing.title} 
              className={styles.heroImage} 
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className={styles.contentSection}>
          <div className={styles.contentLayout}>
            
            {/* Left Column: Details */}
            <div className={styles.detailsCol}>
              <div className={styles.hostHeader}>
                <div>
                  <h2 className={styles.hostTitle}>
                    Experience hosted by {listing.creatorName || 'Unknown Host'}
                  </h2>
                  <div className={styles.hostMeta}>
                    <span>{listing.createdAt ? new Date(listing.createdAt).toLocaleDateString() : (listing.postedTime || 'Recently')}</span>
                    <span>4 hours</span>
                    <span>English</span>
                  </div>
                </div>
                <div className={styles.hostAvatar}>
                  {listing.creatorName ? listing.creatorName.charAt(0) : 'U'}
                </div>
              </div>

              <div className={styles.featuresList}>
                <div className={styles.featureItem}>
                  <Award className={styles.featureIcon} strokeWidth={1.5} />
                  <div>
                    <h3 className={styles.featureTitle}>{listing.creatorName || 'This host'} is a Superhost</h3>
                    <p className={styles.featureDesc}>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
                  </div>
                </div>
                
                <div className={styles.featureItem}>
                  <MapPin className={styles.featureIcon} strokeWidth={1.5} />
                  <div>
                    <h3 className={styles.featureTitle}>Great location</h3>
                    <p className={styles.featureDesc}>100% of recent guests gave the location a 5-star rating.</p>
                  </div>
                </div>
              </div>

              <div className={styles.aboutSection}>
                <h2 className={styles.sectionTitle}>About this experience</h2>
                <div className={styles.aboutText}>
                  {listing.description}
                </div>
              </div>
            </div>

            {/* Right Column: Floating Booking Card */}
            <div className={styles.bookingCol}>
              <div className={styles.bookingCard}>
                <div className={styles.bookingHeader}>
                  <div className={styles.priceDisplay}>
                    <span className={styles.priceAmount}>${listing.price}</span>
                    <span className={styles.priceUnit}>/ person</span>
                  </div>
                  <div className={styles.bookingMeta}>
                    <Star className={`${styles.icon} ${styles.bookingStar}`} />
                    <span>4.95</span>
                    <a href="#" className={styles.bookingReviews}>· 128 reviews</a>
                  </div>
                </div>
                
                <Button size="lg" fullWidth className={styles.bookingBtn}>
                  Check availability
                </Button>
                
                <p className={styles.noChargeText}>You won't be charged yet</p>
                
                <div className={styles.protectionBanner}>
                  <div className={styles.protectionItem}>
                    <Shield className={styles.shieldIcon} />
                    <p>
                      <span className={styles.boldText}>Wanderlust Cover</span> - Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ListingDetail;
