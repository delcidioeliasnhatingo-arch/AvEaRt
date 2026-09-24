import React from 'react';
import { useShop } from '../context/ShopContext';
import { Check } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toastMessage } = useShop();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className="bg-[#111111] text-white text-xs font-semibold px-4 py-3 rounded-xs shadow-xl border border-[#333333] flex items-center gap-2.5">
        <span className="w-4 h-4 rounded-full bg-white text-black flex items-center justify-center shrink-0">
          <Check className="w-2.5 h-2.5 stroke-[3]" />
        </span>
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
