import apiFetch from './api';

// Product service functions
export const getProducts = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  
  if (filters.category) queryParams.append('category', filters.category);
  if (filters.search) queryParams.append('search', filters.search);
  if (filters.minPrice !== undefined) queryParams.append('minPrice', filters.minPrice);
  if (filters.maxPrice !== undefined) queryParams.append('maxPrice', filters.maxPrice);
  
  const endpoint = `/products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  return apiFetch(endpoint);
};

export const getProductById = async (id) => {
  return apiFetch(`/products/${id}`);
};

export const createProduct = async (productData) => {
  return apiFetch('/products', {
    method: 'POST',
    body: JSON.stringify(productData)
  });
};

export const updateProduct = async (id, productData) => {
  return apiFetch(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData)
  });
};

export const deleteProduct = async (id) => {
  return apiFetch(`/products/${id}`, {
    method: 'DELETE'
  });
};