import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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

const mockProperty = {
    id: "test-prop-1",
    type: "House",
    bedrooms: 4,
    price: 750000,
    location: "London, BR1",
    picture: "/images/house1.jpg",
    added: { month: "December", day: 15, year: 2025 }
};

const renderWithProviders = (ui) => render(
    <FavoritesProvider>
        <BrowserRouter>{ui}</BrowserRouter>
    </FavoritesProvider>
);

describe('PropertyCard Component', () => {

    beforeEach(() => localStorage.clear());

    // Test 1: Displays property information correctly
    it('displays property type, bedrooms, and formatted price', () => {
        renderWithProviders(<PropertyCard property={mockProperty} index={0} isFavoriteItem={false} />);

        expect(screen.getByText(/House - 4 Bed/i)).toBeInTheDocument();
        expect(screen.getByText(/£750,000/i)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /View Details/i })).toHaveAttribute('href', '/property/test-prop-1');
    });

    // Test 2: Toggle favorite button changes state
    it('clicking heart button toggles favorite status', () => {
        renderWithProviders(<PropertyCard property={mockProperty} index={0} isFavoriteItem={false} />);

        const heartBtn = screen.getByTitle(/Add/i);
        fireEvent.click(heartBtn);

        expect(screen.getByTitle(/Remove/i)).toBeInTheDocument();
    });
});
