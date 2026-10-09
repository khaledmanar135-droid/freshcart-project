'use client'

import { useEffect } from 'react';
import { Outlet, useLocation } from '@/components/NextRouter';
import TopBar from '../TopBar/TopBar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <TopBar />
      <div className="site-header">
        <Header />
      </div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
