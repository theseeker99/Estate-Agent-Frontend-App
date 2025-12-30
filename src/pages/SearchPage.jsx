import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import propertiesData from '../data/properties.json';
import PropertyCard from '../components/PropertyCard';
import { useFavorites } from '../hooks/useFavorites';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

const SearchPage = () => {
    const [allProperties] = useState(propertiesData.properties);
    const [filteredProperties, setFilteredProperties] = useState(propertiesData.properties);
    const { favorites, addFavorite, removeFavorite, clearFavorites } = useFavorites();

    const handleSearch = (criteria) => {
        const results = allProperties.filter(property => {
            const typeMatch = criteria.type === 'any' || property.type === criteria.type;
            const priceMatch = property.price >= Number(criteria.minPrice) && property.price <= Number(criteria.maxPrice);
            const bedsMatch = property.bedrooms >= Number(criteria.minBedrooms) && property.bedrooms <= Number(criteria.maxBedrooms);
            const postcodeMatch = criteria.postcode === '' || property.location.toLowerCase().includes(criteria.postcode.toLowerCase());
            let dateMatch = true;
            if (criteria.dateAfter) {
                const propDate = new Date(`${property.added.month} ${property.added.day}, ${property.added.year}`);
                const searchDate = new Date(criteria.dateAfter);
                searchDate.setHours(0, 0, 0, 0);
                dateMatch = propDate >= searchDate;
            }

            return typeMatch && priceMatch && bedsMatch && postcodeMatch && dateMatch;
        });

        setFilteredProperties(results);
    };

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;

        if (!destination) {
            if (source.droppableId === 'favorites-zone') {
                const realId = draggableId.replace('fav-', '');
                removeFavorite(realId);
            }
            return;
        }

        if (source.droppableId === 'results-list' && destination.droppableId === 'favorites-zone') {
            const property = allProperties.find(p => p.id === draggableId);
            if (property) addFavorite(property);
        }

        if (source.droppableId === 'favorites-zone' && destination.droppableId !== 'favorites-zone') {
            const realId = draggableId.replace('fav-', '');
            removeFavorite(realId);
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="search-page" style={{ display: 'flex', gap: '20px', padding: '20px' }}>

                <div style={{ flex: 3 }}>
                    <h1>Property Search</h1>
                    <SearchForm onSearch={handleSearch} />

                    <Droppable droppableId="results-list" direction="vertical">
                        {(provided) => (
                            <div
                                className="property-list-grid"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}
                            >
                                {filteredProperties.map((property, index) => (
                                    <PropertyCard key={property.id} property={property} index={index} isFavoriteItem={false} />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>

                <div style={{ flex: 1, minWidth: '300px' }}>
                    <Droppable droppableId="favorites-zone">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={{
                                    background: snapshot.isDraggingOver ? '#e6f7ff' : '#f0f0f0',
                                    padding: '20px',
                                    borderRadius: '8px',
                                    minHeight: '500px',
                                    border: '2px dashed #ccc'
                                }}
                            >
                                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'15px'}}>
                                    <h2>Favorites</h2>
                                    {favorites.length > 0 && (
                                        <button onClick={clearFavorites} style={{background:'red', color:'white', border:'none', padding:'5px 10px', cursor:'pointer', borderRadius:'4px'}}>
                                            Clear
                                        </button>
                                    )}
                                </div>

                                {favorites.length === 0 ? (
                                    <p style={{color: '#666'}}>Drag properties here to add them to your favorites.</p>
                                ) : (
                                    favorites.map((fav, index) => (
                                        <PropertyCard key={`fav-${fav.id}`} property={fav} index={index} isFavoriteItem={true} />
                                    ))
                                )}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </div>
        </DragDropContext>
    );
};

export default SearchPage;