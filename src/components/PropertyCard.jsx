import React from 'react';

const PropertyCard = ({ property }) => {
    return (
        <div className="property-card">
            <img
                src={property.picture}
                alt={property.type}
                className="property-image"
                onError={(e) => {e.target.src = 'https://placehold.co/600x400?text=No+Image'}}
            />

            <div className="property-info">
                <h3>{property.type} - {property.bedrooms} Bed</h3>
                <p className="price">£{property.price.toLocaleString()}</p>
                <p className="location">{property.location}</p>
                <p className="description">{property.description.substring(0, 100)}...</p>

                <button>View Details</button>
            </div>
        </div>
    );
};

export default PropertyCard;