import React, { useState } from 'react';
import { Minus, Plus, Sparkles, MapPin, Calendar, IndianRupee, Compass, AlertCircle, ArrowLeft } from 'lucide-react';
import { PlanTripRequest } from '../types/itinerary.ts';

interface PlannerPageProps {
  initialCity?: string;
  lang: 'en' | 'kn';
  onGenerate: (data: PlanTripRequest) => void;
  onBack: () => void;
  isGenerating: boolean;
}

const cityOptions = [
  { value: 'Bangalore', en: 'Bangalore (Bengaluru)', kn: 'ಬೆಂಗಳೂರು (ಉದ್ಯಾನ ನಗರಿ)' },
  { value: 'Mysuru', en: 'Mysuru (Palace City)', kn: 'ಮೈಸೂರು (ಅರಮನೆ ನಗರಿ)' },
  { value: 'Hampi', en: 'Hampi (Vijayanagara Heritage)', kn: 'ಹಂಪಿ (ವಿಜಯನಗರ ಪರಂಪರೆ)' },
  { value: 'Chikmagalur', en: 'Chikmagalur (Coffee Hills)', kn: 'ಚಿಕ್ಕಮಗಳೂರು (ಕಾಫಿ ನಾಡು)' },
  { value: 'Gokarna', en: 'Gokarna (Om Beach & Cliffs)', kn: 'ಗೋಕರ್ಣ (ಓಂ ಕಡಲತೀರ)' },
  { value: 'Udupi', en: 'Udupi (Krishna Matha & Coast)', kn: 'ಉಡುಪಿ (ಕೃಷ್ಣ ಮಠ & ಕರಾವಳಿ)' },
  { value: 'Badami', en: 'Badami (Chalukya Rock Caves)', kn: 'ಬಾದಾಮಿ (ಚಾಲುಕ್ಯ ಗುಹೆಗಳು)' },
  { value: 'Belur', en: 'Belur & Halebidu (Hoysala)', kn: 'ಬೇಲೂರು & ಹಳೇಬೀಡು (ಹೊಯ್ಸಳ)' },
  { value: 'Murudeshwar', en: 'Murudeshwar (Giant Shiva Shrine)', kn: 'ಮುರುಡೇಶ್ವರ (ಶಿವನ ಸನ್ನಿಧಿ)' },
  { value: 'Dandeli', en: 'Dandeli (River Rafting & Wild)', kn: 'ದಾಂಡೇಲಿ (ಕಾಳಿ ನದಿ & ಕಾಡು)' },
  { value: 'Bandipur', en: 'Bandipur (Tiger Reserve)', kn: 'ಬಂಡೀಪುರ (ಹುಲಿ ಸಂರಕ್ಷಿತಾರಣ್ಯ)' },
  { value: 'Agumbe', en: 'Agumbe (Rainforest & Sunsets)', kn: 'ಆಗುಂಬೆ (ದಕ್ಷಿಣದ ಚಿರಾಪುಂಜಿ)' },
  { value: 'Vijayapura', en: 'Vijayapura / Bijapur (Gol Gumbaz)', kn: 'ವಿಜಯಪುರ (ಗೋಲಗುಮ್ಮಟ)' },
  { value: 'Mangaluru', en: 'Mangaluru (Coastal Hub)', kn: 'ಮಂಗಳೂರು (ಕರಾವಳಿ ನಗರಿ)' },
  { value: 'Hubli', en: 'Hubli (Commercial Gateway)', kn: 'ಹುಬ್ಬಳ್ಳಿ (ವಾಣಿಜ್ಯ ರಾಜಧಾನಿ)' },
  { value: 'Belagavi', en: 'Belagavi (Northern Forts)', kn: 'ಬೆಳಗಾವಿ (ಕುಂದಾ ನಗರಿ)' }
];

const budgetTiers = [
  { value: 500, label: '₹500', descEn: 'Backpacker', descKn: 'ಬ್ಯಾಕ್‌ಪ್ಯಾಕರ್' },
  { value: 1000, label: '₹1,000', descEn: 'Budget', descKn: 'ಮಿತವ್ಯಯ' },
  { value: 2000, label: '₹2,000', descEn: 'Moderate', descKn: 'ಮಧ್ಯಮ' },
  { value: 5000, label: '₹5,000', descEn: 'Comfort', descKn: 'ಆರಾಮದಾಯಕ' },
  { value: 10000, label: '₹10,000+', descEn: 'Luxury', descKn: 'ಐಷಾರಾಮಿ' },
];

