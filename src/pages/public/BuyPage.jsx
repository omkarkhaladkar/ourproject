import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/search/SearchBar';
import ListingsPanel from '../../components/property/ListingsPanel';
import MapPanel from '../../components/search/MapPanel';
import useProperties from '../../hooks/useProperties';
import useProjects from '../../hooks/useProjects';
import useAuth from '../../hooks/useAuth';
import { buildPropertyApiParams, buildSearchQueryString, parseSearchParams } from '../../utils/queryParams';
import './BuyPage.css';

export default function BuyPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [hoveredPropertyId, setHoveredPropertyId] = React.useState('');
  const routeFilters = React.useMemo(() => parseSearchParams(searchParams), [searchParams]);
  const apiParams = React.useMemo(() => buildPropertyApiParams({ ...routeFilters, intent: 'sell', limit: 24 }), [routeFilters]);
  const { properties, loading } = useProperties(apiParams);
  const projectParams = React.useMemo(() => ({
    city: routeFilters.city,
    search: routeFilters.locality || routeFilters.city,
  }), [routeFilters.city, routeFilters.locality]);
  const { projects, loading: projectsLoading } = useProjects(projectParams);
  const { savedPropertyIds, toggleSavedProperty, isAuthenticated } = useAuth();

  const handleSortChange = React.useCallback((sort) => {
    const queryString = buildSearchQueryString({
      ...routeFilters,
      intent: 'sell',
      sort,
    });
    navigate(`/buy?${queryString}`);
  }, [navigate, routeFilters]);

  return (
    <>
      <SearchBar intent="sell" />
      <div className="buy-page-content">
        <div className="listings-container">
          <ListingsPanel
            title={`Buy properties${routeFilters.city ? ` in ${routeFilters.city}` : ' in Purandar'}`}
            subtitle="properties and projects found"
            properties={properties}
            projects={projects}
            loading={loading || projectsLoading}
            savedPropertyIds={savedPropertyIds}
            onToggleSave={isAuthenticated ? toggleSavedProperty : undefined}
            onPropertyHover={setHoveredPropertyId}
            activePropertyId={hoveredPropertyId}
            sortValue={routeFilters.sort || 'newest'}
            onSortChange={handleSortChange}
          />
        </div>
        <div className="map-wrapper">
          <MapPanel properties={properties} activePropertyId={hoveredPropertyId} intent="sell" />
        </div>
      </div>
    </>
  );
}
