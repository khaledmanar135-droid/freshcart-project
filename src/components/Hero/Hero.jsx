'use client'

import { Fragment, useEffect, useRef, useState } from 'react';
import { Link } from '@/components/NextRouter';
const arrowPrev = '/freshcart/assets/icons/hero/arrow-prev.svg';
const arrowNext = '/freshcart/assets/icons/hero/arrow-next.svg';
// Each title is written once. `{ br: … }` marks where the line breaks on a
// given screen size, so screen readers only ever read the headline one time.
const SLIDES = [
  {
    title: 'Fresh Products Delivered to your Door',
    titleParts: ['Fresh Products', { br: 'mobile' }, 'Delivered', { br: 'desktop' }, 'to your Door'],
    subtitle: 'Get 20% off your first order',
    primary: { label: 'Shop Now', to: '/products' },
    secondary: { label: 'View Deals', to: '/products' },
  },
  {
    title: 'Premium Quality Guaranteed',
    titleParts: ['Premium Quality', { br: 'both' }, 'Guaranteed'],
    subtitle: 'Fresh from farm to your table',
    primary: { label: 'Shop Now', to: '/products' },
    secondary: { label: 'Browse Categories', to: '/categories' },
  },
  {
    title: 'Fast & Free Delivery',
    titleParts: ['Fast & Free', { br: 'mobile' }, 'Delivery'],
    subtitle: 'Same day delivery available',
    primary: { label: 'Order Now', to: '/products' },
    secondary: { label: 'Delivery Info', to: '/orders' },
  },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState('next');
  const touchStartX = useRef(null);
  const slide = SLIDES[activeSlide];

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    const timer = window.setInterval(() => {
      setSlideDirection('next');
      setActiveSlide((current) => (current + 1) % SLIDES.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  const showPrevious = () => {
    setSlideDirection('previous');
    setActiveSlide((current) => (current - 1 + SLIDES.length) % SLIDES.length);
  };

  const showNext = () => {
    setSlideDirection('next');
    setActiveSlide((current) => (current + 1) % SLIDES.length);
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX;
    touchStartX.current = null;

    if (startX === null || endX === undefined) return;
    const distance = endX - startX;
    if (Math.abs(distance) < 45) return;

    if (distance < 0) showNext();
    else showPrevious();
  };

  return (
    <section className="hero" aria-roledescription="carousel" aria-label="FreshCart highlights">
      <div
        className="hero__slide"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/*
          No `src` on purpose: React sets attributes on a detached element, so a
          `src` alongside `srcSet` starts a second fetch before the candidate is
          picked. `srcSet` alone resolves to exactly one image, and the preload
          in index.html uses the same imagesrcset/imagesizes so they agree.
        */}
        <img
          key={activeSlide}
          srcSet="/hero/hero-mobile.webp 780w, /hero/hero-desktop.webp 1600w"
          sizes="100vw"
          alt="Fresh produce on display"
          className="hero__bg"
          fetchPriority="high"
        />
        <div className="hero__overlay">
          <div className={`hero__inner hero__inner--${slideDirection}`} key={activeSlide}>
            <h1 className="hero__title">
              {slide.titleParts.map((part, index) =>
                typeof part === 'string' ? (
                  <Fragment key={index}>{part} </Fragment>
                ) : (
                  <br key={index} className={`hero__br hero__br--${part.br}`} />
                )
              )}
            </h1>
            <p className="hero__subtitle">{slide.subtitle}</p>
            <div className="hero__actions">
              <Link to={slide.primary.to} className="hero__btn hero__btn--primary">
                {slide.primary.label}
              </Link>
              <Link to={slide.secondary.to} className="hero__btn hero__btn--outline">
                {slide.secondary.label}
              </Link>
            </div>
          </div>
        </div>

        <div className="hero__pagination" aria-label="Choose carousel slide">
          {SLIDES.map((item, index) => (
            <button
              type="button"
              className={`hero__dot${index === activeSlide ? ' hero__dot--active' : ''}`}
              aria-label={`Show ${item.title}`}
              aria-current={index === activeSlide ? 'true' : undefined}
              onClick={() => {
                setSlideDirection(index > activeSlide ? 'next' : 'previous');
                setActiveSlide(index);
              }}
              key={item.title}
            />
          ))}
        </div>
      </div>

      <button type="button" className="hero__nav hero__nav--prev" aria-label="Previous slide" onClick={showPrevious}>
        <img src={arrowPrev} alt="" />
      </button>
      <button type="button" className="hero__nav hero__nav--next" aria-label="Next slide" onClick={showNext}>
        <img src={arrowNext} alt="" />
      </button>
    </section>
  );
}
