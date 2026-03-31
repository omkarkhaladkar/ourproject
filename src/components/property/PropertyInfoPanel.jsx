import React from 'react';
import { formatCurrency } from '../../utils/formatPrice';

const Row = ({ label, value }) => {
  if (value === undefined || value === null || value === '') return null;
  return (
    <div className="pd-stat-cell">
      <div className="pd-stat-cell-body">
        <span className="pd-stat-cell-label">{label}</span>
        <span className="pd-stat-cell-value">{value}</span>
      </div>
    </div>
  );
};

export default function PropertyInfoPanel({ property = {} }) {
  return (
    <div className="pd-info-panel">
      <h2 className="pd-section-title">Property Details</h2>
      <div className="pd-stat-grid-2">
        <Row label="Intent" value={property.intent} />
        <Row label="Category" value={property.category} />
        <Row label="Property Type" value={property.propertyType} />
        <Row label="Ownership" value={property.ownership} />
        <Row label="Furnishing" value={property.furnishing} />
        <Row label="Facing" value={property.facing} />
        <Row label="Bedrooms" value={property.bedrooms} />
        <Row label="Bathrooms" value={property.bathrooms} />
        <Row label="Balconies" value={property.balconies} />
        <Row label="Area" value={`${property.totalArea || property.plotArea || property.carpetArea || '-'} ${property.areaUnit || 'sq.ft'}`} />
        <Row label="Maintenance" value={property.maintenance ? formatCurrency(property.maintenance) : ''} />
        <Row label="Security Deposit" value={property.securityDeposit ? formatCurrency(property.securityDeposit) : ''} />
        <Row label="Water Supply" value={property.waterSupply} />
        <Row label="Gated Community" value={property.gatedCommunity} />
        <Row label="Address" value={[property.flatNo, property.subLocality, property.locality, property.city].filter(Boolean).join(', ')} />
        <Row label="Landmark" value={property.landmark} />
      </div>
    </div>
  );
}

