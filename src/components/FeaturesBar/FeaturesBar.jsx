'use client'

const shippingIcon = '/freshcart/assets/icons/features/shipping.svg';
const securePaymentIcon = '/freshcart/assets/icons/features/secure-payment.svg';
const returnsIcon = '/freshcart/assets/icons/features/returns.svg';
const supportIcon = '/freshcart/assets/icons/features/support.svg';
const FEATURES = [
  {
    icon: shippingIcon,
    badgeClass: 'featuresbar__badge--shipping',
    title: 'Free Shipping',
    description: 'On orders over 500 EGP',
  },
  {
    icon: securePaymentIcon,
    badgeClass: 'featuresbar__badge--payment',
    title: 'Secure Payment',
    description: '100% secure transactions',
  },
  {
    icon: returnsIcon,
    badgeClass: 'featuresbar__badge--returns',
    title: 'Easy Returns',
    description: '14-day return policy',
  },
  {
    icon: supportIcon,
    badgeClass: 'featuresbar__badge--support',
    title: '24/7 Support',
    description: 'Dedicated support team',
  },
];

export default function FeaturesBar() {
  return (
    <section className="featuresbar">
      <div className="featuresbar__inner">
        {FEATURES.map(({ icon, badgeClass, title, description }) => (
          <div className="featuresbar__card" key={title}>
            <span className={`featuresbar__badge ${badgeClass}`}>
              <img src={icon} alt="" className="featuresbar__icon" />
            </span>
            <div className="featuresbar__text">
              <h2 className="featuresbar__title">{title}</h2>
              <p className="featuresbar__description">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
