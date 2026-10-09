'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@/lib/nextrouter';
import { toast } from 'sonner';
import { useAuth } from '@/features/auth/store/auth.context';
import { addToWishlist, getWishlist, removeFromWishlist } from '../server/wishlist.actions';
import { apiMessage } from '@/lib/apimessage';
import { toCardProduct } from '@/features/products/utils/product.mapper';

export function useWishlist() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['wishlist'],
    enabled: isLoggedIn,
    retry: false,
    queryFn: async () => {
      const res = await getWishlist();
      return (res.data?.data ?? []).map(toCardProduct);
    },
  });

  const items = query.data ?? [];
  const ids = new Set(items.map((item) => item.id));

  const toggle = useMutation({
    mutationFn: ({ productId, wishlisted }) =>
      (wishlisted ? removeFromWishlist(productId) : addToWishlist(productId)),
    onSuccess: (_res, variables) => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast.success(variables.wishlisted ? 'Removed from wishlist' : 'Added to wishlist');
    },
    onError: (error) => toast.error(apiMessage(error)),
  });

  return {
    items,
    ids,
    isLoading: isLoggedIn && query.isLoading,
    isError: query.isError,
    isWishlisted: (productId) => ids.has(productId),
    toggleWishlist: (productId) => {
      if (!isLoggedIn) {
        toast.error('Please sign in to save favourites.');
        navigate({ to: "/login" });
        return;
      }
      toggle.mutate({ productId, wishlisted: ids.has(productId) });
    },
    removeItem: (productId) => toggle.mutate({ productId, wishlisted: true }),
    pendingId: toggle.isPending ? toggle.variables?.productId : null,
  };
}

