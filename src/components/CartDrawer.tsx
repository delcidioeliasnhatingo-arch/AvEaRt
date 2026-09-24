import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    shipping,
    discount,
    total,
    freeShippingThreshold,
    freeShippingProgress,
    couponCode,
    isCouponApplied,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
  } = useShop();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyCoupon(inputCode);
      setInputCode('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#E5E5E5] flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-250">
          {/* Header */}
          <div className="p-6 border-b border-[#E5E5E5] flex items-center justify-between bg-white">
            <div className="flex items-baseline gap-2">
              <h2 className="font-display text-lg font-bold tracking-tight text-[#111111] uppercase">
                Shopping Bag
              </h2>
              <span className="text-xs text-neutral-400 font-semibold tabular-nums">
                ({cart.reduce((a, c) => a + c.quantity, 0)} items)
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-black rounded-xs hover:bg-[#F6F6F6] transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-[#FBFBFB] border-b border-[#E5E5E5]">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              <span className="text-neutral-700">
                {subtotal >= freeShippingThreshold ? (
                  <span className="text-emerald-700 font-semibold">
                    ✓ You have unlocked Complimentary Express Shipping!
                  </span>
                ) : (
                  <span>
                    Add{' '}
                    <strong className="text-black tabular-nums">
                      ${(freeShippingThreshold - subtotal).toFixed(2)}
                    </strong>{' '}
                    more for free worldwide shipping
                  </span>
                )}
              </span>
            </div>
            <div className="w-full bg-[#E5E5E5] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#111111] h-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 divide-y divide-neutral-100">
            {cart.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#F6F6F6] flex items-center justify-center text-neutral-400 mb-4">
                  <X className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-[#111111] uppercase mb-1">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-[#666666] max-w-xs mb-6">
                  Explore our precision monitors, custom mechanical keyboards, and small form factor desktops.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <div key={`${item.product.id}-${item.selectedVariant || index}`} className="pt-5 first:pt-0 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-[#F6F6F6] border border-[#E5E5E5] rounded-xs p-2 shrink-0 flex items-center justify-center">
                    <img
                      src={item.product.images.front}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-[#111111] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedVariant)}
                          className="text-neutral-400 hover:text-black transition-colors p-0.5 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.selectedVariant && (
                        <p className="text-[11px] text-neutral-500 mt-0.5 font-medium">
                          {item.selectedVariant}
                        </p>
                      )}

                      <div className="text-xs font-bold text-[#111111] tabular-nums mt-1">
                        ${item.product.price.toLocaleString()}
                      </div>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#E5E5E5] rounded-xs bg-[#FBFBFB]">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1,
                              item.selectedVariant
                            )
                          }
                          className="p-1.5 text-neutral-600 hover:text-black cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold tabular-nums text-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.selectedVariant
                            )
                          }
                          className="p-1.5 text-neutral-600 hover:text-black cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-[#111111] tabular-nums">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout Module */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E5E5E5] bg-[#FBFBFB] space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Promo code (try AVEART10)"
                    className="w-full text-xs pl-8 pr-3 py-2 bg-white border border-[#E5E5E5] rounded-xs uppercase tracking-wider focus:outline-hidden focus:border-black"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-neutral-200 hover:bg-[#111111] hover:text-white text-[#111111] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {isCouponApplied && (
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 p-2 rounded-xs border border-emerald-200">
                  <span className="font-semibold">Code applied: {couponCode}</span>
                  <button
                    onClick={removeCoupon}
                    className="underline text-[11px] hover:text-black cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Breakdown */}
              <div className="space-y-1.5 text-xs text-[#666666] pt-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-semibold text-[#111111]">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span className="tabular-nums font-semibold">
                      -${discount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="tabular-nums font-semibold text-[#111111]">
                    {shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#111111] pt-2 border-t border-[#E5E5E5]">
                  <span>Total</span>
                  <span className="tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-4 bg-[#111111] hover:bg-neutral-800 text-white text-xs font-semibold tracking-wider uppercase rounded-xs transition-colors flex items-center justify-center gap-2 group cursor-pointer shadow-xs"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>256-Bit Encrypted & Insured Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
