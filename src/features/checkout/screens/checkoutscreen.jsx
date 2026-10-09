'use client'

import { useState } from 'react';
import { Link, useNavigate } from '@/lib/nextrouter';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import ShippingAddressCard from '../components/shippingaddresscard';
import PaymentMethodCard from '../components/paymentmethodcard';
import CheckoutSummary from '../components/checkoutsummary';
import TrustBadges from '@/components/shared/trustbadges';
import SignInPrompt from '@/features/auth/components/signinprompt';
import { useCart } from '@/features/cart/hooks/usecart';
import { useAuth } from '@/features/auth/store/auth.context';
import { getAddresses } from '@/features/account/server/addresses.actions';
import { createCashOrder, createCheckoutSession } from '../server/checkout.actions';
import { apiMessage } from '@/lib/apimessage';
const orderDocIcon = '/freshcart/assets/icons/checkout/order-doc.svg';
const arrowLeftIcon = '/freshcart/assets/icons/checkout/arrow-left.svg';
const EMPTY_FIELDS = { city: '', street: '', phone: '' };

export default function Checkout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { cart, isLoading } = useCart();
  const { isLoggedIn, sessionChecked } = useAuth();

  const [addressMode, setAddressMode] = useState('new');
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [form, setForm] = useState(EMPTY_FIELDS);
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const { data: addresses = [] } = useQuery({
    queryKey: ['addresses'],
    retry: false,
    enabled: isLoggedIn,
    queryFn: async () => (await getAddresses()).data?.data ?? [],
  });

  const items = cart.items.map((item) => ({
    id: item.lineId,
    title: item.title,
    image: item.image,
    price: item.price,
    quantity: item.count,
  }));
  const subtotal = cart.totalAfterDiscount ?? cart.totalCartPrice ?? 0;

  const handleFieldChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setAddressMode('new');
    setSelectedAddressId(null);
  };

  const selectSaved = (address) => {
    setAddressMode('saved');
    setSelectedAddressId(address._id);
    setForm({ city: address.city ?? '', street: address.details ?? '', phone: address.phone ?? '' });
  };

  const placeOrder = useMutation({
    mutationFn: async () => {
      const shippingAddress = {
        details: form.street.trim(),
        phone: form.phone.trim(),
        city: form.city.trim(),
      };
      if (paymentMethod === 'online') {
        const res = await createCheckoutSession(cart.cartId, shippingAddress, window.location.origin);
        return { redirectUrl: res.data?.session?.url };
      }
      await createCashOrder(cart.cartId, shippingAddress);
      return { redirectUrl: null };
    },
    onSuccess: ({ redirectUrl }) => {
      if (redirectUrl) {
        window.location.href = redirectUrl;
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order placed! We will deliver it soon.');
      navigate({ to: '/orders' });
    },
    onError: (error) => toast.error(apiMessage(error, 'We could not place your order.')),
  });

  const handlePlaceOrder = () => {
    if (!cart.cartId || items.length === 0) {
      toast.error('Your cart is empty.');
      return;
    }
    if (!form.city.trim() || !form.street.trim() || !form.phone.trim()) {
      toast.error('Please fill in your city, street address and phone number.');
      return;
    }
    placeOrder.mutate();
  };

  if (!sessionChecked) return null;

  if (!isLoggedIn) {
    return (
      <SignInPrompt
        title="Sign in to check out"
        message="Sign in to your account to confirm your delivery address and place your order."
      />
    );
  }

  return (
    <>
      <section className="checkout-page">
        <div className="checkout-page__container">
          <nav className="checkout-page__breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/cart">Cart</Link>
            <span>/</span>
            <span className="checkout-page__breadcrumb-current">Checkout</span>
          </nav>

          <div className="checkout-page__heading">
            <div className="checkout-page__heading-main">
              <h1 className="checkout-page__title">
                <span className="checkout-page__title-icon">
                  <img src={orderDocIcon} alt="" />
                </span>
                Complete Your Order
              </h1>
              <p className="checkout-page__subtitle">Review your items and complete your purchase</p>
            </div>
            <Link to="/cart" className="checkout-page__back">
              <img src={arrowLeftIcon} alt="" />
              Back to Cart
            </Link>
          </div>

          {!isLoading && items.length === 0 ? (
            <div className="checkout-page__empty">
              <p>Your cart is empty, so there is nothing to check out yet.</p>
              <Link to="/products" className="checkout-page__back">Start shopping</Link>
            </div>
          ) : (
            <div className="checkout-page__grid">
              <div className="checkout-page__main">
                <ShippingAddressCard
                  addresses={addresses}
                  selectedAddressId={selectedAddressId}
                  onSelectAddress={selectSaved}
                  addressMode={addressMode}
                  onSelectNew={() => { setAddressMode('new'); setSelectedAddressId(null); setForm(EMPTY_FIELDS); }}
                  form={form}
                  onFieldChange={handleFieldChange}
                />
                <PaymentMethodCard method={paymentMethod} onSelect={setPaymentMethod} />
              </div>

              <aside className="checkout-page__summary">
                <CheckoutSummary
                  items={items}
                  subtotal={subtotal}
                  onPlaceOrder={handlePlaceOrder}
                  isPlacingOrder={placeOrder.isPending}
                />
              </aside>
            </div>
          )}
        </div>
      </section>

      <TrustBadges />
    </>
  );
}

