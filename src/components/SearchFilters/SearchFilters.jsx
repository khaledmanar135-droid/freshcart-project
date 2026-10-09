'use client'


const QUICK_PRICES = [
  { label: 'Under 500', max: 500 },
  { label: 'Under 1K', max: 1000 },
  { label: 'Under 5K', max: 5000 },
  { label: 'Under 10K', max: 10000 },
];

export default function SearchFilters({
  categories = [],
  brands = [],
  selectedCategories,
  onToggleCategory,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  onQuickPrice,
  selectedBrands,
  onToggleBrand,
}) {
  return (
    <div className="search-filters">
      <div className="search-filters__group">
        <h2 className="search-filters__title">Categories</h2>
        <div className="search-filters__scroll">
          {categories.length === 0 && <p className="search-filters__empty">Loading…</p>}
          {categories.map((category) => (
            <label key={category._id} className="search-filters__option">
              <input
                type="checkbox"
                checked={selectedCategories.has(category._id)}
                onChange={() => onToggleCategory(category._id)}
              />
              <span>{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="search-filters__divider" />

      <div className="search-filters__group">
        <h2 className="search-filters__title">Price Range</h2>
        <div className="search-filters__price-inputs">
          <div className="search-filters__price-field">
            <label htmlFor="search-min-price">Min (EGP)</label>
            <input
              id="search-min-price"
              type="number"
              min="0"
              placeholder="0"
              value={minPrice}
              onChange={(e) => onMinPriceChange(e.target.value)}
            />
          </div>
          <div className="search-filters__price-field">
            <label htmlFor="search-max-price">Max (EGP)</label>
            <input
              id="search-max-price"
              type="number"
              min="0"
              placeholder="No limit"
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(e.target.value)}
            />
          </div>
        </div>
        <div className="search-filters__quick-prices">
          {QUICK_PRICES.map((preset) => (
            <button
              key={preset.label}
              type="button"
              className="search-filters__quick-price-btn"
              onClick={() => onQuickPrice(preset.max)}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <hr className="search-filters__divider" />

      <div className="search-filters__group">
        <h2 className="search-filters__title">Brands</h2>
        <div className="search-filters__scroll">
          {brands.length === 0 && <p className="search-filters__empty">Loading…</p>}
          {brands.map((brand) => (
            <label key={brand._id} className="search-filters__option">
              <input
                type="checkbox"
                checked={selectedBrands.has(brand._id)}
                onChange={() => onToggleBrand(brand._id)}
              />
              <span>{brand.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
