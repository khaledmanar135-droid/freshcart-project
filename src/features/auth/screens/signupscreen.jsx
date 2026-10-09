'use client'

import SignupIntro from '../components/signup/signupintro';
import SignupForm from '../components/signup/signupform';
import TrustBadges from '@/components/shared/trustbadges';

export default function SignUpScreen() {
  return (
    <div className="signup-page">
      <div className="signup-page__container">
        <SignupIntro />
        <SignupForm />
      </div>

      <TrustBadges />
    </div>
  );
}
