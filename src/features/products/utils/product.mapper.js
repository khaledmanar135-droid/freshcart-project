/**
 * Map a product from the Route API into the shape the UI components expect.
 */
export function toCardProduct(p) {
  if (!p) return null;
  const hasDiscount = typeof p.priceAfterDiscount === 'number' && p.priceAfterDiscount < p.price;
  const price = hasDiscount ? p.priceAfterDiscount : p.price;

  return {
    id: p._id,
    image: p.imageCover,
    gallery: Array.isArray(p.images) && p.images.length ? p.images : [p.imageCover],
    title: p.title,
    description: p.description ?? '',
    category: p.category?.name ?? '',
    categoryId: p.category?._id ?? null,
    subcategory: p.subcategory?.[0]?.name ?? '',
    brand: p.brand?.name ?? '',
    brandId: p.brand?._id ?? null,
    rating: Math.round((p.ratingsAverage ?? 0) * 10) / 10,
    reviews: p.ratingsQuantity ?? 0,
    price,
    originalPrice: hasDiscount ? p.price : undefined,
    discount: hasDiscount ? `-${Math.round((1 - p.priceAfterDiscount / p.price) * 100)}%` : undefined,
    stock: p.quantity ?? 0,
    inStock: (p.quantity ?? 0) > 0,
    sold: p.sold ?? 0,
  };
}
