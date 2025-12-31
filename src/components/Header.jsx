import React from 'react';
import '../styles/components/Header.css';
import { FaSearch } from 'react-icons/fa';

const Header = () => {
    return (
        <header className="hero-header">
            <div className="hero-content">
                <div className="hero-logo">
                    <img src="/favicon.png" alt="Prime State Logo" className="hero-logo-img" />
                </div>
                <h1 className="hero-title">Prime State</h1>
                <p className="hero-subtitle">Find Your Dream Place</p>
                <div className="hero-tagline">
                    <FaSearch className="tagline-icon" />
                    <span>Discover exceptional properties tailored to your lifestyle</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
