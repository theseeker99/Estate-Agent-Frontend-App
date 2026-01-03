import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PropertyDetails from '../pages/PropertyDetails';

vi.mock('../data/properties.json', () => ({
    default: {
        properties: [{
            id: 'test-prop-1',
            type: 'House',
            bedrooms: 5,
            price: 850000,
            location: 'South Kensington, London SW7',
            picture: '/images/house1.jpg',
            images: [],
            description: 'A stunning Victorian house with garden.',
            tenure: 'Freehold',
            added: { month: 'November', day: 20, year: 2025 }
        }]
    }
}));

vi.mock('react-image-gallery', () => ({
    default: ({ items }) => <div data-testid="gallery">{items.length} images</div>
}));

const renderPropertyDetails = (id) => render(
    <MemoryRouter initialEntries={[`/property/${id}`]}>
        <Routes>
            <Route path="/property/:id" element={<PropertyDetails />} />
        </Routes>
    </MemoryRouter>
);

describe('PropertyDetails Page', () => {

    // Test 1: Displays property information correctly
    it('displays property price, bedrooms, and location', () => {
        renderPropertyDetails('test-prop-1');

        expect(screen.getByText(/850,000/i)).toBeInTheDocument();
        expect(screen.getByText(/5 Bedrooms/i)).toBeInTheDocument();
        expect(screen.getByText(/South Kensington, London SW7/i)).toBeInTheDocument();
    });

    // Test 2: Shows error message for invalid property ID
    it('shows not found message for non-existent property', () => {
        renderPropertyDetails('invalid-id');

        expect(screen.getByText(/Property not found/i)).toBeInTheDocument();
    });
});
