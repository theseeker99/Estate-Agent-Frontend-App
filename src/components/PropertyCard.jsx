import { Link } from 'react-router-dom';
import { Draggable } from '@hello-pangea/dnd';
import '../styles/components/PropertyCard.css';
import React, { useState, useEffect } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { DraggablePortal } from './DraggablePortal';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const PropertyCard = ({ property, index, isFavoriteItem }) => {
    const { addFavorite, removeFavorite, favorites } = useFavorites();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const isFav = favorites.some(fav => fav.id === property.id);

    const toggleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isFav) {
            removeFavorite(property.id);
        } else {
            addFavorite(property);
        }
    };

    const draggableId = isFavoriteItem ? `fav-${property.id}` : property.id;

    return (
        <Draggable draggableId={draggableId} index={index} isDragDisabled={isMobile}>
            {(provided, snapshot) => (
                <DraggablePortal snapshot={snapshot}>
                    <div
                        className="property-card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...(isMobile ? {} : provided.dragHandleProps)}
                        style={{
                            ...provided.draggableProps.style,
                            ...(snapshot.isDragging && {
                                zIndex: 1000,
                            }),
                        }}
                    >
                        <button
                            className="fav-btn"
                            onClick={toggleFavorite}
                            title={isFav ? "Remove from favorites" : "Add to favorites"}
                        >
                            {isFav ? <FaHeart className="fav-icon filled" /> : <FaRegHeart className="fav-icon" />}
                        </button>

                        <div className="property-image-container">
                            <img
                                src={property.picture}
                                alt={property.type}
                                className="property-image"
                                onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=No+Image' }}
                            />
                        </div>

                        <div className="property-info">
                            <h3>{property.type} - {property.bedrooms} Bed</h3>
                            <p className="price">£{property.price.toLocaleString()}</p>
                            <Link to={`/property/${property.id}`}>
                                <button className="view-details-btn">View Details</button>
                            </Link>
                        </div>
                    </div>
                </DraggablePortal>
            )}
        </Draggable>
    );
};

export default PropertyCard;