import React from 'react';
import { Star, Heart, Eye, Plus } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setSelectedProduct } = useShop();
  const wishlisted = isInWishlist(product.id);

  const handleCardClick = () => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultVariant = product.variants?.[0]?.options[0];
    addToCart(product, 1, defaultVariant);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white border border-[#E5E5E5] hover:border-[#111111] transition-all duration-200 flex flex-col justify-between cursor-pointer rounded-xs"
    >
      {/* Top Media Area */}
      <div className="relative aspect-square bg-[#FBFBFB] p-6 flex items-center justify-center overflow-hidden border-b border-[#E5E5E5]">
        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
            wishlisted
              ? 'bg-[#111111] text-white'
              : 'bg-white/80 hover:bg-white text-neutral-600 hover:text-black shadow-xs'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Product Image with Subtle Zoom */}
        <img
          src={product.images.front}
          alt={product.name}
          className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Quick View Floating Hint */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/95 backdrop-blur-xs text-[11px] font-medium text-neutral-800 border border-[#E5E5E5] shadow-xs uppercase tracking-wider">
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </span>
        </div>
      </div>

      {/* Product Information Body */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Metadata Row: Category and Rating (Zero-Pill discipline) */}
          <div className="flex items-center justify-between text-xs text-[#666666] mb-1.5">
            <span className="font-semibold uppercase tracking-wider text-[11px] text-neutral-500">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-neutral-700">
              <Star className="w-3.5 h-3.5 fill-[#111111] text-[#111111]" />
              <span className="font-semibold tabular-nums text-xs">{product.rating}</span>
              <span className="text-neutral-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-semibold text-sm sm:text-base text-[#111111] group-hover:text-black line-clamp-1 mb-2 tracking-tight">
            {product.name}
          </h3>

          {/* Short Specs Snippet */}
          <p className="text-xs text-[#666666] line-clamp-2 mb-4 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Add to Cart Action Footer */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-bold text-[#111111] tabular-nums">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through tabular-nums">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#111111] hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
