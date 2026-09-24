import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCategory } from '../types';
import {
  CATEGORY_PC_IMAGE,
  CATEGORY_MONITOR_IMAGE,
  CATEGORY_KEYBOARD_IMAGE,
  EDITORIAL_BANNER_IMAGE,
  HERO_IMAGE,
} from '../data/products';

interface CategoryItem {
  name: ProductCategory;
  subtitle: string;
  image: string;
  itemCount: number;
}

export const Categories: React.FC = () => {
  const { setCategoryFilter } = useShop();

  const categories: CategoryItem[] = [
    {
      name: 'Gaming PCs',
      subtitle: 'Liquid-cooled custom stations',
      image: CATEGORY_PC_IMAGE,
      itemCount: 4,
    },
    {
      name: 'Monitors',
      subtitle: 'OLED & 360Hz fast displays',
      image: CATEGORY_MONITOR_IMAGE,
      itemCount: 6,
    },
    {
      name: 'Keyboards',
      subtitle: 'CNC aluminum mechanical boards',
      image: CATEGORY_KEYBOARD_IMAGE,
      itemCount: 8,
    },
    {
      name: 'Mice',
      subtitle: 'Sub-50g 4000Hz wireless sensors',
      image: CATEGORY_KEYBOARD_IMAGE,
      itemCount: 5,
    },
    {
      name: 'Headsets',
      subtitle: 'Planar magnetic audiophile sound',
      image: CATEGORY_MONITOR_IMAGE,
      itemCount: 4,
    },
    {
      name: 'Accessories',
      subtitle: 'Cordura desk mats, arms & rests',
      image: HERO_IMAGE,
      itemCount: 12,
    },
  ];

  const handleSelectCategory = (catName: ProductCategory) => {
    setCategoryFilter(catName);
    const target = document.getElementById('featured-products-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="categories-section" className="py-20 lg:py-28 bg-[#F6F6F6] border-b border-[#E5E5E5]">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-14">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-[#E5E5E5] gap-4">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-neutral-500 uppercase block mb-2">
              DISCOVER HARDWARE
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] uppercase">
              SHOP BY CATEGORY
            </h2>
          </div>
          <p className="text-sm text-[#666666] font-normal">
            Precision instruments crafted for competitive performance.
          </p>
        </div>

        {/* Categories Grid - Responsive 6 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleSelectCategory(cat.name)}
              className="group cursor-pointer bg-white border border-[#E5E5E5] hover:border-[#111111] transition-all duration-200 overflow-hidden flex flex-col"
            >
              {/* Image Container with subtle zoom */}
              <div className="relative aspect-4/3 bg-[#F6F6F6] overflow-hidden flex items-center justify-center p-6">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Information */}
              <div className="p-6 flex items-center justify-between bg-white border-t border-[#E5E5E5]">
                <div>
                  <h3 className="text-lg font-bold text-[#111111] tracking-tight group-hover:text-black">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#666666] mt-0.5">{cat.subtitle}</p>
                </div>
                <div className="text-xs font-semibold text-neutral-400 group-hover:text-[#111111] transition-colors tabular-nums">
                  {cat.itemCount} Items
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
