'use client'

import LoginIntro from '../../components/LoginIntro/LoginIntro';
import LoginForm from '../../components/LoginForm/LoginForm';
import TrustBadges from '../../components/TrustBadges/TrustBadges';

export default function Login() {
  return (
    <div className="login-page">
      <div className="login-page__container">
        <LoginIntro />
        <LoginForm />
      </div>

      <TrustBadges />
    </div>
  );
}
