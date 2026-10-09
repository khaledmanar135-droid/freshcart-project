'use client'

const starFull = '/freshcart/assets/icons/product-card/star-full.svg';
const starEmpty = '/freshcart/assets/icons/product-card/star-empty.svg';
export default function StarRating({ value, max = 5 }) {
  const fillPercent = Math.max(0, Math.min(1, value / max)) * 100;

  return (
    <span className="star-rating" aria-label={`${value} out of ${max} stars`}>
      <span className="star-rating__track">
        {Array.from({ length: max }).map((_, i) => (
          <img key={i} src={starEmpty} alt="" className="star-rating__star" />
        ))}
      </span>
      <span className="star-rating__fill" style={{ width: `${fillPercent}%` }}>
        {Array.from({ length: max }).map((_, i) => (
          <img key={i} src={starFull} alt="" className="star-rating__star" />
        ))}
      </span>
    </span>
  );
}
