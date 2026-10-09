'use client'

import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from '@/lib/nextrouter';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { getCategories } from '../../services/categories';
const logo = '/freshcart/assets/icons/header/logo.svg';
const searchIcon = '/freshcart/assets/icons/header/search.svg';
const chevronDownIcon = '/freshcart/assets/icons/header/chevron-down.svg';
const supportIcon = '/freshcart/assets/icons/header/support.svg';
const wishlistIcon = '/freshcart/assets/icons/header/wishlist.svg';
const cartIcon = '/freshcart/assets/icons/header/cart.svg';
const userIcon = '/freshcart/assets/icons/header/user.svg';
const mobileWishlistIcon = '/freshcart/assets/icons/header-mobile/wishlist.svg';
const mobileCartIcon = '/freshcart/assets/icons/header-mobile/cart.svg';
const menuIcon = '/freshcart/assets/icons/header-mobile/menu.svg';
const closeIcon = '/freshcart/assets/icons/mobile-drawer/close.svg';
const drawerWishlistIcon = '/freshcart/assets/icons/mobile-drawer/wishlist.svg';
const drawerCartIcon = '/freshcart/assets/icons/mobile-drawer/cart.svg';
const logoutIcon = '/freshcart/assets/icons/mobile-drawer/logout.svg';
const helpIcon = '/freshcart/assets/icons/mobile-drawer/help.svg';
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const categoriesRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();
  const { cart } = useCart();
  const { items: wishlistItems } = useWishlist();
  const cartCount = cart.numOfCartItems ?? 0;
  const wishlistCount = wishlistItems.length;
  const categoriesQuery = useQuery({
    queryKey: ['categories', 'header'],
    queryFn: async () => (await getCategories({ limit: 4 })).data?.data ?? [],
    staleTime: 5 * 60 * 1000,
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchValue.trim();
    setMenuOpen(false);
    if (trimmed) {
      navigate({ to: '/search', search: { q: trimmed } });
    } else {
      navigate({ to: '/search' });
    }
  };

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate({ to: '/login', replace: true });
  };

  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!categoriesOpen) return undefined;

    const closeDropdown = (event) => {
      if (!categoriesRef.current?.contains(event.target)) setCategoriesOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setCategoriesOpen(false);
    };

    document.addEventListener('pointerdown', closeDropdown);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeDropdown);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [categoriesOpen]);

  useEffect(() => {
    if (!userMenuOpen) return undefined;

    const closeDropdown = (event) => {
      if (!userMenuRef.current?.contains(event.target)) setUserMenuOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setUserMenuOpen(false);
    };

    document.addEventListener('pointerdown', closeDropdown);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeDropdown);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [userMenuOpen]);

  return (
    <header className="header">
      <div className="header__inner">
        <Link className="header__logo" to="/" aria-label="FreshCart home">
          <img src={logo} alt="FreshCart" />
        </Link>

        <form className="header__search" role="search" onSubmit={handleSearchSubmit}>
          <input
            type="search"
            className="header__search-input"
            placeholder="Search for products, brands and more..."
            aria-label="Search for products, brands and more"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type="submit" className="header__search-btn" aria-label="Search">
            <img src={searchIcon} alt="" />
          </button>
        </form>

        <nav className="header__nav" aria-label="Main">
          <Link className="header__nav-link" to="/">Home</Link>
          <Link className="header__nav-link" to="/products">Shop</Link>
          <div
            className="header__categories-wrap"
            ref={categoriesRef}
            onPointerEnter={() => setCategoriesOpen(true)}
            onPointerLeave={() => setCategoriesOpen(false)}
            onFocusCapture={() => setCategoriesOpen(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setCategoriesOpen(false);
            }}
          >
            <button
              type="button"
              className={`header__nav-link header__categories${categoriesOpen ? ' header__categories--open' : ''}`}
              aria-expanded={categoriesOpen}
              aria-haspopup="menu"
              onClick={() => setCategoriesOpen((open) => !open)}
            >
              Categories
              <img src={chevronDownIcon} alt="" className="header__chevron" />
            </button>
            {categoriesOpen && (
              <div className="header__categories-menu" role="menu">
                <Link to="/categories" role="menuitem" onClick={() => setCategoriesOpen(false)}>
                  All Categories
                </Link>
                {categoriesQuery.data?.map((category) => (
                  <Link
                    to="/categories/$id"
                    params={{ id: category._id }}
                    role="menuitem"
                    onClick={() => setCategoriesOpen(false)}
                    key={category._id}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link className="header__nav-link" to="/brands">Brands</Link>
        </nav>

        <div className="header__actions">
          <a className="header__support" href="#">
            <span className="header__support-icon">
              <img src={supportIcon} alt="" />
            </span>
            <span className="header__support-text">
              <span className="header__support-label">Support</span>
              <span className="header__support-value">24/7 Help</span>
            </span>
          </a>
          <Link className="header__icon-btn" to="/wishlist" aria-label="Wishlist">
            <img src={wishlistIcon} alt="" />
            {wishlistCount > 0 && <span className="header__badge">{wishlistCount}</span>}
          </Link>
          <Link className="header__icon-btn" to="/cart" aria-label="Cart">
            <img src={cartIcon} alt="" />
            {cartCount > 0 && <span className="header__badge">{cartCount}</span>}
          </Link>
          {isLoggedIn ? (
            <div className="header__user-menu-wrapper" ref={userMenuRef}>
              <button
                type="button"
                className="header__user-btn"
                onClick={() => setUserMenuOpen((open) => !open)}
                aria-expanded={userMenuOpen}
                aria-haspopup="menu"
              >
                <span className="header__user-avatar">
                  <img src={userIcon} alt="" />
                </span>
                <span className="header__user-name">
                  {user?.name ? user.name.split(' ')[0] : 'Account'}
                </span>
                <img
                  src={chevronDownIcon}
                  alt=""
                  className={`header__chevron ${userMenuOpen ? 'header__chevron--open' : ''}`}
                />
              </button>

              {userMenuOpen && (
                <div className="header__user-dropdown" role="menu">
                  <div className="header__user-dropdown-header">
                    <p className="header__user-dropdown-name">{user?.name || 'User'}</p>
                    <p className="header__user-dropdown-email">{user?.email || ''}</p>
                  </div>
                  <div className="header__user-dropdown-divider" />
                  <Link
                    to="/account/settings"
                    role="menuitem"
                    className="header__user-dropdown-item"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <img src={userIcon} alt="" />
                    My Profile
                  </Link>
                  <Link
                    to="/orders"
                    role="menuitem"
                    className="header__user-dropdown-item"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <img src={cartIcon} alt="" />
                    My Orders
                  </Link>
                  <div className="header__user-dropdown-divider" />
                  <button
                    type="button"
                    role="menuitem"
                    className="header__user-dropdown-item header__user-dropdown-item--danger"
                    onClick={() => {
                      setUserMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    <img src={logoutIcon} alt="" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link className="header__nav-link" to="/login">Sign In</Link>
          )}
        </div>
      </div>

      <div className="header__mobile-bar">
        <Link className="header__logo" to="/" aria-label="FreshCart home">
          <img src={logo} alt="FreshCart" />
        </Link>
        <div className="header__mobile-actions">
          <Link className="header__mobile-icon-btn" to="/wishlist" aria-label="Wishlist" onClick={() => setMenuOpen(false)}>
            <img src={mobileWishlistIcon} alt="" />
            {wishlistCount > 0 && <span className="header__badge">{wishlistCount}</span>}
          </Link>
          <Link className="header__mobile-icon-btn" to="/cart" aria-label="Cart">
            <img src={mobileCartIcon} alt="" />
            {cartCount > 0 && <span className="header__badge">{cartCount}</span>}
          </Link>
          <button
            type="button"
            className="header__menu-btn"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <img src={menuIcon} alt="" />
          </button>
        </div>
      </div>

      <div
        className={`header__drawer-backdrop${menuOpen ? ' header__drawer-backdrop--open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`header__drawer${menuOpen ? ' header__drawer--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="header__drawer-top">
          <img src={logo} alt="FreshCart" className="header__drawer-logo" />
          <button
            type="button"
            className="header__drawer-close"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <img src={closeIcon} alt="" />
          </button>
        </div>

        <form className="header__drawer-search" role="search" onSubmit={handleSearchSubmit}>
          <input
            type="search"
            placeholder="Search products..."
            aria-label="Search products"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type="submit" aria-label="Search">
            <img src={searchIcon} alt="" />
          </button>
        </form>

        <nav className="header__drawer-nav" aria-label="Main">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link to="/categories" onClick={() => setMenuOpen(false)}>Categories</Link>
          <Link to="/brands" onClick={() => setMenuOpen(false)}>Brands</Link>
        </nav>

        <div className="header__drawer-divider" />

        <div className="header__drawer-section">
          <Link to="/wishlist" className="header__drawer-row" onClick={() => setMenuOpen(false)}>
            <span className="header__drawer-row-left">
              <span className="header__drawer-icon header__drawer-icon--danger">
                <img src={drawerWishlistIcon} alt="" />
              </span>
              Wishlist
            </span>
          </Link>
          <Link to="/cart" className="header__drawer-row" onClick={() => setMenuOpen(false)}>
            <span className="header__drawer-row-left">
              <span className="header__drawer-icon header__drawer-icon--primary">
                <img src={drawerCartIcon} alt="" />
              </span>
              Cart
            </span>
          </Link>
        </div>

        <div className="header__drawer-divider" />

        <div className="header__drawer-section">
          {isLoggedIn ? (
            <>
              <Link to="/account/settings" className="header__drawer-row" onClick={() => setMenuOpen(false)}>
                <span className="header__drawer-row-left">
                  <span className="header__drawer-icon">
                    <img src={userIcon} alt="" />
                  </span>
                  {user?.name || 'Account'}
                </span>
              </Link>
              <Link to="/orders" className="header__drawer-row" onClick={() => setMenuOpen(false)}>
                <span className="header__drawer-row-left">
                  <span className="header__drawer-icon">
                    <img src={cartIcon} alt="" />
                  </span>
                  My Orders
                </span>
              </Link>
              <button type="button" className="header__drawer-row header__drawer-row--danger-text" onClick={handleLogout}>
                <span className="header__drawer-row-left">
                  <span className="header__drawer-icon header__drawer-icon--danger">
                    <img src={logoutIcon} alt="" />
                  </span>
                  Sign Out
                </span>
              </button>
            </>
          ) : (
            <Link to="/login" className="header__drawer-row" onClick={() => setMenuOpen(false)}>
              <span className="header__drawer-row-left">
                <span className="header__drawer-icon">
                  <img src={userIcon} alt="" />
                </span>
                Sign In
              </span>
            </Link>
          )}
        </div>

        <a href="#" className="header__drawer-help">
          <span className="header__drawer-icon header__drawer-icon--primary-light">
            <img src={helpIcon} alt="" />
          </span>
          <span>
            <strong>Need Help?</strong>
            <em>Contact Support</em>
          </span>
        </a>
      </div>
    </header>
  );
}

