import React, { forwardRef } from 'react';
import styles from './FormInput.module.css';

const FormInput = forwardRef(({ 
  label, 
  error, 
  id, 
  className = '', 
  required,
  ...props 
}, ref) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {label && (
        <label 
          htmlFor={id} 
          className={styles.label}
        >
          {label} {required && <span className={styles.requiredStar}>*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        required={required}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        {...props}
      />
      {error && (
        <p className={styles.errorText}>{error}</p>
      )}
    </div>
  );
});

FormInput.displayName = 'FormInput';

export default FormInput;
