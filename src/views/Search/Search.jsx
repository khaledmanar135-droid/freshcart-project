'use client'

import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useRouterState, useSearch } from '@/components/NextRouter';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../../components/ProductCard/ProductCard';
import SearchFilters from '../../components/SearchFilters/SearchFilters';
import Pagination from '../../components/Pagination/Pagination';
import TrustBadges from '../../components/TrustBadges/TrustBadges';
import { getCategories } from '../../services/categories';
import { getBrands } from '../../services/brands';
import { useAllProducts } from '../../hooks/useAllProducts';
const searchIcon = '/freshcart/assets/icons/search/search.svg';
const gridIcon = '/freshcart/assets/icons/search/grid.svg';
const listIcon = '/freshcart/assets/icons/search/list.svg';
const filtersIcon = '/freshcart/assets/icons/search/filters.svg';
const ITEMS_PER_PAGE = 12;

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

export default function Search() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) || {};
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isProductsPage = pathname.startsWith('/products');
  const query = typeof search.q === 'string' ? search.q : '';
  const categoryParam = typeof search.category === 'string' ? search.category : '';
  const brandParam = typeof search.brand === 'string' ? search.brand : '';
  const [inputValue, setInputValue] = useState(query);

  const [selectedCategories, setSelectedCategories] = useState(
    () => new Set(categoryParam ? [categoryParam] : []),
  );
  const [selectedBrands, setSelectedBrands] = useState(
    () => new Set(brandParam ? [brandParam] : []),
  );
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [view, setView] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setSelectedCategories(new Set(categoryParam ? [categoryParam] : []));
    setCurrentPage(1);
  }, [categoryParam]);

  useEffect(() => {
    setSelectedBrands(new Set(brandParam ? [brandParam] : []));
    setCurrentPage(1);
  }, [brandParam]);

  useEffect(() => {
    setInputValue(query);
    setCurrentPage(1);
  }, [query]);

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => (await getCategories({ limit: 50 })).data?.data ?? [],
    staleTime: 10 * 60 * 1000,
  });

  const { data: brands = [] } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => (await getBrands({ limit: 60 })).data?.data ?? [],
    staleTime: 10 * 60 * 1000,
  });

  const categoryIds = useMemo(() => [...selectedCategories], [selectedCategories]);
  const brandIds = useMemo(() => [...selectedBrands], [selectedBrands]);

  const { data: allProducts = [], isLoading, isError, refetch } = useAllProducts();

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const min = minPrice === '' ? null : Number(minPrice);
    const max = maxPrice === '' ? null : Number(maxPrice);

    let list = allProducts.filter((product) => {
      if (q) {
        const haystack = `${product.title} ${product.category} ${product.brand} ${product.description}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (categoryIds.length && !categoryIds.includes(product.categoryId)) return false;
      if (brandIds.length && !brandIds.includes(product.brandId)) return false;
      if (min !== null && product.price < min) return false;
      if (max !== null && product.price > max) return false;
      return true;
    });

    if (sortBy === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);

    return list;
  }, [allProducts, query, categoryIds, brandIds, minPrice, maxPrice, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const page = Math.min(currentPage, totalPages);
  const pageProducts = filteredProducts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const toggleCategory = (id) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
    setCurrentPage(1);
  };

  const toggleBrand = (id) => {
    setSelectedBrands((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
    setCurrentPage(1);
  };

  const handleQuickPrice = (max) => {
    setMinPrice('');
    setMaxPrice(String(max));
    setCurrentPage(1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate({ to: '/search', search: inputValue ? { q: inputValue } : {} });
    setCurrentPage(1);
  };

  const activeCategoryName = categories.find((c) => c._id === categoryParam)?.name;

  const filtersProps = {
    categories,
    brands,
    selectedCategories,
    onToggleCategory: toggleCategory,
    minPrice,
    maxPrice,
    onMinPriceChange: (value) => { setMinPrice(value); setCurrentPage(1); },
    onMaxPriceChange: (value) => { setMaxPrice(value); setCurrentPage(1); },
    onQuickPrice: handleQuickPrice,
    selectedBrands,
    onToggleBrand: toggleBrand,
  };

  return (
    <>
      <div className="search-page">
        <div className="search-page__header">
          <div className="search-page__header-inner">
            <nav className="search-page__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span className="search-page__breadcrumb-current">
                {activeCategoryName || (isProductsPage && !query ? 'All Products' : 'Search Results')}
              </span>
            </nav>
            <h1 className="search-page__visually-hidden">
              {query
                ? `Search results for "${query}"`
                : activeCategoryName || (isProductsPage ? 'All products' : 'Search results')}
            </h1>

            <form className="search-page__search" role="search" onSubmit={handleSearchSubmit}>
              <img src={searchIcon} alt="" className="search-page__search-icon" />
              <input
                type="search"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search for products..."
                aria-label="Search for products"
              />
            </form>
          </div>
        </div>

        <div className="search-page__body">
          <aside className="search-page__sidebar">
            <div className="search-page__sidebar-card">
              <SearchFilters {...filtersProps} />
            </div>
          </aside>

          <main className="search-page__main">
            <div className="search-page__toolbar">
              <div className="search-page__toolbar-left">
                <button
                  type="button"
                  className="search-page__filters-btn"
                  onClick={() => setFiltersOpen(true)}
                >
                  <img src={filtersIcon} alt="" />
                  Filters
                </button>

                <div className="search-page__view-toggle">
                  <button
                    type="button"
                    className={`search-page__view-btn${view === 'grid' ? ' search-page__view-btn--active' : ''}`}
                    onClick={() => setView('grid')}
                    aria-label="Grid view"
                    aria-pressed={view === 'grid'}
                  >
                    <img src={gridIcon} alt="" />
                  </button>
                  <button
                    type="button"
                    className={`search-page__view-btn${view === 'list' ? ' search-page__view-btn--active' : ''}`}
                    onClick={() => setView('list')}
                    aria-label="List view"
                    aria-pressed={view === 'list'}
                  >
                    <img src={listIcon} alt="" />
                  </button>
                </div>
              </div>

              <div className="search-page__sort">
                <span>Sort by:</span>
                <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}>
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {isError ? (
              <div className="search-page__empty">
                <p>We couldn't load products right now.</p>
                <button type="button" onClick={() => refetch()}>Try again</button>
              </div>
            ) : isLoading ? (
              <div className={`search-page__grid search-page__grid--${view}`}>
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="search-page__skeleton" />
                ))}
              </div>
            ) : pageProducts.length > 0 ? (
              <div className={`search-page__grid search-page__grid--${view}`}>
                {pageProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="search-page__empty">
                <p>No products found. Try adjusting your search or filters.</p>
              </div>
            )}

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </main>
        </div>
      </div>

      <TrustBadges />

      {filtersOpen && (
        <>
          <div
            className="search-page__drawer-backdrop"
            onClick={() => setFiltersOpen(false)}
            aria-hidden="true"
          />
          <div className="search-page__drawer" role="dialog" aria-modal="true" aria-label="Filters">
            <div className="search-page__drawer-top">
              <h2>Filters</h2>
              <button
                type="button"
                className="search-page__drawer-close"
                onClick={() => setFiltersOpen(false)}
                aria-label="Close filters"
              >
                ×
              </button>
            </div>
            <div className="search-page__drawer-body">
              <SearchFilters {...filtersProps} />
            </div>
            <button
              type="button"
              className="search-page__drawer-apply"
              onClick={() => setFiltersOpen(false)}
            >
              Show {filteredProducts.length} Results
            </button>
          </div>
        </>
      )}
    </>
  );
}
