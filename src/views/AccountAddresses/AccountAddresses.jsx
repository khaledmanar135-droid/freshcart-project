'use client'

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import AccountLayout from '../../components/AccountLayout/AccountLayout';
import TrustBadges from '../../components/TrustBadges/TrustBadges';
import SignInPrompt from '../../components/SignInPrompt/SignInPrompt';
import { useAuth } from '../../context/AuthContext';
import { addAddress, getAddresses, removeAddress } from '../../services/addresses';
import { apiMessage } from '../../lib/product';
const pinIcon = '/freshcart/assets/icons/account/pin-green.svg';
const phoneIcon = '/freshcart/assets/icons/checkout/phone.svg';
const buildingIcon = '/freshcart/assets/icons/checkout/building.svg';
const trashIcon = '/freshcart/assets/icons/account/trash.svg';
const plusIcon = '/freshcart/assets/icons/account/plus.svg';
const EMPTY_FORM = { name: '', details: '', phone: '', city: '' };

export default function AccountAddresses() {
  const queryClient = useQueryClient();
  const { isLoggedIn, sessionChecked } = useAuth();
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const { data: addresses = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['addresses'],
    retry: false,
    enabled: isLoggedIn,
    queryFn: async () => (await getAddresses()).data?.data ?? [],
  });

  const create = useMutation({
    mutationFn: () => addAddress(form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      setForm(EMPTY_FORM);
      setFormOpen(false);
      toast.success('Address saved');
    },
    onError: (error) => toast.error(apiMessage(error)),
  });

  const destroy = useMutation({
    mutationFn: (id) => removeAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      toast.success('Address removed');
    },
    onError: (error) => toast.error(apiMessage(error)),
  });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.details.trim() || !form.phone.trim() || !form.city.trim()) {
      toast.error('Please fill in every field.');
      return;
    }
    create.mutate();
  };

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm((prev) => ({ ...prev, [key]: e.target.value })),
  });

  if (!sessionChecked) return null;

  if (!isLoggedIn) {
    return (
      <SignInPrompt
        title="Sign in to manage addresses"
        message="Sign in to your account to add, view and remove your delivery addresses."
      />
    );
  }

  return (
    <>
      <AccountLayout active="addresses">
        <div className="account-addresses">
          <div className="account-addresses__heading">
            <div>
              <h2 className="account-addresses__title">My Addresses</h2>
              <p className="account-addresses__subtitle">Manage your saved delivery addresses</p>
            </div>
            <button
              type="button"
              className="account-addresses__add-btn"
              onClick={() => setFormOpen((open) => !open)}
            >
              <img src={plusIcon} alt="" />
              {formOpen ? 'Cancel' : 'Add Address'}
            </button>
          </div>

          {formOpen && (
            <form className="account-addresses__form" onSubmit={submit}>
              <input type="text" placeholder="Label (e.g. Home)" aria-label="Label" {...field('name')} />
              <input type="text" placeholder="City" aria-label="City" {...field('city')} />
              <input type="tel" placeholder="Phone (01xxxxxxxxx)" aria-label="Phone" {...field('phone')} />
              <textarea placeholder="Street, building, floor…" aria-label="Address details" rows={2} {...field('details')} />
              <button type="submit" disabled={create.isPending}>
                {create.isPending ? 'Saving…' : 'Save address'}
              </button>
            </form>
          )}

          {isLoading ? (
            <div className="account-addresses__empty"><p>Loading your addresses…</p></div>
          ) : isError ? (
            <div className="account-addresses__empty">
              <p>We couldn't load your addresses.</p>
              <button type="button" onClick={() => refetch()}>Try again</button>
            </div>
          ) : addresses.length > 0 ? (
            <ul className="account-addresses__list">
              {addresses.map((address) => (
                <li key={address._id} className="account-addresses__card">
                  <div className="account-addresses__card-main">
                    <span className="account-addresses__card-icon">
                      <img src={pinIcon} alt="" />
                    </span>
                    <div className="account-addresses__card-body">
                      <h3 className="account-addresses__card-title">{address.name}</h3>
                      <p className="account-addresses__card-detail">{address.details}</p>
                      <div className="account-addresses__card-meta">
                        <span>
                          <img src={phoneIcon} alt="" />
                          {address.phone}
                        </span>
                        <span>
                          <img src={buildingIcon} alt="" />
                          {address.city}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="account-addresses__card-actions">
                    <button
                      type="button"
                      className="account-addresses__icon-btn"
                      aria-label={`Delete ${address.name} address`}
                      onClick={() => destroy.mutate(address._id)}
                      disabled={destroy.isPending}
                    >
                      <img src={trashIcon} alt="" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="account-addresses__empty">
              <p>You have no saved addresses yet.</p>
            </div>
          )}
        </div>
      </AccountLayout>
      <TrustBadges />
    </>
  );
}
