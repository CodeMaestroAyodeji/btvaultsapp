import { useEffect, useState } from 'react';  
import axios from 'axios';  
import apiUrl from '../../config/envConfig';  
import { Table, Pagination, Card, Spinner, Button, ProgressBar } from 'react-bootstrap';  
import { FaTrash, FaDownload, FaCompress, FaPlay, FaPause, FaStop } from 'react-icons/fa';  
import './Files.css';  

const Files = () => {  
    const [files, setFiles] = useState([]);  
    const [loading, setLoading] = useState(true);  
    const [currentPage, setCurrentPage] = useState(1);  
    const itemsPerPage = 10;  
    const [downloadedVisible, setDownloadedVisible] = useState(true);  
    const [undownloadedVisible, setUndownloadedVisible] = useState(true);  

    useEffect(() => {  
        const fetchFiles = async () => {  
            try {  
                const response = await axios.get(`${apiUrl}/api/torrents/`, {  
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },  
                });
                setFiles(response.data.results);  
            } catch (error) {  
                console.error('Error fetching files:', error);  
            } finally {  
                setLoading(false);  
            }  
        };  

        fetchFiles();  
    }, []);  

    const downloadedFiles = files.filter(file => file.status === 'completed');  
    const undownloadedFiles = files.filter(file => ['paused', 'stopped', 'queued', 'downloading'].includes(file.status));  

    // Ensure size is a number and calculate total sizes
    const totalDownloadedSize = downloadedFiles.reduce((acc, file) => acc + (Number(file.size) || 0), 0);  
    const totalUndownloadedSize = undownloadedFiles.reduce((acc, file) => acc + (Number(file.size) || 0), 0);  

    const handlePageChange = (page) => {  
        setCurrentPage(page);  
    };  

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
                                <h5>Downloaded Files ({downloadedFiles.length}) - Total Size: {totalDownloadedSize} MB</h5>  
                                <Button variant="link">{downloadedVisible ? 'Hide' : 'Show'}</Button>  
                            </div>  
                            {downloadedVisible && (  
                                <Table striped bordered hover responsive>  
                                    <thead>  
                                        <tr>  
                                            <th>#</th>  
                                            <th>File Name</th>  
                                            <th>Size (MB)</th>  
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
                                                <td>{file.fileName}</td>  
                                                <td>{file.size}</td>  
                                                <td>{file.seeders}</td>  
                                                <td>{file.leechers}</td>  
                                                <td>{file.status}</td>  
                                                <td>  
                                                    <Button variant="danger" onClick={() => console.log('Delete', file._id)}><FaTrash /></Button>  
                                                    <Button variant="primary" onClick={() => console.log('Download', file._id)}><FaDownload /></Button>  
                                                    <Button variant="info" onClick={() => console.log('Zip and Download', file._id)}><FaCompress /></Button>  
                                                </td>  
                                            </tr>  
                                        ))}  
                                    </tbody>  
                                </Table>  
                            )}  
                        </div>  

                        <div className="category-container">  
                            <div className="category-header" onClick={() => setUndownloadedVisible(!undownloadedVisible)}>  
                                <h5>Undownloaded Files ({undownloadedFiles.length}) - Total Size: {totalUndownloadedSize} MB</h5>  
                                <Button variant="link">{undownloadedVisible ? 'Hide' : 'Show'}</Button>  
                            </div>  
                            {undownloadedVisible && (  
                                <Table striped bordered hover responsive>  
                                    <thead>  
                                        <tr>  
                                            <th>#</th>  
                                            <th>File Name</th>  
                                            <th>Size (MB)</th>  
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
                                                <td>{file.fileName}</td>  
                                                <td>{file.size}</td>  
                                                <td>{file.seeders}</td>  
                                                <td>{file.leechers}</td>  
                                                <td>{file.status}</td>  
                                                <td>  
                                                    <ProgressBar now={file.progress} label={`${file.progress}%`} variant={file.progress < 50 ? 'danger' : file.progress < 100 ? 'warning' : 'success'} />  
                                                </td>  
                                                <td>  
                                                    <Button variant="danger" onClick={() => console.log('Delete', file._id)}><FaTrash /></Button>  
                                                    <Button variant="success" onClick={() => console.log('Start', file._id)}><FaPlay /></Button>  
                                                    <Button variant="warning" onClick={() => console.log('Pause', file._id)}><FaPause /></Button>  
                                                    <Button variant="secondary" onClick={() => console.log('Stop', file._id)}><FaStop /></Button>  
                                                </td>  
                                            </tr>  
                                        ))}  
                                    </tbody>  
                                </Table>  
                            )}  
                        </div>  

                        <Pagination className="justify-content-center">  
                            {[...Array(Math.ceil(files.length / itemsPerPage))].map((_, index) => (  
                                <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>  
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
