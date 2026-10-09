'use client'

import { useState } from 'react';
import { toast } from 'sonner';
const mailIcon = '/freshcart/assets/icons/newsletter-signup/mail.svg';
const leafIcon = '/freshcart/assets/icons/newsletter-signup/leaf.svg';
const truckIcon = '/freshcart/assets/icons/newsletter-signup/truck.svg';
const tagIcon = '/freshcart/assets/icons/newsletter-signup/tag.svg';
const arrowRightIcon = '/freshcart/assets/icons/newsletter-signup/arrow-right.svg';
const appleIcon = '/freshcart/assets/icons/newsletter-signup/apple.svg';
const googlePlayIcon = '/freshcart/assets/icons/newsletter-signup/google-play.svg';
const PERKS = [
  { icon: leafIcon, label: 'Fresh Picks Weekly' },
  { icon: truckIcon, label: 'Free Delivery Codes' },
  { icon: tagIcon, label: 'Members-Only Deals' },
];

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!value) return;

    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setSaving(false);
    toast.success('Thanks for subscribing! Watch your inbox for our next update.');
    setEmail('');
  };

  return (
    <section className="newsletter-signup">
      <div className="newsletter-signup__inner">
        <div className="newsletter-signup__card">
          <div className="newsletter-signup__left">
            <div className="newsletter-signup__eyebrow">
              <span className="newsletter-signup__icon-badge">
                <img src={mailIcon} alt="" />
              </span>
              <div>
                <p className="newsletter-signup__kicker">Newsletter</p>
                <p className="newsletter-signup__subscribers">50,000+ subscribers</p>
              </div>
            </div>

            <h2 className="newsletter-signup__title">
              Get the Freshest Updates <span>Delivered Free</span>
            </h2>
            <p className="newsletter-signup__subtitle">
              Weekly recipes, seasonal offers &amp; exclusive member perks.
            </p>

            <ul className="newsletter-signup__perks">
              {PERKS.map((perk) => (
                <li key={perk.label} className="newsletter-signup__perk">
                  <span className="newsletter-signup__perk-icon">
                    <img src={perk.icon} alt="" />
                  </span>
                  {perk.label}
                </li>
              ))}
            </ul>

            <form className="newsletter-signup__form" onSubmit={handleSubscribe}>
              <div className="newsletter-signup__field-row">
                <input
                  type="email"
                  className="newsletter-signup__input"
                  placeholder="you@example.com"
                  aria-label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={saving}
                  required
                />
                <button type="submit" className="newsletter-signup__submit" disabled={saving}>
                  {saving ? 'Subscribing…' : 'Subscribe'}
                  <img src={arrowRightIcon} alt="" />
                </button>
              </div>
              <p className="newsletter-signup__disclaimer">
                ✨ Unsubscribe anytime. No spam, ever.
              </p>
            </form>
          </div>

          <div className="newsletter-signup__right">
            <div className="newsletter-signup__app-card">
              <span className="newsletter-signup__app-badge">📱 MOBILE APP</span>
              <h3 className="newsletter-signup__app-title">Shop Faster on Our App</h3>
              <p className="newsletter-signup__app-subtitle">
                Get app-exclusive deals &amp; 15% off your first order.
              </p>

              <div className="newsletter-signup__store-links">
                <a href="#" className="newsletter-signup__store-link">
                  <img src={appleIcon} alt="" />
                  <span>
                    <em>Download on</em>
                    <strong>App Store</strong>
                  </span>
                </a>
                <a href="#" className="newsletter-signup__store-link">
                  <img src={googlePlayIcon} alt="" />
                  <span>
                    <em>Get it on</em>
                    <strong>Google Play</strong>
                  </span>
                </a>
              </div>

              <div className="newsletter-signup__rating">
                <span className="newsletter-signup__stars">★★★★★</span>
                <span>4.9 • 100K+ downloads</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
