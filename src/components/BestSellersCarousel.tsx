import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';

export const BestSellersCarousel: React.FC = () => {
  const { products } = useShop();
  const bestSellers = products.filter((p) => p.isBestSeller);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);

    const cardWidth = 320;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(index);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 360;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollToIndex = (idx: number) => {
    if (!scrollContainerRef.current) return;
    const cardWidth = 340;
    scrollContainerRef.current.scrollTo({
      left: idx * cardWidth,
      behavior: 'smooth',
    });
  };

  return (
    <section id="best-sellers-section" className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#E5E5E5] overflow-hidden">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-14">
        {/* Header with Title and Slider Navigation Controls */}
        <div className="flex items-end justify-between mb-10 pb-4 border-b border-[#E5E5E5]">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-neutral-500 uppercase block mb-2">
              COMMUNITY FAVORITES
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] uppercase">
              BEST SELLERS
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-xs border border-[#E5E5E5] flex items-center justify-center transition-colors cursor-pointer ${
                canScrollLeft
                  ? 'text-[#111111] hover:bg-[#F6F6F6] hover:border-[#111111]'
                  : 'text-neutral-300 border-neutral-200 cursor-not-allowed'
              }`}
              aria-label="Previous best sellers"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-xs border border-[#E5E5E5] flex items-center justify-center transition-colors cursor-pointer ${
                canScrollRight
                  ? 'text-[#111111] hover:bg-[#F6F6F6] hover:border-[#111111]'
                  : 'text-neutral-300 border-neutral-200 cursor-not-allowed'
              }`}
              aria-label="Next best sellers"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Carousel */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
        >
          {bestSellers.map((product) => (
            <div
              key={product.id}
              className="w-[280px] sm:w-[320px] shrink-0 snap-start flex flex-col"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {bestSellers.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`h-1.5 transition-all duration-300 cursor-pointer ${
                activeIndex === idx
                  ? 'w-8 bg-[#111111]'
                  : 'w-2 bg-neutral-300 hover:bg-neutral-500'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
