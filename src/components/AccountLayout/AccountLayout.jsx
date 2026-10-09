'use client'

import { Link } from '@/components/NextRouter';
const personIcon = '/freshcart/assets/icons/account/person-white.svg';
const pinGray = '/freshcart/assets/icons/checkout/pin.svg';
const pinWhite = '/freshcart/assets/icons/account/pin-white.svg';
const gearGray = '/freshcart/assets/icons/account/gear-gray.svg';
const gearWhite = '/freshcart/assets/icons/account/gear-white.svg';
const chevronGray = '/freshcart/assets/icons/account/chevron-gray.svg';
const chevronGreen = '/freshcart/assets/icons/account/chevron-green.svg';
const NAV_ITEMS = [
  { key: 'addresses', label: 'My Addresses', to: '/account/addresses', iconActive: pinWhite, iconInactive: pinGray },
  { key: 'settings', label: 'Settings', to: '/account/settings', iconActive: gearWhite, iconInactive: gearGray },
];

export default function AccountLayout({ active, children }) {
  return (
    <div className="account-layout">
      <div className="account-layout__banner">
        <div className="account-layout__banner-inner">
          <nav className="account-layout__breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span className="account-layout__breadcrumb-current">My Account</span>
          </nav>

          <div className="account-layout__heading">
            <span className="account-layout__heading-icon">
              <img src={personIcon} alt="" />
            </span>
            <div>
              <h1 className="account-layout__title">My Account</h1>
              <p className="account-layout__subtitle">Manage your addresses and account settings</p>
            </div>
          </div>
        </div>
      </div>

      <div className="account-layout__body">
        <aside className="account-layout__sidebar">
          <nav className="account-layout__nav" aria-label="Account">
            <h2 className="account-layout__nav-title">My Account</h2>
            <ul className="account-layout__nav-list">
              {NAV_ITEMS.map((item) => {
                const isActive = item.key === active;
                return (
                  <li key={item.key}>
                    <Link
                      to={item.to}
                      className={`account-layout__nav-link${isActive ? ' account-layout__nav-link--active' : ''}`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span className="account-layout__nav-icon">
                        <img src={isActive ? item.iconActive : item.iconInactive} alt="" />
                      </span>
                      <span className="account-layout__nav-label">{item.label}</span>
                      <img
                        className="account-layout__nav-chevron"
                        src={isActive ? chevronGreen : chevronGray}
                        alt=""
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <main className="account-layout__main">{children}</main>
      </div>
    </div>
  );
}
