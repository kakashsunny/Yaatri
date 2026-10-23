import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sun, 
  Sunrise, 
  Sunset, 
  Moon, 
  Clock, 
  Navigation,
  Sparkles,
  MapPin
} from 'lucide-react';
import { LocationItem } from '../types/itinerary.ts';

export interface TimelineScrubberProps {
  locations: LocationItem[];
  lang: 'en' | 'kn';
  activeLocationIndex: number;
  onSelectLocationIndex: (index: number) => void;
  onTimeOfDayChange?: (timeOfDay: 'morning' | 'midday' | 'afternoon' | 'sunset' | 'night') => void;
}

interface TimePhase {
  id: 'morning' | 'midday' | 'afternoon' | 'sunset' | 'night';
  timeStr: string;
  labelEn: string;
  labelKn: string;
  icon: typeof Sunrise;
  color: string;
  ambientGradient: string;
}

const timePhases: TimePhase[] = [
  {
    id: 'morning',
    timeStr: '08:00 AM',
    labelEn: 'Morning Dawn & Cool Breeze',
    labelKn: 'ಮುಂಜಾನೆಯ ತಂಗಾಳಿ & ದರ್ಶನ',
    icon: Sunrise,
    color: '#FFB703',
    ambientGradient: 'from-amber-500/20 via-orange-950/20 to-transparent'
  },
  {
    id: 'midday',
    timeStr: '11:30 AM',
    labelEn: 'Midday Exploration & Architecture',
    labelKn: 'ಮಧ್ಯಾಹ್ನದ ಶಿಲ್ಪಕಲೆ & ಅನ್ವೇಷಣೆ',
    icon: Sun,
    color: '#FFD60A',
    ambientGradient: 'from-yellow-500/15 via-amber-950/20 to-transparent'
  },
  {
    id: 'afternoon',
    timeStr: '03:30 PM',
    labelEn: 'Afternoon Heritage & Shaded Trails',
    labelKn: 'ಮಧ್ಯಾಹ್ನ ನಂತರದ ಐತಿಹಾಸಿಕ ಪಯಣ',
    icon: Sun,
    color: '#FB8500',
    ambientGradient: 'from-orange-500/15 via-red-950/20 to-transparent'
  },
  {
    id: 'sunset',
    timeStr: '06:00 PM',
    labelEn: 'Golden Hour Sunset & Panoramas',
    labelKn: 'ಸಂಜೆಯ ಚಿನ್ನದ ಬಣ್ಣದ ಸೂರ್ಯಾಸ್ತ',
    icon: Sunset,
    color: '#E85D04',
    ambientGradient: 'from-rose-500/25 via-purple-950/20 to-transparent'
  },
  {
    id: 'night',
    timeStr: '08:30 PM',
    labelEn: 'Night Illumination & Food Street',
    labelKn: 'ರಾತ್ರಿಯ ಬೆಳಕಿನ ವೈಭವ & ರುಚಿ',
    icon: Moon,
    color: '#8338EC',
    ambientGradient: 'from-indigo-600/20 via-slate-950/30 to-transparent'
  }
];

