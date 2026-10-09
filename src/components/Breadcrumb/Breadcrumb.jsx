'use client'

import { Link } from '@/components/NextRouter';
const homeIcon = '/freshcart/assets/icons/breadcrumb/home.svg';
const chevronIcon = '/freshcart/assets/icons/breadcrumb/chevron.svg';
export default function Breadcrumb({ category, categoryId, subcategory, productName }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol className="breadcrumb__list">
        <li className="breadcrumb__item">
          <Link to="/" className="breadcrumb__link">
            <img src={homeIcon} alt="" className="breadcrumb__home-icon" />
            Home
          </Link>
          <img src={chevronIcon} alt="" className="breadcrumb__chevron" />
        </li>
        {category && (
          <li className="breadcrumb__item">
            {categoryId ? (
              <Link
                to="/search"
                search={{ category: categoryId }}
                className="breadcrumb__link"
              >
                {category}
              </Link>
            ) : (
              <span className="breadcrumb__link">{category}</span>
            )}
            <img src={chevronIcon} alt="" className="breadcrumb__chevron" />
          </li>
        )}
        {subcategory && (
          <li className="breadcrumb__item">
            <span className="breadcrumb__link">{subcategory}</span>
            <img src={chevronIcon} alt="" className="breadcrumb__chevron" />
          </li>
        )}
        <li className="breadcrumb__item breadcrumb__item--current">{productName}</li>
      </ol>
    </nav>
  );
}
