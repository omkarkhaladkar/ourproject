import React from 'react';
import { Grid2X2 } from 'lucide-react';
import { getAmenityMeta } from '../../../utils/amenityMeta';

const SOCIETY_AMENITIES = [
    'Lift', 'CCTV', 'Security', 'Gymnasium', 'Swimming Pool', 'Club House',
    'Power Backup', 'Visitor Parking', 'Garden', "Children's Play Area",
    'Gas Pipeline', 'Rain Water Harvesting', 'Waste Disposal', 'Fire Safety',
    'Jogging Track', 'Indoor Games', 'Multipurpose Hall', 'Senior Citizen Zone',
    'Landscaped Garden', 'EV Charging', 'Terrace Garden', 'Pet Park',
    'Yoga Deck', 'Mini Theatre', '24x7 Water Supply', 'Sewage Treatment Plant',
];

const FLAT_AMENITIES = [
    'Air Conditioner', 'Modular Kitchen', 'Geyser', 'RO System',
    'Intercom', 'WiFi', 'TV', 'Fridge', 'Washing Machine', 'Microwave', 'Sofa', 'Beds',
    'Cafeteria', 'Conference Room', 'Reception Lobby', 'Business Lounge', 'Sky Deck',
];

const DIRECTIONS = [
    'East', 'West', 'North', 'South',
    'North-East', 'North-West', 'South-East', 'South-West',
];

const OVERLOOKING = ['Garden', 'Pool', 'Road', 'Other'];
const WATER_SUPPLY = ['Corporation', 'Borewell', 'Both'];

function AmenityChip({ label, selected, onClick }) {
    const { icon: Icon, colorClass } = getAmenityMeta(label);

    return (
        <button
            type="button"
            className={`ppf-amenity-chip ${selected ? 'selected' : ''}`}
            onClick={onClick}
        >
            <span className={`ppf-amenity-icon ppf-amenity-icon--${colorClass}`}>
                <Icon size={14} strokeWidth={1.9} />
            </span>
            <span className="chip-check">
                {selected && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                )}
            </span>
            {label}
        </button>
    );
}

export default function Step5Amenities({ formData, updateField }) {
    const toggleAmenity = (field, value) => {
        const current = formData[field] || [];
        const updated = current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value];
        updateField(field, updated);
    };

    const toggleOverlooking = (value) => {
        const current = formData.overlooking || [];
        const updated = current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value];
        updateField('overlooking', updated);
    };

    return (
        <div className="ppf-step-content" key="step5">
            <h2 className="ppf-heading"><span className="ppf-heading-icon"><Grid2X2 size={18} /></span>What amenities does your property have?</h2>

            <div className="ppf-amenity-section">
                <h3 className="ppf-amenity-title">Society / Building Amenities</h3>
                <div className="ppf-amenity-grid">
                    {SOCIETY_AMENITIES.map((amenity) => (
                        <AmenityChip
                            key={amenity}
                            label={amenity}
                            selected={(formData.societyAmenities || []).includes(amenity)}
                            onClick={() => toggleAmenity('societyAmenities', amenity)}
                        />
                    ))}
                </div>
            </div>

            <div className="ppf-amenity-section">
                <h3 className="ppf-amenity-title">Flat / Unit Amenities</h3>
                <div className="ppf-amenity-grid">
                    {FLAT_AMENITIES.map((amenity) => (
                        <AmenityChip
                            key={amenity}
                            label={amenity}
                            selected={(formData.flatAmenities || []).includes(amenity)}
                            onClick={() => toggleAmenity('flatAmenities', amenity)}
                        />
                    ))}
                </div>
            </div>

            <hr className="ppf-divider" />

            <h3 className="ppf-amenity-title">Additional Details</h3>

            <p className="ppf-section-label">Facing Direction</p>
            <div className="ppf-direction-grid">
                {DIRECTIONS.map((direction) => (
                    <button
                        key={direction}
                        type="button"
                        className={`ppf-direction-pill ${formData.facing === direction ? 'active' : ''}`}
                        onClick={() => updateField('facing', direction)}
                    >
                        {direction}
                    </button>
                ))}
            </div>

            <p className="ppf-section-label">Overlooking</p>
            <div className="ppf-pill-group">
                {OVERLOOKING.map((item) => (
                    <button
                        key={item}
                        type="button"
                        className={`ppf-pill ${(formData.overlooking || []).includes(item) ? 'active' : ''}`}
                        onClick={() => toggleOverlooking(item)}
                    >
                        {item}
                    </button>
                ))}
            </div>

            <p className="ppf-section-label">Water Supply</p>
            <div className="ppf-pill-group">
                {WATER_SUPPLY.map((value) => (
                    <button
                        key={value}
                        type="button"
                        className={`ppf-pill ${formData.waterSupply === value ? 'active' : ''}`}
                        onClick={() => updateField('waterSupply', value)}
                    >
                        {value}
                    </button>
                ))}
            </div>

            <p className="ppf-section-label">Gated Community</p>
            <div className="ppf-pill-group">
                {['Yes', 'No'].map((value) => (
                    <button
                        key={value}
                        type="button"
                        className={`ppf-pill ${formData.gatedCommunity === value ? 'active' : ''}`}
                        onClick={() => updateField('gatedCommunity', value)}
                    >
                        {value}
                    </button>
                ))}
            </div>

            <hr className="ppf-divider" />

            <div className="ppf-field">
                <label className="ppf-field-label">
                    Description <span style={{ fontWeight: 400, color: 'var(--gray-400)' }}>(optional)</span>
                </label>
                <p style={{ fontSize: '0.82rem', color: 'var(--gray-500)', marginBottom: 8 }}>
                    Write something unique about your property to attract buyers
                </p>
                <textarea
                    className="ppf-textarea"
                    placeholder="Describe your property - location highlights, amenities, surroundings, transport links..."
                    maxLength={5000}
                    value={formData.description}
                    onChange={(e) => updateField('description', e.target.value)}
                />
                <p className="ppf-char-count">
                    {(formData.description || '').length} / 5,000
                </p>
            </div>
        </div>
    );
}
