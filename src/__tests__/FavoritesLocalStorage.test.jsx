import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FavoritesProvider } from '../context/FavoritesContext';
import { useFavorites } from '../hooks/useFavorites';

vi.mock('react-toastify', () => ({
    toast: { success: vi.fn(), warning: vi.fn() }
}));

const TestConsumer = () => {
    const { favorites, addFavorite, clearFavorites } = useFavorites();
    return (
        <div>
            <span data-testid="count">{favorites.length}</span>
            <button onClick={() => addFavorite({ id: 'p1', type: 'House' })}>Add 1</button>
            <button onClick={() => addFavorite({ id: 'p2', type: 'Flat' })}>Add 2</button>
            <button onClick={clearFavorites}>Clear</button>
        </div>
    );
};

describe('FavoritesContext LocalStorage', () => {

    beforeEach(() => localStorage.clear());

    // Test 1: Loading favorites from localStorage on mount
    it('loads existing favorites from localStorage on initial render', () => {
        localStorage.setItem('favorites', JSON.stringify([
            { id: 'saved-1', type: 'House' },
            { id: 'saved-2', type: 'Flat' }
        ]));

        render(<FavoritesProvider><TestConsumer /></FavoritesProvider>);

        expect(screen.getByTestId('count')).toHaveTextContent('2');
    });

    // Test 2: Clear favorites also clears localStorage
    it('clears localStorage when clearFavorites is called', () => {
        render(<FavoritesProvider><TestConsumer /></FavoritesProvider>);

        fireEvent.click(screen.getByText('Add 1'));
        fireEvent.click(screen.getByText('Add 2'));
        expect(JSON.parse(localStorage.getItem('favorites'))).toHaveLength(2);

        fireEvent.click(screen.getByText('Clear'));
        expect(JSON.parse(localStorage.getItem('favorites'))).toHaveLength(0);
    });
});
