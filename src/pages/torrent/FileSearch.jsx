import { useState } from 'react';
import { FaSearch, FaClipboard, FaLink, FaArrowCircleLeft, FaArrowCircleRight, FaSeedling, FaDownload, FaHdd } from 'react-icons/fa';
import axios from 'axios';
import apiUrl from '../../config/envConfig';
import './FileSearch.css'; // Ensure the CSS file exists

const FileSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    const formatSize = (sizeInBytes) => {
        if (sizeInBytes >= 1073741824) {
            return `${(sizeInBytes / 1073741824).toFixed(2)} GB`;
        } else if (sizeInBytes >= 1048576) {
            return `${(sizeInBytes / 1048576).toFixed(2)} MB`;
        } else if (sizeInBytes >= 1024) {
            return `${(sizeInBytes / 1024).toFixed(2)} KB`;
        } else {
            return `${sizeInBytes} Bytes`;
        }
    };

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        setResults([]);
        try {
            const response = await axios.get(`${apiUrl}/api/torrents/search`, {
                params: { query: searchTerm },
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            if (response.data && Array.isArray(response.data.results)) {
                setResults(response.data.results);
                setCurrentPage(1); // Reset to the first page for a new search
            } else {
                setResults([]);
                setError('No results found.');
            }
        } catch (error) {
            console.error('Search error:', error);
            setError('An error occurred while searching. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (link) => {
        navigator.clipboard.writeText(link);
        alert('Magnet link copied to clipboard!');
    };

    const paginateResults = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return results.slice(startIndex, endIndex);
    };

    const totalPages = Math.ceil(results.length / itemsPerPage);

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
    };

    return (
        <div className="file-search-container">
            <h2 className="file-search-title">Search Torrents</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="file-search-input-group mb-3">
                <input
                    type="text"
                    placeholder="Search for .torrent files"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    disabled={loading}
                    className="form-control file-search-form-control"
                />
                <button
                    onClick={handleSearch}
                    disabled={loading || !searchTerm.trim()}
                    className="file-search-btn btn-primary"
                >
                    <FaSearch /> {loading ? 'Searching...' : ''}
                </button>
            </div>

            {results.length > 0 && (
                <>
                    <l className="results-list">
                        {paginateResults().map((file) => (
                            <li key={file.id} className="result-item">
                                <h4 className="results-file-name">{file.name}</h4>
                                <span className="results-file-details-container">
                                    <div className="results-file-details">
                                        <span>
                                            <FaSeedling className="results-icon results-seeders-icon" /> {file.seeders}
                                        </span>
                                        <span>
                                            <FaDownload className="results-icon results-leechers-icon" /> {file.leechers}
                                        </span>
                                        <span>
                                            <FaHdd className="results-icon results-size-icon" /> {formatSize(file.size)}
                                        </span>
                                    </div>
                                    <div className="results-file-actions">
                                    <a
                                        href={file.magnetLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="results-magnet-link"
                                    >
                                        <FaLink />
                                    </a>
                                    <button
                                        onClick={() => copyToClipboard(file.magnetLink)}
                                        className="results-btn results-btn-link results-copy-button"
                                    >
                                        <FaClipboard />
                                    </button>
                                    </div>
                                </span>
                            </li>
                        ))}
                    </l>

                    <div className="pagination">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className="btn btn-secondary"
                        >
                            <FaArrowCircleLeft />
                        </button>
                        <span className="page-info">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="btn btn-secondary"
                        >
                            <FaArrowCircleRight />
                        </button>
                    </div>
                </>
            )}

            {results.length === 0 && !error && !loading && (
                <div className="alert alert-info">Enter a search term to find torrent files.</div>
            )}
        </div>
    );
};

export default FileSearch;
