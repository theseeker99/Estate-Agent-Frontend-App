import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { FavoritesProvider } from '../context/FavoritesContext';

vi.mock('@hello-pangea/dnd', () => ({
    Draggable: ({ children }) => children({
        draggableProps: { style: {} },
        dragHandleProps: {},
        innerRef: vi.fn(),
    }, { isDragging: false }),
}));

const renderWithProviders = (ui) => render(
    <FavoritesProvider>
        <BrowserRouter>{ui}</BrowserRouter>
    </FavoritesProvider>
);

describe('PropertyCard Navigation', () => {

    beforeEach(() => localStorage.clear());

    // Test 1: View Details link has correct href for each property
    it('generates correct property detail URL based on property ID', () => {
        const property = { id: 'unique-id-123', type: 'Flat', bedrooms: 2, price: 300000, picture: '/img.jpg' };
        renderWithProviders(<PropertyCard property={property} index={0} isFavoriteItem={false} />);

        const link = screen.getByRole('link', { name: /View Details/i });
        expect(link).toHaveAttribute('href', '/property/unique-id-123');
    });

    // Test 2: Property image displays with correct alt text
    it('displays property image with type as alt text', () => {
        const property = { id: 'p1', type: 'House', bedrooms: 3, price: 450000, picture: '/house.jpg' };
        renderWithProviders(<PropertyCard property={property} index={0} isFavoriteItem={false} />);

        const image = screen.getByAltText('House');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', '/house.jpg');
    });
});
