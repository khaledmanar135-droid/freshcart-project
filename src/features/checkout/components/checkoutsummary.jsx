'use client'

const bagIcon = '/freshcart/assets/icons/checkout/bag.svg';
const shippingTruckIcon = '/freshcart/assets/icons/checkout/shipping-truck.svg';
const placeOrderIcon = '/freshcart/assets/icons/checkout/place-order.svg';
const secureShieldIcon = '/freshcart/assets/icons/checkout/secure-shield.svg';
const deliveryTruckIcon = '/freshcart/assets/icons/checkout/delivery-truck.svg';
const returnsBoxIcon = '/freshcart/assets/icons/checkout/returns-box.svg';
export default function CheckoutSummary({ items, subtotal, onPlaceOrder, isPlacingOrder = false }) {
  return (
    <div className="checkout-summary">
      <div className="checkout-summary__header">
        <h2 className="checkout-summary__title">
          <img src={bagIcon} alt="" />
          Order Summary
        </h2>
        <p className="checkout-summary__subtitle">{items.length} items</p>
      </div>

      <div className="checkout-summary__body">
        <ul className="checkout-summary__items">
          {items.map((item) => (
            <li key={item.id} className="checkout-summary__item">
              <span className="checkout-summary__item-image">
                <img src={item.image} alt={item.title} loading="lazy" decoding="async" width="56" height="56" />
              </span>
              <span className="checkout-summary__item-info">
                <span className="checkout-summary__item-title">{item.title}</span>
                <span className="checkout-summary__item-qty">{item.quantity} × {item.price} EGP</span>
              </span>
              <span className="checkout-summary__item-total">{item.price * item.quantity}</span>
            </li>
          ))}
        </ul>

        <div className="checkout-summary__rows">
          <div className="checkout-summary__row">
            <span>Subtotal</span>
            <span className="checkout-summary__row-value">{subtotal.toLocaleString()} EGP</span>
          </div>
          <div className="checkout-summary__row">
            <span className="checkout-summary__row-label">
              <img src={shippingTruckIcon} alt="" />
              Shipping
            </span>
            <span className="checkout-summary__row-value checkout-summary__row-value--free">FREE</span>
          </div>
          <div className="checkout-summary__total-row">
            <span className="checkout-summary__total-label">Total</span>
            <span className="checkout-summary__total-value">
              {subtotal.toLocaleString()} <span className="checkout-summary__total-currency">EGP</span>
            </span>
          </div>
        </div>

        <button
          type="button"
          className="checkout-summary__place-order"
          onClick={onPlaceOrder}
          disabled={isPlacingOrder}
        >
          <img src={placeOrderIcon} alt="" />
          {isPlacingOrder ? 'Placing order…' : 'Place Order'}
        </button>

        <div className="checkout-summary__trust">
          <span className="checkout-summary__trust-item">
            <img src={secureShieldIcon} alt="" />
            Secure
          </span>
          <span className="checkout-summary__trust-divider" />
          <span className="checkout-summary__trust-item">
            <img src={deliveryTruckIcon} alt="" />
            Fast Delivery
          </span>
          <span className="checkout-summary__trust-divider" />
          <span className="checkout-summary__trust-item">
            <img src={returnsBoxIcon} alt="" />
            Easy Returns
          </span>
        </div>
      </div>
    </div>
  );
}
