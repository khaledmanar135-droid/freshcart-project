'use client'

const cardScanIcon = '/freshcart/assets/icons/checkout/card-scan.svg';
const walletIcon = '/freshcart/assets/icons/checkout/wallet.svg';
const checkIcon = '/freshcart/assets/icons/checkout/check.svg';
const cardIcon = '/freshcart/assets/icons/checkout/card.svg';
const shieldIcon = '/freshcart/assets/icons/checkout/shield.svg';
const visaIcon = '/freshcart/assets/icons/checkout/visa.png';
const mastercardIcon = '/freshcart/assets/icons/checkout/mastercard.png';
const amexIcon = '/freshcart/assets/icons/checkout/amex.png';
export default function PaymentMethodCard({ method, onSelect }) {
  return (
    <div className="payment-card">
      <div className="payment-card__header">
        <h2 className="payment-card__title">
          <img src={cardScanIcon} alt="" />
          Payment Method
        </h2>
        <p className="payment-card__subtitle">Choose how you&apos;d like to pay</p>
      </div>

      <div className="payment-card__body">
        <button
          type="button"
          className={`payment-card__option${method === 'cod' ? ' payment-card__option--selected' : ''}`}
          aria-pressed={method === 'cod'}
          onClick={() => onSelect('cod')}
        >
          <span className={`payment-card__option-icon${method === 'cod' ? ' payment-card__option-icon--selected' : ''}`}>
            <img src={walletIcon} alt="" />
          </span>
          <span className="payment-card__option-body">
            <span className={`payment-card__option-title${method === 'cod' ? ' payment-card__option-title--selected' : ''}`}>Cash on Delivery</span>
            <span className="payment-card__option-sub">Pay when your order arrives at your doorstep</span>
          </span>
          <span className={`payment-card__radio${method === 'cod' ? ' payment-card__radio--checked' : ''}`}>
            {method === 'cod' && <img src={checkIcon} alt="" />}
          </span>
        </button>

        <button
          type="button"
          className={`payment-card__option${method === 'online' ? ' payment-card__option--selected' : ''}`}
          aria-pressed={method === 'online'}
          onClick={() => onSelect('online')}
        >
          <span className={`payment-card__option-icon${method === 'online' ? ' payment-card__option-icon--selected' : ''}`}>
            <img src={cardIcon} alt="" />
          </span>
          <span className="payment-card__option-body">
            <span className={`payment-card__option-title${method === 'online' ? ' payment-card__option-title--selected' : ''}`}>Pay Online</span>
            <span className="payment-card__option-sub">Secure payment with Credit/Debit Card via Stripe</span>
            <span className="payment-card__brands">
              <img src={visaIcon} alt="Visa" loading="lazy" decoding="async" />
              <img src={mastercardIcon} alt="Mastercard" loading="lazy" decoding="async" />
              <img src={amexIcon} alt="Amex" loading="lazy" decoding="async" />
            </span>
          </span>
          <span className={`payment-card__radio${method === 'online' ? ' payment-card__radio--checked' : ''}`}>
            {method === 'online' && <img src={checkIcon} alt="" />}
          </span>
        </button>

        <div className="payment-card__notice">
          <span className="payment-card__notice-icon">
            <img src={shieldIcon} alt="" />
          </span>
          <div>
            <p className="payment-card__notice-title">Secure &amp; Encrypted</p>
            <p className="payment-card__notice-text">Your payment info is protected with 256-bit SSL encryption</p>
          </div>
        </div>
      </div>
    </div>
  );
}
