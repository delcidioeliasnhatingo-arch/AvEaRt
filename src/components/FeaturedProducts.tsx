import React from 'react';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { ProductCategory } from '../types';

export const FeaturedProducts: React.FC = () => {
  const { products, filterState, setFilterState, setCategoryFilter, resetFilters } = useShop();

  const categories: (ProductCategory | 'All')[] = [
    'All',
    'Gaming PCs',
    'Monitors',
    'Keyboards',
    'Mice',
    'Headsets',
    'Accessories',
  ];

  // Apply filters
  const filteredProducts = products.filter((product) => {
    // Category match
    if (filterState.category !== 'All' && product.category !== filterState.category) {
      return false;
    }
    // Search query match
    if (filterState.searchQuery) {
      const q = filterState.searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchDesc = product.shortDescription.toLowerCase().includes(q);
      const matchCat = product.category.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCat) return false;
    }
    // Price match
    if (
      product.price < filterState.priceRange[0] ||
      product.price > filterState.priceRange[1]
    ) {
      return false;
    }
    // Min rating
    if (filterState.minRating > 0 && product.rating < filterState.minRating) {
      return false;
    }
    return true;
  });

  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filterState.sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'best-selling':
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      case 'newest':
        return b.reviewCount - a.reviewCount;
      case 'featured':
      default:
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    }
  });

  return (
    <section id="featured-products-section" className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#E5E5E5] gap-4">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-neutral-500 uppercase block mb-2">
              CURATED SELECTION
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] uppercase">
              FEATURED GAMING GEAR
            </h2>
          </div>

          {/* Controls: Segmented Category Buttons & Sort Selector */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-neutral-500">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Sort:</span>
            </div>
            <select
              value={filterState.sortBy}
              onChange={(e) =>
                setFilterState((prev) => ({
                  ...prev,
                  sortBy: e.target.value as any,
                }))
              }
              className="text-xs font-medium text-[#111111] bg-white border border-[#E5E5E5] rounded-xs px-3 py-1.5 focus:outline-hidden focus:border-[#111111] cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="best-selling">Best Selling</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>

            {filterState.category !== 'All' && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-black transition-colors px-2 py-1 cursor-pointer"
                title="Reset filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isActive = filterState.category === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xs whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#111111] text-white'
                    : 'bg-[#F6F6F6] text-neutral-600 hover:bg-[#EBEBEB] hover:text-[#111111]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 4-Column Responsive Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-[#E5E5E5] rounded-xs p-8 bg-[#FBFBFB]">
            <p className="text-base font-semibold text-[#111111] mb-2">
              No gaming gear found matching your criteria.
            </p>
            <p className="text-xs text-[#666666] mb-6">
              Try adjusting your category filter or search terms.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-neutral-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
