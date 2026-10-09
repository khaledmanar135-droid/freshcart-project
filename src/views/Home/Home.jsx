'use client'

import Hero from '../../components/Hero/Hero';
import FeaturesBar from '../../components/FeaturesBar/FeaturesBar';
import Categories from '../../components/Categories/Categories';
import PromoGrid from '../../components/PromoGrid/PromoGrid';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import Newsletter from '../../components/Newsletter/Newsletter';
import TrustBadges from '../../components/TrustBadges/TrustBadges';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesBar />
      <Categories />
      <PromoGrid />
      <ProductGrid />
      <Newsletter />
      <TrustBadges />
    </>
  );
}