export const TimelineScrubber: React.FC<TimelineScrubberProps> = ({
  locations,
  lang,
  activeLocationIndex,
  onSelectLocationIndex,
  onTimeOfDayChange
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const totalLocations = Math.max(locations.length, 1);

  // Map active index to time phase
  const phaseIndex = Math.min(
    Math.floor((activeLocationIndex / Math.max(totalLocations, 1)) * timePhases.length),
    timePhases.length - 1
  );
  const currentPhase = timePhases[phaseIndex] || timePhases[0];

  useEffect(() => {
    onTimeOfDayChange?.(currentPhase.id);
  }, [phaseIndex, onTimeOfDayChange, currentPhase.id]);

  const activeIndexRef = useRef(activeLocationIndex);
  activeIndexRef.current = activeLocationIndex;

  // Auto-play simulation loop
  useEffect(() => {
    let interval: any;
    if (isPlaying && totalLocations > 1) {
      interval = setInterval(() => {
        const next = (activeIndexRef.current + 1) % totalLocations;
        onSelectLocationIndex(next);
      }, 3200);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalLocations, onSelectLocationIndex]);

  const CurrentIcon = currentPhase.icon;
  const activeLocation = locations[activeLocationIndex] || locations[0];

  return (
    <div className="relative rounded-2xl bg-[#13131A] border border-[#E85D04]/30 p-4 sm:p-5 shadow-2xl shadow-black/80 overflow-hidden">
      {/* Dynamic ambient backlight based on time phase */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r ${currentPhase.ambientGradient} pointer-events-none transition-all duration-700 opacity-75`}
      />

      <div className="relative z-10 space-y-4">
        {/* Header: Scrubber Title & Current Time Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div 
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors shadow-md"
              style={{ backgroundColor: `${currentPhase.color}25`, border: `1px solid ${currentPhase.color}60` }}
            >
              <CurrentIcon className="w-5 h-5 transition-transform duration-300" style={{ color: currentPhase.color }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  {lang === 'kn' ? 'ಸಮಯದ ಟೈಮ್‌ಲೈನ್ ಸ್ಕ್ರಬ್ಬರ್' : 'Interactive Time-of-Day Scrubber'}
                </span>
                <span 
                  className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wider uppercase border"
                  style={{ 
                    color: currentPhase.color, 
                    backgroundColor: `${currentPhase.color}15`,
                    borderColor: `${currentPhase.color}40`
                  }}
                >
                  {currentPhase.timeStr}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                {lang === 'kn' ? currentPhase.labelKn : currentPhase.labelEn}
              </p>
            </div>
          </div>

          {/* Controls: Play/Pause simulation */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#E85D04] border border-white/20 hover:border-[#E85D04] text-xs font-semibold text-white transition-all shadow cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>{lang === 'kn' ? 'ವಿರಾಮ' : 'Pause Tour'}</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{lang === 'kn' ? 'ದಿನದ ಪ್ರವಾಸ ಸಿಮ್ಯುಲೇಶನ್' : 'Simulate Day'}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                onSelectLocationIndex(0);
              }}
              title={lang === 'kn' ? 'ಆರಂಭಕ್ಕೆ ಮರಳಿ' : 'Reset to start of day'}
              className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Interactive Slider Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium">
            <span>07:00 AM (Sunrise)</span>
            <span className="text-[#FFD60A] font-semibold">
              {lang === 'kn' ? `ನಿಲ್ದಾಣ ${activeLocationIndex + 1} / ${totalLocations}` : `Stop ${activeLocationIndex + 1} of ${totalLocations}`}
            </span>
            <span>10:00 PM (Night Lights)</span>
          </div>

          <div className="relative flex items-center">
            <input
              type="range"
              min={0}
              max={totalLocations - 1}
              step={1}
              value={activeLocationIndex}
              onChange={(e) => {
                setIsPlaying(false);
                onSelectLocationIndex(Number(e.target.value));
              }}
              className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#E85D04] focus:outline-none"
            />
          </div>

          {/* Stops Markers Row */}
          <div className="flex justify-between items-center pt-1 px-1">
            {locations.map((loc, idx) => {
              const isSelected = idx === activeLocationIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setIsPlaying(false);
                    onSelectLocationIndex(idx);
                  }}
                  className={`flex flex-col items-center gap-1 group/pin cursor-pointer transition-transform ${
                    isSelected ? 'scale-110' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <div 
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold font-mono transition-all ${
                      isSelected 
                        ? 'bg-[#E85D04] text-white shadow-lg shadow-[#E85D04]/60 ring-2 ring-[#FFD60A]' 
                        : 'bg-slate-800 text-slate-300 border border-white/20'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span className="text-[10px] text-slate-300 max-w-[65px] truncate text-center hidden sm:block">
                    {lang === 'kn' ? (loc.name_kannada || loc.name) : loc.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Selected Location Spotlight Bar */}
        {activeLocation && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#E85D04]/20 border border-[#E85D04]/40 flex items-center justify-center text-[#E85D04] shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">
                  {lang === 'kn' ? (activeLocation.name_kannada || activeLocation.name) : activeLocation.name}
                </div>
                <div className="text-[11px] text-slate-400 truncate">
                  {lang === 'kn' ? activeLocation.description_kannada : activeLocation.description}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 text-xs">
              <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 font-mono">
                ~{activeLocation.duration_hours || 2}h stop
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#E85D04]/10 border border-[#E85D04]/30 text-[#FFD60A] font-semibold">
                Map Focused 📍
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
