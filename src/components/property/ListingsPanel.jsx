import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import PropertyCard from './PropertyCard';
import Loader from '../common/Loader';
import EmptyState from '../common/EmptyState';
import './ListingsPanel.css';

export default function ListingsPanel({
  title = 'Properties',
  subtitle = '',
  properties = [],
  loading = false,
  savedPropertyIds = new Set(),
  onToggleSave,
  onPropertyHover,
  activePropertyId,
}) {
  return (
    <div className="listings-panel scrollbar-hide">
      <div className="listings-header">
        <div className="header-text-group">
          <h1>{title}</h1>
          <p className="listing-count-subtitle">
            <span className="count-highlight">{properties.length}</span> {subtitle || 'properties available'}
          </p>
        </div>

        <div className="listings-controls">
          <button className="btn-sort" type="button">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Live from MongoDB</span>
          </button>
        </div>
      </div>

      {loading ? <Loader label="Loading listings..." /> : null}
      {!loading && properties.length === 0 ? <EmptyState title="No properties found" description="Try another filter combination." /> : null}

      <div className="listings-grid">
        {properties.map((property) => (
          <PropertyCard
            key={property._id}
            property={property}
            isSaved={savedPropertyIds.has(property._id)}
            onToggleSave={onToggleSave}
            onHover={onPropertyHover}
            isActive={activePropertyId === property._id}
          />
        ))}
      </div>
    </div>
  );
}
