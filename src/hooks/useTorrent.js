// src/hooks/useTorrent.js

import { useState } from 'react';
import { pauseTorrent, resumeTorrent, stopTorrent, downloadTorrent } from '../api/torrentService';

export const useTorrent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePause = async (torrentId) => {
    try {
      setLoading(true);
      setError(null);
      const result = await pauseTorrent(torrentId);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleResume = async (torrentId) => {
    try {
      setLoading(true);
      setError(null);
      const result = await resumeTorrent(torrentId);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleStop = async (torrentId) => {
    try {
      setLoading(true);
      setError(null);
      const result = await stopTorrent(torrentId);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (torrentId) => {
    try {
      setLoading(true);
      setError(null);
      const fileBlob = await downloadTorrent(torrentId);
      const url = window.URL.createObjectURL(new Blob([fileBlob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${torrentId}.zip`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handlePause,
    handleResume,
    handleStop,
    handleDownload,
  };
};
