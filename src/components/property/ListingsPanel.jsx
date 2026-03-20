import React, { useState } from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import PropertyCard from './PropertyCard';
import './ListingsPanel.css';

const listings = [
    {
        id: 1,
        title: 'House by the sea',
        location: 'Budva, Montenegro',
        beds: 4,
        baths: 2,
        sqft: 190,
        price: '190,000.00',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 2,
        title: 'Apartment in a quiet area',
        location: 'Becici, Montenegro',
        beds: 2,
        baths: 1,
        sqft: 120,
        price: '130,000.00',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 3,
        title: 'Cozy cottage',
        location: 'Budva, Montenegro',
        beds: 3,
        baths: 2,
        sqft: 170,
        price: '119,000.00',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 4,
        title: 'Modern Villa with Pool',
        location: 'Sveti Stefan, Montenegro',
        beds: 5,
        baths: 4,
        sqft: 350,
        price: '850,000.00',
        image: 'https://images.unsplash.com/photo-1600607687931-cebf0746e50e?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 5,
        title: 'Penthouse Apartment',
        location: 'Budva, Montenegro',
        beds: 3,
        baths: 2,
        sqft: 155,
        price: '280,000.00',
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 6,
        title: 'Seaview Studio',
        location: 'Rafailovici, Montenegro',
        beds: 1,
        baths: 1,
        sqft: 45,
        price: '65,000.00',
        image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800'
    }
];

export default function ListingsPanel() {
    const [activeTab, setActiveTab] = useState('All');

    const tabs = [
        { label: 'All', count: '' },
        { label: 'Sale', count: '1200' },
        { label: 'Long-term rent', count: '890' }
    ];

    return (
        <div className="listings-panel scrollbar-hide">

            {/* Header section */}
            <div className="listings-header">
                <div>
                    <h1>Active Advertisements</h1>
                    <p>Prices do not include taxes and additional fees.</p>
                </div>

                {/* Controls Row */}
                <div className="listings-controls">

                    {/* Tabs */}
                    <div className="listings-tabs">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.label;
                            return (
                                <button
                                    key={tab.label}
                                    onClick={() => setActiveTab(tab.label)}
                                    className={`tab-button ${isActive ? 'active' : ''}`}
                                >
                                    {tab.label}
                                    {tab.count && (
                                        <span className="tab-count">
                                            {tab.count}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Sort Dropdown */}
                    <button className="btn-sort">
                        <SlidersHorizontal className="w-4 h-4 text-gray-500" />
                        <span>Sort by: Default</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="listings-grid">
                {listings.map((listing) => (
                    <PropertyCard key={listing.id} {...listing} />
                ))}
            </div>
        </div>
    );
}
