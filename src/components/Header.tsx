import React, { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCategory } from '../types';

export const Header: React.FC = () => {
  const {
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsAccountOpen,
    setCategoryFilter,
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navCategories: { name: string; category?: ProductCategory }[] = [
    { name: 'Home' },
    { name: 'Gaming PCs', category: 'Gaming PCs' },
    { name: 'Monitors', category: 'Monitors' },
    { name: 'Keyboards', category: 'Keyboards' },
    { name: 'Mice', category: 'Mice' },
    { name: 'Headsets', category: 'Headsets' },
    { name: 'Accessories', category: 'Accessories' },
  ];

  const handleNavClick = (category?: ProductCategory) => {
    setMobileMenuOpen(false);
    if (!category) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCategoryFilter('All');
    } else {
      setCategoryFilter(category);
      const el = document.getElementById('featured-products-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <>
      {/* Top Notification Announcement Bar */}
      <div className="bg-[#111111] text-white text-xs py-2 px-4 sm:px-8 lg:px-12 border-b border-[#222222]">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2 text-neutral-300">
            <span className="font-semibold text-white">COMPLIMENTARY SHIPPING</span>
            <span className="text-neutral-500">·</span>
            <span>Worldwide express delivery on orders over $150</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-neutral-400">
            <span>2-Year International Warranty</span>
            <span className="text-neutral-600">/</span>
            <span>30-Day Zero Risk Trial</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 bg-white transition-all duration-200 ${
          isScrolled ? 'border-b border-[#E5E5E5] shadow-xs py-3.5' : 'border-b border-[#E5E5E5]/60 py-5'
        }`}
      >
        <div className="w-full px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Left: Brand Identity */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 text-neutral-800 hover:text-black focus:outline-hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick();
                }}
                className="group flex items-center gap-2.5 focus:outline-hidden"
              >
                <span className="w-6 h-6 bg-[#111111] text-white flex items-center justify-center font-bold text-xs tracking-tighter">
                  A
                </span>
                <span className="font-display text-xl font-bold tracking-tight text-[#111111] group-hover:opacity-90 transition-opacity">
                  AVEART
                </span>
              </a>
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-neutral-600">
              {navCategories.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.category)}
                  className="relative py-1 text-neutral-600 hover:text-[#111111] transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-[#111111] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left whitespace-nowrap cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Right: Actions (Search, Account, Wishlist, Cart) */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-neutral-700 hover:text-[#111111] hover:bg-[#F6F6F6] rounded-sm transition-colors cursor-pointer"
                aria-label="Search hardware"
                title="Search (Cmd+K)"
              >
                <Search className="w-4.5 h-4.5" />
              </button>

              {/* Account Drawer Trigger */}
              <button
                onClick={() => setIsAccountOpen(true)}
                className="p-2 text-neutral-700 hover:text-[#111111] hover:bg-[#F6F6F6] rounded-sm transition-colors cursor-pointer hidden sm:block"
                aria-label="Account and orders"
                title="Account"
              >
                <User className="w-4.5 h-4.5" />
              </button>

              {/* Wishlist Trigger */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2 text-neutral-700 hover:text-[#111111] hover:bg-[#F6F6F6] rounded-sm transition-colors cursor-pointer"
                aria-label="Saved wishlist"
                title="Wishlist"
              >
                <Heart className="w-4.5 h-4.5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#111111] text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 p-2 sm:px-3 text-neutral-900 bg-neutral-100 hover:bg-[#111111] hover:text-white rounded-sm transition-all duration-150 cursor-pointer"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                <span className="text-xs font-semibold tabular-nums hidden sm:inline">
                  {cartCount}
                </span>
                {cartCount > 0 && (
                  <span className="sm:hidden absolute -top-1 -right-1 w-4 h-4 bg-[#111111] text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl z-50 flex flex-col p-6 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-6 border-b border-[#E5E5E5]">
              <span className="font-display text-lg font-bold tracking-tight text-[#111111]">
                AVEART
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-neutral-500 hover:text-black"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-4 flex-1 overflow-y-auto">
              {navCategories.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.category)}
                  className="w-full flex items-center justify-between py-2 text-base font-medium text-neutral-800 hover:text-black border-b border-neutral-100 text-left"
                >
                  <span>{item.name}</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </button>
              ))}
            </div>

            <div className="pt-6 border-t border-[#E5E5E5] space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAccountOpen(true);
                }}
                className="w-full flex items-center gap-3 py-2 text-sm font-medium text-neutral-700"
              >
                <User className="w-4 h-4" />
                <span>My Account & Past Orders</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsWishlistOpen(true);
                }}
                className="w-full flex items-center gap-3 py-2 text-sm font-medium text-neutral-700"
              >
                <Heart className="w-4 h-4" />
                <span>Wishlist ({wishlist.length})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
