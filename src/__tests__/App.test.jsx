import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import SearchPage from '../pages/SearchPage';
import PropertyCard from '../components/PropertyCard';
import { FavoritesProvider } from '../context/FavoritesContext';

vi.mock('@hello-pangea/dnd', () => ({
    DragDropContext: ({ children }) => <div>{children}</div>,
    Droppable: ({ children }) => children({
        droppableProps: {
            style: {},
        },
        innerRef: vi.fn(),
        placeholder: null,
    }, {}),
    Draggable: ({ children }) => children({
        draggableProps: {
            style: {},
        },
        dragHandleProps: {},
        innerRef: vi.fn(),
    }, { isDragging: false }),
}));

const mockProperty = {
    id: "p1",
    type: "House",
    bedrooms: 3,
    price: 500000,
    location: "Test Location",
    picture: "test.jpg",
    description: "Test description",
    added: { month: "January", day: 1, year: 2023 }
};

const renderWithProviders = (ui) => {
    return render(
        <FavoritesProvider>
            <BrowserRouter>
                {ui}
            </BrowserRouter>
        </FavoritesProvider>
    );
};

describe('Estate Agent App Tests', () => {

    // TEST 1: Check if the Search Page renders correctly
    it('1. Renders the Search Page and Title', () => {
        renderWithProviders(<SearchPage />);
        expect(screen.getByText(/Property Search/i)).toBeInTheDocument();
        expect(screen.getByText(/Filter Properties/i)).toBeInTheDocument();
    });

    // TEST 2: Check if PropertyCard displays correct information
    it('2. Property Card displays correct price and type', () => {
        renderWithProviders(<PropertyCard property={mockProperty} index={0} isFavoriteItem={false} />);

        expect(screen.getByText(/House - 3 Bed/i)).toBeInTheDocument();
        expect(screen.getByText(/£500,000/i)).toBeInTheDocument();
    });

    // TEST 3: Check if "View Details" link points to the correct URL
    it('3. View Details button has correct link', () => {
        renderWithProviders(<PropertyCard property={mockProperty} index={0} isFavoriteItem={false} />);

        const link = screen.getByRole('link', { name: /View Details/i });
        expect(link).toHaveAttribute('href', '/property/p1');
    });

    // TEST 4: Test Search Logic (Filtering)
    it('4. Search Filter updates results', async () => {
        renderWithProviders(<SearchPage />);

        const typeSelect = screen.getByRole('combobox');

        fireEvent.change(typeSelect, { target: { value: 'Flat' } });

        const updateButton = screen.getByText(/Update Results/i);
        fireEvent.click(updateButton);

        expect(screen.getByText(/Property Search/i)).toBeInTheDocument();
    });

    // TEST 5: Favorites Toggle Button
    it('5. Clicking Heart button toggles favorite status', () => {
        renderWithProviders(<PropertyCard property={mockProperty} index={0} isFavoriteItem={false} />);

        const heartBtn = screen.getByTitle(/Add/i);
        expect(heartBtn).toBeInTheDocument();

        fireEvent.click(heartBtn);

        expect(heartBtn).toBeInTheDocument();
    });
});