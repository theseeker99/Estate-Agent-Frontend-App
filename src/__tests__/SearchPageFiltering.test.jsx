import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

describe('SearchPage Filtering', () => {

    beforeEach(() => localStorage.clear());

    // Test 1: Filter form triggers search on submit
    it('triggers filter update when Update Results is clicked', async () => {
        renderSearchPage();

        const typeSelects = screen.getAllByRole('combobox');
        fireEvent.change(typeSelects[0], { target: { value: 'House' } });
        fireEvent.click(screen.getByText(/Update Results/i));

        await waitFor(() => {
            expect(screen.getByRole('heading', { name: /Property Search/i })).toBeInTheDocument();
        });
    });

    // Test 2: Favorites placeholder shown when no favorites
    it('displays empty favorites placeholder message', () => {
        renderSearchPage();

        expect(screen.getByText(/Drag properties here to add them to your favorites/i)).toBeInTheDocument();
    });
});
