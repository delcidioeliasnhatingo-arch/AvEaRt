import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useShop();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubscribed(true);
    showToast('Subscribed! Welcome to AVEART Priority Access.');
  };

  return (
    <section className="bg-[#111111] text-white py-20 lg:py-28 border-b border-[#222222]">
      <div className="w-full px-4 sm:px-8 lg:px-12 text-center">
        <span className="text-xs font-bold tracking-[0.25em] text-neutral-400 uppercase block mb-4">
          EXCLUSIVE COMMUNIQUÉ
        </span>

        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 uppercase">
          STAY IN THE GAME
        </h2>

        <p className="text-base sm:text-lg text-neutral-300 max-w-xl mx-auto mb-10 font-normal leading-relaxed">
          Get updates about new gaming gear, launches and exclusive offers. No spam. Only
          hardware drops and firmware updates.
        </p>

        {isSubscribed ? (
          <div className="inline-flex items-center gap-3 bg-neutral-900 border border-neutral-700 px-6 py-3.5 rounded-xs text-sm text-neutral-200">
            <Check className="w-5 h-5 text-emerald-400" />
            <span>You're enrolled. Check your inbox for your 10% welcome privilege code.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full sm:flex-1 text-xs px-5 py-4 bg-neutral-900 border border-neutral-700 text-white placeholder:text-neutral-500 rounded-xs focus:outline-hidden focus:border-white transition-colors"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 bg-white text-[#111111] text-xs font-semibold tracking-wider uppercase rounded-xs hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>SUBSCRIBE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="mt-8 text-xs text-neutral-400">
          <span>By subscribing, you agree to our Privacy Policy and Terms of Service.</span>
        </div>
      </div>
    </section>
  );
};
