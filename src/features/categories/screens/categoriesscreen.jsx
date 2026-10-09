'use client'

import { Link } from '@/lib/nextrouter';
import { useQuery } from '@tanstack/react-query';
import TrustBadges from '@/components/shared/trustbadges';
const layersIcon = '/freshcart/assets/icons/categories/layers.svg';
const arrowRightIcon = '/freshcart/assets/icons/categories/arrow-right.svg';
import { getCategories } from '../server/categories.actions';

export default function CategoriesPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['categories', 'all'],
    queryFn: async () => {
      const res = await getCategories({ limit: 50 });
      return res.data?.data ?? [];
    },
    staleTime: 10 * 60 * 1000,
  });

  return (
    <>
      <section className="categories-page">
        <div className="categories-page__banner">
          <div className="categories-page__banner-inner">
            <nav className="categories-page__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span className="categories-page__breadcrumb-current">Categories</span>
            </nav>

            <div className="categories-page__heading">
              <span className="categories-page__heading-icon">
                <img src={layersIcon} alt="" />
              </span>
              <div>
                <h1 className="categories-page__title">All Categories</h1>
                <p className="categories-page__subtitle">Browse our wide range of product categories</p>
              </div>
            </div>
          </div>
        </div>

        <div className="categories-page__container">
          {isError ? (
            <div className="categories-page__state">
              <p>We couldn't load the categories.</p>
              <button type="button" onClick={() => refetch()}>Try again</button>
            </div>
          ) : (
            <div className="categories-page__grid">
              {isLoading
                ? Array.from({ length: 10 }).map((_, index) => (
                  <div key={index} className="categories-page__skeleton" />
                ))
                : data.map((category, index) => (
                  <Link
                    key={category._id}
                    to="/categories/$id"
                    params={{ id: category._id }}
                    className="category-tile"
                  >
                    <span className="category-tile__media">
                      <img
                        src={category.image}
                        alt={category.name}
                        loading={index < 5 ? 'eager' : 'lazy'}
                      />
                    </span>
                    <span className="category-tile__label">{category.name}</span>
                    <span className="category-tile__cta">
                      Shop Now
                      <img src={arrowRightIcon} alt="" />
                    </span>
                  </Link>
                ))}
            </div>
          )}
        </div>
      </section>

      <TrustBadges />
    </>
  );
}

