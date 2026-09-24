import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, setSelectedProduct } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
    }
  }, [isSearchOpen]);

  // Keyboard shortcut Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filtered = searchTerm.trim()
    ? products.filter((p) => {
        const query = searchTerm.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          Object.values(p.specs).some((val) => val.toLowerCase().includes(query))
        );
      })
    : [];

  const popularSearches = ['OLED Monitor', 'Mechanical Keyboard', 'RTX 4080 Desktop', 'Ultralight Mouse', 'Planar Headset'];

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24 animate-in fade-in duration-150">
      <div
        className="relative bg-white w-full max-w-2xl rounded-xs shadow-2xl border border-[#E5E5E5] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#E5E5E5] bg-white">
          <Search className="w-5 h-5 text-neutral-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search precision monitors, keyboards, PCs, headsets, specs..."
            className="w-full text-sm text-[#111111] placeholder:text-neutral-400 focus:outline-hidden bg-transparent"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-neutral-400 hover:text-black mr-2 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-2 py-1 text-xs text-neutral-500 hover:text-black bg-[#F6F6F6] rounded-xs cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results / Suggestions Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {searchTerm.trim() === '' ? (
            <div>
              <div className="text-[11px] font-bold tracking-widest text-neutral-400 uppercase mb-3 px-2">
                POPULAR SEARCHES
              </div>
              <div className="flex flex-wrap gap-2 mb-6 px-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchTerm(term)}
                    className="px-3 py-1.5 bg-[#F6F6F6] hover:bg-[#111111] hover:text-white text-xs font-medium text-neutral-700 rounded-xs transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <div className="text-[11px] font-bold tracking-widest text-neutral-400 uppercase mb-3 px-2">
                ALL HARDWARE CATEGORIES
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 px-2">
                {['Gaming PCs', 'Monitors', 'Keyboards', 'Mice', 'Headsets', 'Accessories'].map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => setSearchTerm(cat)}
                      className="text-left p-2.5 bg-[#FBFBFB] hover:bg-[#F6F6F6] border border-[#E5E5E5] rounded-xs text-xs font-semibold text-neutral-800 transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span>{cat}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                    </button>
                  )
                )}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center text-neutral-500">
              <p className="text-sm font-semibold text-neutral-800 mb-1">
                No matching hardware found for "{searchTerm}"
              </p>
              <p className="text-xs text-neutral-500">
                Try searching by category name, resolution (1440p, OLED), or brand.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-[11px] font-bold tracking-widest text-neutral-400 uppercase mb-2 px-2">
                {filtered.length} MATCHING EQUIPMENT FOUND
              </div>
              {filtered.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => handleSelectProduct(prod)}
                  className="flex items-center justify-between p-2.5 rounded-xs hover:bg-[#F6F6F6] transition-colors cursor-pointer border border-transparent hover:border-[#E5E5E5]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={prod.images.front}
                      alt={prod.name}
                      className="w-12 h-12 object-contain bg-white border border-[#E5E5E5] p-1 rounded-xs shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#111111] truncate">{prod.name}</div>
                      <div className="flex items-center gap-2 text-[11px] text-[#666666]">
                        <span>{prod.category}</span>
                        <span>·</span>
                        <div className="flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-[#111111] text-[#111111]" />
                          <span className="tabular-nums font-semibold">{prod.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 ml-4">
                    <div className="text-xs font-bold text-[#111111] tabular-nums">
                      ${prod.price.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-emerald-700 font-medium">In Stock</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
