'use client'

import { useParams, Link } from '@/lib/nextrouter';
import { useQuery } from '@tanstack/react-query';
import Breadcrumb from '../components/productDetails/breadcrumb';
import ProductGallery from '../components/productDetails/productgallery';
import ProductInfo from '../components/productDetails/productinfo';
import ProductTabs from '../components/productDetails/producttabs';
import RelatedProducts from '../components/productDetails/relatedproducts';
import TrustBadges from '@/components/shared/trustbadges';
import { getProduct, getProducts } from '../server/products.actions';
import { getProductReviews } from '../server/reviews.actions';
import { toCardProduct } from '../utils/product.mapper';

export default function ProductDetails() {
  const { id } = useParams({ strict: false }) || {};

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    enabled: Boolean(id),
    queryFn: async () => toCardProduct((await getProduct(id)).data?.data),
  });

  const { data: relatedProducts = [] } = useQuery({
    queryKey: ['products', 'related', product?.categoryId, product?.id],
    enabled: Boolean(product?.categoryId),
    queryFn: async () => {
      const res = await getProducts({ 'category[in]': [product.categoryId], limit: 10 });
      return (res.data?.data ?? [])
        .map(toCardProduct)
        .filter((item) => item.id !== product.id)
        .slice(0, 8);
    },
  });

  const { data: reviewsList = [] } = useQuery({
    queryKey: ['reviews', id],
    enabled: Boolean(id),
    queryFn: async () => {
      const res = await getProductReviews(id);
      return (res.data?.data ?? []).map((review) => ({
        id: review._id,
        name: review.user?.name ?? 'Customer',
        date: review.createdAt ? new Date(review.createdAt).toLocaleDateString() : '',
        rating: review.ratings ?? review.rating ?? 0,
        comment: review.review ?? '',
      }));
    },
  });

  if (isLoading) {
    return (
      <div className="product-details">
        <div className="product-details__main">
          <div className="product-details__skeleton product-details__skeleton--gallery" />
          <div className="product-details__skeleton product-details__skeleton--info" />
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="product-details__not-found">
        <h1>Product not found</h1>
        <p>We couldn't find the product you're looking for.</p>
        <Link to="/">Back to home</Link>
      </div>
    );
  }

  return (
    <div className="product-details">
      <Breadcrumb
        category={product.category}
        categoryId={product.categoryId}
        subcategory={product.subcategory}
        productName={product.title}
      />

      <div className="product-details__main">
        <ProductGallery images={product.gallery} title={product.title} />
        <ProductInfo product={product} />
      </div>

      <div className="product-details__tabs-wrap">
        <ProductTabs product={{ ...product, reviewsList }} />
      </div>

      {relatedProducts.length > 0 && <RelatedProducts products={relatedProducts} />}

      <TrustBadges />
    </div>
  );
}

