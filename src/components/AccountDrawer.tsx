import React, { useState } from 'react';
import { X, Package, MapPin, Shield, User, Clock, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AccountDrawer: React.FC = () => {
  const { isAccountOpen, setIsAccountOpen, placedOrders } = useShop();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'warranty'>('orders');

  if (!isAccountOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsAccountOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#E5E5E5] flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-250">
          {/* Header */}
          <div className="p-6 border-b border-[#E5E5E5] flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-xs tracking-wider">
                AVT
              </div>
              <div>
                <h2 className="font-display text-sm font-bold tracking-tight text-[#111111] uppercase">
                  Alexander Grey
                </h2>
                <span className="text-[11px] text-neutral-500">Tier: Priority Esports Member</span>
              </div>
            </div>

            <button
              onClick={() => setIsAccountOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-black rounded-xs hover:bg-[#F6F6F6] transition-colors cursor-pointer"
              aria-label="Close account panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center border-b border-[#E5E5E5] bg-[#FBFBFB] px-6 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-3 mr-6 border-b-2 cursor-pointer transition-colors ${
                activeTab === 'orders'
                  ? 'border-[#111111] text-[#111111]'
                  : 'border-transparent text-neutral-500 hover:text-black'
              }`}
            >
              Orders ({placedOrders.length})
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-3 mr-6 border-b-2 cursor-pointer transition-colors ${
                activeTab === 'profile'
                  ? 'border-[#111111] text-[#111111]'
                  : 'border-transparent text-neutral-500 hover:text-black'
              }`}
            >
              Saved Addresses
            </button>
            <button
              onClick={() => setActiveTab('warranty')}
              className={`py-3 border-b-2 cursor-pointer transition-colors ${
                activeTab === 'warranty'
                  ? 'border-[#111111] text-[#111111]'
                  : 'border-transparent text-neutral-500 hover:text-black'
              }`}
            >
              Warranty & Service
            </button>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {activeTab === 'orders' && (
              <div className="space-y-4">
                {placedOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 border border-[#E5E5E5] rounded-xs bg-[#FBFBFB] space-y-3"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-[#E5E5E5] text-xs">
                      <div>
                        <span className="font-bold text-[#111111]">{order.id}</span>
                        <div className="text-[11px] text-neutral-500">{order.date}</div>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {order.status}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <span className="text-neutral-800 truncate max-w-[220px]">
                            {item.quantity}x {item.product.name}
                          </span>
                          <span className="tabular-nums font-semibold text-black">
                            ${(item.product.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-[#E5E5E5] flex items-center justify-between text-xs font-bold text-[#111111]">
                      <span>Order Total</span>
                      <span className="tabular-nums">${order.total.toFixed(2)}</span>
                    </div>

                    <div className="text-[11px] text-neutral-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-neutral-400" />
                      <span>Estimated Arrival: {order.estimatedDelivery}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-4">
                <div className="p-4 border border-[#E5E5E5] rounded-xs bg-white space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#111111]">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-neutral-700" />
                      Primary Dispatch Address
                    </span>
                    <span className="text-[10px] text-neutral-400 uppercase tracking-widest">
                      DEFAULT
                    </span>
                  </div>
                  <div className="text-xs text-[#666666] leading-relaxed">
                    Alexander Grey<br />
                    742 Evergreen Terrace<br />
                    Portland, OR 97201<br />
                    United States<br />
                    +1 (555) 349-1029
                  </div>
                </div>

                <div className="p-4 border border-dashed border-[#E5E5E5] rounded-xs text-center py-6">
                  <button className="text-xs font-semibold text-[#111111] hover:underline cursor-pointer">
                    + Add New Secondary Address
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'warranty' && (
              <div className="space-y-4 text-xs text-[#666666]">
                <div className="p-4 border border-[#E5E5E5] rounded-xs bg-white space-y-2">
                  <div className="flex items-center gap-2 text-black font-bold text-xs uppercase tracking-wide">
                    <Shield className="w-4 h-4" />
                    <span>2-Year Full Hardware Coverage</span>
                  </div>
                  <p className="leading-relaxed">
                    All AVEART systems, OLED panels, and mechanical components are backed by zero-cost repair or advance component replacement.
                  </p>
                </div>

                <div className="bg-[#FBFBFB] p-4 border border-[#E5E5E5] rounded-xs space-y-2">
                  <span className="font-semibold text-black block">Need Technical Concierge?</span>
                  <p>Direct priority support channel active Monday–Sunday, 24/7 for calibrated tournament gear.</p>
                  <span className="font-mono text-black font-bold block pt-1">concierge@aveart.tech</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-[#E5E5E5] bg-[#FBFBFB] flex items-center justify-between text-xs text-neutral-500">
            <span>Client ID: AVT-USR-4901</span>
            <button
              onClick={() => setIsAccountOpen(false)}
              className="text-black font-semibold hover:underline cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
