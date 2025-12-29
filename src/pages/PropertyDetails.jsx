import React from 'react';
import { useParams, Link } from 'react-router-dom';
import propertiesData from '../data/properties.json';

const PropertyDetails = () => {
    const { id } = useParams();
    const property = propertiesData.properties.find(p => p.id === id);

    if (!property) {
        return <div>Property not found</div>;
    }

    return (
        <div className="property-details">
            <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>&larr; Back to Search</Link>
            <h1>{property.type} in {property.location}</h1>
            <p><strong>Price:</strong> £{property.price.toLocaleString()}</p>
            <p><strong>Description:</strong> {property.description}</p>
            <hr />
            <p><em>(Gallery and Tabs will go here later)</em></p>
        </div>
    );
};

export default PropertyDetails;