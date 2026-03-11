import React from 'react';
import { MapPin, Edit, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import styles from './ListingCard.module.css';
import { useAuth } from '../context/AuthContext';
import { api, BASE_URL } from '../services/api';

const ListingCard = ({ listing, onDeleteSuccess, showActions = true }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Check if current user is the owner of the listing
  const isOwner = user && listing.user && user._id === listing.user._id;

  // Helper to get full image URL
  const getImageUrl = (url) => {
    if (!url) return 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop';
    if (url.startsWith('http')) return url;
    return `${BASE_URL}${url}`;
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await api.deletePost(listing._id || listing.id);
        if (onDeleteSuccess) {
          onDeleteSuccess(listing._id || listing.id);
        } else {
          window.location.reload(); // Simple refresh if callback not provided
        }
      } catch (err) {
        alert(err.message || 'Failed to delete');
      }
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={getImageUrl(listing.imageUrl)} 
          alt={listing.title} 
          className={styles.image}
        />
        {listing.price && (
          <div className={styles.priceTag}>
            ${listing.price}
          </div>
        )}
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>
            {listing.title}
          </h3>
        </div>
        
        <div className={styles.locationContainer}>
          <MapPin className={styles.locationIcon} />
          <span className={styles.locationText}>{listing.location}</span>
        </div>
        
        <p className={styles.description}>
          {listing.shortDescription}
        </p>
        
        <div className={styles.footer}>
          <div className={styles.creatorInfo}>
            <div className={styles.creatorAvatar}>
              {listing.user?.name ? listing.user.name.charAt(0) : 'U'}
            </div>
            <div className={styles.creatorDetails}>
              <p className={styles.creatorName}>{listing.user?.name || 'Unknown Host'}</p>
              <p className={styles.postedTime}>
                {listing.postTime ? new Date(listing.postTime).toLocaleDateString() : 'Just now'}
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {showActions && isOwner && (
              <>
                <button 
                  onClick={() => navigate(`/edit-listing/${listing._id || listing.id}`)} 
                  className={styles.actionBtnIcon}
                  title="Edit listing"
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={handleDelete} 
                  className={styles.deleteBtnIcon}
                  title="Delete listing"
                >
                  <Trash2 size={16} />
                </button>
              </>
            )}
            <Link to={`/listing/${listing._id || listing.id}`}>
              <Button size="sm" variant="outline">View</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
