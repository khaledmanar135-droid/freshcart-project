'use client'

import { Link } from '@/lib/nextrouter';
const wishlistIcon = '/freshcart/assets/icons/product-card/wishlist.svg';
const compareIcon = '/freshcart/assets/icons/product-card/compare.svg';
const viewIcon = '/freshcart/assets/icons/product-card/view.svg';
const cartIcon = '/freshcart/assets/icons/product-card/cart.svg';
import StarRating from '@/components/ui/starrating';
import { useCart } from '@/features/cart/hooks/usecart';
import { useWishlist } from '@/features/wishlist/hooks/usewishlist';

export default function ProductCard({ product }) {
  const { id, image, title, category, rating, reviews, price, originalPrice, discount } = product;
  const { addToCart, isAdding, pendingProductId } = useCart();
  const { isWishlisted, toggleWishlist, pendingId } = useWishlist();

  const wishlisted = isWishlisted(id);
  const addingThis = isAdding && pendingProductId === id;

  return (
    <article className="product-card">
      <div className="product-card__media">
        <Link to="/products/$id" params={{ id: String(id) }}>
          <img
            src={image}
            alt={title}
            className="product-card__image"
            loading="lazy"
            decoding="async"
            width="356"
            height="240"
          />
        </Link>
        {discount && <span className="product-card__badge">{discount}</span>}
        <div className="product-card__actions">
          <button
            type="button"
            className="product-card__action-btn"
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={wishlisted}
            disabled={pendingId === id}
            onClick={() => toggleWishlist(id)}
            style={wishlisted ? { background: 'var(--color-primary, #16a34a)' } : undefined}
          >
            <img src={wishlistIcon} alt="" />
          </button>
          <button type="button" className="product-card__action-btn" aria-label="Add to compare">
            <img src={compareIcon} alt="" />
          </button>
          <Link
            to="/products/$id"
            params={{ id: String(id) }}
            className="product-card__action-btn"
            aria-label="Quick view"
          >
            <img src={viewIcon} alt="" />
          </Link>
        </div>
      </div>

      <div className="product-card__body">
        <p className="product-card__category">{category}</p>
        <h3 className="product-card__title-wrap">
          <Link to="/products/$id" params={{ id: String(id) }} className="product-card__title">
            {title}
          </Link>
        </h3>

        <div className="product-card__rating">
          <StarRating value={rating} />
          <span className="product-card__rating-text">{rating} ({reviews})</span>
        </div>

        <div className="product-card__footer">
          <div className="product-card__price">
            <span className="product-card__price-current">{price} EGP</span>
            {originalPrice && (
              <span className="product-card__price-original">{originalPrice} EGP</span>
            )}
          </div>
          <button
            type="button"
            className="product-card__cart-btn"
            aria-label="Add to cart"
            disabled={addingThis}
            onClick={() => addToCart(id)}
          >
            <img src={cartIcon} alt="" />
          </button>
        </div>
      </div>
    </article>
  );
}



