import axios from 'axios';

// Auto-detect environment
const resolveBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, '');
  }
  if (typeof window !== 'undefined') {
    const isLocalhost =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1';
    if (isLocalhost) {
      return 'http://localhost:5000';
    }
  }
  // Default fallback for production: if no env variable is set, default to relative origin
  return '';
};

const api = axios.create({
  baseURL: resolveBaseUrl(),
  timeout: 15000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear invalid credentials
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      const url = error.config?.url || '';
      const isAuthCheck =
        url.includes('/api/auth/verify') ||
        url.includes('/api/auth/login') ||
        url.includes('/api/admin/auth/login') ||
        url.includes('/api/admin/auth/verify');

      // Only redirect if accessing a protected page
      if (
        !isAuthCheck &&
        typeof window !== 'undefined' &&
        window.location.pathname !== '/login' &&
        window.location.pathname !== '/admin/login' &&
        window.location.pathname !== '/register' &&
        (window.location.pathname.startsWith('/profile') ||
          window.location.pathname.startsWith('/orders') ||
          window.location.pathname.startsWith('/admin/dashboard'))
      ) {
        window.location.href = window.location.pathname.startsWith('/admin')
          ? '/admin/login'
          : '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
