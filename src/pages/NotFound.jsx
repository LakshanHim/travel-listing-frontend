import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { Compass } from 'lucide-react';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <Compass className={styles.icon} />
      </div>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>Looks like you're lost</h2>
      <p className={styles.desc}>
        The page you are looking for doesn't exist or has been moved. Let's get you back on track.
      </p>
      <Link to="/">
        <Button size="lg" className={styles.homeBtn}>
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
