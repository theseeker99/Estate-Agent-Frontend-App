import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FavoritesProvider } from '../context/FavoritesContext';
import { useFavorites } from '../hooks/useFavorites';

vi.mock('react-toastify', () => ({
    toast: { success: vi.fn(), warning: vi.fn() }
}));

const TestConsumer = () => {
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const testProperty = { id: 'prop-1', type: 'House', price: 500000 };

    return (
        <div>
            <span data-testid="count">{favorites.length}</span>
            <button onClick={() => addFavorite(testProperty)}>Add</button>
            <button onClick={() => removeFavorite('prop-1')}>Remove</button>
        </div>
    );
};

describe('FavoritesContext', () => {

    beforeEach(() => localStorage.clear());

    // Test 1: Adding and removing favorites works correctly
    it('adds and removes properties from favorites', () => {
        render(<FavoritesProvider><TestConsumer /></FavoritesProvider>);

        expect(screen.getByTestId('count')).toHaveTextContent('0');
        fireEvent.click(screen.getByText('Add'));
        expect(screen.getByTestId('count')).toHaveTextContent('1');
        fireEvent.click(screen.getByText('Remove'));
        expect(screen.getByTestId('count')).toHaveTextContent('0');
    });

    // Test 2: Favorites persist to localStorage
    it('persists favorites to localStorage', () => {
        render(<FavoritesProvider><TestConsumer /></FavoritesProvider>);

        fireEvent.click(screen.getByText('Add'));

        const stored = JSON.parse(localStorage.getItem('favorites'));
        expect(stored).toHaveLength(1);
        expect(stored[0].id).toBe('prop-1');
    });
});
