import React, { useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import propertiesData from '../data/properties.json';

const SearchPage = () => {
    const [properties] = useState(propertiesData.properties);

    return (
        <div className="search-page">
            <h1>Property Search</h1>

            <div className="search-filter-placeholder" style={{padding: '20px', background: '#f0f0f0', marginBottom: '20px'}}>
                <p>Search Form Component Placeholder</p>
            </div>

            <div className="property-list-grid">
                {properties.map(property => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>
        </div>
    );
};

export default SearchPage;