import React, { useState } from 'react';
import {
  X,
  Star,
  Shield,
  Truck,
  RotateCcw,
  Check,
  Heart,
  Plus,
  Minus,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    products,
    setSelectedProduct,
    setIsCheckoutOpen,
    addReview,
  } = useShop();

  if (!product) return null;

  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');
  const [selectedImageKey, setSelectedImageKey] = useState<'front' | 'side' | 'detail' | 'lifestyle'>('front');
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variants?.[0]?.options[0] || ''
  );

  // Review Form State
  const [reviewerName, setReviewerName] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const galleryImages = [
    { key: 'front', label: 'Front View', src: product.images.front },
    { key: 'side', label: 'Side View', src: product.images.side },
    { key: 'detail', label: 'Detail View', src: product.images.detail },
    { key: 'lifestyle', label: 'Lifestyle Setup', src: product.images.lifestyle },
  ] as const;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariant);
    onClose();
    setIsCheckoutOpen(true);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;
    addReview(product.id, {
      author: reviewerName.trim(),
      rating: reviewRating,
      title: reviewTitle.trim() || 'Verified Performance',
      comment: reviewComment.trim(),
      verified: true,
    });
    setReviewerName('');
    setReviewTitle('');
    setReviewComment('');
    setShowReviewForm(false);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-5xl my-6 rounded-xs shadow-2xl border border-[#E5E5E5] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5] bg-white sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs text-[#666666]">
            <span className="font-semibold text-black">{product.brand}</span>
            <span>/</span>
            <span>{product.category}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-black transition-colors rounded-xs hover:bg-[#F6F6F6] cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Product Layout: Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-[#E5E5E5]">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 p-6 sm:p-8 bg-[#FBFBFB] flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E5E5E5]">
            {/* Primary Large Image View */}
            <div className="relative aspect-4/3 sm:aspect-square bg-white border border-[#E5E5E5] p-6 flex items-center justify-center rounded-xs overflow-hidden mb-4">
              <img
                src={product.images[selectedImageKey]}
                alt={`${product.name} - ${selectedImageKey}`}
                className="w-full h-full object-contain transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-3 left-3 text-[10px] font-mono uppercase bg-neutral-900/80 text-white px-2 py-0.5 tracking-widest">
                {selectedImageKey} view
              </span>
            </div>

            {/* Thumbnail Switcher */}
            <div className="grid grid-cols-4 gap-3">
              {galleryImages.map((img) => (
                <button
                  key={img.key}
                  onClick={() => setSelectedImageKey(img.key)}
                  className={`relative aspect-square bg-white border p-2 rounded-xs overflow-hidden cursor-pointer transition-all ${
                    selectedImageKey === img.key
                      ? 'border-[#111111] ring-1 ring-[#111111]'
                      : 'border-[#E5E5E5] hover:border-neutral-400 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Information Panel & Purchase Module */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white">
            <div>
              {/* Rating and Availability */}
              <div className="flex items-center justify-between mb-3 text-xs">
                <div className="flex items-center gap-1.5 text-neutral-800">
                  <Star className="w-4 h-4 fill-[#111111] text-[#111111]" />
                  <span className="font-bold tabular-nums">{product.rating}</span>
                  <span className="text-[#666666]">({product.reviewCount} customer reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                  <span>In Stock ({product.stockCount} units)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#111111] mb-3">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-2xl sm:text-3xl font-bold text-[#111111] tabular-nums">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-neutral-400 line-through tabular-nums">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Short Description */}
              <p className="text-sm text-[#666666] leading-relaxed mb-6 font-normal">
                {product.shortDescription}
              </p>

              {/* Variants Selector (if applicable) */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-4 mb-6 pt-4 border-t border-[#E5E5E5]">
                  {product.variants.map((variant) => (
                    <div key={variant.name}>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                        {variant.name}: <span className="font-normal text-black">{selectedVariant}</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {variant.options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => setSelectedVariant(opt)}
                            className={`px-3 py-1.5 text-xs font-medium border rounded-xs transition-colors cursor-pointer ${
                              selectedVariant === opt
                                ? 'bg-[#111111] text-white border-[#111111]'
                                : 'bg-white text-neutral-700 border-[#E5E5E5] hover:border-black'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6 pt-4 border-t border-[#E5E5E5]">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center border border-[#E5E5E5] rounded-xs w-32 bg-[#FBFBFB]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-neutral-600 hover:text-black cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="flex-1 text-center text-xs font-bold tabular-nums text-black">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                    className="p-2 text-neutral-600 hover:text-black cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions & Guarantees */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-4 bg-[#111111] hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3.5 px-4 bg-transparent hover:bg-[#F6F6F6] text-[#111111] border border-[#111111] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Buy Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 border rounded-xs transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'bg-[#111111] text-white border-[#111111]'
                      : 'border-[#E5E5E5] text-neutral-600 hover:text-black hover:border-black'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* Shipping info */}
              <div className="bg-[#F6F6F6] p-3 rounded-xs space-y-2 text-[11px] text-neutral-600">
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-neutral-800 shrink-0" />
                  <span>{product.shippingInfo}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-neutral-800 shrink-0" />
                  <span>2-Year International Hardware Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-3.5 h-3.5 text-neutral-800 shrink-0" />
                  <span>30-Day Hassle-Free Return Policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Tabs: Description / Specifications / Reviews */}
        <div className="p-6 sm:p-8 bg-white">
          <div className="flex items-center gap-8 border-b border-[#E5E5E5] mb-6">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider cursor-pointer border-b-2 transition-colors ${
                activeTab === 'description'
                  ? 'border-[#111111] text-[#111111]'
                  : 'border-transparent text-neutral-400 hover:text-black'
              }`}
            >
              Product Description
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider cursor-pointer border-b-2 transition-colors ${
                activeTab === 'specifications'
                  ? 'border-[#111111] text-[#111111]'
                  : 'border-transparent text-neutral-400 hover:text-black'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider cursor-pointer border-b-2 transition-colors ${
                activeTab === 'reviews'
                  ? 'border-[#111111] text-[#111111]'
                  : 'border-transparent text-neutral-400 hover:text-black'
              }`}
            >
              Reviews ({product.reviews.length})
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'description' && (
            <div className="max-w-3xl space-y-4 text-sm text-[#666666] leading-relaxed">
              <p>{product.fullDescription}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="bg-[#FBFBFB] p-4 border border-[#E5E5E5]">
                  <h4 className="text-xs font-bold uppercase text-[#111111] mb-1">
                    System Compatibility
                  </h4>
                  <div className="flex flex-wrap gap-2 text-xs text-neutral-700">
                    {product.compatibility.map((c) => (
                      <span key={c} className="font-medium text-black">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-[#FBFBFB] p-4 border border-[#E5E5E5]">
                  <h4 className="text-xs font-bold uppercase text-[#111111] mb-1">
                    Quality Inspection
                  </h4>
                  <p className="text-xs text-neutral-600">
                    100% factory tested with low-jitter oscilloscope certification and individual serial tracking.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="border border-[#E5E5E5] rounded-xs overflow-hidden max-w-3xl">
              <table className="w-full text-xs text-left">
                <tbody>
                  {Object.entries(product.specs).map(([key, val], idx) => (
                    <tr
                      key={key}
                      className={idx % 2 === 0 ? 'bg-[#FBFBFB]' : 'bg-white'}
                    >
                      <td className="py-2.5 px-4 font-semibold text-[#111111] w-1/3 border-b border-[#E5E5E5]">
                        {key}
                      </td>
                      <td className="py-2.5 px-4 text-[#666666] border-b border-[#E5E5E5]">
                        {val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6 max-w-3xl">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <div>
                  <div className="text-lg font-bold text-[#111111]">
                    Overall Rating: {product.rating} / 5.0
                  </div>
                  <div className="text-xs text-neutral-500">
                    Based on {product.reviews.length} verified customer submissions
                  </div>
                </div>

                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-4 py-2 bg-[#111111] text-white text-xs font-medium uppercase tracking-wider rounded-xs hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  {showReviewForm ? 'Cancel' : 'Write a Review'}
                </button>
              </div>

              {/* Submit Review Form */}
              {showReviewForm && (
                <form
                  onSubmit={handleReviewSubmit}
                  className="bg-[#FBFBFB] p-5 border border-[#E5E5E5] rounded-xs space-y-4 mb-6"
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider text-black">
                    Submit Verified Review
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-600 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                        placeholder="e.g. Liam S."
                        className="w-full text-xs p-2.5 border border-[#E5E5E5] bg-white rounded-xs focus:outline-hidden focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-600 mb-1">Rating</label>
                      <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        className="w-full text-xs p-2.5 border border-[#E5E5E5] bg-white rounded-xs focus:outline-hidden focus:border-black"
                      >
                        <option value={5}>5 Stars - Exceptional</option>
                        <option value={4}>4 Stars - Very Good</option>
                        <option value={3}>3 Stars - Average</option>
                        <option value={2}>2 Stars - Below Expectations</option>
                        <option value={1}>1 Star - Poor</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-600 mb-1">Headline</label>
                    <input
                      type="text"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      placeholder="e.g. Unmatched build quality and responsiveness"
                      className="w-full text-xs p-2.5 border border-[#E5E5E5] bg-white rounded-xs focus:outline-hidden focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-600 mb-1">Review Comments</label>
                    <textarea
                      required
                      rows={3}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Describe the performance, tactile feel, acoustics, or setup experience..."
                      className="w-full text-xs p-2.5 border border-[#E5E5E5] bg-white rounded-xs focus:outline-hidden focus:border-black"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Post Review
                  </button>
                </form>
              )}

              {/* Reviews List */}
              <div className="space-y-4">
                {product.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 border border-[#E5E5E5] rounded-xs bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-[#111111]">{rev.author}</span>
                        {rev.verified && (
                          <span className="text-[10px] text-emerald-700 flex items-center gap-0.5">
                            <Check className="w-3 h-3" /> Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-neutral-400">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating
                              ? 'fill-[#111111] text-[#111111]'
                              : 'text-neutral-300'
                          }`}
                        />
                      ))}
                    </div>

                    <h5 className="font-semibold text-xs text-[#111111] mb-1">{rev.title}</h5>
                    <p className="text-xs text-[#666666] leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#E5E5E5]">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#111111] mb-6">
                Related Equipment
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => setSelectedProduct(rel)}
                    className="p-3 border border-[#E5E5E5] hover:border-[#111111] transition-colors rounded-xs cursor-pointer flex items-center gap-3 bg-[#FBFBFB]"
                  >
                    <img
                      src={rel.images.front}
                      alt={rel.name}
                      className="w-16 h-16 object-contain bg-white p-1 border border-[#E5E5E5]"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-[#111111] truncate">
                        {rel.name}
                      </div>
                      <div className="text-xs font-bold text-neutral-800 tabular-nums mt-0.5">
                        ${rel.price.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
