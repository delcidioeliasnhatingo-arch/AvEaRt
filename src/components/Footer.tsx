import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCategory } from '../types';

export const Footer: React.FC = () => {
  const { setCategoryFilter, setIsAccountOpen } = useShop();

  const handleCategoryClick = (cat: ProductCategory) => {
    setCategoryFilter(cat);
    const el = document.getElementById('featured-products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-[#111111] text-white pt-16 pb-12 border-t border-[#222222]">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-16 border-b border-[#262626]">
          {/* Column 1: Shop */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white mb-5">
              Shop
            </h4>
            <ul className="space-y-3 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => handleCategoryClick('Gaming PCs')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Custom Gaming PCs
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Monitors')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  OLED & Fast-IPS Monitors
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Keyboards')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Mechanical Keyboards
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Mice')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Ultralight Wireless Mice
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Headsets')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Planar Gaming Headsets
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Accessories')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Desk Mats & Cable Systems
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white mb-5">
              Support
            </h4>
            <ul className="space-y-3 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => setIsAccountOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Track Order Status
                </button>
              </li>
              <li>
                <a href="#support" className="hover:text-white transition-colors">
                  Warranty & Replacements
                </a>
              </li>
              <li>
                <a href="#support" className="hover:text-white transition-colors">
                  Firmware & Configurator
                </a>
              </li>
              <li>
                <a href="#support" className="hover:text-white transition-colors">
                  Shipping & Return Policy
                </a>
              </li>
              <li>
                <a href="#support" className="hover:text-white transition-colors">
                  Contact Technical Concierge
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: About */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white mb-5">
              About
            </h4>
            <ul className="space-y-3 text-xs text-neutral-400">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Our Design Philosophy
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Acoustic & Thermal Labs
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Esports Athlete Partners
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Sustainable Sourcing
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Engineering Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Information */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white mb-5">
              Information
            </h4>
            <ul className="space-y-3 text-xs text-neutral-400">
              <li>
                <a href="#terms" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#cookies" className="hover:text-white transition-colors">
                  Cookie Preferences
                </a>
              </li>
              <li>
                <a href="#compliance" className="hover:text-white transition-colors">
                  Regulatory Compliance
                </a>
              </li>
              <li>
                <a href="#security" className="hover:text-white transition-colors">
                  Security Disclosures
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Social */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white mb-5">
              Social
            </h4>
            <ul className="space-y-3 text-xs text-neutral-400">
              <li>
                <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  X / Twitter
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  YouTube Lab Reviews
                </a>
              </li>
              <li>
                <a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Discord Community
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Instagram Workspaces
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Open Firmware (GitHub)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Brand Mark */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-3">
            <span className="w-5 h-5 bg-white text-black font-bold text-[11px] flex items-center justify-center">
              A
            </span>
            <span className="font-display font-bold tracking-wider text-white">
              AVEART GAMING HARDWARE
            </span>
            <span>·</span>
            <span>All rights reserved © 2026</span>
          </div>

          <div className="flex items-center gap-6 text-neutral-400">
            <span>Nordic Engineering</span>
            <span>·</span>
            <span>Clean Architecture</span>
            <span>·</span>
            <span>Esports Calibrated</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
