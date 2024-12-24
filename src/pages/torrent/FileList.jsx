import { useEffect, useState } from 'react';  
import axios from 'axios';  
import apiUrl from '../../config/envConfig';  
import { Table, Pagination, Card, Spinner, Button, ProgressBar } from 'react-bootstrap';  
import { FaTrash, FaSeedling, FaHdd, FaDownload, FaCompress, FaPlay, FaPause, FaStop, FaRegMinusSquare, FaRegPlusSquare } from 'react-icons/fa';  
import './Files.css';  

const Files = () => {  
    const [files, setFiles] = useState([]);  
    const [stats, setStats] = useState({
        downloadedFiles: { count: 0, totalSize: '0B' },
        undownloadedFiles: { count: 0, totalSize: '0B' }
    });
    const [loading, setLoading] = useState(true);  
    const [currentPage, setCurrentPage] = useState(1);  
    const itemsPerPage = 10;  
    const [downloadedVisible, setDownloadedVisible] = useState(true);  
    const [undownloadedVisible, setUndownloadedVisible] = useState(true);  

    const fetchFiles = async () => {  
        try {  
            const response = await axios.get(`${apiUrl}/api/torrents`, {  
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },  
            });  
            setFiles(response.data.results);
            setStats(response.data.stats);
        } catch (error) {  
            console.error('Error fetching files:', error);  
        } finally {  
            setLoading(false);  
        }  
    };  

    useEffect(() => {  
        fetchFiles();  
    }, []);  

    const handleStart = async (id) => {
        try {
            await axios.post(`${apiUrl}/api/torrents/start/${id}`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            fetchFiles();
        } catch (error) {
            console.error('Error starting torrent:', error);
        }
    };

    const handlePause = async (id) => {
        try {
            await axios.post(`${apiUrl}/api/torrents/pause/${id}`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            fetchFiles();
        } catch (error) {
            console.error('Error pausing torrent:', error);
        }
    };

    const handleStop = async (id) => {
        try {
            await axios.post(`${apiUrl}/api/torrents/cancel/${id}`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            fetchFiles();
        } catch (error) {
            console.error('Error stopping torrent:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiUrl}/api/torrents/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            fetchFiles();
        } catch (error) {
            console.error('Error deleting torrent:', error);
        }
    };

    const handleDownload = async (id) => {
        try {
            const response = await axios.get(`${apiUrl}/api/files/${id}/download`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                responseType: 'blob'
            });
            
            // Create blob link to download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `torrent-${id}.zip`); // You might want to use actual filename
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading torrent:', error);
        }
    };

    const handleZipDownload = async (id) => {
        try {
            const response = await axios.get(`${apiUrl}/api/files/${id}/zip-download`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                responseType: 'blob'
            });
            
            // Create blob link to download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `torrent-${id}.zip`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading zip:', error);
        }
    };

    const downloadedFiles = files.filter(file => file.status === 'completed');  
    const undownloadedFiles = files.filter(file => ['paused', 'stopped', 'queued', 'downloading'].includes(file.status));  

    const handlePageChange = (page) => {  
        setCurrentPage(page);  
    };  

    // Rest of the component remains the same...
    return (  
        <Card className="mb-4">  
            <Card.Body>  
                <h3>My Files</h3>  
                {loading ? (  
                    <div className="text-center">  
                        <Spinner animation="border" />  
                        <p>Loading files...</p>  
                    </div>  
                ) : (  
                    <>  
                        <div className="category-container">  
                            <div className="category-header" onClick={() => setDownloadedVisible(!downloadedVisible)}>   
                                <Button variant="link" className='category-header-button'>
                                    {downloadedVisible ? <FaRegMinusSquare /> : <FaRegPlusSquare />}
                                </Button>  
                                <h5>Downloaded Files ({stats.downloadedFiles.count}) - Total Size: {stats.downloadedFiles.totalSize}</h5>  
                            </div>  
                            {downloadedVisible && (  
                                <Table striped bordered hover responsive>  
                                    <thead>  
                                        <tr>  
                                            <th>#</th>  
                                            <th>File Name</th>  
                                            <th>Size</th>  
                                            <th>Seeders</th>  
                                            <th>Leechers</th>  
                                            <th>Status</th>  
                                            <th>Actions</th>  
                                        </tr>  
                                    </thead>  
                                    <tbody>  
                                        {downloadedFiles.map((file, index) => (  
                                            <tr key={file._id}>  
                                                <td>{index + 1}</td>  
                                                <td>{file.fileName || 'Unknown File'}</td>  
                                                <td>{file.formattedSize || '0B'} <FaHdd className="results-icon results-size-icon" /></td>  
                                                <td>{file.seeders || 0} <FaSeedling className="results-icon results-seeders-icon" /></td>  
                                                <td>{file.leechers || 0} <FaDownload className="results-icon results-leechers-icon" /></td>  
                                                <td>{file.status}</td>  
                                                <td className='action-data'>  
                                                    <Button variant="danger" onClick={() => handleDelete(file._id)}><FaTrash /></Button>  
                                                    <Button variant="primary" onClick={() => handleDownload(file._id)}><FaDownload /></Button>  
                                                    <Button variant="info" onClick={() => handleZipDownload(file._id)}><FaCompress /></Button>  
                                                </td>  
                                            </tr>  
                                        ))}  
                                    </tbody>  
                                </Table>  
                            )}  
                        </div>  

                        <div className="category-container">  
                            <div className="category-header" onClick={() => setUndownloadedVisible(!undownloadedVisible)}>  
                                <Button variant="link" className='category-header-button'>
                                    {undownloadedVisible ? <FaRegMinusSquare /> : <FaRegPlusSquare />}
                                </Button>  
                                <h5>Undownloaded Files ({stats.undownloadedFiles.count}) - Total Size: {stats.undownloadedFiles.totalSize}</h5>  
                            </div>  
                            {undownloadedVisible && (  
                                <Table striped bordered hover responsive>  
                                    <thead>  
                                        <tr>  
                                            <th>#</th>  
                                            <th>File Name</th>  
                                            <th>Size</th>  
                                            <th>Seeders</th>  
                                            <th>Leechers</th>  
                                            <th>Status</th>  
                                            <th>Progress</th>  
                                            <th>Actions</th>  
                                        </tr>  
                                    </thead>  
                                    <tbody>  
                                        {undownloadedFiles.map((file, index) => (  
                                            <tr key={file._id}>  
                                                <td>{index + 1}</td>  
                                                <td>{file.fileName || 'Unknown File'}</td>  
                                                <td>{file.formattedSize || '0B'} <FaHdd className="results-icon results-size-icon" /></td>  
                                                <td>{file.seeders || 0} <FaSeedling className="results-icon results-seeders-icon" /></td>  
                                                <td>{file.leechers || 0} <FaDownload className="results-icon results-leechers-icon" /></td>  
                                                <td>{file.status}</td>  
                                                <td>  
                                                    <ProgressBar 
                                                        now={file.progress} 
                                                        label={`${file.progress}%`} 
                                                        variant={file.progress < 50 ? 'danger' : file.progress < 100 ? 'warning' : 'success'} 
                                                    />  
                                                </td>  
                                                <td className='action-data'>  
                                                    <Button variant="danger" onClick={() => handleDelete(file._id)}><FaTrash /></Button>  
                                                    <Button variant="success" onClick={() => handleStart(file._id)}><FaPlay /></Button>  
                                                    <Button variant="warning" onClick={() => handlePause(file._id)}><FaPause /></Button>  
                                                    <Button variant="secondary" onClick={() => handleStop(file._id)}><FaStop /></Button>  
                                                </td>  
                                            </tr>  
                                        ))}  
                                    </tbody>  
                                </Table>  
                            )}  
                        </div>  

                        <Pagination className="justify-content-center">  
                            {[...Array(Math.ceil(files.length / itemsPerPage))].map((_, index) => (  
                                <Pagination.Item 
                                    key={index} 
                                    active={index + 1 === currentPage} 
                                    onClick={() => handlePageChange(index + 1)}
                                >  
                                    {index + 1}  
                                </Pagination.Item>  
                            ))}  
                        </Pagination>  
                    </>  
                )}  
            </Card.Body>  
        </Card>  
    );  
};  

export default Files;