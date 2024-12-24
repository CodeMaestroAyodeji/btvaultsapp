// src/config/envConfig.jsx

const apiUrl = import.meta.env.MODE === 'production' 
  ? import.meta.env.VITE_API_URL 
  : import.meta.env.VITE_PROD_API_URL;

export default apiUrl;
