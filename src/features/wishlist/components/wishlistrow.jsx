'use client'

import { Link } from '@/lib/nextrouter';
const cartIcon = '/freshcart/assets/icons/wishlist/cart-bag-small.svg';
const removeIcon = '/freshcart/assets/icons/wishlist/remove.svg';
export default function WishlistRow({ item, onRemove, onAddToCart, isAdding = false }) {
  const { id, image, title, category, price, originalPrice, inStock = true } = item;

  return (
    <div className="wishlist-row">
      <div className="wishlist-row__product">
        <Link to="/products/$id" params={{ id: String(id) }} className="wishlist-row__image-link">
          <img src={image} alt={title} className="wishlist-row__image" loading="lazy" decoding="async" />
        </Link>
        <div className="wishlist-row__info">
          <Link to="/products/$id" params={{ id: String(id) }} className="wishlist-row__title">{title}</Link>
          <p className="wishlist-row__category">{category}</p>
        </div>
      </div>

      <div className="wishlist-row__cell wishlist-row__cell--price">
        <span className="wishlist-row__label">Price:</span>
        <span className="wishlist-row__price">
          <span className="wishlist-row__price-value">{price.toLocaleString()} EGP</span>
          {originalPrice && (
            <span className="wishlist-row__price-original">{originalPrice.toLocaleString()} EGP</span>
          )}
        </span>
      </div>

      <div className="wishlist-row__cell wishlist-row__cell--status">
        <span className="wishlist-row__label">Status:</span>
        <span className="wishlist-row__status">
          <span className="wishlist-row__status-dot" />
          {inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      <div className="wishlist-row__cell wishlist-row__cell--actions">
        <button
          type="button"
          className="wishlist-row__add-btn"
          onClick={() => onAddToCart?.(id)}
          disabled={isAdding || !inStock}
        >
          <img src={cartIcon} alt="" />
          Add to Cart
        </button>
        <button
          type="button"
          className="wishlist-row__remove-btn"
          onClick={() => onRemove(id)}
          aria-label={`Remove ${title} from wishlist`}
        >
          <img src={removeIcon} alt="" />
        </button>
      </div>
    </div>
  );
}

