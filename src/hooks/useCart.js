'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@/components/NextRouter';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import {
  addToCart,
  applyCoupon,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from '../services/cart';
import { apiMessage } from '../lib/product';

const EMPTY = { cartId: null, numOfCartItems: 0, items: [], totalCartPrice: 0, totalAfterDiscount: null };

function normalize(payload) {
  if (!payload) return EMPTY;
  const cart = payload.data ?? {};
  return {
    cartId: payload.cartId ?? cart._id ?? null,
    numOfCartItems: payload.numOfCartItems ?? cart.products?.length ?? 0,
    totalCartPrice: cart.totalCartPrice ?? 0,
    totalAfterDiscount: cart.totalPriceAfterDiscount ?? null,
    items: (cart.products ?? []).map((line) => ({
      lineId: line._id,
      id: line.product?._id ?? line.product,
      count: line.count,
      price: line.price ?? line.product?.price ?? 0,
      title: line.product?.title ?? '',
      image: line.product?.imageCover,
      category: line.product?.category?.name ?? '',
      brand: line.product?.brand?.name ?? '',
      maxQuantity: line.product?.quantity ?? 99,
    })),
  };
}

export function useCart() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['cart'],
    enabled: isLoggedIn,
    retry: false,
    queryFn: async () => {
      try {
        const res = await getCart();
        return normalize(res.data);
      } catch (error) {
        // "No cart exist" is an empty cart, not an error screen
        if (error?.response?.status === 404) return EMPTY;
        throw error;
      }
    },
  });

  const setCart = (payload) => queryClient.setQueryData(['cart'], normalize(payload));

  const requireLogin = () => {
    if (isLoggedIn) return false;
    toast.error('Please sign in to use your cart.');
    navigate({ to: "/login" });
    return true;
  };

  const add = useMutation({
    mutationFn: (productId) => addToCart(productId),
    onSuccess: (res) => {
      setCart(res.data);
      toast.success('Added to your cart');
    },
    onError: (error) => toast.error(apiMessage(error)),
  });

  const update = useMutation({
    mutationFn: ({ productId, count }) => updateCartItem(productId, count),
    onSuccess: (res) => setCart(res.data),
    onError: (error) => toast.error(apiMessage(error)),
  });

  const remove = useMutation({
    mutationFn: (productId) => removeCartItem(productId),
    onSuccess: (res) => {
      setCart(res.data);
      toast.success('Item removed');
    },
    onError: (error) => toast.error(apiMessage(error)),
  });

  const clear = useMutation({
    mutationFn: () => clearCart(),
    onSuccess: () => {
      queryClient.setQueryData(['cart'], EMPTY);
      toast.success('Cart cleared');
    },
    onError: (error) => toast.error(apiMessage(error)),
  });

  const coupon = useMutation({
    mutationFn: (code) => applyCoupon(code),
    onSuccess: (res) => {
      setCart(res.data);
      toast.success('Coupon applied');
    },
    onError: (error) => toast.error(apiMessage(error)),
  });

  return {
    cart: query.data ?? EMPTY,
    isLoading: isLoggedIn && query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    addToCart: (productId) => {
      if (requireLogin()) return;
      add.mutate(productId);
    },
    updateQuantity: (productId, count) => update.mutate({ productId, count }),
    removeItem: (productId) => remove.mutate(productId),
    clearCart: () => clear.mutate(),
    applyCoupon: (code) => coupon.mutate(code),
    pendingProductId: update.variables?.productId ?? remove.variables ?? add.variables ?? null,
    isAdding: add.isPending,
    isUpdating: update.isPending,
    isRemoving: remove.isPending,
    isClearing: clear.isPending,
    isApplyingCoupon: coupon.isPending,
  };
}
