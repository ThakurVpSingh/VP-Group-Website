export const getApiUrl = (endpoint) => {
  const BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000'
    : 'https://vp-group-website.onrender.com';
  
  return `${BASE_URL}${endpoint}`;
};
