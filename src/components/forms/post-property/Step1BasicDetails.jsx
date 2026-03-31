import React from 'react';

const residentialTypes = [
    'Flat / Apartment',
    'Independent House / Villa',
    'Builder Floor',
    'Plot / Land',
    '1 RK / Studio Apartment',
    'Serviced Apartment',
    'Farmhouse',
    'Other',
];

const commercialTypes = [
    'Office Space',
    'Shop / Showroom',
    'Commercial Land',
    'Warehouse / Godown',
    'Industrial Building',
    'Other',
];

export default function Step1BasicDetails({ formData, updateField, errors, isAdmin = false }) {
    const types = formData.category === 'residential' ? residentialTypes : commercialTypes;

    return (
        <div className="ppf-step-content" key="step1">
            <h2 className="ppf-heading">
                Welcome back <span>{formData.userName || 'User'}</span>, Fill out basic details
            </h2>

            <p className="ppf-section-label">I'm looking to</p>
            <div className="ppf-pill-group" role="group" aria-label="Listing intent">
                {[
                    { value: 'sell', label: 'Sell' },
                    { value: 'rent', label: 'Rent / Lease' },
                    { value: 'pg', label: 'PG' },
                ].map(({ value, label }) => (
                    <button
                        key={value}
                        type="button"
                        id={`ppf-intent-${value}`}
                        className={`ppf-pill ${formData.intent === value ? 'active' : ''}`}
                        onClick={() => updateField('intent', value)}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <p className="ppf-section-label">What kind of property do you have?</p>
            <div className="ppf-radio-group">
                <label className="ppf-radio-label" htmlFor="ppf-cat-res">
                    <input
                        type="radio"
                        id="ppf-cat-res"
                        name="ppf-category"
                        checked={formData.category === 'residential'}
                        onChange={() => {
                            updateField('category', 'residential');
                            updateField('propertyType', '');
                        }}
                    />
                    Residential
                </label>
                <label className="ppf-radio-label" htmlFor="ppf-cat-com">
                    <input
                        type="radio"
                        id="ppf-cat-com"
                        name="ppf-category"
                        checked={formData.category === 'commercial'}
                        onChange={() => {
                            updateField('category', 'commercial');
                            updateField('propertyType', '');
                        }}
                    />
                    Commercial
                </label>
            </div>

            <div className="ppf-chip-group" role="group" aria-label="Property type">
                {types.map((type) => (
                    <button
                        key={type}
                        type="button"
                        className={`ppf-chip ${formData.propertyType === type ? 'active' : ''}`}
                        onClick={() => updateField('propertyType', type)}
                    >
                        {type}
                    </button>
                ))}
            </div>
            {errors.propertyType ? <p className="ppf-input-error">{errors.propertyType}</p> : null}

            {isAdmin ? (
                <div className="ppf-admin-contact-card">
                    <div className="ppf-admin-contact-head">
                        <div>
                            <h3 className="ppf-admin-contact-title">Seller Display on Website</h3>
                            <p className="ppf-admin-contact-subtitle">Choose whether the website should show the original owner contact or your custom seller details.</p>
                        </div>
                    </div>

                    <div className="ppf-toggle-wrapper">
                        <button
                            type="button"
                            className={`ppf-toggle ${formData.useOriginalSellerContact ? 'on' : ''}`}
                            onClick={() => updateField('useOriginalSellerContact', !formData.useOriginalSellerContact)}
                            aria-pressed={formData.useOriginalSellerContact}
                        />
                        <span className="ppf-toggle-label">Use original seller name and phone</span>
                    </div>

                    {!formData.useOriginalSellerContact ? (
                        <div className="ppf-form-row">
                            <div className="ppf-field">
                                <label className="ppf-field-label">Custom Seller Name</label>
                                <input
                                    className={`ppf-input ${errors.displaySellerName ? 'error' : ''}`}
                                    type="text"
                                    placeholder="Enter seller name shown on website"
                                    value={formData.displaySellerName}
                                    onChange={(event) => updateField('displaySellerName', event.target.value)}
                                />
                                {errors.displaySellerName ? <p className="ppf-input-error">{errors.displaySellerName}</p> : null}
                            </div>
                            <div className="ppf-field">
                                <label className="ppf-field-label">Custom Seller Phone</label>
                                <input
                                    className={`ppf-input ${errors.displaySellerPhone ? 'error' : ''}`}
                                    type="text"
                                    placeholder="Enter seller phone shown on website"
                                    value={formData.displaySellerPhone}
                                    onChange={(event) => updateField('displaySellerPhone', event.target.value)}
                                />
                                {errors.displaySellerPhone ? <p className="ppf-input-error">{errors.displaySellerPhone}</p> : null}
                            </div>
                        </div>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
}
