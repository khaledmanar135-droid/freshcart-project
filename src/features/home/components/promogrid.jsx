'use client'

const arrowGreen = '/freshcart/assets/icons/promo/arrow-right-green.svg';
const arrowOrange = '/freshcart/assets/icons/promo/arrow-right-orange.svg';
const PROMOS = [
  {
    id: 'organic-fruits',
    modifier: 'promo-card--green',
    badgeIcon: '🔥',
    badgeLabel: 'Deal of the Day',
    title: 'Fresh Organic Fruits',
    description: 'Get up to 40% off on selected organic fruits',
    discount: '40% OFF',
    code: 'ORGANIC40',
    ctaLabel: 'Shop Now',
    ctaIcon: arrowGreen,
    href: '/products',
  },
  {
    id: 'exotic-vegetables',
    modifier: 'promo-card--orange',
    badgeIcon: '✨',
    badgeLabel: 'New Arrivals',
    title: 'Exotic Vegetables',
    description: 'Discover our latest collection of premium vegetables',
    discount: '25% OFF',
    code: 'FRESH25',
    ctaLabel: 'Explore Now',
    ctaIcon: arrowOrange,
    href: '/products',
  },
];

export default function PromoGrid() {
  return (
    <section className="promo-grid">
      <div className="promo-grid__inner">
        {PROMOS.map((promo) => (
          <article key={promo.id} className={`promo-card ${promo.modifier}`}>
            <span className="promo-card__decor promo-card__decor--top" aria-hidden="true" />
            <span className="promo-card__decor promo-card__decor--bottom" aria-hidden="true" />

            <div className="promo-card__content">
              <span className="promo-card__badge">
                <span className="promo-card__badge-icon">{promo.badgeIcon}</span>
                {promo.badgeLabel}
              </span>

              <h2 className="promo-card__title">{promo.title}</h2>
              <p className="promo-card__description">{promo.description}</p>

              <div className="promo-card__offer">
                <span className="promo-card__discount">{promo.discount}</span>
                <span className="promo-card__code">
                  Use code: <strong>{promo.code}</strong>
                </span>
              </div>

              <a className="promo-card__cta" href={promo.href}>
                {promo.ctaLabel}
                <img src={promo.ctaIcon} alt="" className="promo-card__cta-icon" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
