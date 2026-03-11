import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { ImagePlus } from 'lucide-react';
import styles from './CreateListing.module.css'; // Reusing CreateListing styles
import { api, BASE_URL } from '../services/api';

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    shortDescription: '',
    description: '',
    price: '',
  });
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

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
        setFormData({
          title: data.title || '',
          location: data.location || '',
          shortDescription: data.shortDescription || '',
          description: data.description || '',
          price: data.price || '',
        });
        setExistingImageUrl(data.imageUrl || '');
      } catch (err) {
        console.error('Error fetching listing:', err);
        setError('Failed to load listing for editing.');
      } finally {
        setInitialLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const data = new FormData();
      // Append text fields
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      // Append new image only if selected
      if (newImage) {
        data.append('image', newImage);
      }

      await api.updatePost(id, data);
      navigate(`/listing/${id}`);
    } catch (err) {
      setError(err.message || 'Failed to update listing');
    } finally {
      setIsLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className={styles.page}>
        <Navbar />
        <main className={styles.main} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Navbar />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.cardInner}>
              <div className={styles.header}>
                <h1 className={styles.title}>Edit Experience</h1>
                <p className={styles.subtitle}>Update the details of your listing.</p>
              </div>

              {error && (
                <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGrid}>
                  <FormInput
                    id="title"
                    name="title"
                    label="Experience Title"
                    required
                    placeholder="e.g. Kyoto Historic Temples Tour"
                    value={formData.title}
                    onChange={handleChange}
                    className={styles.fullWidth}
                  />

                  <FormInput
                    id="location"
                    name="location"
                    label="Location"
                    required
                    placeholder="e.g. Kyoto, Japan"
                    value={formData.location}
                    onChange={handleChange}
                  />

                  <FormInput
                    id="price"
                    name="price"
                    type="number"
                    label="Price ($)"
                    placeholder="0"
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                  />

                  <div className={styles.fullWidth}>
                    <label htmlFor="image" className={styles.label}>
                      Change Image (Optional)
                    </label>
                    <div className={styles.inputGroup}>
                      <span className={styles.inputAddon}>
                        <ImagePlus className={styles.addonIcon} />
                      </span>
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        className={styles.inputWithAddon}
                        onChange={handleImageChange}
                      />
                    </div>
                    {existingImageUrl && !newImage && (
                      <p className={styles.helpText} style={{ marginTop: '0.5rem' }}>
                        Current: <a href={getImageUrl(existingImageUrl)} target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>View existing image</a>
                      </p>
                    )}
                    {newImage && (
                      <p className={styles.helpText} style={{ color: 'var(--primary-600)', marginTop: '0.5rem' }}>
                        New image selected: {newImage.name}
                      </p>
                    )}
                  </div>

                  <div className={styles.fullWidth}>
                    <label htmlFor="shortDescription" className={styles.label}>
                      Short Description <span className={styles.requiredStar}>*</span>
                    </label>
                    <textarea
                      id="shortDescription"
                      name="shortDescription"
                      rows={3}
                      required
                      className={styles.textarea}
                      placeholder="Brief summary..."
                      value={formData.shortDescription}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={styles.fullWidth}>
                    <label htmlFor="description" className={styles.label}>
                      Full Details <span className={styles.requiredStar}>*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={6}
                      required
                      className={styles.textarea}
                      placeholder="Provide details of the experience..."
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className={styles.actions}>
                  <Button type="button" variant="ghost" onClick={() => navigate('/')}>
                    Cancel
                  </Button>
                  <Button type="submit" size="lg" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EditListing;
