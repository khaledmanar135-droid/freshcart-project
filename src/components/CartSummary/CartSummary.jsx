'use client'

import { useState } from 'react';
import { Link } from '@/components/NextRouter';
const summaryIcon = '/freshcart/assets/icons/cart/order-summary.svg';
const shippingTruckIcon = '/freshcart/assets/icons/cart/shipping-truck.svg';
const tagIcon = '/freshcart/assets/icons/cart/tag.svg';
const lockIcon = '/freshcart/assets/icons/cart/lock.svg';
const shieldIcon = '/freshcart/assets/icons/cart/shield.svg';
const deliveryTruckIcon = '/freshcart/assets/icons/cart/delivery-truck.svg';
const FREE_SHIPPING_THRESHOLD = 500;

export default function CartSummary({
  itemCount,
  subtotal,
  totalAfterDiscount = null,
  onApplyCoupon,
  isApplyingCoupon = false,
}) {
  const [promoOpen, setPromoOpen] = useState(false);
  const [code, setCode] = useState('');
  const qualifiesForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const total = totalAfterDiscount ?? subtotal;

  const submitCoupon = (e) => {
    e.preventDefault();
    if (code.trim()) onApplyCoupon?.(code.trim());
  };

  return (
    <div className="cart-summary">
      <div className="cart-summary__header">
        <h2 className="cart-summary__title">
          <img src={summaryIcon} alt="" />
          Order Summary
        </h2>
        <p className="cart-summary__subtitle">{itemCount} items in your cart</p>
      </div>

      <div className="cart-summary__body">
        {qualifiesForFreeShipping && (
          <div className="cart-summary__promo">
            <span className="cart-summary__promo-icon">
              <img src={shippingTruckIcon} alt="" />
            </span>
            <div>
              <p className="cart-summary__promo-title">Free Shipping!</p>
              <p className="cart-summary__promo-subtitle">You qualify for free delivery</p>
            </div>
          </div>
        )}

        <div className="cart-summary__rows">
          <div className="cart-summary__row">
            <span>Subtotal</span>
            <span className="cart-summary__row-value">{subtotal.toLocaleString()} EGP</span>
          </div>
          {totalAfterDiscount != null && (
            <div className="cart-summary__row">
              <span>Discount</span>
              <span className="cart-summary__row-value cart-summary__row-value--free">
                −{(subtotal - totalAfterDiscount).toLocaleString()} EGP
              </span>
            </div>
          )}
          <div className="cart-summary__row">
            <span>Shipping</span>
            <span className="cart-summary__row-value cart-summary__row-value--free">FREE</span>
          </div>
          <div className="cart-summary__total-row">
            <span className="cart-summary__total-label">Total</span>
            <span className="cart-summary__total-value">
              {total.toLocaleString()} <span className="cart-summary__total-currency">EGP</span>
            </span>
          </div>
        </div>

        {promoOpen ? (
          <form className="cart-summary__promo-form" onSubmit={submitCoupon}>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter promo code"
              aria-label="Promo code"
            />
            <button type="submit" disabled={isApplyingCoupon || !code.trim()}>
              {isApplyingCoupon ? 'Applying…' : 'Apply'}
            </button>
          </form>
        ) : (
          <button type="button" className="cart-summary__promo-btn" onClick={() => setPromoOpen(true)}>
            <img src={tagIcon} alt="" />
            Apply Promo Code
          </button>
        )}

        <Link to="/checkout" className="cart-summary__checkout-btn">
          <img src={lockIcon} alt="" />
          Secure Checkout
        </Link>

        <div className="cart-summary__trust">
          <span className="cart-summary__trust-item">
            <img src={shieldIcon} alt="" />
            Secure Payment
          </span>
          <span className="cart-summary__trust-divider" />
          <span className="cart-summary__trust-item">
            <img src={deliveryTruckIcon} alt="" />
            Fast Delivery
          </span>
        </div>

        <Link to="/" className="cart-summary__continue">← Continue Shopping</Link>
      </div>
    </div>
  );
}
