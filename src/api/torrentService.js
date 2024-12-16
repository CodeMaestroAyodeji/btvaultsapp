// src/api/torrentService.js

import axios from 'axios';  
import apiUrl from '../config/envConfig';

// Create an Axios instance with the base URL and common headers  
const axiosInstance = axios.create({  
  baseURL: apiUrl, // Use the apiUrl from envConfig  
  headers: {  
    'Content-Type': 'application/json',  
  },  
});  

// Function to pause a torrent
export const pauseTorrent = async (torrentId) => {
  try {
    const response = await axiosInstance.post('/api/torrents/pause', { torrentId });
    return response.data;
  } catch (error) {
    console.error('Error pausing torrent:', error);
    throw error.response?.data || error;
  }
};

// Function to resume a torrent
export const resumeTorrent = async (torrentId) => {
  try {
    const response = await axiosInstance.post('/api/torrents/resume', { torrentId });
    return response.data;
  } catch (error) {
    console.error('Error resuming torrent:', error);
    throw error.response?.data || error;
  }
};

// Function to stop a torrent
export const stopTorrent = async (torrentId) => {
  try {
    const response = await axiosInstance.post('/api/torrents/stop', { torrentId });
    return response.data;
  } catch (error) {
    console.error('Error stopping torrent:', error);
    throw error.response?.data || error;
  }
};

// Function to download a torrent
export const downloadTorrent = async (torrentId) => {
  try {
    const response = await axiosInstance.get(`/api/torrents/download/${torrentId}`, {
      responseType: 'blob', // Ensure the response is treated as a file
    });
    return response.data;
  } catch (error) {
    console.error('Error downloading torrent:', error);
    throw error.response?.data || error;
  }
};
