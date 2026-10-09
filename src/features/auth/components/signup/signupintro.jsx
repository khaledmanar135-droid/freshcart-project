'use client'

import StarRating from '@/components/ui/starrating';
const premiumQualityIcon = '/freshcart/assets/icons/signup/premium-quality.svg';
const fastDeliveryIcon = '/freshcart/assets/icons/signup/fast-delivery.svg';
const secureShoppingIcon = '/freshcart/assets/icons/signup/secure-shopping.svg';
const reviewerAvatar = '/freshcart/assets/images/signup/reviewer-avatar.webp';
const FEATURES = [
  {
    icon: premiumQualityIcon,
    title: 'Premium Quality',
    description: 'Premium quality products sourced from trusted suppliers.',
  },
  {
    icon: fastDeliveryIcon,
    title: 'Fast Delivery',
    description: 'Same-day delivery available in most areas',
  },
  {
    icon: secureShoppingIcon,
    title: 'Secure Shopping',
    description: 'Your data and payments are completely secure',
  },
];

export default function SignupIntro() {
  return (
    <div className="signup-intro">
      <h1 className="signup-intro__title">
        Welcome to <span>FreshCart</span>
      </h1>
      <p className="signup-intro__subtitle">
        Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.
      </p>

      <ul className="signup-intro__features">
        {FEATURES.map((feature) => (
          <li key={feature.title} className="signup-intro__feature">
            <span className="signup-intro__feature-icon">
              <img src={feature.icon} alt="" />
            </span>
            <div>
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="signup-intro__review">
        <div className="signup-intro__review-author">
          <img
            src={reviewerAvatar}
            alt=""
            className="signup-intro__review-avatar"
            loading="lazy"
            decoding="async"
            width="48"
            height="48"
          />
          <div>
            <h3>Sarah Johnson</h3>
            <StarRating value={5} />
          </div>
        </div>
        <p className="signup-intro__review-quote">
          &quot;FreshCart has transformed my shopping experience. The quality of the products is
          outstanding, and the delivery is always on time. Highly recommend!&quot;
        </p>
      </div>
    </div>
  );
}
