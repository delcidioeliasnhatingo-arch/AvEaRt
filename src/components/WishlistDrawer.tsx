import React from 'react';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    products,
    toggleWishlist,
    moveToCartFromWishlist,
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#E5E5E5] flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-250">
          {/* Header */}
          <div className="p-6 border-b border-[#E5E5E5] flex items-center justify-between bg-white">
            <div className="flex items-baseline gap-2">
              <h2 className="font-display text-lg font-bold tracking-tight text-[#111111] uppercase">
                Saved Wishlist
              </h2>
              <span className="text-xs text-neutral-400 font-semibold tabular-nums">
                ({wishlist.length})
              </span>
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-black rounded-xs hover:bg-[#F6F6F6] transition-colors cursor-pointer"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#F6F6F6] flex items-center justify-center text-neutral-400 mb-4">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-[#111111] uppercase mb-1">
                  Your wishlist is empty
                </h3>
                <p className="text-xs text-[#666666] max-w-xs mb-6">
                  Save your favorite monitors, audio headsets, and mechanical keyboards to track them easily.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-6 py-2.5 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              wishlistedProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-4 border border-[#E5E5E5] rounded-xs flex gap-4 bg-white hover:border-[#111111] transition-colors"
                >
                  <div className="w-20 h-20 bg-[#F6F6F6] border border-[#E5E5E5] rounded-xs p-2 shrink-0 flex items-center justify-center">
                    <img
                      src={product.images.front}
                      alt={product.name}
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-[10px] uppercase font-bold text-neutral-500">
                          {product.category}
                        </span>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-neutral-400 hover:text-black transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4 className="text-xs font-bold text-[#111111] line-clamp-1 mt-0.5">
                        {product.name}
                      </h4>
                      <div className="text-xs font-bold text-[#111111] tabular-nums mt-1">
                        ${product.price.toLocaleString()}
                      </div>
                    </div>

                    <button
                      onClick={() => moveToCartFromWishlist(product)}
                      className="mt-3 w-full py-2 bg-[#111111] hover:bg-neutral-800 text-white text-[11px] font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistedProducts.length > 0 && (
            <div className="p-6 border-t border-[#E5E5E5] bg-[#FBFBFB]">
              <button
                onClick={() => {
                  wishlistedProducts.forEach((p) => moveToCartFromWishlist(p));
                }}
                className="w-full py-3.5 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Add All to Bag</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
