'use client'

import { Link } from '@/lib/nextrouter';

/**
 * Shared "please sign in" screen for pages that need an account.
 */
export default function SignInPrompt({
  title = 'Please sign in',
  message = 'Sign in to your account to continue.',
}) {
  return (
    <section className="signin-prompt">
      <div className="signin-prompt__card">
        <h1 className="signin-prompt__title">{title}</h1>
        <p className="signin-prompt__message">{message}</p>
        <div className="signin-prompt__actions">
          <Link to="/login" className="signin-prompt__btn signin-prompt__btn--primary">
            Sign in
          </Link>
          <Link to="/register" className="signin-prompt__btn">
            Create an account
          </Link>
        </div>
      </div>
    </section>
  );
}
