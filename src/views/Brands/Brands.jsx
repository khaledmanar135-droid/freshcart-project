'use client'

import { Link } from '@/components/NextRouter';
import { useQuery } from '@tanstack/react-query';
import BrandCard from '../../components/BrandCard/BrandCard';
import TrustBadges from '../../components/TrustBadges/TrustBadges';
const tagIcon = '/freshcart/assets/icons/brands/tag.svg';
import { getBrands } from '../../services/brands';

export default function Brands() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const res = await getBrands({ limit: 60 });
      return res.data?.data ?? [];
    },
    staleTime: 10 * 60 * 1000,
  });

  return (
    <>
      <section className="brands-page">
        <div className="brands-page__banner">
          <div className="brands-page__banner-inner">
            <nav className="brands-page__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span className="brands-page__breadcrumb-current">Brands</span>
            </nav>

            <div className="brands-page__heading">
              <span className="brands-page__heading-icon">
                <img src={tagIcon} alt="" />
              </span>
              <div>
                <h1 className="brands-page__title">Top Brands</h1>
                <p className="brands-page__subtitle">Shop from your favorite brands</p>
              </div>
            </div>
          </div>
        </div>

        <div className="brands-page__container">
          {isError ? (
            <div className="brands-page__state">
              <p>We couldn't load the brands.</p>
              <button type="button" onClick={() => refetch()}>Try again</button>
            </div>
          ) : (
            <div className="brands-page__grid">
              {isLoading
                ? Array.from({ length: 12 }).map((_, index) => (
                  <div key={index} className="brands-page__skeleton" />
                ))
                : data.map((brand, index) => (
                  <BrandCard
                    key={brand._id}
                    brand={{ id: brand._id, name: brand.name, image: brand.image }}
                    eager={index < 6}
                  />
                ))}
            </div>
          )}
        </div>
      </section>

      <TrustBadges />
    </>
  );
}