const interestOptions = [
  { id: 'Heritage & Temples', en: 'Heritage & Temples', kn: 'ಪರಂಪರೆ & ದೇವಾಲಯಗಳು', icon: '🏛️' },
  { id: 'Nature & Wildlife', en: 'Nature & Wildlife', kn: 'ನಿಸರ್ಗ & ವನ್ಯಜೀವಿ', icon: '🌿' },
  { id: 'Adventure', en: 'Adventure & Treks', kn: 'ಸಾಹಸ & ಚಾರಣ', icon: '🧗' },
  { id: 'Food & Culture', en: 'Food & Culture', kn: 'ಸ್ಥಳೀಯ ಆಹಾರ & ಸಂಸ್ಕೃತಿ', icon: '🍲' },
  { id: 'Beaches', en: 'Beaches & Coast', kn: 'ಕಡಲತೀರಗಳು & ಕರಾವಳಿ', icon: '🏖️' },
  { id: 'Waterfalls', en: 'Waterfalls & Valleys', kn: 'ಜಲಪಾತಗಳು & ಕಣಿವೆಗಳು', icon: '🌊' },
  { id: 'Art & Craft', en: 'Art & Handlooms', kn: 'ಕಲೆ & ಕರಕುಶಲ', icon: '🎨' },
  { id: 'Spiritual', en: 'Spiritual Shrines', kn: 'ಆಧ್ಯಾತ್ಮಿಕ ತಾಣಗಳು', icon: '🕉️' },
  { id: 'Hidden Gems', en: 'Hidden Gems', kn: 'ಅಜ್ಞಾತ ಸುಂದರ ತಾಣಗಳು', icon: '💎' },
];

