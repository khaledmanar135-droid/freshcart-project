'use client'

import { useState } from 'react';
import { Link, useNavigate } from '@/components/NextRouter';
import { useAuth } from '../../context/AuthContext';
import { forgotPassword, verifyResetCode, resetPassword } from '../../services/auth';
import FeaturesBar from '../../components/FeaturesBar/FeaturesBar';

const MailIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11Z"
      fill="currentColor"
    />
    <path d="m4 7 8 5.5L20 7" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ShieldIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2.5 20 6v6c0 4.7-3.2 8.4-8 9.5-4.8-1.1-8-4.8-8-9.5V6l8-3.5Z" fill="currentColor" />
  </svg>
);

const LockIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M8 10V8a4 4 0 1 1 8 0v2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <rect x="5" y="10" width="14" height="10" rx="2.5" fill="currentColor" />
  </svg>
);

const KeyIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="8.5" cy="9.5" r="4.5" stroke="currentColor" strokeWidth="2" />
    <path d="M11.8 12.6 20 20.8M16 17l-2 2M18 15l-2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CheckIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EyeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const STEPS = [
  { id: 1, label: 'Email', Icon: MailIcon },
  { id: 2, label: 'Verify Code', Icon: KeyIcon },
  { id: 3, label: 'New Password', Icon: LockIcon },
];

/**
 * Three-step forgot-password flow on a single page.
 * Step 1: Enter email → API emails a reset code
 * Step 2: Enter the code → verify it
 * Step 3: Enter new password → reset password (response includes new token)
 */
