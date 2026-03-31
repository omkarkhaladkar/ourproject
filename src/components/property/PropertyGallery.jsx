import React, { useState } from 'react';
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PropertyGallery({ photos = [], intent = 'sell' }) {
  const items = photos.length ? photos : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80'];
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="pd-gallery">
      <div className="pd-gallery-hero">
        <img src={items[activeIdx]} alt="Property" key={activeIdx} />
        <div className="pd-gallery-overlay" />
        <button onClick={() => setActiveIdx((current) => (current - 1 + items.length) % items.length)} className="pd-gallery-nav pd-gallery-nav--prev">
          <ChevronLeft size={18} />
        </button>
        <button onClick={() => setActiveIdx((current) => (current + 1) % items.length)} className="pd-gallery-nav pd-gallery-nav--next">
          <ChevronRight size={18} />
        </button>
        <div className="pd-gallery-top-right">
          <span className="pd-badge pd-badge--sale">{intent === 'rent' ? 'For Rent' : 'For Sale'}</span>
          <span className="pd-badge pd-badge--verified"><CheckCircle size={12} />Verified</span>
        </div>
        <div className="pd-gallery-counter">{activeIdx + 1} / {items.length}</div>
      </div>
      <div className="pd-gallery-thumbs">
        {items.map((img, index) => (
          <button key={img} onClick={() => setActiveIdx(index)} className={`pd-gallery-thumb ${index === activeIdx ? 'pd-gallery-thumb--active' : ''}`}>
            <img src={img} alt={`View ${index + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
}

