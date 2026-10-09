'use client'

import { useState } from 'react';
import { Link, useSearch } from '@/components/NextRouter';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ProductCard from '../../components/ProductCard/ProductCard';
import Pagination from '../../components/Pagination/Pagination';
import TrustBadges from '../../components/TrustBadges/TrustBadges';
import { getProducts } from '../../services/products';
import { toCardProduct } from '../../lib/product';
const layersIcon = '/freshcart/assets/icons/categories/layers.svg';
const LIMIT = 12;

export default function AllProducts() {
  const search = useSearch({ strict: false }) || {};
  const categoryParam = typeof search.category === 'string' ? search.category : '';
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['products', { page, limit: LIMIT, category: categoryParam }],
    queryFn: async () => {
      const res = await getProducts({ page, limit: LIMIT, ...(categoryParam ? { category: categoryParam } : {}) });
      return {
        products: (res.data?.data ?? []).map(toCardProduct),
        totalPages: res.data?.metadata?.numberOfPages ?? 1,
        results: res.data?.results ?? 0,
      };
    },
    placeholderData: keepPreviousData,
  });

  return (
    <div className="all-products">
      <section className="all-products__banner">
        <div className="all-products__banner-inner">
          <nav className="all-products__breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span className="all-products__breadcrumb-current">All Products</span>
          </nav>

          <div className="all-products__heading">
            <span className="all-products__icon">
              <img src={layersIcon} alt="" />
            </span>
            <div>
              <h1 className="all-products__title">All Products</h1>
              <p className="all-products__subtitle">Explore our complete product collection</p>
            </div>
          </div>
        </div>
      </section>

      <div className="all-products__body">
        {isError ? (
          <div className="all-products__state">
            <p>We couldn't load the products.</p>
            <button type="button" onClick={() => refetch()}>Try again</button>
          </div>
        ) : (
          <>
            <p className="all-products__count">
              {isLoading ? 'Loading products…' : `Showing ${data.products.length} of ${data.results} products`}
            </p>

            <div className="all-products__grid" style={isFetching && !isLoading ? { opacity: 0.6 } : undefined}>
              {isLoading
                ? Array.from({ length: LIMIT }).map((_, index) => (
                  <div key={index} className="all-products__skeleton" />
                ))
                : data.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {!isLoading && (
              <Pagination
                currentPage={page}
                totalPages={Math.max(1, data.totalPages)}
                onPageChange={(next) => {
                  setPage(next);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}
          </>
        )}
      </div>

      <TrustBadges />
    </div>
  );
}
