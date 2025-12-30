import Slider from 'rc-slider';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import './SearchForm.css';
import 'rc-slider/assets/index.css';
import 'react-datepicker/dist/react-datepicker.css';

const SearchForm = ({ onSearch }) => {
    const [type, setType] = useState('any');
    const [priceRange, setPriceRange] = useState([0, 1000000]);
    const [minBedrooms, setMinBedrooms] = useState(0);
    const [maxBedrooms, setMaxBedrooms] = useState(10);
    const [postcode, setPostcode] = useState('');
    const [dateAfter, setDateAfter] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({
            type,
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            minBedrooms,
            maxBedrooms,
            postcode,
            dateAfter
        });
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <h3>Filter Properties</h3>

            <div className="form-group">
                <label>Type:</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="any">Any</option>
                    <option value="House">House</option>
                    <option value="Flat">Flat</option>
                </select>
            </div>

            <div className="form-group">
                <label>Price Range: £{priceRange[0].toLocaleString()} - £{priceRange[1].toLocaleString()}</label>
                <div style={{ marginTop: '10px' }}>
                    <Slider
                        range
                        min={0}
                        max={1000000}
                        step={10000}
                        defaultValue={[0, 1000000]}
                        value={priceRange}
                        onChange={(value) => setPriceRange(value)}
                    />
                </div>
            </div>

            <div className="form-group">
                <label>Bedrooms: </label>
                <div className="bedroom-inputs">
                    <input
                        type="number"
                        placeholder="Min"
                        value={minBedrooms}
                        onChange={(e) => setMinBedrooms(e.target.value)}
                    />
                    <span>to</span>
                    <input
                        type="number"
                        placeholder="Max"
                        value={maxBedrooms}
                        onChange={(e) => setMaxBedrooms(e.target.value)}
                    />
                </div>
            </div>

            <div className="form-group">
                <label>Postcode Area: </label>
                <input
                    type="text"
                    placeholder="e.g. BR1"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Added After:</label>
                <DatePicker
                    selected={dateAfter}
                    onChange={(date) => setDateAfter(date)}
                    dateFormat="yyyy/MM/dd"
                    placeholderText="Select a date"
                    className="date-picker-input"
                />
            </div>

            <button type="submit" className="search-submit-btn">
                Update Results
            </button>
        </form>
    );
};

export default SearchForm;