import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchPage from '../pages/SearchPage';
import { FavoritesProvider } from '../context/FavoritesContext';

vi.mock('@hello-pangea/dnd', () => ({
    DragDropContext: ({ children }) => <div>{children}</div>,
    Droppable: ({ children }) => children({
        droppableProps: { style: {} },
        innerRef: vi.fn(),
        placeholder: null,
    }, {}),
    Draggable: ({ children }) => children({
        draggableProps: { style: {} },
        dragHandleProps: {},
        innerRef: vi.fn(),
    }, { isDragging: false }),
}));

vi.mock('react-toastify', () => ({
    toast: { success: vi.fn(), warning: vi.fn() }
}));

const renderSearchPage = () => render(
    <FavoritesProvider>
        <BrowserRouter><SearchPage /></BrowserRouter>
    </FavoritesProvider>
);

describe('SearchPage Component', () => {

    // Test 1: Renders page with all main sections
    it('renders the search page with title, filters, and favorites section', () => {
        renderSearchPage();

        expect(screen.getByRole('heading', { name: /Property Search/i })).toBeInTheDocument();
        expect(screen.getByText(/Filter Properties/i)).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Favorites/i })).toBeInTheDocument();
    });

    // Test 2: Displays property cards from data
    it('displays property cards on initial load', () => {
        renderSearchPage();

        const viewDetailsButtons = screen.getAllByText(/View Details/i);
        expect(viewDetailsButtons.length).toBeGreaterThan(0);
    });
});
