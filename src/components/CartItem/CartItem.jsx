'use client'

import { Link } from '@/components/NextRouter';
const checkIcon = '/freshcart/assets/icons/cart/check.svg';
const minusIcon = '/freshcart/assets/icons/cart/minus.svg';
const plusIcon = '/freshcart/assets/icons/cart/plus.svg';
const removeIcon = '/freshcart/assets/icons/cart/remove.svg';
export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const { id, image, title, category, sku, price, quantity, minQuantity = 1 } = item;
  const lineTotal = price * quantity;

  return (
    <li className="cart-item">
      <Link to="/products/$id" params={{ id: String(id) }} className="cart-item__image-link">
        <span className="cart-item__image-wrap">
          <img
            src={image}
            alt={title}
            className="cart-item__image"
            loading="lazy"
            decoding="async"
            width="128"
            height="128"
          />
        </span>
        <span className="cart-item__badge">
          <img src={checkIcon} alt="" />
          In Stock
        </span>
      </Link>

      <div className="cart-item__body">
        <div className="cart-item__info">
          <Link to="/products/$id" params={{ id: String(id) }} className="cart-item__title">{title}</Link>
          <div className="cart-item__meta">
            <span className="cart-item__category">{category}</span>
            <span className="cart-item__dot">•</span>
            <span className="cart-item__sku">SKU: {sku}</span>
          </div>
        </div>

        <div className="cart-item__price">
          <span className="cart-item__price-value">{price} EGP</span>
          <span className="cart-item__price-unit">per unit</span>
        </div>

        <div className="cart-item__controls">
          <div className="cart-item__stepper">
            <button
              type="button"
              className="cart-item__step-btn cart-item__step-btn--decrease"
              onClick={() => onDecrease(id)}
              disabled={quantity <= minQuantity}
              aria-label={`Decrease quantity of ${title}`}
            >
              <img src={minusIcon} alt="" />
            </button>
            <span className="cart-item__qty">{quantity}</span>
            <button
              type="button"
              className="cart-item__step-btn cart-item__step-btn--increase"
              onClick={() => onIncrease(id)}
              aria-label={`Increase quantity of ${title}`}
            >
              <img src={plusIcon} alt="" />
            </button>
          </div>

          <div className="cart-item__total-row">
            <div className="cart-item__total">
              <span className="cart-item__total-label">Total</span>
              <span className="cart-item__total-value">
                {lineTotal} <span className="cart-item__total-currency">EGP</span>
              </span>
            </div>
            <button
              type="button"
              className="cart-item__remove"
              onClick={() => onRemove(id)}
              aria-label={`Remove ${title} from cart`}
            >
              <img src={removeIcon} alt="" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
