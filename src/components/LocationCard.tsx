import React, { useState } from 'react';
import { Clock, IndianRupee, Lightbulb, MapPin, ChevronDown, ChevronUp, Compass } from 'lucide-react';
import { LocationItem, PlaceType } from '../types/itinerary.ts';

interface LocationCardProps {
  location: LocationItem;
  lang: 'en' | 'kn';
  index: number;
}

const typeStyles: Record<PlaceType, { labelEn: string; labelKn: string; badgeClass: string }> = {
  temple: {
    labelEn: 'Temple & Spiritual',
    labelKn: 'ದೇವಸ್ಥಾನ & ಆಧ್ಯಾತ್ಮಿಕ',
    badgeClass: 'bg-amber-500/15 text-amber-300 border-amber-500/30'
  },
  nature: {
    labelEn: 'Nature & Forest',
    labelKn: 'ನಿಸರ್ಗ & ವನ್ಯಧಾಮ',
    badgeClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
  },
  adventure: {
    labelEn: 'Adventure & Trek',
    labelKn: 'ಸಾಹಸ & ಚಾರಣ',
    badgeClass: 'bg-rose-500/15 text-rose-300 border-rose-500/30'
  },
  heritage: {
    labelEn: 'Heritage & Ruins',
    labelKn: 'ಪರಂಪರೆ & ಸ್ಮಾರಕ',
    badgeClass: 'bg-orange-500/15 text-orange-300 border-orange-500/30'
  },
  food: {
    labelEn: 'Food & Culinary',
    labelKn: 'ಆಹಾರ & ರುಚಿ',
    badgeClass: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30'
  },
  shopping: {
    labelEn: 'Market & Craft',
    labelKn: 'ಮಾರುಕಟ್ಟೆ & ಕರಕುಶಲ',
    badgeClass: 'bg-purple-500/15 text-purple-300 border-purple-500/30'
  },
  beach: {
    labelEn: 'Coastal & Beach',
    labelKn: 'ಕಡಲತೀರ & ಬೀಚ್',
    badgeClass: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
  },
  waterfall: {
    labelEn: 'Waterfall & Valley',
    labelKn: 'ಜಲಪಾತ & ಕಣಿವೆ',
    badgeClass: 'bg-blue-500/15 text-blue-300 border-blue-500/30'
  }
};

export const LocationCard: React.FC<LocationCardProps> = ({ location, lang, index }) => {
  const [showTip, setShowTip] = useState(false);

  const typeConfig = typeStyles[location.type] || typeStyles.heritage;

  return (
    <div className="group relative rounded-2xl bg-[#13131A] border border-[#E85D04]/20 hover:border-[#E85D04]/50 shadow-lg shadow-black/40 hover:shadow-2xl hover:shadow-[#E85D04]/10 transition-all duration-300 overflow-hidden flex flex-col justify-between">
      {/* Saffron left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#E85D04] via-[#FFD60A] to-[#E85D04]/40" />

      <div className="p-5 pl-6 space-y-3">
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#E85D04]/20 text-[#FFD60A] text-xs font-bold flex items-center justify-center shrink-0">
                {index + 1}
              </span>
              <h4 className="text-lg font-bold text-white group-hover:text-[#FFD60A] transition-colors">
                {location.name}
              </h4>
            </div>
            {location.name_kannada && (
              <p className="text-sm font-semibold font-kannada text-[#E85D04]/90 pl-7">
                {location.name_kannada}
              </p>
            )}
          </div>

          <span
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-full border shrink-0 ${typeConfig.badgeClass}`}
          >
            {lang === 'kn' ? typeConfig.labelKn : typeConfig.labelEn}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 leading-relaxed pl-7">
          {lang === 'kn' && location.description_kannada
            ? location.description_kannada
            : location.description}
        </p>

        {/* Tip Toggle Box */}
        {(location.tip || location.tip_kannada) && (
          <div className="pl-7 pt-1">
            <button
              type="button"
              onClick={() => setShowTip(!showTip)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#FFD60A] hover:text-white transition-colors cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5 text-[#FFD60A]" />
              <span>{lang === 'kn' ? 'ಸ್ಥಳೀಯ ಸಲಹೆ' : 'Insider Tip'}</span>
              {showTip ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showTip && (
              <div className="mt-2 p-3 rounded-xl bg-[#0A0A0F]/80 border border-[#FFD60A]/20 text-xs text-amber-100/90 leading-relaxed transition-all">
                {lang === 'kn' && location.tip_kannada ? location.tip_kannada : location.tip}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Metrics Bar */}
      <div className="px-6 py-3 bg-[#0D0D12] border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#E85D04]" />
          <span className="font-medium text-slate-200">
            {location.duration_hours} {lang === 'kn' ? 'ಗಂಟೆಗಳು' : 'hrs'}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <IndianRupee className="w-3.5 h-3.5 text-[#FFD60A]" />
          <span className="font-semibold text-slate-200 tabular-nums">
            {location.estimated_cost_inr === 0 
              ? (lang === 'kn' ? 'ಉಚಿತ ಪ್ರವೇಶ' : 'Free Entry') 
              : `₹${location.estimated_cost_inr}`}
          </span>
        </div>

        {location.lat && location.lng && (
          <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
            <MapPin className="w-3 h-3 text-[#E85D04]/70" />
            <span>{location.lat.toFixed(2)}°, {location.lng.toFixed(2)}°</span>
          </div>
        )}
      </div>
    </div>
  );
};
