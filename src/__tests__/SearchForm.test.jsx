import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from '../components/SearchForm';

describe('SearchForm Component', () => {

    // Test 1: Form renders with all filter fields
    it('renders all filter inputs correctly', () => {
        const mockOnSearch = vi.fn();
        render(<SearchForm onSearch={mockOnSearch} />);

        expect(screen.getByRole('combobox')).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Min/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/e.g. BR1/i)).toBeInTheDocument();
        expect(screen.getByText(/Update Results/i)).toBeInTheDocument();
    });

    // Test 2: Form submits with correct criteria
    it('calls onSearch with correct filter criteria when submitted', () => {
        const mockOnSearch = vi.fn();
        render(<SearchForm onSearch={mockOnSearch} />);

        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'House' } });
        fireEvent.change(screen.getByPlaceholderText(/Min/i), { target: { value: '2' } });
        fireEvent.click(screen.getByText(/Update Results/i));

        expect(mockOnSearch).toHaveBeenCalledWith(
            expect.objectContaining({
                type: 'House',
                minBedrooms: '2'
            })
        );
    });
});
