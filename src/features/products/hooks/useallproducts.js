'use client'

import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../server/products.actions';
import { toCardProduct } from '../utils/product.mapper';

const PAGE_LIMIT = 50;


export function useAllProducts() {
  return useQuery({
    queryKey: ['products', 'catalog'],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const first = await getProducts({ limit: PAGE_LIMIT, page: 1 });
      const pages = first.data?.metadata?.numberOfPages ?? 1;
      let raw = first.data?.data ?? [];

      if (pages > 1) {
        const rest = await Promise.all(
          Array.from({ length: pages - 1 }, (_, i) =>
            getProducts({ limit: PAGE_LIMIT, page: i + 2 })),
        );
        raw = raw.concat(...rest.map((res) => res.data?.data ?? []));
      }

      return raw.map(toCardProduct);
    },
  });
}

