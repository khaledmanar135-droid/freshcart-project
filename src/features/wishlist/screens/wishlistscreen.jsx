'use client'

import { Link } from '@/lib/nextrouter';
import WishlistRow from '../components/wishlistrow';
import TrustBadges from '@/components/shared/trustbadges';
import { useWishlist } from '../hooks/usewishlist';
import { useCart } from '@/features/cart/hooks/usecart';
import { useAuth } from '@/features/auth/store/auth.context';
const heartIcon = '/freshcart/assets/icons/wishlist/heart.svg';
export default function Wishlist() {
  const { isLoggedIn } = useAuth();
  const { items, isLoading, isError, removeItem } = useWishlist();
  const { addToCart, isAdding } = useCart();

  return (
    <>
      <section className="wishlist-page">
        <div className="wishlist-page__container">
          <nav className="wishlist-page__breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span className="wishlist-page__breadcrumb-current">Wishlist</span>
          </nav>

          <div className="wishlist-page__heading">
            <span className="wishlist-page__title-icon">
              <img src={heartIcon} alt="" />
            </span>
            <div>
              <h1 className="wishlist-page__title">My Wishlist</h1>
              <p className="wishlist-page__subtitle">{items.length} items saved</p>
            </div>
          </div>

          {!isLoggedIn ? (
            <div className="wishlist-page__empty">
              <p>Please sign in to see your saved items.</p>
              <Link to="/login" className="wishlist-page__continue">Sign in</Link>
            </div>
          ) : isLoading ? (
            <div className="wishlist-page__empty"><p>Loading your wishlist…</p></div>
          ) : isError ? (
            <div className="wishlist-page__empty"><p>We couldn't load your wishlist.</p></div>
          ) : items.length > 0 ? (
            <>
              <div className="wishlist-page__card">
                <div className="wishlist-page__head">
                  <span className="wishlist-page__head-product">Product</span>
                  <span className="wishlist-page__head-cell">Price</span>
                  <span className="wishlist-page__head-cell">Status</span>
                  <span className="wishlist-page__head-cell">Actions</span>
                </div>
                <div className="wishlist-page__rows">
                  {items.map((item) => (
                    <WishlistRow
                      key={item.id}
                      item={item}
                      onRemove={removeItem}
                      onAddToCart={addToCart}
                      isAdding={isAdding}
                    />
                  ))}
                </div>
              </div>

              <Link to="/" className="wishlist-page__continue">← Continue Shopping</Link>
            </>
          ) : (
            <div className="wishlist-page__empty">
              <p>Your wishlist is empty.</p>
              <Link to="/" className="wishlist-page__continue">← Continue Shopping</Link>
            </div>
          )}
        </div>
      </section>

      <TrustBadges />
    </>
  );
}

