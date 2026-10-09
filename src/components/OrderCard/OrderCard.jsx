'use client'

import { useState } from 'react';
const hashIcon = '/freshcart/assets/icons/orders/hash.svg';
const calendarIcon = '/freshcart/assets/icons/orders/calendar.svg';
const boxIcon = '/freshcart/assets/icons/orders/box.svg';
const pinIcon = '/freshcart/assets/icons/orders/pin.svg';
const phoneIcon = '/freshcart/assets/icons/orders/phone.svg';
const orderItemsIcon = '/freshcart/assets/icons/orders/order-items.svg';
const deliveryAddressIcon = '/freshcart/assets/icons/orders/delivery-address.svg';
const orderSummaryIcon = '/freshcart/assets/icons/orders/order-summary.svg';
const chevronHideIcon = '/freshcart/assets/icons/orders/chevron-hide.svg';
const chevronDetailsIcon = '/freshcart/assets/icons/orders/chevron-details.svg';
const statusProcessingIcon = '/freshcart/assets/icons/orders/status-processing.svg';
const statusOnTheWayIcon = '/freshcart/assets/icons/orders/status-on-the-way.svg';
const actionProcessingIcon = '/freshcart/assets/icons/orders/action-processing.svg';
const actionOnTheWayIcon = '/freshcart/assets/icons/orders/action-on-the-way.svg';
const STATUS_CONFIG = {
  processing: {
    label: 'Processing',
    icon: statusProcessingIcon,
    actionIcon: actionProcessingIcon,
  },
  'on-the-way': {
    label: 'On the way',
    icon: statusOnTheWayIcon,
    actionIcon: actionOnTheWayIcon,
  },
};

export default function OrderCard({ order, defaultExpanded = false }) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const status = STATUS_CONFIG[order.status];
  const { extraCount } = order;

  return (
    <li className={`order-card${expanded ? ' order-card--expanded' : ''}`}>
      <div className="order-card__header">
        <div className="order-card__image-wrap">
          <span className="order-card__image-inner">
            <img src={order.image} alt={order.items[0]?.title ?? ''} loading="lazy" decoding="async" />
          </span>
          {extraCount > 0 && (
            <span className="order-card__badge">+{extraCount}</span>
          )}
        </div>

        <div className="order-card__info">
          <div className="order-card__top-row">
            <div className="order-card__status-group">
              <span className={`order-card__status-badge order-card__status-badge--${order.status}`}>
                <img src={status.icon} alt="" />
                {status.label}
              </span>
              <h2 className="order-card__number">
                <img src={hashIcon} alt="" />
                {order.id}
              </h2>
            </div>
            <span className={`order-card__action-btn order-card__action-btn--${order.status}`}>
              <img src={status.actionIcon} alt="" />
            </span>
          </div>

          <div className="order-card__meta">
            <span className="order-card__meta-item">
              <img src={calendarIcon} alt="" />
              {order.date}
            </span>
            <span className="order-card__meta-dot" />
            <span className="order-card__meta-item">
              <img src={boxIcon} alt="" />
              {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'}
            </span>
            <span className="order-card__meta-dot" />
            <span className="order-card__meta-item">
              <img src={pinIcon} alt="" />
              {order.city}
            </span>
          </div>

          <div className="order-card__bottom-row">
            <div className="order-card__price">
              <span className="order-card__price-value">{order.total.toLocaleString()}</span>
              <span className="order-card__price-currency">EGP</span>
            </div>
            <button
              type="button"
              className={`order-card__toggle-btn${expanded ? ' order-card__toggle-btn--expanded' : ''}`}
              aria-expanded={expanded}
              onClick={() => setExpanded((value) => !value)}
            >
              {expanded ? 'Hide' : 'Details'}
              <img src={expanded ? chevronHideIcon : chevronDetailsIcon} alt="" />
            </button>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="order-card__details">
          <div className="order-card__section">
            <p className="order-card__section-title">
              <span className="order-card__section-icon order-card__section-icon--items">
                <img src={orderItemsIcon} alt="" />
              </span>
              Order Items
            </p>
            <ul className="order-card__item-list">
              {order.items.map((item, index) => (
                <li key={`${item.title}-${index}`} className="order-card__item-row">
                  <span className="order-card__item-image">
                    <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
                  </span>
                  <span className="order-card__item-info">
                    <span className="order-card__item-title">{item.title}</span>
                    <span className="order-card__item-qty">{item.quantity} × {item.price} EGP</span>
                  </span>
                  <span className="order-card__item-total">
                    <span className="order-card__item-total-value">{item.price * item.quantity}</span>
                    <span className="order-card__item-total-currency">EGP</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-card__grid">
            <div className="order-card__address-box">
              <p className="order-card__section-title">
                <span className="order-card__section-icon order-card__section-icon--address">
                  <img src={deliveryAddressIcon} alt="" />
                </span>
                Delivery Address
              </p>
              <div className="order-card__address-body">
                <p className="order-card__address-name">{order.address.name}</p>
                <p className="order-card__address-detail">{order.address.detail}</p>
                <p className="order-card__address-phone">
                  <img src={phoneIcon} alt="" />
                  {order.address.phone}
                </p>
              </div>
            </div>

            <div className="order-card__summary-box">
              <p className="order-card__section-title">
                <span className="order-card__section-icon order-card__section-icon--summary">
                  <img src={orderSummaryIcon} alt="" />
                </span>
                Order Summary
              </p>
              <div className="order-card__summary-body">
                <div className="order-card__summary-row">
                  <span>Subtotal</span>
                  <span>{order.summary.subtotal.toLocaleString()} EGP</span>
                </div>
                <div className="order-card__summary-row">
                  <span>Shipping</span>
                  <span>{order.summary.shipping}</span>
                </div>
                <hr />
                <div className="order-card__summary-row order-card__summary-row--total">
                  <span>Total</span>
                  <span>{order.summary.total.toLocaleString()} EGP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}
