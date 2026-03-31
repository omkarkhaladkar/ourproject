import React from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/search/SearchBar';
import ListingsPanel from '../../components/property/ListingsPanel';
import MapPanel from '../../components/search/MapPanel';
import useProperties from '../../hooks/useProperties';
import useAuth from '../../hooks/useAuth';
import { buildPropertyApiParams, parseSearchParams } from '../../utils/queryParams';
import './BuyPage.css';

export default function BuyPage() {
  const [searchParams] = useSearchParams();
  const [hoveredPropertyId, setHoveredPropertyId] = React.useState('');
  const routeFilters = React.useMemo(() => parseSearchParams(searchParams), [searchParams]);
  const apiParams = React.useMemo(() => buildPropertyApiParams({ ...routeFilters, intent: 'sell', limit: 24 }), [routeFilters]);
  const { properties, loading } = useProperties(apiParams);
  const { savedPropertyIds, toggleSavedProperty, isAuthenticated } = useAuth();

  return (
    <>
      <SearchBar intent="sell" />
      <div className="buy-page-content">
        <div className="listings-container">
          <ListingsPanel
            title={`Buy properties${routeFilters.city ? ` in ${routeFilters.city}` : ' in Purandar'}`}
            subtitle="approved properties found"
            properties={properties}
            loading={loading}
            savedPropertyIds={savedPropertyIds}
            onToggleSave={isAuthenticated ? toggleSavedProperty : undefined}
            onPropertyHover={setHoveredPropertyId}
            activePropertyId={hoveredPropertyId}
          />
        </div>
        <div className="map-wrapper">
          <MapPanel properties={properties} activePropertyId={hoveredPropertyId} intent="sell" />
        </div>
      </div>
    </>
  );
}
