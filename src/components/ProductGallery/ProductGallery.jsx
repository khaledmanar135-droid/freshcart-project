'use client'

import { useState } from 'react';

export default function ProductGallery({ images, title }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="product-gallery">
      <div className="product-gallery__card">
        <div className="product-gallery__main">
          <img
            src={images[activeIndex]}
            alt={title}
            className="product-gallery__main-image"
            fetchPriority="high"
          />
        </div>

        {images.length > 1 && (
          <div className="product-gallery__thumbnails">
            {images.map((image, index) => (
              <button
                key={index}
                type="button"
                className={`product-gallery__thumb${index === activeIndex ? ' product-gallery__thumb--active' : ''}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show image ${index + 1}`}
              >
                <img src={image} alt="" loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
