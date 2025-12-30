import './App.css';
import './index.css';
import React from 'react';

import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Footer from './components/Footer';
import SearchPage from './pages/SearchPage';
import ThemeToggle from './components/ThemeToggle';
import PropertyDetails from './pages/PropertyDetails';

function App() {
    return (
        <ThemeProvider>
            <FavoritesProvider>
                <Router>
                    <div className="app-container">
                        <main className="main-content">
                            <Routes>
                                <Route path="/" element={<SearchPage />} />
                                <Route path="/property/:id" element={<PropertyDetails />} />
                            </Routes>
                        </main>
                        <Footer />
                        <ThemeToggle />
                    </div>
                </Router>
            </FavoritesProvider>
        </ThemeProvider>
    );
}

// Favicon link: https://www.flaticon.com/free-icons/real-estate-agent
// Images from free to use sites: https://pexels.com, https://unsplash.com

export default App;