'use client'

import { useRef } from 'react';
import ProductCard from '../ProductCard/ProductCard';
const arrowPrev = '/freshcart/assets/icons/hero/arrow-prev.svg';
const arrowNext = '/freshcart/assets/icons/hero/arrow-next.svg';
export default function RelatedProducts({ products }) {
  const trackRef = useRef(null);

  const scrollByAmount = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.querySelector('.related-products__item')?.offsetWidth ?? 300;
    track.scrollBy({ left: direction * (cardWidth + 24), behavior: 'smooth' });
  };

  return (
    <section className="related-products">
      <div className="related-products__header">
        <span className="related-products__bar" />
        <h2 className="related-products__title">You May Also Like</h2>
        <div className="related-products__nav">
          <button type="button" onClick={() => scrollByAmount(-1)} aria-label="Previous products">
            <img src={arrowPrev} alt="" />
          </button>
          <button type="button" onClick={() => scrollByAmount(1)} aria-label="Next products">
            <img src={arrowNext} alt="" />
          </button>
        </div>
      </div>

      <div className="related-products__track" ref={trackRef}>
        {products.map((product) => (
          <div key={product.id} className="related-products__item">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
