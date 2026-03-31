import React from 'react';
import useAuth from '../../hooks/useAuth';
import PropertyCard from '../../components/property/PropertyCard';
import EmptyState from '../../components/common/EmptyState';
import './SavedProperties.css';

export default function SavedProperties() {
  const { savedProperties, savedPropertyIds, toggleSavedProperty, isAuthenticated } = useAuth();

  return (
    <div className="profile-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Saved Properties</h1>
          <p className="page-subtitle">Properties you have marked as favourite.</p>
        </div>
      </div>

      {savedProperties.length ? (
        <div className="properties-grid">
          {savedProperties.map((property) => (
            <div key={property._id} className="saved-card-wrapper">
              <PropertyCard property={property} isSaved={savedPropertyIds.has(property._id)} onToggleSave={isAuthenticated ? toggleSavedProperty : undefined} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title="You haven't saved any properties yet." />
      )}
    </div>
  );
}

