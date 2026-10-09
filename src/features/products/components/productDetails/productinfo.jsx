'use client'

import { useState } from 'react';
import { useNavigate } from '@/lib/nextrouter';
import StarRating from '@/components/ui/starrating';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
const decreaseIcon = '/freshcart/assets/icons/pdp/decrease.svg';
const increaseIcon = '/freshcart/assets/icons/pdp/increase.svg';
const cartIcon = '/freshcart/assets/icons/pdp/cart-white.svg';
const boltIcon = '/freshcart/assets/icons/pdp/bolt-white.svg';
const heartIcon = '/freshcart/assets/icons/pdp/heart-outline.svg';
const shareIcon = '/freshcart/assets/icons/pdp/share.svg';
const truckIcon = '/freshcart/assets/icons/trust-badges/shipping.svg';
const returnIcon = '/freshcart/assets/icons/trust-badges/returns.svg';
const shieldIcon = '/freshcart/assets/icons/trust-badges/secure-payment.svg';
export default function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { addToCart, updateQuantity, isAdding } = useCart();
  const { isWishlisted, toggleWishlist, pendingId } = useWishlist();

  const { id, category, brand, title, rating, reviews, price, description, inStock, stock } = product;
  const totalPrice = (price * quantity).toFixed(2);
  const wishlisted = isWishlisted(id);

  const decrease = () => setQuantity((q) => Math.max(1, q - 1));
  const increase = () => setQuantity((q) => Math.min(stock || 1, q + 1));

  const handleAddToCart = () => {
    addToCart(id);
    if (quantity > 1) {
      setTimeout(() => updateQuantity(id, quantity), 600);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => navigate({ to: '/cart' }), 800);
  };

  return (
    <div className="product-info">
      <div className="product-info__badges">
        <span className="product-info__category-badge">{category}</span>
        <span className="product-info__brand-badge">{brand}</span>
      </div>

      <h1 className="product-info__title">{title}</h1>

      <div className="product-info__rating">
        <StarRating value={rating} />
        <span className="product-info__rating-text">{rating} ({reviews} reviews)</span>
      </div>

      <p className="product-info__price">{price} EGP</p>

      <div className="product-info__stock-row">
        <span className={`product-info__stock-badge${inStock ? '' : ' product-info__stock-badge--out'}`}>
          <span className="product-info__stock-dot" />
          {inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      <div className="product-info__description-row">
        <p className="product-info__description">{description}</p>
      </div>

      <div className="product-info__quantity-row">
        <label className="product-info__quantity-label" htmlFor="quantity">Quantity</label>
        <div className="product-info__quantity-controls">
          <div className="product-info__stepper">
            <button type="button" id="decrease-qty" onClick={decrease} aria-label="Decrease quantity">
              <img src={decreaseIcon} alt="" />
            </button>
            <input id="quantity" type="text" readOnly value={quantity} />
            <button type="button" id="increase-qty" onClick={increase} aria-label="Increase quantity">
              <img src={increaseIcon} alt="" />
            </button>
          </div>
          <span className="product-info__stock-note">{stock} available</span>
        </div>
      </div>

      <div className="product-info__total-box">
        <span className="product-info__total-label">Total Price:</span>
        <span className="product-info__total-value">{totalPrice} EGP</span>
      </div>

      <div className="product-info__actions">
        <button
          type="button"
          id="add-to-cart"
          className="product-info__btn product-info__btn--primary"
          onClick={handleAddToCart}
          disabled={!inStock || isAdding}
        >
          <img src={cartIcon} alt="" />
          {isAdding ? 'Adding…' : 'Add to Cart'}
        </button>
        <button
          type="button"
          id="buy-now"
          className="product-info__btn product-info__btn--dark"
          onClick={handleBuyNow}
          disabled={!inStock || isAdding}
        >
          <img src={boltIcon} alt="" />
          Buy Now
        </button>
      </div>

      <div className="product-info__secondary-actions">
        <button
          type="button"
          id="wishlist-button"
          className="product-info__btn product-info__btn--outline"
          onClick={() => toggleWishlist(id)}
          disabled={pendingId === id}
          aria-pressed={wishlisted}
        >
          <img src={heartIcon} alt="" />
          {wishlisted ? 'In Wishlist' : 'Add to Wishlist'}
        </button>
        <button
          type="button"
          className="product-info__icon-btn"
          aria-label="Share"
          onClick={() => {
            if (navigator.share) navigator.share({ title, url: window.location.href });
            else navigator.clipboard?.writeText(window.location.href);
          }}
        >
          <img src={shareIcon} alt="" />
        </button>
      </div>

      <div className="product-info__perks">
        <div className="product-info__perk">
          <span className="product-info__perk-icon"><img src={truckIcon} alt="" /></span>
          <div>
            <p className="product-info__perk-title">Free Delivery</p>
            <p className="product-info__perk-subtitle">Orders over 1000 EGP</p>
          </div>
        </div>
        <div className="product-info__perk">
          <span className="product-info__perk-icon"><img src={returnIcon} alt="" /></span>
          <div>
            <p className="product-info__perk-title">30 Days Return</p>
            <p className="product-info__perk-subtitle">Money back</p>
          </div>
        </div>
        <div className="product-info__perk">
          <span className="product-info__perk-icon"><img src={shieldIcon} alt="" /></span>
          <div>
            <p className="product-info__perk-title">Secure Payment</p>
            <p className="product-info__perk-subtitle">100% Protected</p>
          </div>
        </div>
      </div>
    </div>
  );
}


