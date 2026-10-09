'use client'

import SignupIntro from '../../components/SignupIntro/SignupIntro';
import SignupForm from '../../components/SignupForm/SignupForm';
import TrustBadges from '../../components/TrustBadges/TrustBadges';

export default function SignUp() {
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
