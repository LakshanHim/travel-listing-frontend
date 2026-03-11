import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import styles from './Auth.module.css';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await api.register({ username: name, email, password }); // Map name to username if your backend requires it
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <Link to="/" className={styles.logoLink}>
            <div className={styles.logoIconWrapper}>
              <Compass className={styles.logoIcon} />
            </div>
          </Link>
        </div>
        <h2 className={styles.title}>
          Join Wanderlust
        </h2>
        <p className={styles.subtitle}>
          Already have an account?{' '}
          <Link to="/login" className={styles.subtitleLink}>
            Sign in instead
          </Link>
        </p>
      </div>

      <div className={styles.formContainer}>
        <div className={styles.formCard}>
          {error && (
            <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
              Registration successful! Redirecting to login...
            </div>
          )}
          <form className={styles.form} onSubmit={handleSubmit}>
            <FormInput
              id="name"
              type="text"
              label="Full name"
              required
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <FormInput
              id="email"
              type="email"
              label="Email address"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <FormInput
              id="password"
              type="password"
              label="Password"
              required
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div>
              <Button type="submit" fullWidth className={styles.submitBtn} disabled={isLoading || success}>
                {isLoading ? 'Creating account...' : 'Create account'}
              </Button>
            </div>
          </form>
          
          <p className={styles.termsText}>
            By registering, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
