import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PropertyDetails from '../pages/PropertyDetails';

vi.mock('../data/properties.json', () => ({
    default: {
        properties: [{
            id: 'tab-test-prop',
            type: 'House',
            bedrooms: 4,
            price: 650000,
            location: 'Chelsea, London SW3',
            picture: '/images/house.jpg',
            images: ['/images/house2.jpg'],
            description: 'Beautiful Chelsea townhouse with garden.',
            tenure: 'Freehold',
            floorPlan: '/floorplans/house.jpg',
            googleMap: 'https://maps.google.com/embed?test',
            added: { month: 'December', day: 10, year: 2025 }
        }]
    }
}));

vi.mock('react-image-gallery', () => ({
    default: () => <div data-testid="gallery">Gallery</div>
}));

const renderPropertyDetails = (id) => render(
    <MemoryRouter initialEntries={[`/property/${id}`]}>
        <Routes>
            <Route path="/property/:id" element={<PropertyDetails />} />
        </Routes>
    </MemoryRouter>
);

describe('PropertyDetails Tabs', () => {

    // Test 1: Description tab shows property description and tenure
    it('displays property description and tenure in Description tab', () => {
        renderPropertyDetails('tab-test-prop');

        expect(screen.getByText(/Beautiful Chelsea townhouse with garden/i)).toBeInTheDocument();
        expect(screen.getByText(/Freehold/i)).toBeInTheDocument();
    });

    // Test 2: Shows date added information
    it('displays the date when property was added', () => {
        renderPropertyDetails('tab-test-prop');

        expect(screen.getByText(/10 December 2025/i)).toBeInTheDocument();
    });
});
