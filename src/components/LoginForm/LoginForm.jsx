'use client'

import { useState } from 'react';
import { Link, useLocation, useNavigate } from '@/components/NextRouter';
import { signIn } from 'next-auth/react';
const googleIcon = '/freshcart/assets/icons/login/google.svg';
const facebookIcon = '/freshcart/assets/icons/login/facebook.svg';
const emailIcon = '/freshcart/assets/icons/login/email.svg';
const lockIcon = '/freshcart/assets/icons/login/lock.svg';
const eyeIcon = '/freshcart/assets/icons/login/eye.svg';
const sslIcon = '/freshcart/assets/icons/login/ssl.svg';
const usersIcon = '/freshcart/assets/icons/login/users.svg';
const ratingIcon = '/freshcart/assets/icons/login/rating.svg';
export default function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '', keepSignedIn: false });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to where the user came from, or home
  const from = location.state?.from || '/';

  const updateField = (field) => (e) => {
    const value = field === 'keepSignedIn' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: false,
      });
      if (result?.error) throw new Error('Incorrect email or password');
      navigate({ to: from, replace: true });
    } catch (err) {
      const message = err.message || 'Sign in failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form-card">
      <div className="login-form-card__brand">
        <span className="login-form-card__logo">
          Fresh<span>Cart</span>
        </span>
        <h1 className="login-form-card__title">Welcome Back!</h1>
        <p className="login-form-card__subtitle">Sign in to continue your fresh shopping experience</p>
      </div>

      <div className="login-form-card__social">
        <button type="button" className="login-form-card__social-btn">
          <img src={googleIcon} alt="" />
          Continue with Google
        </button>
        <button type="button" className="login-form-card__social-btn">
          <img src={facebookIcon} alt="" />
          Continue with Facebook
        </button>
      </div>

      <div className="login-form-card__divider">
        <span>OR CONTINUE WITH EMAIL</span>
      </div>

      {error && (
        <div className="login-form__error" role="alert">
          {error}
        </div>
      )}

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form__field">
          <label htmlFor="email">Email Address</label>
          <div className="login-form__input-wrap">
            <img src={emailIcon} alt="" className="login-form__input-icon" />
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={updateField('email')}
              required
              disabled={loading}
            />
          </div>
        </div>

        <div className="login-form__field">
          <div className="login-form__field-header">
            <label htmlFor="password">Password</label>
            <Link to="/forgot-password" className="login-form__forgot">Forgot Password?</Link>
          </div>
          <div className="login-form__input-wrap">
            <img src={lockIcon} alt="" className="login-form__input-icon" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={form.password}
              onChange={updateField('password')}
              required
              disabled={loading}
            />
            <button
              type="button"
              className="login-form__toggle-password"
              onClick={() => setShowPassword((show) => !show)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <img src={eyeIcon} alt="" />
            </button>
          </div>
        </div>

        <label className="login-form__checkbox">
          <input
            type="checkbox"
            checked={form.keepSignedIn}
            onChange={updateField('keepSignedIn')}
          />
          Keep me signed in
        </label>

        <button type="submit" className="login-form__submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>

      <p className="login-form-card__footer">
        New to FreshCart? <Link to="/register">Create an account</Link>
      </p>

      <div className="login-form-card__trust">
        <span><img src={sslIcon} alt="" />SSL Secured</span>
        <span><img src={usersIcon} alt="" />50K+ Users</span>
        <span><img src={ratingIcon} alt="" />4.9 Rating</span>
      </div>
    </div>
  );
}
