'use client'

import { Link, useNavigate } from '@/lib/nextrouter';
import { useAuth } from '../../context/AuthContext';
const shippingIcon = '/freshcart/assets/icons/topbar/shipping.svg';
const newArrivalsIcon = '/freshcart/assets/icons/topbar/new-arrivals.svg';
const phoneIcon = '/freshcart/assets/icons/topbar/phone.svg';
const mailIcon = '/freshcart/assets/icons/topbar/mail.svg';
const signInIcon = '/freshcart/assets/icons/topbar/signin.svg';
const signUpIcon = '/freshcart/assets/icons/topbar/signup.svg';
const logoutIcon = '/freshcart/assets/icons/mobile-drawer/logout.svg';
export default function TopBar() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: '/login', replace: true });
  };

  return (
    <div className="topbar">
      <div className="topbar__inner">
        <div className="topbar__announcements">
          <span className="topbar__item">
            <img src={shippingIcon} alt="" className="topbar__icon" />
            Free Shipping on Orders 500 EGP
          </span>
          <span className="topbar__item">
            <img src={newArrivalsIcon} alt="" className="topbar__icon" />
            New Arrivals Daily
          </span>
        </div>

        <div className="topbar__actions">
          <div className="topbar__contact">
            <span className="topbar__item">
              <img src={phoneIcon} alt="" className="topbar__icon" />
              +1 (800) 123-4567
            </span>
            <a className="topbar__item topbar__link" href="mailto:support@freshcart.com">
              <img src={mailIcon} alt="" className="topbar__icon" />
              support@freshcart.com
            </a>
          </div>

          <span className="topbar__divider" />

          <div className="topbar__account">
            {isLoggedIn ? (
              <>
                <Link className="topbar__item topbar__link topbar__user" to="/account/settings">
                  <img src={signInIcon} alt="" className="topbar__icon" />
                  {user?.name || 'Account'}
                </Link>
                <button type="button" className="topbar__item topbar__signout" onClick={handleLogout}>
                  <img src={logoutIcon} alt="" className="topbar__icon topbar__icon--logout" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link className="topbar__item topbar__link" to="/login">
                  <img src={signInIcon} alt="" className="topbar__icon" />
                  Sign In
                </Link>
                <Link className="topbar__item topbar__link" to="/register">
                  <img src={signUpIcon} alt="" className="topbar__icon" />
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

