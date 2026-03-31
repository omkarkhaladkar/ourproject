import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Bath, BedDouble, MapPin, MoveUpRight, Ruler, X } from 'lucide-react';
import Map, { FullscreenControl, Marker, NavigationControl, Popup } from 'react-map-gl/mapbox';
import { useNavigate } from 'react-router-dom';
import env from '../../config/env';
import { formatCompactPrice } from '../../utils/formatPrice';
import SearchBar from './SearchBar';
import './MapPanel.css';

const baseLongitude = 73.98;
const baseLatitude = 18.28;

export default function MapPanel({ properties = [], activePropertyId = '', intent = 'sell' }) {
  const navigate = useNavigate();
  const mapContainerRef = useRef(null);
  const items = useMemo(() => properties.slice(0, 12).map((property, index) => ({
    ...property,
    longitude: baseLongitude + (index % 4) * 0.02,
    latitude: baseLatitude + Math.floor(index / 4) * 0.018,
  })), [properties]);

  const activeProperty = items.find((property) => property._id === activePropertyId);
  const [viewState, setViewState] = useState({
    longitude: baseLongitude + 0.03,
    latitude: baseLatitude + 0.02,
    zoom: 10.5,
  });
  const [selectedPropertyId, setSelectedPropertyId] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const selectedProperty = items.find((property) => property._id === selectedPropertyId);

  useEffect(() => {
    if (activeProperty) {
      setViewState({ longitude: activeProperty.longitude, latitude: activeProperty.latitude, zoom: 12.6 });
    }
  }, [activeProperty]);

  useEffect(() => {
    if (activePropertyId) {
      setSelectedPropertyId(activePropertyId);
    }
  }, [activePropertyId]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreenElement = document.fullscreenElement;
      const container = mapContainerRef.current;
      setIsFullscreen(Boolean(fullscreenElement && container && (fullscreenElement === container || container.contains(fullscreenElement))));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="map-container" ref={mapContainerRef}>
      {isFullscreen ? (
        <div className="map-expanded-search">
          <SearchBar intent={intent} />
        </div>
      ) : null}
      <Map
        {...viewState}
        onMove={(event) => setViewState(event.viewState)}
        onClick={() => setSelectedPropertyId('')}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={env.mapboxAccessToken}
        style={{ width: '100%', height: '100%' }}
      >
        <NavigationControl position="top-right" />
        <FullscreenControl position="top-right" />
        {items.map((property) => (
          <Marker key={property._id} longitude={property.longitude} latitude={property.latitude} anchor="bottom">
            <button
              type="button"
              className={`marker-pin ${activePropertyId === property._id || selectedPropertyId === property._id ? 'active' : ''}`}
              onClick={(event) => {
                event.stopPropagation();
                setSelectedPropertyId(property._id);
              }}
            >
              <img src={property.photos?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=300&q=80'} alt={property.title} className="marker-image" />
              <span className="marker-price">INR {Math.round((property.price || 0) / 100000)}L</span>
            </button>
          </Marker>
        ))}
        {selectedProperty ? (
          <Popup
            longitude={selectedProperty.longitude}
            latitude={selectedProperty.latitude}
            anchor="bottom"
            offset={24}
            closeButton={false}
            closeOnClick={false}
            className="property-map-popup"
          >
            <div className="map-popup-card">
              <button type="button" className="map-popup-close" onClick={() => setSelectedPropertyId('')} aria-label="Close property preview">
                <X size={14} />
              </button>
              <img
                src={selectedProperty.photos?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80'}
                alt={selectedProperty.title}
                className="map-popup-image"
              />
              <div className="map-popup-body">
                <div className="map-popup-topline">
                  <span className="map-popup-price">{formatCompactPrice(selectedProperty.price)}</span>
                  <span className="map-popup-type">{selectedProperty.propertyType}</span>
                </div>
                <h4 className="map-popup-title">{selectedProperty.title || `${selectedProperty.propertyType} in ${selectedProperty.locality || selectedProperty.city}`}</h4>
                <div className="map-popup-location">
                  <MapPin size={14} />
                  <span>{[selectedProperty.subLocality, selectedProperty.locality, selectedProperty.city].filter(Boolean).join(', ')}</span>
                </div>
                <div className="map-popup-features">
                  {selectedProperty.bedrooms ? <span><BedDouble size={14} /> {selectedProperty.bedrooms} BHK</span> : null}
                  {selectedProperty.bathrooms ? <span><Bath size={14} /> {selectedProperty.bathrooms} Bath</span> : null}
                  <span><Ruler size={14} /> {selectedProperty.totalArea || selectedProperty.plotArea || selectedProperty.carpetArea || '-'} {selectedProperty.areaUnit || 'sq.ft'}</span>
                </div>
                <button type="button" className="map-popup-action" onClick={() => navigate(`/property/${selectedProperty._id}`)}>
                  <span>View Details</span>
                  <MoveUpRight size={14} />
                </button>
              </div>
            </div>
          </Popup>
        ) : null}
      </Map>
      <div className="map-north-indicator" aria-label="North direction">
        <span className="map-north-arrow">↑</span>
        <span className="map-north-label">N</span>
      </div>
    </div>
  );
}
