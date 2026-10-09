'use client'

import { Link } from '@/lib/nextrouter';
import { useQuery } from '@tanstack/react-query';
import OrderCard from '../components/ordercard';
import TrustBadges from '@/components/shared/trustbadges';
import { useAuth } from '@/features/auth/store/auth.context';
import { getUserOrders } from '../server/orders.actions';
const ordersBagIcon = '/freshcart/assets/icons/orders/orders-bag.svg';
const continueIcon = '/freshcart/assets/icons/orders/continue-icon.svg';
function mapOrder(order) {
  const items = (order.cartItems ?? []).map((line) => ({
    title: line.product?.title ?? 'Product',
    image: line.product?.imageCover,
    quantity: line.count,
    price: line.price,
  }));
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    id: String(order.id ?? order._id),
    status: order.isDelivered ? 'on-the-way' : 'processing',
    date: order.createdAt ? new Date(order.createdAt).toLocaleDateString(undefined, {
      month: 'short', day: 'numeric', year: 'numeric',
    }) : '',
    itemCount,
    city: order.shippingAddress?.city ?? '—',
    total: order.totalOrderPrice ?? 0,
    extraCount: Math.max(0, items.length - 1),
    image: items[0]?.image,
    items,
    address: {
      name: order.shippingAddress?.city ?? '—',
      detail: order.shippingAddress?.details ?? '',
      phone: order.shippingAddress?.phone ?? '',
    },
    summary: {
      subtotal: order.totalOrderPrice ?? 0,
      shipping: order.shippingPrice ? `${order.shippingPrice} EGP` : 'Free',
      total: order.totalOrderPrice ?? 0,
    },
  };
}

export default function Orders() {
  const { userId, isLoggedIn } = useAuth();

  const { data: orders = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['orders', userId],
    enabled: Boolean(userId),
    retry: false,
    queryFn: async () => {
      const res = await getUserOrders(userId);
      return (res.data ?? [])
        .map(mapOrder)
        .sort((a, b) => Number(b.id) - Number(a.id));
    },
  });

  return (
    <>
      <section className="orders-page">
        <div className="orders-page__container">
          <nav className="orders-page__breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span className="orders-page__breadcrumb-current">My Orders</span>
          </nav>

          <div className="orders-page__heading">
            <div className="orders-page__heading-main">
              <span className="orders-page__title-icon">
                <img src={ordersBagIcon} alt="" />
              </span>
              <div>
                <h1 className="orders-page__title">My Orders</h1>
                <p className="orders-page__subtitle">
                  {isLoading ? 'Loading your orders…' : `Track and manage your ${orders.length} orders`}
                </p>
              </div>
            </div>
            <Link to="/" className="orders-page__continue">
              <img src={continueIcon} alt="" />
              Continue Shopping
            </Link>
          </div>

          {!isLoggedIn ? (
            <div className="orders-page__empty">
              <p>Please sign in to see your orders.</p>
              <Link to="/login">Sign in</Link>
            </div>
          ) : isError ? (
            <div className="orders-page__empty">
              <p>We couldn't load your orders.</p>
              <button type="button" onClick={() => refetch()}>Try again</button>
            </div>
          ) : !isLoading && orders.length === 0 ? (
            <div className="orders-page__empty">
              <p>You haven't placed any orders yet.</p>
              <Link to="/products">Start shopping</Link>
            </div>
          ) : (
            <ul className="orders-page__list">
              {orders.map((order, index) => (
                <OrderCard key={order.id} order={order} defaultExpanded={index === 0} />
              ))}
            </ul>
          )}
        </div>
      </section>

      <TrustBadges />
    </>
  );
}

