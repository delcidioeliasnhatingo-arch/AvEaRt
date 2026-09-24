/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Categories } from './components/Categories';
import { FeaturedProducts } from './components/FeaturedProducts';
import { EditorialBanner } from './components/EditorialBanner';
import { BestSellersCarousel } from './components/BestSellersCarousel';
import { PerformanceSection } from './components/PerformanceSection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AccountDrawer } from './components/AccountDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ToastNotification } from './components/ToastNotification';

const MainLayout: React.FC = () => {
  const { selectedProduct, setSelectedProduct } = useShop();

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col font-sans selection:bg-[#111111] selection:text-white">
      {/* Sticky Header with Navigation & Action Hub */}
      <Header />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Shop By Category */}
        <Categories />

        {/* 3. Featured Gaming Gear Grid */}
        <FeaturedProducts />

        {/* 4. Full-Width Editorial Split Banner */}
        <EditorialBanner />

        {/* 5. Best Sellers Horizontal Carousel */}
        <BestSellersCarousel />

        {/* 6. Performance Without Compromise Section */}
        <PerformanceSection />

        {/* 7. Dark Minimal Newsletter */}
        <Newsletter />
      </main>

      {/* 8. Minimal Black Footer */}
      <Footer />

      {/* Overlays, Drawers & Modals */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <AccountDrawer />
      <CheckoutModal />
      <ToastNotification />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainLayout />
    </ShopProvider>
  );
}
