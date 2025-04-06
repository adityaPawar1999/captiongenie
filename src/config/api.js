const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5003';

export const API_CONFIG = {
  BASE_URL: BACKEND_URL,
  POSTS_URL: `${BACKEND_URL}/api/posts`,
  AUTH_URL: `${BACKEND_URL}/api/auth`,
  IMAGES_URL: `${BACKEND_URL}/images`
};

export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  return `${BACKEND_URL}/images/${imagePath.replace('uploads/', '')}`;
};