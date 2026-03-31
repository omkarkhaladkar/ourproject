import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCompactPrice } from '../../utils/formatPrice';

export default function SimilarProperties({ properties = [] }) {
  const navigate = useNavigate();

  if (!properties.length) return null;

  return (
    <section className="pd-similar-section">
      <div className="pd-section-divider" />
      <div className="pd-similar-header">
        <h2 className="pd-similar-title">Similar Properties</h2>
      </div>
      <div className="pd-similar-grid">
        {properties.map((property) => (
          <div key={property._id} className="pd-similar-card" onClick={() => navigate(`/property/${property._id}`)}>
            <div className="pd-similar-card-img">
              <img src={property.photos?.[0]} alt={property.title} />
            </div>
            <div className="pd-similar-card-body">
              <div className="pd-similar-card-price">{formatCompactPrice(property.price)}</div>
              <div className="pd-similar-card-name">{property.title}</div>
              <div className="pd-similar-card-loc">{[property.locality, property.city].filter(Boolean).join(', ')}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

