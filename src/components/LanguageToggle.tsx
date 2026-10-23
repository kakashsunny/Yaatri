import React from 'react';
import { Languages } from 'lucide-react';

interface LanguageToggleProps {
  currentLang: 'en' | 'kn';
  onToggle: (lang: 'en' | 'kn') => void;
  floating?: boolean;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLang, onToggle, floating = false }) => {
  return (
    <div
      className={`${
        floating
          ? 'fixed bottom-6 right-6 z-50 shadow-2xl shadow-black/80'
          : 'inline-flex'
      }`}
    >
      <div className="flex items-center gap-1.5 p-1 bg-[#13131A]/90 backdrop-blur-md border border-[#E85D04]/30 rounded-full text-xs font-semibold">
        <div className="flex items-center justify-center pl-2 pr-1 text-[#FFD60A]">
          <Languages className="w-3.5 h-3.5" />
        </div>
        <button
          type="button"
          onClick={() => onToggle('en')}
          className={`px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
            currentLang === 'en'
              ? 'bg-[#E85D04] text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          English
        </button>
        <button
          type="button"
          onClick={() => onToggle('kn')}
          className={`px-3 py-1.5 rounded-full font-kannada transition-all duration-200 cursor-pointer ${
            currentLang === 'kn'
              ? 'bg-[#E85D04] text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          ಕನ್ನಡ
        </button>
      </div>
    </div>
  );
};
