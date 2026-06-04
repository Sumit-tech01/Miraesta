import apiFetch from './api';

// Auth service functions
export const register = async (userData) => {
  return apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  });
};

export const login = async (credentials) => {
  return apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });
};

export const logout = async () => {
  return apiFetch('/auth/logout', {
    method: 'POST'
  });
};

export const getProfile = async () => {
  return apiFetch('/auth/profile');
};

export const updateProfile = async (data) => {
  return apiFetch('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(data)
  });
};

export const toggleFavorite = async (productId) => {
  return apiFetch(`/auth/favorites/${productId}`, {
    method: 'POST'
  });
};

export const getUserOrders = async () => {
  return apiFetch('/auth/orders');
};
