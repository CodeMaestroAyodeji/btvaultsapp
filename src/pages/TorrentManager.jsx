// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';  
import FileSearch from '../pages/torrent/FileSearch';  
import MagnetLinkInput from '../pages/torrent/MagnetLinkInput';  
import FileUpload from '../pages/torrent/FileUpload';  
import '../assets/css/TorrentManager.css'; 

const TorrentManager = () => {  
  const [currentPage, setCurrentPage] = useState(1);  
  const itemsPerPage = 10;  

  return (  
    <div className="container">  
      <h1 className="text-center mb-4">Torrent Manager</h1>  

      <div className="card">  
        <MagnetLinkInput />  
      </div>  

      <div className="card">  
        <FileUpload />  
      </div>  

      <div className="card">  
        <FileSearch currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} />  
      </div>  
    </div>  
  );  
};  

export default TorrentManager;
