import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser && savedUser !== 'undefined') {
        return JSON.parse(savedUser);
      }
      
      // If no valid user in localStorage but we have a token, try to decode it
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        const base64Url = savedToken.split('.')[1];
        if (base64Url) {
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          const decodedUser = JSON.parse(jsonPayload);
          if (decodedUser && decodedUser.id && !decodedUser._id) {
            decodedUser._id = decodedUser.id;
          }
          return decodedUser;
        }
      }
      return null;
    } catch (error) {
      console.error('Failed to parse user from localStorage:', error);
      localStorage.removeItem('user');
      return null;
    }
  });
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If we have a token but no user object, or vice versa, we should handle it
    // For now, we rely on the state initialized from localStorage
    const timer = setTimeout(() => setIsLoading(false), 0);
    return () => clearTimeout(timer);
  }, []);

  const login = (newToken, userData) => {
    let finalUser = userData;
    // If backend only returned a token, try to extract user from token payload
    if (!finalUser && newToken) {
      try {
        const base64Url = newToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        finalUser = JSON.parse(jsonPayload);
        // Normalize id to _id if needed
        if (finalUser && finalUser.id && !finalUser._id) {
          finalUser._id = finalUser.id;
        }
      } catch (error) {
        console.error('Failed to decode token:', error);
        finalUser = { isLoggedIn: true }; // Fallback minimal state
      }
    }

    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(finalUser));
    setToken(newToken);
    setUser(finalUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
