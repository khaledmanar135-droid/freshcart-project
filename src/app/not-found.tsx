"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconShoppingCart, IconHome, IconArrowLeft } from "@tabler/icons-react";
import '@/styles/not-found.css'; 

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="not-found-page">
      
      <div className="not-found-icon-wrapper">
        <div className="cart-box">
          <IconShoppingCart stroke={1.5} className="cart-icon" />
        </div>
        <div className="badge-404">404</div>
      </div>

      <div className="not-found-content">
        <h1>Oops! Nothing Here</h1>
        <p>
          Looks like this page went out of stock! Don't worry, there's plenty more fresh content to explore.
        </p>

        <div className="not-found-actions">
          <Link href="/" className="btn-home">
            <IconHome size={20} />
            Go to Homepage
          </Link>
          <button type="button" onClick={() => router.back()} className="btn-back">
            <IconArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>

      <div className="popular-destinations">
        <h3>Popular Destinations</h3>
        <div className="destinations-links">
          <Link href="/products" className="dest-link active">All Products</Link>
          <Link href="/categories" className="dest-link">Categories</Link>
          <Link href="/" className="dest-link">Today's Deals</Link>
          <Link href="/contact" className="dest-link">Contact Us</Link>
        </div>
      </div>

    </div>
  );
}