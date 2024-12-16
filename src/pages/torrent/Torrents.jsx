import React from 'react';
import FileUpload from './FileUpload';
import MagnetLinkInput from './MagnetLinkInput';
import FileSearch from './FileSearch';
import { Card } from 'react-bootstrap';
import './Torrents.css';

const Torrents = () => {
    return (
        <Card className="torrents-card">
            <Card.Body>
                {/* <Card.Title className="text-center">Torrents Management</Card.Title> */}
                <div className="torrents-content">
                    <MagnetLinkInput />
                     <FileUpload />
                    <FileSearch /> 
                </div>
            </Card.Body>
        </Card>
    );
};

export default Torrents;
