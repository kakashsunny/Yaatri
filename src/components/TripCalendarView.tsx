import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Utensils, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ItineraryResponse, ItineraryDay } from '../types/itinerary.ts';

interface TripCalendarViewProps {
  itinerary: ItineraryResponse;
  lang: 'en' | 'kn';
  selectedDay: number | 'all';
  onSelectDay: (day: number) => void;
}

const MONTH_NAMES_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MONTH_NAMES_KN = [
  'ಜನವರಿ', 'ಫೆಬ್ರವರಿ', 'ಮಾರ್ಚ್', 'ಏಪ್ರಿಲ್', 'ಮೇ', 'ಜೂನ್',
  'ಜುಲೈ', 'ಆಗಸ್ಟ್', 'ಸೆಪ್ಟೆಂಬರ್', 'ಅಕ್ಟೋಬರ್', 'ನವೆಂಬರ್', 'ಡಿಸೆಂಬರ್'
];

const WEEKDAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const WEEKDAYS_KN = ['ಭಾನು', 'ಸೋಮ', 'ಮಂಗಳ', 'ಬುಧ', 'ಗುರು', 'ಶುಕ್ರ', 'ಶನಿ'];

export const TripCalendarView: React.FC<TripCalendarViewProps> = ({
  itinerary,
  lang,
  selectedDay,
  onSelectDay,
}) => {
  // Set initial start date to upcoming weekend or tomorrow
  const [startDate, setStartDate] = useState<Date>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today;
  });

  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    const d = new Date(startDate);
    d.setDate(1);
    return d;
  });

  const [previewDay, setPreviewDay] = useState<number | null>(null);

  const numDays = itinerary.days.length;

  // Calculate trip dates map (key: "YYYY-M-D" -> ItineraryDay)
  const tripDatesMap = new Map<string, { dayIndex: number; dayData: ItineraryDay; isStart: boolean; isEnd: boolean }>();

  for (let i = 0; i < numDays; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    const dayData = itinerary.days[i];
    tripDatesMap.set(key, {
      dayIndex: i + 1,
      dayData,
      isStart: i === 0,
      isEnd: i === numDays - 1,
    });
  }

  // Month navigation
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Calendar math
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  // Shift trip start date when user clicks any calendar day
  const handleDayClick = (clickedDate: Date, associatedTripDay?: number) => {
    if (associatedTripDay) {
      onSelectDay(associatedTripDay);
      setPreviewDay(associatedTripDay);
    } else {
      // Set as new start date
      setStartDate(clickedDate);
      onSelectDay(1);
      setPreviewDay(1);
    }
  };

  const activeDayData = previewDay 
    ? itinerary.days.find((d) => d.day === previewDay)
    : selectedDay !== 'all' 
      ? itinerary.days.find((d) => d.day === selectedDay)
      : itinerary.days[0];

  return (
    <div className="rounded-3xl bg-[#13131A] border border-[#E85D04]/30 p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E85D04]/20 border border-[#E85D04]/40 flex items-center justify-center text-[#FFD60A]">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <h3 className="text-xl font-bold text-white">
              {lang === 'kn' ? 'ಪ್ರವಾಸ ಕ್ಯಾಲೆಂಡರ್ ವೇಳಾಪಟ್ಟಿ' : 'Interactive Trip Calendar'}
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            {lang === 'kn'
              ? 'ಪ್ರವಾಸ ಆರಂಭವಾಗುವ ದಿನಾಂಕವನ್ನು ಆರಿಸಿ ಅಥವಾ ದಿನದ ವೇಳಾಪಟ್ಟಿ ನೋಡಲು ದಿನಾಂಕದ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ.'
              : 'Pick a start date or click any travel day to jump to its attractions and daily schedule.'}
          </p>
        </div>

        {/* Month Selector Buttons */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="text-sm font-bold text-[#FFD60A] min-w-[130px] text-center">
            {lang === 'kn' ? MONTH_NAMES_KN[month] : MONTH_NAMES_EN[month]} {year}
          </div>
          <div className="flex items-center gap-1 bg-[#0A0A0F] border border-white/10 rounded-xl p-1">
            <button
              type="button"
              onClick={prevMonth}
              className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextMonth}
              className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Calendar Grid (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 pb-2">
            {(lang === 'kn' ? WEEKDAYS_KN : WEEKDAYS_EN).map((w, idx) => (
              <div key={idx} className={idx === 0 || idx === 6 ? 'text-[#E85D04]' : ''}>
                {w}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {/* Previous month filler days */}
            {Array.from({ length: firstDayOfWeek }).map((_, idx) => {
              const dayNum = prevMonthDays - firstDayOfWeek + idx + 1;
              return (
                <div
                  key={`prev-${idx}`}
                  className="aspect-square rounded-xl bg-[#0A0A0F]/30 border border-white/5 flex items-center justify-center text-xs text-slate-600 select-none"
                >
                  {dayNum}
                </div>
              );
            })}

            {/* Current month days */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const dayNum = idx + 1;
              const dateObj = new Date(year, month, dayNum);
              const key = `${year}-${month}-${dayNum}`;
              const tripMatch = tripDatesMap.get(key);

              const isSelectedDay = tripMatch && tripMatch.dayIndex === selectedDay;

              return (
                <button
                  key={`day-${dayNum}`}
                  type="button"
                  onClick={() => handleDayClick(dateObj, tripMatch?.dayIndex)}
                  onMouseEnter={() => tripMatch && setPreviewDay(tripMatch.dayIndex)}
                  className={`relative aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    tripMatch
                      ? isSelectedDay
                        ? 'bg-[#E85D04] text-white border-2 border-[#FFD60A] shadow-lg shadow-[#E85D04]/50 scale-105 z-10'
                        : 'bg-[#E85D04]/30 hover:bg-[#E85D04]/50 text-white border border-[#E85D04]/60'
                      : 'bg-[#0A0A0F] hover:bg-white/5 border border-white/10 text-slate-300'
                  }`}
                >
                  <span className="tabular-nums">{dayNum}</span>

                  {tripMatch && (
                    <span className="text-[9px] font-extrabold uppercase text-[#FFD60A] mt-0.5 leading-none">
                      D{tripMatch.dayIndex}
                    </span>
                  )}

                  {tripMatch?.isStart && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#FFD60A] border-2 border-[#13131A]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Calendar Legend */}
          <div className="flex flex-wrap items-center gap-4 pt-3 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-[#E85D04] border border-[#FFD60A]" />
              <span>{lang === 'kn' ? 'ಪ್ರವಾಸದ ದಿನಗಳು' : 'Scheduled Trip Days'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFD60A]" />
              <span>{lang === 'kn' ? 'ಪ್ರಾರಂಭದ ದಿನಾಂಕ' : 'Start Date (Click to shift)'}</span>
            </div>
          </div>
        </div>

        {/* Day Preview Card on Right */}
        <div className="lg:col-span-5 bg-[#0A0A0F]/80 border border-white/10 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-[#E85D04]/20 border border-[#E85D04]/40 text-xs font-bold text-[#FFD60A]">
                {lang === 'kn' ? `ದಿನ ${activeDayData?.day || 1}` : `Day ${activeDayData?.day || 1}`}
              </span>
              <span className="text-xs text-slate-400">
                {new Date(startDate.getTime() + ((activeDayData?.day || 1) - 1) * 86400000).toLocaleDateString(
                  lang === 'kn' ? 'kn-IN' : 'en-US',
                  { weekday: 'short', month: 'short', day: 'numeric' }
                )}
              </span>
            </div>

            <button
              type="button"
              onClick={() => onSelectDay(activeDayData?.day || 1)}
              className="text-xs font-semibold text-[#E85D04] hover:text-[#FFD60A] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>{lang === 'kn' ? 'ವೇಳಾಪಟ್ಟಿ ನೋಡಿ' : 'View Day'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {activeDayData && (
            <div className="space-y-3">
              <h4 className="text-base font-bold text-white">
                {lang === 'kn' && activeDayData.theme_kannada
                  ? activeDayData.theme_kannada
                  : activeDayData.theme}
              </h4>

              {/* Stops List */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {lang === 'kn' ? 'ದಿನದ ತಾಣಗಳು' : 'Planned Attractions'}:
                </div>
                {activeDayData.locations.map((loc, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#E85D04] shrink-0" />
                      <span className="font-semibold text-slate-200">{loc.name}</span>
                    </div>
                    <span className="text-slate-400 font-mono text-[11px]">
                      {loc.duration_hours}h
                    </span>
                  </div>
                ))}
              </div>

              {/* Food Pick */}
              {activeDayData.food_recommendation && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                    <Utensils className="w-3 h-3 text-[#FFD60A]" />
                    <span>{lang === 'kn' ? 'ಸ್ಥಳೀಯ ಆಹಾರ' : 'Food Highlight'}</span>
                  </div>
                  <p className="text-slate-300 leading-snug">
                    {lang === 'kn' && activeDayData.food_recommendation_kannada
                      ? activeDayData.food_recommendation_kannada
                      : activeDayData.food_recommendation}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
