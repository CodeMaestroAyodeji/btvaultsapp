// src/config/.envConfig.js

const apiUrl =  
  import.meta.env.MODE === 'production'
    ? 'https://torrent-caching-backend.vercel.app' // Production URL  
    : import.meta.env.VITE_API_URL || 'http://localhost:5000'; // Development URL  

export default apiUrl;
