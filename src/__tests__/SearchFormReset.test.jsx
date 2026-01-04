import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from '../components/SearchForm';

describe('SearchForm Reset Functionality', () => {

    // Test 1: Reset button clears type filter
    it('resets property type filter to default "any" value', () => {
        const mockOnSearch = vi.fn();
        render(<SearchForm onSearch={mockOnSearch} />);

        const typeSelect = screen.getByRole('combobox');
        fireEvent.change(typeSelect, { target: { value: 'Flat' } });
        expect(typeSelect.value).toBe('Flat');

        fireEvent.click(screen.getByText(/Reset Filters/i));
        expect(typeSelect.value).toBe('any');
    });

    // Test 2: Reset button clears postcode input
    it('resets postcode input to empty string', () => {
        const mockOnSearch = vi.fn();
        render(<SearchForm onSearch={mockOnSearch} />);

        const postcodeInput = screen.getByPlaceholderText(/e.g. BR1/i);
        fireEvent.change(postcodeInput, { target: { value: 'SW1' } });
        expect(postcodeInput.value).toBe('SW1');

        fireEvent.click(screen.getByText(/Reset Filters/i));
        expect(postcodeInput.value).toBe('');
    });
});
