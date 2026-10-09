'use client'

const shippingIcon = '/freshcart/assets/icons/trust-badges/shipping.svg';
const returnsIcon = '/freshcart/assets/icons/trust-badges/returns.svg';
const securePaymentIcon = '/freshcart/assets/icons/trust-badges/secure-payment.svg';
const supportIcon = '/freshcart/assets/icons/trust-badges/support.svg';
const ITEMS = [
  { icon: shippingIcon, title: 'Free Shipping', subtitle: 'On orders over 500 EGP' },
  { icon: returnsIcon, title: 'Easy Returns', subtitle: '14-day return policy' },
  { icon: securePaymentIcon, title: 'Secure Payment', subtitle: '100% secure checkout' },
  { icon: supportIcon, title: '24/7 Support', subtitle: 'Contact us anytime' },
];

export default function TrustBadges() {
  return (
    <section className="trust-badges">
      <div className="trust-badges__inner">
        {ITEMS.map((item) => (
          <div key={item.title} className="trust-badges__item">
            <span className="trust-badges__icon">
              <img src={item.icon} alt="" />
            </span>
            <div>
              <p className="trust-badges__title">{item.title}</p>
              <p className="trust-badges__subtitle">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
