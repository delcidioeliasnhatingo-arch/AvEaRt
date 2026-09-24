import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { HERO_IMAGE } from '../data/products';

export const Hero: React.FC = () => {
  const { setCategoryFilter, setSelectedProduct, products } = useShop();

  const handleShopNow = () => {
    setCategoryFilter('All');
    const el = document.getElementById('featured-products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleExploreCollection = () => {
    const el = document.getElementById('categories-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openFlagshipMonitor = () => {
    const prod = products.find((p) => p.id === 'aveart-horizon-34-oled');
    if (prod) setSelectedProduct(prod);
  };

  return (
    <section className="relative bg-white border-b border-[#E5E5E5] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px] lg:min-h-[720px] items-stretch">
          {/* Left Side: Typography & Action Zone */}
          <div className="lg:col-span-6 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-16 lg:py-24">
            <div className="max-w-xl">
              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 bg-[#111111]" />
                <span className="text-xs font-bold tracking-[0.2em] text-[#111111] uppercase">
                  GAMING PERFORMANCE
                </span>
                <span className="text-neutral-400">·</span>
                <span className="text-xs tracking-wider text-neutral-500 uppercase">
                  2026 COLLECTION
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] leading-[1.08] mb-6 text-balance">
                BUILT FOR YOUR NEXT LEVEL
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-[#666666] leading-relaxed mb-10 font-normal max-w-lg">
                Gaming gear designed for performance, precision and an exceptional gaming
                experience. Understated design language engineered for serious competitors.
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={handleShopNow}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#111111] text-white text-xs font-semibold tracking-wider uppercase rounded-xs hover:bg-neutral-800 transition-colors group cursor-pointer whitespace-nowrap"
                >
                  <span>SHOP GAMING GEAR</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleExploreCollection}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-[#111111] text-xs font-semibold tracking-wider uppercase rounded-xs border border-[#111111] hover:bg-[#F6F6F6] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>EXPLORE COLLECTION</span>
                  <ChevronRight className="w-4 h-4 text-neutral-500" />
                </button>
              </div>

              {/* Quiet Proof Metrics */}
              <div className="mt-14 pt-8 border-t border-[#E5E5E5] grid grid-cols-3 gap-6">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#111111] tabular-nums">
                    0.03<span className="text-xs font-semibold text-neutral-500 ml-0.5">MS</span>
                  </div>
                  <div className="text-xs text-[#666666] mt-0.5">QD-OLED Latency</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#111111] tabular-nums">
                    8,000<span className="text-xs font-semibold text-neutral-500 ml-0.5">HZ</span>
                  </div>
                  <div className="text-xs text-[#666666] mt-0.5">Polling Fidelity</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#111111] tabular-nums">
                    49<span className="text-xs font-semibold text-neutral-500 ml-0.5">G</span>
                  </div>
                  <div className="text-xs text-[#666666] mt-0.5">Structural Shell</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Realistic Professional Setup Photography */}
          <div className="lg:col-span-6 relative bg-[#F6F6F6] flex items-center justify-center overflow-hidden min-h-[420px] lg:min-h-full">
            <img
              src={HERO_IMAGE}
              alt="AVEART Minimalist Gaming Setup with Ultrawide Monitor and Custom Desktop"
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.01]"
              referrerPolicy="no-referrer"
              loading="eager"
            />

            {/* Subtle floating product badge / hotspot anchor */}
            <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-white/95 backdrop-blur-md p-4 rounded-xs border border-[#E5E5E5] shadow-xs max-w-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-500 block">
                    FEATURED IN SETUP
                  </span>
                  <span className="text-sm font-semibold text-[#111111] block mt-0.5">
                    Horizon 34" Ultrawide OLED
                  </span>
                  <span className="text-xs font-medium text-neutral-600 block mt-0.5 tabular-nums">
                    240Hz · 0.03ms GtG · $1,199
                  </span>
                </div>
                <button
                  onClick={openFlagshipMonitor}
                  className="px-3.5 py-2 bg-[#111111] text-white text-xs font-medium uppercase rounded-xs hover:bg-neutral-800 transition-colors whitespace-nowrap cursor-pointer"
                >
                  View Gear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
