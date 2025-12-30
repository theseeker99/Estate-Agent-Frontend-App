import React from 'react';
import { Link } from 'react-router-dom';
import { Draggable } from '@hello-pangea/dnd';
import { useFavorites } from '../hooks/useFavorites';
import { DraggablePortal } from './DraggablePortal';

const PropertyCard = ({ property, index, isFavoriteItem }) => {
    const { addFavorite, removeFavorite, favorites } = useFavorites();

    const isFav = favorites.some(fav => fav.id === property.id);

    const toggleFavorite = (e) => {
        e.preventDefault();
        if (isFav) {
            removeFavorite(property.id);
        } else {
            addFavorite(property);
        }
    };

    const draggableId = isFavoriteItem ? `fav-${property.id}` : property.id;

    return (
        <Draggable draggableId={draggableId} index={index}>
            {(provided, snapshot) => (
                <DraggablePortal snapshot={snapshot}>
                    <div
                        className="property-card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                            ...provided.draggableProps.style,

                            position: 'relative',
                            marginBottom: '20px',
                            background: 'white',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            overflow: 'hidden',

                            ...(snapshot.isDragging && {
                                boxShadow: '0 12px 24px rgba(0,0,0,0.25)',
                                transform: `${provided.draggableProps.style?.transform || ''} rotate(2deg)`,
                            }),
                        }}
                    >
                        <button
                            onClick={toggleFavorite}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                background: 'rgba(255,255,255,0.8)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '35px',
                                height: '35px',
                                cursor: 'pointer',
                                fontSize: '1.2rem',
                                zIndex: 10
                            }}
                            title={isFav ? "Remove" : "Add"}
                        >
                            {isFav ? '❤️' : '🤍'}
                        </button>

                        <img
                            src={property.picture}
                            alt={property.type}
                            className="property-image"
                            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                            onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=No+Image' }}
                        />

                        <div className="property-info" style={{ padding: '15px' }}>
                            <h3>{property.type} - {property.bedrooms} Bed</h3>
                            <p className="price">£{property.price.toLocaleString()}</p>
                            <Link to={`/property/${property.id}`}>
                                <button style={{ cursor: 'pointer', padding: '5px 10px' }}>View Details</button>
                            </Link>
                        </div>
                    </div>
                </DraggablePortal>
            )}
        </Draggable>
    );
};

export default PropertyCard;