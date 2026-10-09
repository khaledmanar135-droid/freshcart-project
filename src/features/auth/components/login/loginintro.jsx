'use client'

const cartIllustration = '/freshcart/assets/images/login/cart-illustration.webp';
const freeDeliveryIcon = '/freshcart/assets/icons/login/free-delivery.svg';
const securePaymentIcon = '/freshcart/assets/icons/login/secure-payment.svg';
const supportIcon = '/freshcart/assets/icons/login/support.svg';
const FEATURES = [
  { icon: freeDeliveryIcon, label: 'Free Delivery' },
  { icon: securePaymentIcon, label: 'Secure Payment' },
  { icon: supportIcon, label: '24/7 Support' },
];

export default function LoginIntro() {
  return (
    <div className="login-intro">
      <div className="login-intro__illustration">
        <img src={cartIllustration} alt="" loading="lazy" decoding="async" />
      </div>

      <div className="login-intro__body">
        <h2 className="login-intro__title">FreshCart - Your One-Stop Shop for Fresh Products</h2>
        <p className="login-intro__subtitle">
          Join thousands of happy customers who trust FreshCart for their daily grocery needs
        </p>

        <ul className="login-intro__features">
          {FEATURES.map((feature) => (
            <li key={feature.label} className="login-intro__feature">
              <img src={feature.icon} alt="" />
              {feature.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
