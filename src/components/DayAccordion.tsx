import React, { useState } from 'react';
import { Utensils, IndianRupee, MapPin, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { ItineraryDay } from '../types/itinerary.ts';
import { LocationCard } from './LocationCard.tsx';

interface DayAccordionProps {
  day: ItineraryDay;
  lang: 'en' | 'kn';
  isDefaultOpen?: boolean;
}

export const DayAccordion: React.FC<DayAccordionProps> = ({ day, lang, isDefaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(isDefaultOpen);

  return (
    <div className="rounded-2xl bg-[#13131A]/90 border border-white/10 hover:border-[#E85D04]/40 transition-all duration-300 overflow-hidden shadow-xl shadow-black/50">
      {/* Header Bar */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left bg-gradient-to-r from-white/[0.03] to-transparent hover:bg-white/[0.06] transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E85D04] to-[#B03E00] flex flex-col items-center justify-center text-white shrink-0 shadow-md shadow-[#E85D04]/30">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFD60A]">
              {lang === 'kn' ? 'ದಿನ' : 'Day'}
            </span>
            <span className="text-lg font-black leading-none">{day.day}</span>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">
              {lang === 'kn' && day.theme_kannada ? day.theme_kannada : day.theme}
            </h3>
            {day.theme_kannada && lang === 'en' && (
              <p className="text-xs font-kannada text-[#E85D04]">{day.theme_kannada}</p>
            )}
            <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#E85D04]" />
                <span>{day.locations.length} {lang === 'kn' ? 'ಆಕರ್ಷಣೆಗಳು' : 'Attractions'}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <IndianRupee className="w-3 h-3 text-[#FFD60A]" />
                <span className="tabular-nums">Est. ₹{day.estimated_daily_budget_inr}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </button>

      {/* Body Content */}
      {isOpen && (
        <div className="p-5 pt-2 space-y-5 border-t border-white/5">
          {/* Location Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {day.locations.map((loc, idx) => (
              <LocationCard key={`${loc.name}-${idx}`} location={loc} lang={lang} index={idx} />
            ))}
          </div>

          {/* Daily Food Recommendation Card */}
          {(day.food_recommendation || day.food_recommendation_kannada) && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-[#E85D04]/10 to-transparent border border-amber-500/25 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-[#FFD60A] flex items-center justify-center shrink-0 mt-0.5">
                <Utensils className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FFD60A]">
                    {lang === 'kn' ? 'ದಿನದ ಆಹಾರ ಶಿಫಾರಸು' : "Today's Regional Food Highlight"}
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-200">
                  {lang === 'kn' && day.food_recommendation_kannada
                    ? day.food_recommendation_kannada
                    : day.food_recommendation}
                </p>
                {lang === 'en' && day.food_recommendation_kannada && (
                  <p className="text-xs font-kannada text-slate-400">
                    {day.food_recommendation_kannada}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
