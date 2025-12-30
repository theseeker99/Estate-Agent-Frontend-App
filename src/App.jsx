import './index.css';
import React from 'react';
import SearchPage from './pages/SearchPage';
import PropertyDetails from './pages/PropertyDetails';
import { FavoritesProvider } from './context/FavoritesContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <FavoritesProvider>
            <Router>
                <div className="app-container">
                    <Routes>
                        <Route path="/" element={<SearchPage />} />

                        <Route path="/property/:id" element={<PropertyDetails />} />
                    </Routes>
                </div>
            </Router>
        </FavoritesProvider>
    );
}

// Favicon link: https://www.flaticon.com/free-icons/real-estate-agent
// Images from free to use sites: https://pexels.com, https://unsplash.com

export default App;