// Property details page
import React from 'react';
import ImageGallery from 'react-image-gallery';
import { useParams, Link } from 'react-router-dom';
import propertiesData from '../data/properties.json';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FaArrowLeft, FaFileAlt, FaLayerGroup, FaMapMarkedAlt, FaBed, FaMapMarkerAlt, FaPoundSign, FaCalendarAlt, FaCheck, FaHome } from 'react-icons/fa';

import '../styles/pages/PropertyDetails.css';
import 'react-tabs/style/react-tabs.css';
import 'react-image-gallery/styles/css/image-gallery.css';

// Single property view
const PropertyDetails = () => {
    const { id } = useParams();
    const property = propertiesData.properties.find(p => p.id === id);

    // Handle not found
    if (!property) {
        return <div className="container">Property not found</div>;
    }

    // Combine all images
    const allImages = [property.picture, ...(property.images || [])];
    const galleryImages = allImages.map(img => {
        const fixedPath = (img.startsWith('/') || img.startsWith('http')) ? img : `/${img}`;
        return { original: fixedPath, thumbnail: fixedPath };
    });

    return (
        <div className="property-details-container">
            {/* Back navigation */}
            <Link to="/" className="back-link">
                <FaArrowLeft /> Back to Results
            </Link>

            <div className="property-details-layout">
                {/* Image gallery column */}
                <div className="gallery-column">
                    <div className="gallery-sticky">
                        <ImageGallery
                            items={galleryImages}
                            showPlayButton={false}
                            showFullscreenButton={true}
                            showNav={true}
                            lazyLoad={true}
                        />
                    </div>
                </div>

                {/* Details column */}
                <div className="details-column">
                    {/* Quick info card */}
                    <div className="property-quick-info">
                        <div className="quick-info-badges">
                            <span className="info-badge type-badge">
                                <FaHome /> {property.type}
                            </span>
                            <span className="info-badge beds-badge">
                                <FaBed /> {property.bedrooms} Bedrooms
                            </span>
                        </div>
                        <h1 className="property-price">
                            <FaPoundSign /> {property.price.toLocaleString()}
                        </h1>
                        <p className="property-location">
                            <FaMapMarkerAlt /> {property.location}
                        </p>
                    </div>

                    {/* Info tabs */}
                    <div className="info-tabs">
                        <Tabs>
                            <TabList>
                                <Tab><FaFileAlt /> Description</Tab>
                                <Tab><FaLayerGroup /> Floor Plan</Tab>
                                <Tab><FaMapMarkedAlt /> Map</Tab>
                            </TabList>

                            {/* Description tab */}
                            <TabPanel>
                                <div className="tab-content">
                                    <h3><FaFileAlt /> Property Description</h3>
                                    <p className="description-text">{property.description}</p>
                                    <div className="property-meta">
                                        <p><FaCheck className="info-icon" /> <strong>Tenure:</strong> {property.tenure}</p>
                                        <p><FaCalendarAlt className="info-icon" /> <strong>Added:</strong> {property.added.day} {property.added.month} {property.added.year}</p>
                                    </div>
                                </div>
                            </TabPanel>

                            {/* Floor plan tab */}
                            <TabPanel>
                                <div className="tab-content center-content">
                                    {property.floorPlan ? (
                                        <img
                                            src={property.floorPlan}
                                            alt="Property Floor Plan"
                                            className="floor-plan-image"
                                        />
                                    ) : (
                                        <div className="no-content-message">
                                            <FaLayerGroup />
                                            <p>No floor plan available for this property.</p>
                                        </div>
                                    )}
                                </div>
                            </TabPanel>

                            {/* Map tab */}
                            <TabPanel>
                                <div className="tab-content no-padding">
                                    {property.googleMap ? (
                                        <iframe
                                            src={property.googleMap}
                                            width="100%"
                                            height="450"
                                            className="map-iframe"
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title="Property Location"
                                        ></iframe>
                                    ) : (
                                        <div className="no-content-message with-padding">
                                            <FaMapMarkedAlt />
                                            <p>Map location not available.</p>
                                        </div>
                                    )}
                                </div>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;