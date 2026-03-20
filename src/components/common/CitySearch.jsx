import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import './CitySearch.css';

const CitySearch = () => {
    const [city, setCity] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for city:', city);
        // Implement search logic here, e.g., redirect to /buy-rent?city=...
    };

    return (
        <form className="city-search" onSubmit={handleSearch}>
            <div className="search-input-container">
                <MapPin className="pin-icon" size={18} />
                <input
                    type="text"
                    placeholder="Search city..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="city-input"
                />
            </div>
            <button type="submit" className="city-search-btn">
                <Search size={16} />
                <span>Search</span>
            </button>
        </form>
    );
};

export default CitySearch;
