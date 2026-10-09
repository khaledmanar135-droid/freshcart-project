'use client'

import { Link } from '@/lib/nextrouter';
const arrowRightIcon = '/freshcart/assets/icons/brands/arrow-right.svg';
export default function BrandCard({ brand, eager = false }) {
  return (
    <Link
      to="/search"
      search={brand.id ? { brand: brand.id } : { q: brand.name }}
      className="brand-card"
    >
      <span className="brand-card__logo">
        <img
          src={brand.image}
          alt={brand.name}
          className="brand-card__logo-img"
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          width="160"
          height="113"
        />
      </span>
      <h3 className="brand-card__name">{brand.name}</h3>
      <span className="brand-card__view">
        View Products
        <img src={arrowRightIcon} alt="" />
      </span>
    </Link>
  );
}

