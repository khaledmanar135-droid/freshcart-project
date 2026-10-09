'use client'

import { useState } from 'react';
import { useParams, Link } from '@/components/NextRouter';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ProductCard from '../../components/ProductCard/ProductCard';
import Pagination from '../../components/Pagination/Pagination';
import TrustBadges from '../../components/TrustBadges/TrustBadges';
import { getCategory } from '../../services/categories';
import { getProducts } from '../../services/products';
import { toCardProduct } from '../../lib/product';
import './CategoryDetails.css';

const LIMIT = 12;

export default function CategoryDetails() {
  const params = useParams() || {};
  const id = params.id;
  const [page, setPage] = useState(1);

  const { data: categoryData, isLoading: categoryLoading } = useQuery({
    queryKey: ['category', id],
    enabled: Boolean(id),
    queryFn: async () => {
      const res = await getCategory(id);
      return res.data?.data ?? null;
    },
  });

  const { data: productsData, isLoading: productsLoading, isError, refetch } = useQuery({
    queryKey: ['products', 'category', id, { page, limit: LIMIT }],
    enabled: Boolean(id),
    queryFn: async () => {
      const res = await getProducts({ category: id, page, limit: LIMIT });
      return {
        products: (res.data?.data ?? []).map(toCardProduct),
        totalPages: res.data?.metadata?.numberOfPages ?? 1,
        results: res.data?.results ?? 0,
      };
    },
    placeholderData: keepPreviousData,
  });

  const categoryName = categoryData?.name || 'Category Products';
  const categoryImage = categoryData?.image;
  const products = productsData?.products ?? [];
  const resultsCount = productsData?.results ?? 0;
  const totalPages = productsData?.totalPages ?? 1;

  return (
    <div className="category-details">
      <nav className="category-details__breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/categories">Categories</Link>
        <span>/</span>
        <span style={{ color: '#16a34a', fontWeight: 600 }}>{categoryName}</span>
      </nav>

      <div className="category-details__header">
        {categoryImage && (
          <img
            src={categoryImage}
            alt={categoryName}
            className="category-details__image"
          />
        )}
        <div>
          <h1 className="category-details__title">{categoryName}</h1>
          <p className="category-details__subtitle">
            {categoryLoading ? 'Loading category details...' : `Explore all products in ${categoryName}`}
          </p>
        </div>
      </div>

      <p className="category-details__count">
        {productsLoading ? 'Loading products...' : `Showing ${products.length} of ${resultsCount} products`}
      </p>

      {isError ? (
        <div className="category-details__empty">
          <h3>Failed to load products</h3>
          <p>There was an error loading products for this category.</p>
          <button type="button" onClick={() => refetch()} style={{ padding: '8px 20px', borderRadius: '8px', background: '#16a34a', color: 'white', border: 'none', cursor: 'pointer' }}>
            Try again
          </button>
        </div>
      ) : productsLoading ? (
        <div className="category-details__grid">
          {Array.from({ length: LIMIT }).map((_, index) => (
            <div key={index} className="category-details__skeleton" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="category-details__empty">
          <h3>No products found</h3>
          <p>There are no products listed in this category yet.</p>
          <Link to="/products">Browse all products</Link>
        </div>
      ) : (
        <>
          <div className="category-details__grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(next) => {
                setPage(next);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}
        </>
      )}

      <TrustBadges />
    </div>
  );
}
