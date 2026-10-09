import Link from "next/link";
import "./footer.css";

const logo = "/freshcart/assets/icons/footer/logo.svg";
const phoneIcon = "/freshcart/assets/icons/footer/phone.svg";
const mailIcon = "/freshcart/assets/icons/footer/mail.svg";
const locationIcon = "/freshcart/assets/icons/footer/location.svg";
const facebookIcon = "/freshcart/assets/icons/footer/facebook.svg";
const twitterIcon = "/freshcart/assets/icons/footer/twitter.svg";
const instagramIcon = "/freshcart/assets/icons/footer/instagram.svg";
const youtubeIcon = "/freshcart/assets/icons/footer/youtube.svg";
const paymentCardIcon = "/freshcart/assets/icons/footer/payment-card.svg";

const linkColumns = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Categories", href: "/categories" },
      { label: "Brands", href: "/brands" },
      { label: "Electronics", href: "/products?category=6439d2d167d9aa4ca970649f" },
      { label: "Men's Fashion", href: "/products?category=6439d5b90049ad0b52b90048" },
      { label: "Women's Fashion", href: "/products?category=6439d58a0049ad0b52b9003f" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Account", href: "/account" },
      { label: "Order History", href: "/orders" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Shopping Cart", href: "/cart" },
      { label: "Sign In", href: "/login" },
      { label: "Create Account", href: "/register" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Help Center", href: "/help" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Returns & Refunds", href: "/return" },
      { label: "Track Order", href: "/orders" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Cookie Policy", href: "/cookie-policy" },
    ],
  },
];

const paymentMethods = ["Visa", "Mastercard", "PayPal"];

export default function Footer() {
  return (
    <footer className="footer" id="footer" style={{ backgroundColor: "#0b1426" }}>
      <div className="footer__inner">
        <div className="footer__grid">
          {/* العمود الأول: اللوجو + الوصف + بيانات الاتصال + السوشيال ميديا */}
          <div className="footer__about">
            <Link href="/" className="footer__logo-link">
              <img src={logo} alt="FreshCart" className="footer__logo" />
            </Link>

            <p className="footer__blurb">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>

            <div className="footer__contact">
              <div className="footer__contact-item">
                <img src={phoneIcon} alt="phone" className="footer__contact-icon" />
                <a href="tel:+18001234567" className="footer__contact-link">
                  +1 (800) 123-4567
                </a>
              </div>
              <div className="footer__contact-item">
                <img src={mailIcon} alt="mail" className="footer__contact-icon" />
                <a href="mailto:support@freshcart.com" className="footer__contact-link">
                  support@freshcart.com
                </a>
              </div>
              <div className="footer__contact-item">
                <img src={locationIcon} alt="location" className="footer__contact-icon" />
                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>

            <div className="footer__socials">
              <a href="#" className="footer__social-link" aria-label="Facebook">
                <img src={facebookIcon} alt="Facebook" />
              </a>
              <a href="#" className="footer__social-link" aria-label="Twitter">
                <img src={twitterIcon} alt="Twitter" />
              </a>
              <a href="#" className="footer__social-link" aria-label="Instagram">
                <img src={instagramIcon} alt="Instagram" />
              </a>
              <a href="#" className="footer__social-link" aria-label="YouTube">
                <img src={youtubeIcon} alt="YouTube" />
              </a>
            </div>
          </div>

          {/* الأعمدة الأربعة */}
          {linkColumns.map((col) => (
            <div className="footer__column" key={col.title}>
              <h3 className="footer__column-title">{col.title}</h3>
              <ul className="footer__link-list">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="footer__link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* الشريط السفلي */}
      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <p className="footer__copyright">
            © {new Date().getFullYear()} FreshCart. All rights reserved.
          </p>
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
