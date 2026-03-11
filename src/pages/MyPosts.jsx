import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import { api } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import styles from './Home.module.css'; // Reusing Home styles for layout

const MyPosts = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchMyListings = async () => {
      try {
        const data = await api.getPosts();
        // Filter listings created by the current user
        const myData = data.filter(listing => listing.user && listing.user._id === user?._id);
        setListings(myData);
      } catch (err) {
        setError(err.message || 'Failed to fetch your listings');
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchMyListings();
    }
  }, [user]);

  const handleDeleteSuccess = (deletedId) => {
    setListings(prev => prev.filter(item => (item._id || item.id) !== deletedId));
  };

  return (
    <div className={styles.page}>
      <Navbar />
      
      <main className={styles.listingsSection} style={{ paddingTop: '6rem', minHeight: 'calc(100vh - 4rem)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={styles.sectionHeader} style={{ marginBottom: '3rem' }}>
            <div>
              <h1 className={styles.title} style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>My Experiences</h1>
              <p className={styles.sectionSubtitle}>Manage the experiences you've created for travelers</p>
            </div>
            <div>
              <Link to="/create-listing">
                <Button variant="primary">Host New Experience</Button>
              </Link>
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
            <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <div className="mb-4 text-gray-400">
                {/* Placeholder icon could go here */}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">You haven't posted any experiences yet</h3>
              <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                Start sharing your passion with the world by hosting your first experience today.
              </p>
              <Link to="/create-listing">
                <Button size="lg">Get Started</Button>
              </Link>
            </div>
          ) : (
            <div className={styles.listingsGrid}>
              {listings.map(listing => (
                <ListingCard 
                  key={listing._id || listing.id} 
                  listing={{...listing, id: listing._id || listing.id}} 
                  showActions={true}
                  onDeleteSuccess={handleDeleteSuccess}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyPosts;
