'use client'

const homeIcon = '/freshcart/assets/icons/checkout/home.svg';
const bookmarkIcon = '/freshcart/assets/icons/checkout/bookmark.svg';
const pinIcon = '/freshcart/assets/icons/checkout/pin.svg';
const phoneIcon = '/freshcart/assets/icons/checkout/phone.svg';
const buildingIcon = '/freshcart/assets/icons/checkout/building.svg';
const plusIcon = '/freshcart/assets/icons/checkout/plus.svg';
const infoIcon = '/freshcart/assets/icons/checkout/info.svg';
export default function ShippingAddressCard({
  addresses = [],
  selectedAddressId = null,
  onSelectAddress,
  addressMode,
  onSelectNew,
  form,
  onFieldChange,
}) {
  return (
    <div className="shipping-card">
      <div className="shipping-card__header">
        <h2 className="shipping-card__title">
          <img src={homeIcon} alt="" />
          Shipping Address
        </h2>
        <p className="shipping-card__subtitle">Where should we deliver your order?</p>
      </div>

      <div className="shipping-card__body">
        <div className="shipping-card__saved">
          <div className="shipping-card__saved-label">
            <img src={bookmarkIcon} alt="" />
            <span>Saved Addresses</span>
          </div>
          <p className="shipping-card__saved-hint">
            {addresses.length
              ? 'Select a saved address or enter a new one below'
              : 'You have no saved addresses yet — enter one below'}
          </p>

          {addresses.map((address) => (
            <button
              key={address._id}
              type="button"
              className="shipping-card__option"
              aria-pressed={addressMode === 'saved' && selectedAddressId === address._id}
              onClick={() => onSelectAddress?.(address)}
            >
              <span className="shipping-card__option-icon shipping-card__option-icon--muted">
                <img src={pinIcon} alt="" />
              </span>
              <span className="shipping-card__option-body">
                <span className="shipping-card__option-title">{address.name}</span>
                <span className="shipping-card__option-detail">{address.details}</span>
                <span className="shipping-card__option-meta">
                  <span><img src={phoneIcon} alt="" />{address.phone}</span>
                  <span><img src={buildingIcon} alt="" />{address.city}</span>
                </span>
              </span>
            </button>
          ))}

          <button
            type="button"
            className="shipping-card__option shipping-card__option--new"
            aria-pressed={addressMode === 'new'}
            onClick={onSelectNew}
          >
            <span className="shipping-card__option-icon shipping-card__option-icon--primary">
              <img src={plusIcon} alt="" />
            </span>
            <span className="shipping-card__option-body">
              <span className="shipping-card__option-title shipping-card__option-title--primary">Use a different address</span>
              <span className="shipping-card__option-sub">Enter a new shipping address manually</span>
            </span>
          </button>
        </div>

        <div className="shipping-card__notice">
          <span className="shipping-card__notice-icon">
            <img src={infoIcon} alt="" />
          </span>
          <div>
            <p className="shipping-card__notice-title">Delivery Information</p>
            <p className="shipping-card__notice-text">Please ensure your address is accurate for smooth delivery</p>
          </div>
        </div>

        <div className="shipping-card__field">
          <label htmlFor="checkout-city">City <span className="shipping-card__required">*</span></label>
          <div className="shipping-card__input-wrap">
            <span className="shipping-card__input-icon"><img src={buildingIcon} alt="" /></span>
            <input
              id="checkout-city"
              type="text"
              placeholder="e.g. Cairo, Alexandria, Giza"
              value={form.city}
              onChange={(e) => onFieldChange('city', e.target.value)}
              required
            />
          </div>
        </div>

        <div className="shipping-card__field">
          <label htmlFor="checkout-street">Street Address <span className="shipping-card__required">*</span></label>
          <div className="shipping-card__input-wrap">
            <span className="shipping-card__input-icon shipping-card__input-icon--top"><img src={pinIcon} alt="" /></span>
            <textarea
              id="checkout-street"
              placeholder="Street name, building number, floor, apartment..."
              value={form.street}
              onChange={(e) => onFieldChange('street', e.target.value)}
              rows={3}
              required
            />
          </div>
        </div>

        <div className="shipping-card__field">
          <label htmlFor="checkout-phone">Phone Number <span className="shipping-card__required">*</span></label>
          <div className="shipping-card__input-wrap">
            <span className="shipping-card__input-icon"><img src={phoneIcon} alt="" /></span>
            <input
              id="checkout-phone"
              type="tel"
              placeholder="01xxxxxxxxx"
              value={form.phone}
              onChange={(e) => onFieldChange('phone', e.target.value)}
              required
            />
            <span className="shipping-card__field-hint">Egyptian numbers only</span>
          </div>
        </div>
      </div>
    </div>
  );
}
