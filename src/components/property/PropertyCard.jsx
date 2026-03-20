import { MapPin, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './PropertyCard.css';

export default function PropertyCard({ id, image, title, location, beds, baths, sqft, price }) {
    const navigate = useNavigate();
    // Format price string to split into main and cents
    let mainPrice = price;
    let cents = null;

    if (price.includes('.')) {
        [mainPrice, cents] = price.split('.');
    }

    return (
        <div className="property-card" onClick={() => navigate(`/property/${id}`)} style={{ cursor: 'pointer' }}>
            <div className="property-image-container">
                <img
                    src={image}
                    alt={title}
                    className="property-image"
                />
                <div className="property-overlay-icon">
                    <ArrowUpRight className="w-4 h-4 text-gray-900" />
                </div>
            </div>

            <div className="property-details">
                <h3 className="property-title">{title}</h3>
                <div className="property-location">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{location}</span>
                </div>

                <div className="property-features">
                    <span className="feature-value">{beds}</span> <span className="feature-label">bed</span>
                    <span className="feature-divider">|</span>
                    <span className="feature-value">{baths}</span> <span className="feature-label">bath</span>
                    <span className="feature-divider">|</span>
                    <span className="feature-value">{sqft}</span> <span className="feature-label">sqft</span>
                </div>

                <div className="property-price">
                    <span className="price-currency">$</span>
                    <span className="price-main">{mainPrice}</span>
                    {cents && <span className="price-cents">.{cents}</span>}
                </div>
            </div>
        </div>
    );
}
