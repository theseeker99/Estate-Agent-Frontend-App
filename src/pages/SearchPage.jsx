import '../styles/pages/SearchPage.css';
import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import propertiesData from '../data/properties.json';
import PropertyCard from '../components/PropertyCard';
import { useFavorites } from '../hooks/useFavorites';
import { motion as Motion } from 'framer-motion';
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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
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
            <div className="search-page">

                <aside className="filter-sidebar">
                    <SearchForm onSearch={handleSearch} />
                </aside>

                <div className="search-results-section">
                    <h1>Property Search</h1>

                    <Droppable droppableId="results-list" direction="vertical">
                        {(provided) => (
                            <Motion.div
                                key={filteredProperties.map(p => p.id).join('-')}
                                className="property-list-grid"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {filteredProperties.map((property, index) => (
                                    <Motion.div key={property.id} variants={itemVariants} layout>
                                        <PropertyCard property={property} index={index} isFavoriteItem={false} />
                                    </Motion.div>
                                ))}
                                {provided.placeholder}
                            </Motion.div>
                        )}
                    </Droppable>
                </div>

                {/* Right Sidebar - Favorites */}
                <div className="favorites-sidebar">
                    <Droppable droppableId="favorites-zone">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={`favorites-sidebar-content ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                            >
                                <div className="favorites-header">
                                    <h2>Favorites</h2>
                                    {favorites.length > 0 && (
                                        <button onClick={clearFavorites} className="clear-btn">
                                            Clear
                                        </button>
                                    )}
                                </div>

                                {favorites.length === 0 ? (
                                    <p className="favorites-placeholder">Drag properties here or click `❤️` to add them to your favorites.</p>
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