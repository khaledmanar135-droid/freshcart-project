'use client'

import { useState } from 'react';
import StarRating from '@/components/ui/starrating';
const detailsIcon = '/freshcart/assets/icons/product-tabs/details.svg';
const starIcon = '/freshcart/assets/icons/product-tabs/star.svg';
const shippingIcon = '/freshcart/assets/icons/product-tabs/shipping.svg';
const checkIcon = '/freshcart/assets/icons/product-tabs/check.svg';
const TABS = [
  { id: 'details', label: 'Product Details', icon: detailsIcon },
  { id: 'reviews', label: 'Reviews', icon: starIcon },
  { id: 'shipping', label: 'Shipping & Returns', icon: shippingIcon },
];

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState('details');
  const {
    category,
    subcategory,
    brand,
    description,
    rating,
    reviews,
  } = product;
  const itemsSold = product.itemsSold ?? product.sold ?? 0;
  const keyFeatures = product.keyFeatures ?? [
    `Official ${brand || 'brand'} product`,
    'Quality checked before shipping',
    'Cash on delivery available',
    '30-day easy returns',
  ];
  const reviewsList = product.reviewsList ?? [];

  return (
    <div className="product-tabs">
      <div className="product-tabs__tablist" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`product-tabs__tab${activeTab === tab.id ? ' product-tabs__tab--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <img src={tab.icon} alt="" />
            {tab.label}
            {tab.id === 'reviews' && ` (${reviews})`}
          </button>
        ))}
      </div>

      {activeTab === 'details' && (
        <div className="product-tabs__panel">
          <div>
            <h3 className="product-tabs__heading">About this Product</h3>
            <p className="product-tabs__paragraph">{description}</p>
          </div>
          <div className="product-tabs__grid">
            <div className="product-tabs__box">
              <h4>Product Information</h4>
              <ul className="product-tabs__info-list">
                <li><span>Category</span><span>{category}</span></li>
                <li><span>Subcategory</span><span>{subcategory}</span></li>
                <li><span>Brand</span><span>{brand}</span></li>
                <li><span>Items Sold</span><span>{itemsSold}+ sold</span></li>
              </ul>
            </div>
            <div className="product-tabs__box">
              <h4>Key Features</h4>
              <ul className="product-tabs__feature-list">
                {keyFeatures.map((feature) => (
                  <li key={feature}>
                    <img src={checkIcon} alt="" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="product-tabs__panel">
          <div className="product-tabs__reviews-summary">
            <span className="product-tabs__reviews-score">{rating}</span>
            <div>
              <StarRating value={rating} />
              <p>{reviews} reviews</p>
            </div>
          </div>
          {reviewsList.length === 0 && (
            <p className="product-tabs__paragraph">No written reviews yet for this product.</p>
          )}
          <ul className="product-tabs__reviews-list">
            {reviewsList.map((review) => (
              <li key={review.id ?? review.name} className="product-tabs__review">
                <div className="product-tabs__review-header">
                  <span className="product-tabs__review-name">{review.name}</span>
                  <span className="product-tabs__review-date">{review.date}</span>
                </div>
                <StarRating value={review.rating} />
                <p className="product-tabs__review-comment">{review.comment}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'shipping' && (
        <div className="product-tabs__panel">
          <div className="product-tabs__shipping-list">
            <div>
              <h4>Free Delivery</h4>
              <p>Enjoy free standard delivery on all orders over $50. Orders below this amount incur a small delivery fee at checkout.</p>
            </div>
            <div>
              <h4>30 Days Return</h4>
              <p>Not satisfied? Return the item within 30 days of delivery for a full refund, no questions asked.</p>
            </div>
            <div>
              <h4>Secure Payment</h4>
              <p>All transactions are 100% protected with industry-standard encryption and secure payment gateways.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

