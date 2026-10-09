'use client'

import { Link } from '@/components/NextRouter';
import { useQuery } from '@tanstack/react-query';
const arrowRightIcon = '/freshcart/assets/icons/categories/arrow-right.svg';
import { getCategories } from '../../services/categories';

export default function Categories() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await getCategories({ limit: 10 });
      return res.data?.data ?? [];
    },
    staleTime: 10 * 60 * 1000,
  });

  return (
    <section className="categories-section">
      <div className="categories-section__header">
        <div className="categories-section__heading">
          <span className="categories-section__bar" />
          <h2 className="categories-section__title">
            Shop By <span>Category</span>
          </h2>
        </div>
        <Link className="categories-section__view-all" to="/categories">
          View All Categories
          <img src={arrowRightIcon} alt="" className="categories-section__view-all-icon" />
        </Link>
      </div>

      {isError ? (
        <p className="categories-section__state">Categories are unavailable right now.</p>
      ) : (
        <div className="categories-section__grid">
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="categories-section__skeleton" />
            ))
            : data.map((category) => (
              <Link
                key={category._id}
                className="category-card"
                to="/categories/$id"
                params={{ id: category._id }}
              >
                <span className="category-card__icon">
                  <img
                    src={category.image}
                    alt=""
                    className="category-card__image"
                    loading="lazy"
                    decoding="async"
                    width="80"
                    height="80"
                  />
                </span>
                <h3 className="category-card__label">{category.name}</h3>
              </Link>
            ))}
        </div>
      )}
    </section>
  );
}
