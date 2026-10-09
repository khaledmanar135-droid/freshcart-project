'use client'

import LoginIntro from '../components/login/loginintro';
import LoginForm from '../components/login/loginform';
import TrustBadges from '@/components/shared/trustbadges';

export default function LoginScreen() {
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
