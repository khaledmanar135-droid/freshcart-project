'use client'

import { Link } from '@/components/NextRouter';
const logo = '/freshcart/assets/icons/footer/logo.svg';
const paymentCardIcon = '/freshcart/assets/icons/footer/payment-card.svg';
const linkColumns = [
  {
    title: 'Shop',
    links: [
      { label: 'All Products', to: '/products' },
      { label: 'Categories', to: '/categories' },
      { label: 'Brands', to: '/brands' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'My Account', to: '/account/settings' },
      { label: 'Order History', to: '/orders' },
      { label: 'Wishlist', to: '/wishlist' },
      { label: 'Shopping Cart', to: '/cart' },
      { label: 'Sign In', to: '/login' },
      { label: 'Create Account', to: '/register' },
    ],
  },
];

const paymentMethods = ['Visa', 'Mastercard', 'PayPal'];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          <div className="footer__about">
            <Link to="/" className="footer__logo-link">
              <img src={logo} alt="FreshCart" className="footer__logo" />
            </Link>
            <p className="footer__blurb">
              FreshCart is your one-stop destination for quality products. From fashion to
              electronics, we bring you the best brands at competitive prices with a seamless
              shopping experience.
            </p>
          </div>

          {linkColumns.map((column) => (
            <div className="footer__column" key={column.title}>
              <h3 className="footer__column-title">{column.title}</h3>
              <ul className="footer__link-list">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="footer__link">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <p className="footer__copyright">© 2026 FreshCart. All rights reserved.</p>
          <div className="footer__payments">
            {paymentMethods.map((method) => (
              <span className="footer__payment" key={method}>
                <img src={paymentCardIcon} alt="" className="footer__payment-icon" />
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
