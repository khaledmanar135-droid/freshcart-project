'use client'

import { Link } from '@/components/NextRouter';
import CartItem from '../../components/CartItem/CartItem';
import CartSummary from '../../components/CartSummary/CartSummary';
import TrustBadges from '../../components/TrustBadges/TrustBadges';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../context/AuthContext';
const cartBagIcon = '/freshcart/assets/icons/cart/cart-bag.svg';
const clearAllIcon = '/freshcart/assets/icons/cart/clear-all.svg';
export default function Cart() {
  const { isLoggedIn } = useAuth();
  const {
    cart,
    isLoading,
    isError,
    refetch,
    updateQuantity,
    removeItem,
    clearCart,
    applyCoupon,
    isApplyingCoupon,
    isUpdating,
  } = useCart();

  const items = cart.items;
  const subtotal = cart.totalCartPrice ?? 0;

  return (
    <>
      <section className="cart-page">
        <div className="cart-page__container">
          <nav className="cart-page__breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span className="cart-page__breadcrumb-current">Shopping Cart</span>
          </nav>

          <div className="cart-page__heading">
            <h1 className="cart-page__title">
              <span className="cart-page__title-icon">
                <img src={cartBagIcon} alt="" />
              </span>
              Shopping Cart
            </h1>
            <p className="cart-page__subtitle">
              You have <strong>{items.length} items</strong> in your cart
            </p>
          </div>

          {!isLoggedIn ? (
            <div className="cart-page__empty">
              <p>Please sign in to see your cart.</p>
              <Link to="/login" className="cart-page__continue">Sign in</Link>
            </div>
          ) : isLoading ? (
            <div className="cart-page__empty"><p>Loading your cart…</p></div>
          ) : isError ? (
            <div className="cart-page__empty">
              <p>We couldn't load your cart.</p>
              <button type="button" onClick={() => refetch()}>Try again</button>
            </div>
          ) : items.length > 0 ? (
            <div className="cart-page__grid">
              <div className="cart-page__items">
                <ul className="cart-page__list" style={isUpdating ? { opacity: 0.7 } : undefined}>
                  {items.map((item) => (
                    <CartItem
                      key={item.lineId}
                      item={{
                        id: item.id,
                        image: item.image,
                        title: item.title,
                        category: item.category,
                        sku: item.id.slice(-6).toUpperCase(),
                        price: item.price,
                        quantity: item.count,
                        minQuantity: 1,
                      }}
                      onIncrease={(id) => updateQuantity(id, item.count + 1)}
                      onDecrease={(id) => updateQuantity(id, Math.max(1, item.count - 1))}
                      onRemove={(id) => removeItem(id)}
                    />
                  ))}
                </ul>

                <div className="cart-page__actions-bar">
                  <Link to="/" className="cart-page__continue">← Continue Shopping</Link>
                  <button type="button" className="cart-page__clear" onClick={clearCart}>
                    <img src={clearAllIcon} alt="" />
                    Clear all items
                  </button>
                </div>
              </div>

              <aside className="cart-page__summary">
                <CartSummary
                  itemCount={items.length}
                  subtotal={subtotal}
                  totalAfterDiscount={cart.totalAfterDiscount}
                  onApplyCoupon={applyCoupon}
                  isApplyingCoupon={isApplyingCoupon}
                />
              </aside>
            </div>
          ) : (
            <div className="cart-page__empty">
              <p>Your cart is empty.</p>
              <Link to="/" className="cart-page__continue">← Continue Shopping</Link>
            </div>
          )}
        </div>
      </section>

      <TrustBadges />
    </>
  );
}
