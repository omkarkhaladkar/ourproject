import React, { useMemo, useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { buildSearchQueryString, parseSearchParams } from '../../utils/queryParams';
import './CitySearch.css';

const CitySearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const routeFilters = useMemo(() => parseSearchParams(new URLSearchParams(location.search)), [location.search]);
  const [city, setCity] = useState(routeFilters.city || '');

  const handleSearch = (event) => {
    event.preventDefault();
    const targetPath = location.pathname.startsWith('/rent') ? '/rent' : '/buy';
    const queryString = buildSearchQueryString({ ...routeFilters, city, intent: targetPath === '/rent' ? 'rent' : 'sell' });
    navigate(`${targetPath}?${queryString}`);
  };

  return (
    <form className="city-search" onSubmit={handleSearch}>
      <div className="search-input-container">
        <MapPin className="pin-icon" size={18} />
        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(event) => setCity(event.target.value)}
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
