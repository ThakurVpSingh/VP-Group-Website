export const getApiUrl = (endpoint) => {
  const isLocal = window.location.hostname === 'localhost' || 
                  window.location.hostname === '127.0.0.1' || 
                  window.location.hostname.startsWith('192.168.');
                  
  const BASE_URL = isLocal 
    ? 'http://localhost:5000'
    : 'https://vp-group-website.onrender.com';
  
  return `${BASE_URL}${endpoint}`;
};
