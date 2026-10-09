'use client'

import Hero from '../components/hero';
import FeaturesBar from '@/components/shared/featuresbar';
import Categories from '../components/homecategories';
import PromoGrid from '../components/promogrid';
import ProductGrid from '../components/productgrid';
import Newsletter from '../components/newsletter';
import TrustBadges from '@/components/shared/trustbadges';

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

