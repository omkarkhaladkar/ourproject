import React from 'react';
import SearchBar from '../../components/search/SearchBar';
import ListingsPanel from '../../components/property/ListingsPanel';
import MapPanel from '../../components/search/MapPanel';
import './BuyPage.css';

export default function BuyPage() {
    return (
        <>
            <SearchBar />
            <div className="buy-page-content">
                <div className="listings-container">
                    <ListingsPanel />
                </div>
                <div className="map-wrapper">
                    <MapPanel />
                </div>
            </div>
        </>
    );
}
