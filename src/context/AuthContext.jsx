import { createContext, useContext, useState, useEffect } from 'react';
import { register, login, logout, getProfile } from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSpinWheel, setShowSpinWheel] = useState(false);


  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const profile = await getProfile();
        setUser(profile);
      } catch (err) {
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const response = await login(credentials);
      setUser(response.user);
      localStorage.setItem('token', response.token);

      const key = 'miraesta_spun_' + (response.user._id || response.user.email);
      const alreadySpun = localStorage.getItem(key);
      if (!alreadySpun) {
        setShowSpinWheel(true);
      }

      return response;

    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    }
  };

  const handleRegister = async (userData) => {
    try {
      const response = await register(userData);
      setUser(response.user);
      localStorage.setItem('token', response.token);
      return response;
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      localStorage.removeItem('token');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const value = {
    user,
    loading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    showSpinWheel,
    setShowSpinWheel,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}