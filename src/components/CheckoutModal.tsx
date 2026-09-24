import React, { useState } from 'react';
import { X, Check, ShieldCheck, CreditCard, Apple, Banknote, ArrowRight, Truck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { OrderCustomerInfo, PlacedOrder } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    shipping,
    discount,
    total,
    placeOrder,
  } = useShop();

  const [step, setStep] = useState<'form' | 'confirmation'>('form');
  const [confirmedOrder, setConfirmedOrder] = useState<PlacedOrder | null>(null);

  const [customerInfo, setCustomerInfo] = useState<OrderCustomerInfo>({
    name: 'Alexander Grey',
    email: 'alex.grey@example.com',
    phone: '+1 (555) 349-1029',
    address: '742 Evergreen Terrace',
    city: 'Portland',
    postalCode: '97201',
    country: 'United States',
    paymentMethod: 'card',
  });

  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvc, setCardCvc] = useState('888');

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    const newOrder = placeOrder(customerInfo);
    setConfirmedOrder(newOrder);
    setStep('confirmation');
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('form');
    setConfirmedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-3xl my-6 rounded-xs shadow-2xl border border-[#E5E5E5] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5] bg-white">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 bg-[#111111] text-white flex items-center justify-center font-bold text-[10px]">
              A
            </span>
            <span className="font-display text-sm font-bold tracking-tight text-[#111111] uppercase">
              AVEART · SECURE CHECKOUT
            </span>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 text-neutral-400 hover:text-black rounded-xs hover:bg-[#F6F6F6] transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 md:grid-cols-12">
            {/* Left: Shipping & Payment details */}
            <div className="md:col-span-7 p-6 sm:p-8 space-y-6 border-b md:border-b-0 md:border-r border-[#E5E5E5]">
              {/* Customer Contact */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
                  01. Contact & Dispatch Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      required
                      value={customerInfo.name}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, name: e.target.value })
                      }
                      className="w-full text-xs p-2.5 border border-[#E5E5E5] rounded-xs bg-[#FBFBFB] focus:outline-hidden focus:border-black"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={customerInfo.email}
                        onChange={(e) =>
                          setCustomerInfo({ ...customerInfo, email: e.target.value })
                        }
                        className="w-full text-xs p-2.5 border border-[#E5E5E5] rounded-xs bg-[#FBFBFB] focus:outline-hidden focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                        Phone (for courier tracking)
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerInfo.phone}
                        onChange={(e) =>
                          setCustomerInfo({ ...customerInfo, phone: e.target.value })
                        }
                        className="w-full text-xs p-2.5 border border-[#E5E5E5] rounded-xs bg-[#FBFBFB] focus:outline-hidden focus:border-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={customerInfo.address}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, address: e.target.value })
                      }
                      className="w-full text-xs p-2.5 border border-[#E5E5E5] rounded-xs bg-[#FBFBFB] focus:outline-hidden focus:border-black"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={customerInfo.city}
                        onChange={(e) =>
                          setCustomerInfo({ ...customerInfo, city: e.target.value })
                        }
                        className="w-full text-xs p-2.5 border border-[#E5E5E5] rounded-xs bg-[#FBFBFB] focus:outline-hidden focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        required
                        value={customerInfo.postalCode}
                        onChange={(e) =>
                          setCustomerInfo({ ...customerInfo, postalCode: e.target.value })
                        }
                        className="w-full text-xs p-2.5 border border-[#E5E5E5] rounded-xs bg-[#FBFBFB] focus:outline-hidden focus:border-black"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        required
                        value={customerInfo.country}
                        onChange={(e) =>
                          setCustomerInfo({ ...customerInfo, country: e.target.value })
                        }
                        className="w-full text-xs p-2.5 border border-[#E5E5E5] rounded-xs bg-[#FBFBFB] focus:outline-hidden focus:border-black"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
                  02. Payment Selection
                </h3>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setCustomerInfo({ ...customerInfo, paymentMethod: 'card' })}
                    className={`p-3 border rounded-xs flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      customerInfo.paymentMethod === 'card'
                        ? 'bg-[#111111] text-white border-[#111111]'
                        : 'bg-[#FBFBFB] text-neutral-700 border-[#E5E5E5] hover:border-black'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider">
                      Credit Card
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setCustomerInfo({ ...customerInfo, paymentMethod: 'apple_pay' })
                    }
                    className={`p-3 border rounded-xs flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      customerInfo.paymentMethod === 'apple_pay'
                        ? 'bg-[#111111] text-white border-[#111111]'
                        : 'bg-[#FBFBFB] text-neutral-700 border-[#E5E5E5] hover:border-black'
                    }`}
                  >
                    <Apple className="w-4 h-4" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider">
                      Apple Pay
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCustomerInfo({ ...customerInfo, paymentMethod: 'cod' })}
                    className={`p-3 border rounded-xs flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      customerInfo.paymentMethod === 'cod'
                        ? 'bg-[#111111] text-white border-[#111111]'
                        : 'bg-[#FBFBFB] text-neutral-700 border-[#E5E5E5] hover:border-black'
                    }`}
                  >
                    <Banknote className="w-4 h-4" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider">
                      Pay on Delivery
                    </span>
                  </button>
                </div>

                {customerInfo.paymentMethod === 'card' && (
                  <div className="bg-[#FBFBFB] p-3.5 border border-[#E5E5E5] rounded-xs space-y-3">
                    <div>
                      <label className="block text-[10px] text-neutral-500 mb-1 uppercase font-bold">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full text-xs p-2 border border-[#E5E5E5] bg-white rounded-xs focus:outline-hidden font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-neutral-500 mb-1 uppercase font-bold">
                          Expiration
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full text-xs p-2 border border-[#E5E5E5] bg-white rounded-xs focus:outline-hidden font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-neutral-500 mb-1 uppercase font-bold">
                          CVC
                        </label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full text-xs p-2 border border-[#E5E5E5] bg-white rounded-xs focus:outline-hidden font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {customerInfo.paymentMethod === 'cod' && (
                  <div className="bg-neutral-50 p-3.5 border border-neutral-200 text-xs text-neutral-600 rounded-xs">
                    Pay securely upon delivery by cash or mobile terminal. Free courier verification is enabled.
                  </div>
                )}
              </div>
            </div>

            {/* Right: Order Summary & Place Order */}
            <div className="md:col-span-5 p-6 sm:p-8 bg-[#FBFBFB] flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-4">
                  Order Summary ({cart.length} unique items)
                </h3>

                {/* Items preview */}
                <div className="space-y-3 max-h-56 overflow-y-auto pr-1 mb-6 divide-y divide-neutral-200">
                  {cart.map((item, idx) => (
                    <div key={idx} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                      <div className="min-w-0 pr-2">
                        <span className="font-semibold text-black truncate block">
                          {item.quantity}x {item.product.name}
                        </span>
                        {item.selectedVariant && (
                          <span className="text-[10px] text-neutral-500 block">
                            {item.selectedVariant}
                          </span>
                        )}
                      </div>
                      <span className="font-bold tabular-nums text-black shrink-0">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Financial breakdown */}
                <div className="space-y-2 text-xs text-[#666666] pt-4 border-t border-[#E5E5E5]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-black tabular-nums">
                      ${subtotal.toLocaleString()}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Discount</span>
                      <span className="font-semibold tabular-nums">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Express Insured Shipping</span>
                    <span className="font-semibold text-black tabular-nums">
                      {shipping === 0 ? 'COMPLIMENTARY' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-black pt-3 border-t border-[#E5E5E5]">
                    <span>Total Due</span>
                    <span className="tabular-nums">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#111111] hover:bg-neutral-800 text-white text-xs font-semibold tracking-wider uppercase rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>AUTHORIZE & PLACE ORDER</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>30-Day Money Back Guarantee</span>
                </div>
              </div>
            </div>
          </form>
        ) : (
          /* Confirmation State */
          <div className="p-8 sm:p-12 text-center max-w-xl mx-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-emerald-700 block mb-1">
                ORDER SUCCESSFUL
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] uppercase">
                Order #{confirmedOrder?.id} Confirmed
              </h3>
              <p className="text-sm text-[#666666] mt-2">
                We have received your order. Hardware is currently undergoing optical inspection and
                packaging in our climate-controlled facility.
              </p>
            </div>

            <div className="p-4 bg-[#FBFBFB] border border-[#E5E5E5] rounded-xs text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-500">Destination:</span>
                <span className="font-semibold text-black">
                  {confirmedOrder?.customer.address}, {confirmedOrder?.customer.city}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Estimated Dispatch Arrival:</span>
                <span className="font-semibold text-black">
                  {confirmedOrder?.estimatedDelivery}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Confirmation Sent To:</span>
                <span className="font-semibold text-black">
                  {confirmedOrder?.customer.email}
                </span>
              </div>
              <div className="flex justify-between border-t border-[#E5E5E5] pt-2 font-bold text-sm">
                <span>Total Paid:</span>
                <span className="tabular-nums">${confirmedOrder?.total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3.5 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Back to Catalog
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
