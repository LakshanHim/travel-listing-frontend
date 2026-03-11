import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { ImagePlus } from 'lucide-react';
import styles from './CreateListing.module.css';
import { api } from '../services/api';

const CreateListing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    shortDescription: '',
    description: '',
    price: '',
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError('Please select an image to upload');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      const data = new FormData();
      // Append text fields
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      // Append image file
      data.append('image', image);

      await api.createPost(data);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to create listing');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <Navbar />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.cardInner}>
              <div className={styles.header}>
                <h1 className={styles.title}>Host an Experience</h1>
                <p className={styles.subtitle}>Share your world with travelers. Fill out the details below to create your listing.</p>
              </div>

              {error && (
                <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '0.75rem', borderRadius: '0.5rem', mb: '1rem', fontSize: '0.875rem' }}>
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
                      Upload Image <span className={styles.requiredStar}>*</span>
                    </label>
                    <div className={styles.inputGroup}>
                      <span className={styles.inputAddon}>
                        <ImagePlus className={styles.addonIcon} />
                      </span>
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        required
                        className={styles.inputWithAddon}
                        onChange={handleImageChange}
                      />
                    </div>
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
                    <div>
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
                </div>

                <div className={styles.actions}>
                  <Button type="button" variant="ghost" onClick={() => navigate('/')}>
                    Cancel
                  </Button>
                  <Button type="submit" size="lg" disabled={isLoading}>
                    {isLoading ? 'Publishing...' : 'Publish Listing'}
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

export default CreateListing;
