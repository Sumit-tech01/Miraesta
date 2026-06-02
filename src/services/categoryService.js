import apiFetch from './api';

// Category service functions
export const getCategories = async () => {
  return apiFetch('/categories');
};

export const getCategoryById = async (id) => {
  return apiFetch(`/categories/${id}`);
};

export const createCategory = async (categoryData) => {
  return apiFetch('/categories', {
    method: 'POST',
    body: JSON.stringify(categoryData)
  });
};

export const updateCategory = async (id, categoryData) => {
  return apiFetch(`/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(categoryData)
  });
};

export const deleteCategory = async (id) => {
  return apiFetch(`/categories/${id}`, {
    method: 'DELETE'
  });
};