export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const clearError = () => setError('');

  const handleSendEmail = async (e) => {
    e.preventDefault();
    clearError();
    setLoading(true);
    try {
      await forgotPassword({ email });
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    clearError();
    setLoading(true);
    try {
      await verifyResetCode({ resetCode });
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    clearError();
    setLoading(true);
    try {
      await forgotPassword({ email });
    } catch (err) {
      setError(err.response?.data?.message || 'Could not resend the code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    clearError();
    setLoading(true);
    try {
      const res = await resetPassword({ email, newPassword });
      const { token, user } = res.data;
      if (token && user) {
        login(token, { id: user._id, name: user.name, role: user.role });
        navigate({ to: '/', replace: true });
      } else {
        navigate({ to: '/login', replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fp-page">
      <div className="fp-container">
        {/* ── Illustration / intro ── */}
        <section className="fp-intro">
          <div className="fp-illustration" aria-hidden="true">
            <span className="fp-illustration__blob fp-illustration__blob--1" />
            <span className="fp-illustration__blob fp-illustration__blob--2" />
            <span className="fp-illustration__blob fp-illustration__blob--3" />
            <div className="fp-illustration__stack">
              <span className="fp-tile fp-tile--sm fp-tile--left">
                <MailIcon className="fp-tile__icon fp-tile__icon--green" />
              </span>
              <span className="fp-tile fp-tile--lg">
                <span className="fp-tile__inner">
                  <LockIcon className="fp-tile__icon fp-tile__icon--green" />
                </span>
              </span>
              <span className="fp-tile fp-tile--sm fp-tile--right">
                <ShieldIcon className="fp-tile__icon fp-tile__icon--green" />
              </span>
            </div>
            <div className="fp-illustration__dots">
              <i /><i /><i />
            </div>
          </div>

          <h2 className="fp-intro__title">Reset Your Password</h2>
          <p className="fp-intro__text">
            Don&apos;t worry, it happens to the best of us. We&apos;ll help you get back into your account in no time.
          </p>
          <ul className="fp-intro__features">
            <li><MailIcon className="fp-intro__feature-icon" /> Email Verification</li>
            <li><ShieldIcon className="fp-intro__feature-icon" /> Secure Reset</li>
            <li><LockIcon className="fp-intro__feature-icon" /> Encrypted</li>
          </ul>
        </section>

        {/* ── Card ── */}
        <section className="fp-card">
          <div className="fp-card__brand">
            Fresh<span>Cart</span>
          </div>

          <h1 className="fp-card__title">
            {step === 1 && 'Forgot Password?'}
            {step === 2 && 'Check Your Email'}
            {step === 3 && 'Create New Password'}
          </h1>
          <p className="fp-card__subtitle">
            {step === 1 && "No worries, we'll send you a reset code"}
            {step === 2 && `Enter the 6-digit code sent to ${email}`}
            {step === 3 && 'Your new password must be different from previous passwords'}
          </p>

          <div className="fp-steps" role="list">
            {STEPS.map(({ id, label, Icon }, index) => {
              const done = step > id;
              const active = step === id;
              return (
                <div className="fp-steps__item" key={id} role="listitem" aria-label={label}>
                  <span className={`fp-steps__dot${done ? ' fp-steps__dot--done' : ''}${active ? ' fp-steps__dot--active' : ''}`}>
                    {done ? <CheckIcon className="fp-steps__icon" /> : <Icon className="fp-steps__icon" />}
                  </span>
                  {index < STEPS.length - 1 && (
                    <span className={`fp-steps__line${step > id ? ' fp-steps__line--done' : ''}`} />
                  )}
                </div>
              );
            })}
          </div>

          {error && <div className="fp-card__error" role="alert">{error}</div>}

          {step === 1 && (
            <form onSubmit={handleSendEmail} className="fp-form">
              <div className="fp-field">
                <label htmlFor="fp-email">Email Address</label>
                <div className="fp-input">
                  <MailIcon className="fp-input__icon" />
                  <input
                    id="fp-email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); clearError(); }}
                    required
                    autoComplete="email"
                    disabled={loading}
                  />
                </div>
              </div>
              <button type="submit" className="fp-btn" disabled={loading}>
                {loading ? 'Sending…' : 'Send Reset Code'}
              </button>
              <Link to="/login" className="fp-link-center">← Back to Sign In</Link>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyCode} className="fp-form">
              <div className="fp-field">
                <label htmlFor="fp-code">Verification Code</label>
                <div className="fp-input fp-input--code">
                  <input
                    id="fp-code"
                    type="text"
                    inputMode="numeric"
                    placeholder="• • • • • •"
                    value={resetCode}
                    onChange={(e) => { setResetCode(e.target.value); clearError(); }}
                    required
                    maxLength={8}
                    disabled={loading}
                  />
                </div>
              </div>
              <p className="fp-resend">
                Didn&apos;t receive the code?{' '}
                <button type="button" onClick={handleResendCode} disabled={loading}>Resend Code</button>
              </p>
              <button type="submit" className="fp-btn" disabled={loading}>
                {loading ? 'Verifying…' : 'Verify Code'}
              </button>
              <button
                type="button"
                className="fp-link-center fp-link-center--button"
                onClick={() => { setStep(1); clearError(); }}
              >
                ← Change email address
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword} className="fp-form">
              <div className="fp-field">
                <label htmlFor="fp-new-password">New Password</label>
                <div className="fp-input">
                  <LockIcon className="fp-input__icon" />
                  <input
                    id="fp-new-password"
                    type={showNew ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => { setNewPassword(e.target.value); clearError(); }}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="fp-input__toggle"
                    onClick={() => setShowNew((v) => !v)}
                    aria-label={showNew ? 'Hide password' : 'Show password'}
                  >
                    <EyeIcon className="fp-input__icon" />
                  </button>
                </div>
              </div>

              <div className="fp-field">
                <label htmlFor="fp-confirm-password">Confirm Password</label>
                <div className="fp-input">
                  <LockIcon className="fp-input__icon" />
                  <input
                    id="fp-confirm-password"
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); clearError(); }}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="fp-input__toggle"
                    onClick={() => setShowConfirm((v) => !v)}
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  >
                    <EyeIcon className="fp-input__icon" />
                  </button>
                </div>
              </div>

              <button type="submit" className="fp-btn" disabled={loading}>
                {loading ? 'Resetting…' : 'Reset Password'}
              </button>
            </form>
          )}

          {step === 1 && (
            <p className="fp-card__footer">
              Remember your password? <Link to="/login">Sign In</Link>
            </p>
          )}
        </section>
      </div>

      <FeaturesBar />
    </div>
  );
}
