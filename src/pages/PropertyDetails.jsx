import React from 'react';
import ImageGallery from 'react-image-gallery';
import { useParams, Link } from 'react-router-dom';
import propertiesData from '../data/properties.json';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FaArrowLeft, FaFileAlt, FaLayerGroup, FaMapMarkedAlt, FaBed, FaMapMarkerAlt, FaPoundSign, FaCalendarAlt, FaCheck } from 'react-icons/fa';

import '../styles/pages/PropertyDetails.css';
import 'react-tabs/style/react-tabs.css';
import 'react-image-gallery/styles/css/image-gallery.css';

const PropertyDetails = () => {
    const { id } = useParams();
    const property = propertiesData.properties.find(p => p.id === id);

    if (!property) {
        return <div className="container">Property not found</div>;
    }
    const allImages = [property.picture, ...(property.images || [])];

    const galleryImages = allImages.map(img => {
        const fixedPath = (img.startsWith('/') || img.startsWith('http')) ? img : `/${img}`;
        return { original: fixedPath, thumbnail: fixedPath };
    });

    return (
        <div className="property-details-container">
            <Link to="/" className="back-link">
                <FaArrowLeft /> Back to Results
            </Link>

            <div className="property-header">
                <h1><FaBed /> {property.type} - {property.bedrooms} Bedrooms</h1>
                <h2><FaPoundSign /> {property.price.toLocaleString()}</h2>
                <p className="location"><FaMapMarkerAlt /> {property.location}</p>
            </div>

            <div className="gallery-section">
                <ImageGallery items={galleryImages} showPlayButton={false} />
            </div>

            <div className="info-tabs">
                <Tabs>
                    <TabList>
                        <Tab><FaFileAlt /> Description</Tab>
                        <Tab><FaLayerGroup /> Floor Plan</Tab>
                        <Tab><FaMapMarkedAlt /> Map</Tab>
                    </TabList>

                    <TabPanel>
                        <div className="tab-content">
                            <h3><FaFileAlt /> Property Description</h3>
                            <p>{property.description}</p>
                            <p><FaCheck className="info-icon" /> <strong>Tenure:</strong> {property.tenure}</p>
                            <p><FaCalendarAlt className="info-icon" /> <strong>Added:</strong> {property.added.day} {property.added.month} {property.added.year}</p>
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div className="tab-content center-content">
                            {property.floorPlan ? (
                                <img
                                    src={property.floorPlan}
                                    alt="Property Floor Plan"
                                    style={{ maxWidth: '100%', height: 'auto' }}
                                />
                            ) : (
                                <p>No floor plan available for this property.</p>
                            )}
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div className="tab-content no-padding">
                            {property.googleMap ? (
                                <iframe
                                    src={property.googleMap}
                                    width="100%"
                                    height="450"
                                    style={{ border: 0, display: 'block' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Property Location"
                                ></iframe>
                            ) : (
                                <div style={{ padding: '20px', textAlign: 'center' }}>
                                    <p>Map location not available.</p>
                                </div>
                            )}
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default PropertyDetails;