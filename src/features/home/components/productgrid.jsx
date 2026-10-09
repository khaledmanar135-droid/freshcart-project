'use client'

import { useQuery } from '@tanstack/react-query';
import ProductCard from '@/features/products/components/productcard';
import { getProducts } from '@/features/products/server/products.actions';
import { toCardProduct } from '@/features/products/utils/product.mapper';

export default function ProductGrid() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['products', { featured: true }],
    queryFn: async () => {
      const res = await getProducts({ limit: 20, sort: '-ratingsAverage' });
      return (res.data?.data ?? []).map(toCardProduct);
    },
    staleTime: 5 * 60 * 1000,
  });

  return (
    <section className="product-grid-section">
      <div className="product-grid-section__header">
        <span className="product-grid-section__bar" />
        <h2 className="product-grid-section__title">
          Featured <span>Products</span>
        </h2>
      </div>

      {isError ? (
        <div className="product-grid-section__state">
          <p>We couldn't load products right now.</p>
          <button type="button" onClick={() => refetch()}>Try again</button>
        </div>
      ) : (
        <div className="product-grid-section__grid">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="product-grid-section__skeleton" />
            ))
            : (data ?? []).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </section>
  );
}

