import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { EDITORIAL_BANNER_IMAGE } from '../data/products';
import { useShop } from '../context/ShopContext';

export const EditorialBanner: React.FC = () => {
  const { setCategoryFilter } = useShop();

  const handleExploreSetups = () => {
    setCategoryFilter('Accessories');
    const el = document.getElementById('featured-products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="bg-white border-b border-[#E5E5E5] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[560px]">
        {/* Left Side: Modern Minimalist Setup Image */}
        <div className="lg:col-span-7 relative bg-[#F6F6F6] min-h-[380px] lg:min-h-[560px] overflow-hidden">
          <img
            src={EDITORIAL_BANNER_IMAGE}
            alt="Modern Minimalist Architectural Gaming Studio Setup"
            className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-102"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          <div className="absolute top-6 left-6 bg-black/75 backdrop-blur-md px-3.5 py-1.5 text-white text-[11px] font-semibold uppercase tracking-widest border border-white/10">
            MINIMALIST WORKSPACE · STUDIO ARCHITECTURE
          </div>
        </div>

        {/* Right Side: Contrast Dark Section */}
        <div className="lg:col-span-5 bg-[#111111] text-white flex flex-col justify-center px-8 sm:px-14 lg:px-16 py-16 lg:py-20">
          <div className="max-w-md">
            <span className="text-xs font-bold tracking-[0.2em] text-neutral-400 uppercase block mb-3">
              CURATED ECOSYSTEM
            </span>

            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6 leading-tight">
              BUILD YOUR SETUP
            </h2>

            <p className="text-base text-neutral-300 leading-relaxed mb-8">
              Everything you need to create a clean, powerful and immersive gaming setup.
              Designed with balanced acoustic damping, integrated cable conduits, and ergonomic
              all-day endurance.
            </p>

            {/* Architectural Highlights */}
            <div className="space-y-3 mb-10">
              <div className="flex items-center gap-3 text-xs text-neutral-300">
                <Check className="w-4 h-4 text-white shrink-0" />
                <span>Zero visual clutter with tool-free internal cable routing</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-neutral-300">
                <Check className="w-4 h-4 text-white shrink-0" />
                <span>Precision machined solid aluminum and sustainable natural walnut</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-neutral-300">
                <Check className="w-4 h-4 text-white shrink-0" />
                <span>Low-frequency acoustic resonance dampening throughout</span>
              </div>
            </div>

            <button
              onClick={handleExploreSetups}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-[#111111] text-xs font-semibold tracking-wider uppercase rounded-xs hover:bg-neutral-100 transition-colors group cursor-pointer"
            >
              <span>EXPLORE SETUPS</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
