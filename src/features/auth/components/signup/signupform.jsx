'use client'

import { useMemo, useState } from 'react';
import { Link, useNavigate } from '@/lib/nextrouter';
import { signIn } from 'next-auth/react';
import { signup } from '../../server/auth.actions';
const googleIcon = '/freshcart/assets/icons/signup/google.svg';
const facebookIcon = '/freshcart/assets/icons/signup/facebook.svg';
const userPlusIcon = '/freshcart/assets/icons/signup/user-plus.svg';
const EGYPTIAN_PHONE_RE = /^01[0125][0-9]{8}$/;

function getPasswordStrength(password) {
  if (!password) {
    return { label: 'Weak', percent: 5, className: 'weak' };
  }

  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;

  if (score <= 1) return { label: 'Weak', percent: 25, className: 'weak' };
  if (score === 2) return { label: 'Fair', percent: 50, className: 'fair' };
  if (score === 3) return { label: 'Good', percent: 75, className: 'good' };
  return { label: 'Strong', percent: 100, className: 'strong' };
}

export default function SignupForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    rePassword: '',
    phone: '',
    terms: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const strength = useMemo(() => getPasswordStrength(form.password), [form.password]);

  const navigate = useNavigate();

  const updateField = (field) => (e) => {
    const value = field === 'terms' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const validate = () => {
    if (!form.name.trim()) return 'Name is required.';
    if (form.password.length < 8) return 'Password must be at least 8 characters.';
    if (form.password !== form.rePassword) return 'Passwords do not match.';
    if (!EGYPTIAN_PHONE_RE.test(form.phone)) {
      return 'Phone must be an Egyptian number (e.g. 01012345678).';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await signup({
        name: form.name,
        email: form.email,
        password: form.password,
        rePassword: form.rePassword,
        phone: form.phone,
      });

      if (!res.data?.user) throw new Error(res.data?.message || 'Registration failed');
      const result = await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: false,
      });
      if (result?.error) throw new Error(result.error);
      navigate({ to: '/', replace: true });
    } catch (err) {
      const message = err.message || 'Registration failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-form-card">
      <h2 className="signup-form-card__title">Create Your Account</h2>
      <p className="signup-form-card__subtitle">Start your fresh journey with us today</p>

      <div className="signup-form-card__social">
        <button type="button" className="signup-form-card__social-btn">
          <img src={googleIcon} alt="" />
          Google
        </button>
        <button type="button" className="signup-form-card__social-btn">
          <img src={facebookIcon} alt="" />
          Facebook
        </button>
      </div>

      <div className="signup-form-card__divider">
        <span>or</span>
      </div>

      {error && (
        <div className="signup-form__error" role="alert">
          {error}
        </div>
      )}

      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-form__field">
          <label htmlFor="name">Name*</label>
          <input
            id="name"
            type="text"
            placeholder="Ali"
            value={form.name}
            onChange={updateField('name')}
            required
            disabled={loading}
          />
        </div>

        <div className="signup-form__field">
          <label htmlFor="email">Email*</label>
          <input
            id="email"
            type="email"
            placeholder="ali@example.com"
            value={form.email}
            onChange={updateField('email')}
            required
            disabled={loading}
          />
        </div>

        <div className="signup-form__field">
          <label htmlFor="password">Password*</label>
          <input
            id="password"
            type="password"
            placeholder="create a strong password"
            value={form.password}
            onChange={updateField('password')}
            required
            minLength={8}
            disabled={loading}
          />
          <div className="signup-form__strength">
            <div className="signup-form__strength-track">
              <div
                className={`signup-form__strength-fill signup-form__strength-fill--${strength.className}`}
                style={{ width: `${strength.percent}%` }}
              />
            </div>
            <span className={`signup-form__strength-label signup-form__strength-label--${strength.className}`}>
              {strength.label}
            </span>
          </div>
          <p className="signup-form__hint">Must be at least 8 characters with numbers and symbols</p>
        </div>

        <div className="signup-form__field">
          <label htmlFor="rePassword">Confirm Password*</label>
          <input
            id="rePassword"
            type="password"
            placeholder="confirm your password"
            value={form.rePassword}
            onChange={updateField('rePassword')}
            required
            disabled={loading}
          />
        </div>

        <div className="signup-form__field">
          <label htmlFor="phone">Phone Number*</label>
          <input
            id="phone"
            type="tel"
            placeholder="01012345678"
            value={form.phone}
            onChange={updateField('phone')}
            required
            disabled={loading}
          />
          <p className="signup-form__hint">Egyptian number starting with 010, 011, 012, or 015</p>
        </div>

        <div className="signup-form__terms">
          <input
            id="terms"
            type="checkbox"
            checked={form.terms}
            onChange={updateField('terms')}
            required
          />
          <label htmlFor="terms">
            I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a> *
          </label>
        </div>

        <button type="submit" className="signup-form__submit" disabled={loading}>
          <img src={userPlusIcon} alt="" />
          {loading ? 'Creating account…' : 'Create My Account'}
        </button>
      </form>

      <p className="signup-form-card__footer">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
}
