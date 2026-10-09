'use client'

const chevronLeftIcon = '/freshcart/assets/icons/search/chevron-left.svg';
const chevronRightIcon = '/freshcart/assets/icons/search/chevron-right.svg';
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="pagination" aria-label="Search results pages">
      <button
        type="button"
        className="pagination__btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        <img src={chevronLeftIcon} alt="" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={`pagination__btn${page === currentPage ? ' pagination__btn--active' : ''}`}
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className="pagination__btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        <img src={chevronRightIcon} alt="" />
      </button>
    </nav>
  );
}
