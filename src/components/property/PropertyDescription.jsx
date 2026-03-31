import React from 'react';

export default function PropertyDescription({ property = {} }) {
  return (
    <div>
      <h2 className="pd-section-title">About this property</h2>
      <p className="pd-description-text">
        {property.description || 'No detailed description has been added for this property yet.'}
      </p>
    </div>
  );
}

