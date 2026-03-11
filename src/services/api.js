export const BASE_URL = 'http://localhost:5000';
const API_URL = `${BASE_URL}/api`;

// Helper to get auth header
const getAuthHeaders = (isFormData = false) => {
  const token = localStorage.getItem('token');
  const headers = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  
  // If sending FormData, don't set Content-Type; browser will set it with boundary
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  
  return headers;
};

export const api = {
  // Auth API
  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Registration failed' }));
      throw new Error(error.message || 'Registration failed');
    }
    return response.json();
  },

  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Login failed' }));
      throw new Error(error.message || 'Login failed');
    }
    return response.json();
  },

  // Posts/Listings API
  getPosts: async () => {
    const response = await fetch(`${API_URL}/posts`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to fetch listings');
    return response.json();
  },

  getPostById: async (id) => {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to fetch listing');
    return response.json();
  },

  createPost: async (postData) => {
    const isFormData = postData instanceof FormData;
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: getAuthHeaders(isFormData),
      body: isFormData ? postData : JSON.stringify(postData),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to create listing' }));
      throw new Error(error.message || 'Failed to create listing');
    }
    return response.json();
  },

  updatePost: async (id, postData) => {
    const isFormData = postData instanceof FormData;
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(isFormData),
      body: isFormData ? postData : JSON.stringify(postData),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to update listing' }));
      throw new Error(error.message || 'Failed to update listing');
    }
    return response.json();
  },

  deletePost: async (id) => {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to delete listing' }));
      throw new Error(error.message || 'Failed to delete listing');
    }
    return response.json();
  }
};
