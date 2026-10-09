'use client'

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { updateMe, updatePassword } from '../../services/auth';
import AccountLayout from '../../components/AccountLayout/AccountLayout';
import TrustBadges from '../../components/TrustBadges/TrustBadges';
import SignInPrompt from '../../components/SignInPrompt/SignInPrompt';
const userIcon = '/freshcart/assets/icons/account/user-green.svg';
const saveIcon = '/freshcart/assets/icons/account/save.svg';
const lockOrangeIcon = '/freshcart/assets/icons/account/lock-orange.svg';
const lockWhiteIcon = '/freshcart/assets/icons/account/lock-white.svg';
const eyeIcon = '/freshcart/assets/icons/login/eye.svg';
export default function AccountSettings() {
  const { user, userId, token, login, isLoggedIn, sessionChecked } = useAuth();

  // Profile form
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profileMsg, setProfileMsg] = useState({ type: '', text: '' });
  const [savingProfile, setSavingProfile] = useState(false);

  // Password form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState({ type: '', text: '' });
  const [savingPassword, setSavingPassword] = useState(false);

  // Populate form from auth context on mount / when user changes
  useEffect(() => {
    if (user) {
      setFullName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setProfileMsg({ type: '', text: '' });
    setSavingProfile(true);
    try {
      const res = await updateMe({ name: fullName, email, phone });
      const updated = res.data?.data;
      if (updated) {
        // Update context with new user data, keep existing token
        const updatedUser = {
          id: updated._id || userId,
          name: updated.name,
          role: updated.role,
        };
        login(token, updatedUser);
      }
      setProfileMsg({ type: 'success', text: 'Profile updated successfully.' });
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update profile.';
      setProfileMsg({ type: 'error', text: message });
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordMsg({ type: '', text: '' });

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMsg({ type: 'error', text: 'Password must be at least 6 characters.' });
      return;
    }

    setSavingPassword(true);
    try {
      const res = await updatePassword({
        currentPassword,
        password: newPassword,
        rePassword: confirmPassword,
      });
      // The API returns a new token — replace it
      const newToken = res.data?.token;
      if (newToken) {
        const currentUser = res.data?.data || user;
        login(newToken, {
          id: currentUser._id || userId,
          name: currentUser.name,
          role: currentUser.role,
        });
      }
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordMsg({ type: 'success', text: 'Password changed successfully.' });
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to change password.';
      setPasswordMsg({ type: 'error', text: message });
    } finally {
      setSavingPassword(false);
    }
  };

  if (!sessionChecked) return null;

  if (!isLoggedIn) {
    return (
      <SignInPrompt
        title="Sign in to view your account"
        message="Sign in to your account to update your details and change your password."
      />
    );
  }

  return (
    <>
      <AccountLayout active="settings">
        <div className="account-settings">
        <div className="account-settings__heading">
          <h2 className="account-settings__title">Account Settings</h2>
          <p className="account-settings__subtitle">Update your profile information and change your password</p>
        </div>

        <div className="account-settings__card">
          <div className="account-settings__card-section">
            <div className="account-settings__card-header">
              <span className="account-settings__card-icon account-settings__card-icon--green">
                <img src={userIcon} alt="" />
              </span>
              <div>
                <h3 className="account-settings__card-title">Profile Information</h3>
                <p className="account-settings__card-subtitle">Update your personal details</p>
              </div>
            </div>

            {profileMsg.text && (
              <div
                className={`account-settings__message account-settings__message--${profileMsg.type}`}
                role="alert"
              >
                {profileMsg.text}
              </div>
            )}

            <form className="account-settings__form" onSubmit={handleSaveProfile}>
              <div className="account-settings__field">
                <label htmlFor="settings-full-name">Full Name</label>
                <input
                  id="settings-full-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={savingProfile}
                />
              </div>

              <div className="account-settings__field">
                <label htmlFor="settings-email">Email Address</label>
                <input
                  id="settings-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={savingProfile}
                />
              </div>

              <div className="account-settings__field">
                <label htmlFor="settings-phone">Phone Number</label>
                <input
                  id="settings-phone"
                  type="tel"
                  placeholder="01xxxxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={savingProfile}
                />
              </div>

              <div className="account-settings__actions">
                <button type="submit" className="account-settings__save-btn" disabled={savingProfile}>
                  <img src={saveIcon} alt="" />
                  {savingProfile ? 'Saving…' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>

          <div className="account-settings__info-section">
            <h3 className="account-settings__card-title">Account Information</h3>
            <div className="account-settings__info-list">
              <div className="account-settings__info-row">
                <span className="account-settings__info-label">User ID</span>
                <span className="account-settings__info-value">{userId || '—'}</span>
              </div>
              <div className="account-settings__info-row">
                <span className="account-settings__info-label">Role</span>
                <span className="account-settings__role-badge">{user?.role || 'user'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="account-settings__card account-settings__card--password">
          <div className="account-settings__card-header">
            <span className="account-settings__card-icon account-settings__card-icon--orange">
              <img src={lockOrangeIcon} alt="" />
            </span>
            <div>
              <h3 className="account-settings__card-title">Change Password</h3>
              <p className="account-settings__card-subtitle">Update your account password</p>
            </div>
          </div>

          {passwordMsg.text && (
            <div
              className={`account-settings__message account-settings__message--${passwordMsg.type}`}
              role="alert"
            >
              {passwordMsg.text}
            </div>
          )}

          <form className="account-settings__form" onSubmit={handleChangePassword}>
            <div className="account-settings__field">
              <label htmlFor="settings-current-password">Current Password</label>
              <div className="account-settings__password-wrap">
                <input
                  id="settings-current-password"
                  type={showCurrent ? 'text' : 'password'}
                  placeholder="Enter your current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  disabled={savingPassword}
                />
                <button
                  type="button"
                  className="account-settings__toggle-visibility"
                  onClick={() => setShowCurrent((v) => !v)}
                  aria-label={showCurrent ? 'Hide current password' : 'Show current password'}
                >
                  <img src={eyeIcon} alt="" />
                </button>
              </div>
            </div>

            <div className="account-settings__field">
              <label htmlFor="settings-new-password">New Password</label>
              <div className="account-settings__password-wrap">
                <input
                  id="settings-new-password"
                  type={showNew ? 'text' : 'password'}
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  minLength={6}
                  disabled={savingPassword}
                />
                <button
                  type="button"
                  className="account-settings__toggle-visibility"
                  onClick={() => setShowNew((v) => !v)}
                  aria-label={showNew ? 'Hide new password' : 'Show new password'}
                >
                  <img src={eyeIcon} alt="" />
                </button>
              </div>
              <p className="account-settings__hint">Must be at least 6 characters</p>
            </div>

            <div className="account-settings__field">
              <label htmlFor="settings-confirm-password">Confirm New Password</label>
              <div className="account-settings__password-wrap">
                <input
                  id="settings-confirm-password"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={savingPassword}
                />
                <button
                  type="button"
                  className="account-settings__toggle-visibility"
                  onClick={() => setShowConfirm((v) => !v)}
                  aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                >
                  <img src={eyeIcon} alt="" />
                </button>
              </div>
            </div>

            <div className="account-settings__actions">
              <button type="submit" className="account-settings__change-password-btn" disabled={savingPassword}>
                <img src={lockWhiteIcon} alt="" />
                {savingPassword ? 'Changing…' : 'Change Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
      </AccountLayout>
      <TrustBadges />
    </>
  );
}
