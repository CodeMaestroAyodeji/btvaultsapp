// src/config/envConfig.jsx
 
const apiUrl = import.meta.env.MODE === 'production'   
  ? import.meta.env.VITE_PROD_API_URL   
  : import.meta.env.VITE_API_URL;  

export default apiUrl;  

// Make sure you have .env variables set up correctly as below:  
// VITE_PROD_API_URL=https://torrent-caching-backend.vercel.app  
// VITE_API_URL=http://localhost:5000
