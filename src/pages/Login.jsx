import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import styles from './Auth.module.css';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const data = await api.login({ email, password });
      login(data.token, data.user);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to login');
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
          Welcome back
        </h2>
        <p className={styles.subtitle}>
          Or{' '}
          <Link to="/register" className={styles.subtitleLink}>
            create a new account
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
          <form className={styles.form} onSubmit={handleSubmit}>
            <FormInput
              id="email"
              type="email"
              label="Email address"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div>
              <FormInput
                id="password"
                type="password"
                label="Password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className={styles.forgotPassword}>
                <a href="#" className={styles.forgotPasswordLink}>
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <Button type="submit" fullWidth className={styles.submitBtn} disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </div>
          </form>
          
          <div className={styles.dividerContainer}>
            <div className={styles.dividerLine}>
              <div className={styles.dividerLineInner} />
            </div>
            <div className={styles.dividerText}>
              <span>Continue as guest</span>
            </div>
          </div>
          
          <div className={styles.secondaryActions}>
            <Link to="/">
              <Button variant="outline" fullWidth>
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