export const PlannerPage: React.FC<PlannerPageProps> = ({
  initialCity = 'Bangalore',
  lang,
  onGenerate,
  onBack,
  isGenerating
}) => {
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState(2000);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Heritage & Temples',
    'Food & Culture',
    'Nature & Wildlife'
  ]);
  const [error, setError] = useState<string | null>(null);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) {
          setError(lang === 'kn' ? 'ಕನಿಷ್ಠ ಒಂದು ಆಸಕ್ತಿಯನ್ನು ಆರಿಸಿ' : 'Please select at least one interest');
          return prev;
        }
        setError(null);
        return prev.filter((item) => item !== id);
      } else {
        setError(null);
        return [...prev, id];
      }
    });
  };

  const handleIncrement = () => {
    if (days < 10) setDays((d) => d + 1);
  };

  const handleDecrement = () => {
    if (days > 1) setDays((d) => d - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedInterests.length === 0) {
      setError(lang === 'kn' ? 'ದಯವಿಟ್ಟು ಕನಿಷ್ಠ ಒಂದು ಆಸಕ್ತಿಯನ್ನು ಆರಿಸಿ' : 'Please select at least one interest');
      return;
    }
    setError(null);
    onGenerate({
      city: selectedCity,
      days,
      budget,
      interests: selectedInterests,
      language: lang
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[#0A0A0F] bg-grid-pattern relative">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#E85D04]/10 blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto space-y-6 relative z-10">
        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'kn' ? 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ' : 'Back to Overview'}</span>
        </button>

        {/* Form Container Card */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#13131A]/90 backdrop-blur-xl border border-[#E85D04]/30 shadow-2xl shadow-black/80 space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E85D04]/15 border border-[#E85D04]/30 text-xs font-bold text-[#FFD60A] uppercase tracking-wider">
              <span>✦</span>
              <span>{lang === 'kn' ? 'ನಿಮ್ಮ ಪ್ರವಾಸ ರೂಪಿಸಿ' : 'CUSTOM TRIP BUILDER'}</span>
              <span>✦</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {lang === 'kn' ? 'ನಿಮ್ಮ ಯಾತ್ರೆಯ ವಿವರಗಳನ್ನು ತಿಳಿಸಿ' : 'Tell Yaatri About Your Dream Trip'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-kannada">
              {lang === 'kn'
                ? 'ನಿಮ್ಮ ಅಭಿರುಚಿಗೆ ತಕ್ಕಂತೆ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ (AI) ತಕ್ಷಣವೇ ಪರಿಪೂರ್ಣ ವೇಳಾಪಟ್ಟಿ ತಯಾರಿಸುತ್ತದೆ.'
                : 'Select your starting point, pacing, and vibe to generate an authentic Karnataka itinerary.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. Origin City */}
            <div className="space-y-2.5">
              <label htmlFor="planner-starting-city" className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300">
                <span className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#E85D04]" />
                  <span>{lang === 'kn' ? 'ಪ್ರಾರಂಭದ ನಗರ' : 'Starting City'}</span>
                </span>
                <span className="text-[11px] font-normal text-slate-500">
                  {lang === 'kn' ? 'ಕರ್ನಾಟಕದ ಪ್ರಮುಖ ಕೇಂದ್ರ' : 'Karnataka Hub'}
                </span>
              </label>

              <div className="relative">
                <select
                  id="planner-starting-city"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0A0A0F] border border-white/10 hover:border-[#E85D04]/50 focus:border-[#E85D04] focus:outline-none text-white text-sm font-medium transition-all appearance-none cursor-pointer"
                >
                  {cityOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-[#13131A] text-white py-2">
                      {lang === 'kn' ? opt.kn : opt.en}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* 2. Number of Days Stepper */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300">
                <span className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#E85D04]" />
                  <span>{lang === 'kn' ? 'ಪ್ರವಾಸದ ದಿನಗಳು' : 'Duration'}</span>
                </span>
                <span className="text-[11px] font-normal text-slate-500">1 – 10 Days</span>
              </div>

              <div className="flex items-center justify-between p-3 px-5 rounded-2xl bg-[#0A0A0F] border border-white/10">
                <button
                  type="button"
                  onClick={handleDecrement}
                  disabled={days <= 1}
                  aria-label="Decrease trip duration by 1 day"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#E85D04]/20 border border-white/10 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <div className="text-center">
                  <div className="text-3xl font-black text-white tabular-nums tracking-tight">
                    {days}
                  </div>
                  <div className="text-xs font-medium text-slate-400">
                    {days === 1
                      ? (lang === 'kn' ? 'ದಿನ (ಏಕದಿನ ಯಾತ್ರೆ)' : 'Day (Day Trip)')
                      : (lang === 'kn' ? `${days} ದಿನಗಳ ಪ್ರವಾಸ` : 'Days Adventure')}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleIncrement}
                  disabled={days >= 10}
                  aria-label="Increase trip duration by 1 day"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#E85D04]/20 border border-white/10 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 3. Budget Segmented Control */}
            <div className="space-y-2.5">
              <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300">
                <span className="flex items-center gap-2">
                  <IndianRupee className="w-3.5 h-3.5 text-[#FFD60A]" />
                  <span>{lang === 'kn' ? 'ದೈನಂದಿನ ಬಜೆಟ್ (ಪ್ರತಿ ವ್ಯಕ್ತಿಗೆ)' : 'Daily Budget Per Person'}</span>
                </span>
                <span className="text-[11px] font-medium text-[#FFD60A]">
                  Est. Total: ₹{(days * budget).toLocaleString('en-IN')}
                </span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {budgetTiers.map((tier) => (
                  <button
                    key={tier.value}
                    type="button"
                    onClick={() => setBudget(tier.value)}
                    className={`p-3 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                      budget === tier.value
                        ? 'bg-[#E85D04] border-[#FFD60A] text-white shadow-lg shadow-[#E85D04]/40 scale-[1.02]'
                        : 'bg-[#0A0A0F] border-white/10 text-slate-300 hover:border-white/25 hover:text-white'
                    }`}
                  >
                    <div className="text-sm font-extrabold tabular-nums">{tier.label}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">
                      {lang === 'kn' ? tier.descKn : tier.descEn}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Interests Multi-Select Chips */}
            <div className="space-y-3">
              <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300">
                <span className="flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-[#E85D04]" />
                  <span>{lang === 'kn' ? 'ನಿಮ್ಮ ಆಸಕ್ತಿಗಳು' : 'Your Travel Interests'}</span>
                </span>
                <span className="text-[11px] text-[#FFD60A]">
                  {selectedInterests.length} {lang === 'kn' ? 'ಆಯ್ಕೆ ಮಾಡಲಾಗಿದೆ' : 'Selected'}
                </span>
              </label>

              <div className="flex flex-wrap gap-2.5">
                {interestOptions.map((item) => {
                  const isSelected = selectedInterests.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleInterest(item.id)}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#E85D04] to-[#C44601] border-[#FFD60A]/60 text-white shadow-md shadow-[#E85D04]/30 scale-[1.03]'
                          : 'bg-[#0A0A0F] border-white/10 text-slate-300 hover:border-[#E85D04]/40 hover:text-white'
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{lang === 'kn' ? item.kn : item.en}</span>
                    </button>
                  );
                })}
              </div>

              {error && (
                <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/20">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-4 px-6 rounded-2xl text-base font-extrabold text-white bg-gradient-to-r from-[#E85D04] via-[#F46B08] to-[#E85D04] hover:from-[#FA6607] hover:to-[#E85D04] shadow-xl shadow-[#E85D04]/40 hover:shadow-2xl hover:shadow-[#E85D04]/60 active:scale-98 transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed glow-saffron"
              >
                <Sparkles className="w-5 h-5 text-[#FFD60A]" />
                <span>{lang === 'kn' ? 'ನನ್ನ ವೇಳಾಪಟ್ಟಿ ತಯಾರಿಸಿ ✦' : 'Generate My Itinerary ✦'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
