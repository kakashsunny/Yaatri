import React from 'react';
import { 
  Sparkles, 
  Map, 
  ShieldCheck, 
  HeartHandshake, 
  ArrowRight, 
  Utensils, 
  Mountain, 
  Compass, 
  Award,
  Clock,
  Headphones,
  CloudSun,
  Wallet,
  Briefcase
} from 'lucide-react';
import { DestinationShowcase } from '../components/DestinationShowcase.tsx';

interface LandingPageProps {
  onStartPlanning: () => void;
  onSelectCity: (city: string) => void;
  lang: 'en' | 'kn';
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartPlanning, onSelectCity, lang }) => {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F1F5F9]">
      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Background Image with Cinematic Dark Gradient Scrim */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 scale-102"
          style={{
            backgroundImage: "url('/images/hampi.jpg')",
          }}
        />
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.75) 100%)',
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 pt-12 pb-16">
          {/* Gold Pill Label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#13131A]/80 border border-[#FFD60A]/40 backdrop-blur-md shadow-lg shadow-black/50">
            <span className="text-[#FFD60A] text-xs font-bold tracking-widest uppercase">
              ✦ KARNATAKA AI TRAVEL PLANNER ✦
            </span>
          </div>

          {/* Main Title & Kannada Subtitle */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white drop-shadow-md">
              Discover Karnataka
            </h1>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-kannada text-[#E85D04] tracking-normal drop-shadow-sm">
              ಕರ್ನಾಟಕವನ್ನು ಅನ್ವೇಷಿಸಿ
            </h2>
          </div>

          {/* Subtitle / Paragraph */}
          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed text-balance">
            {lang === 'kn'
              ? 'ಶಿಲ್ಪಕಲೆ, ಭೋರ್ಗರೆಯುವ ಜಲಪಾತಗಳು, ಸಾಂಬಾರ ತೋಟಗಳು ಮತ್ತು ಅಜ್ಞಾತ ರಮಣೀಯ ತಾಣಗಳನ್ನು ಅನ್ವೇಷಿಸಲು ನಿಮ್ಮ ವೈಯಕ್ತಿಕ AI ಮಾರ್ಗದರ್ಶಿ.'
              : 'Your personal AI guide to the land of temples, waterfalls, and hidden wonders. Tailored to your pace, budget, and passions.'}
          </p>

          {/* Primary CTA */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onStartPlanning}
              className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-[#E85D04] via-[#F46B08] to-[#E85D04] hover:from-[#FA6607] hover:to-[#E85D04] rounded-xl shadow-xl shadow-[#E85D04]/35 hover:shadow-2xl hover:shadow-[#E85D04]/50 active:scale-97 transition-all flex items-center justify-center gap-3 cursor-pointer glow-saffron"
            >
              <span>{lang === 'kn' ? 'ನಿಮ್ಮ ಯಾತ್ರೆ ಆರಂಭಿಸಿ →' : 'Plan My Journey →'}</span>
              <ArrowRight className="w-5 h-5 text-[#FFD60A]" />
            </button>

            <a
              href="#destinations-section"
              className="w-full sm:w-auto px-6 py-4 text-sm font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#FFD60A]" />
              <span>{lang === 'kn' ? 'ಪ್ರಮುಖ ತಾಣಗಳನ್ನು ನೋಡಿ' : 'Explore Highlights'}</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto border-t border-white/10 text-xs">
            <div className="space-y-0.5">
              <div className="text-[#FFD60A] font-bold text-lg tabular-nums">30+</div>
              <div className="text-slate-400">{lang === 'kn' ? 'ಕರ್ನಾಟಕ ಜಿಲ್ಲೆಗಳು' : 'Karnataka Hubs'}</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-[#FFD60A] font-bold text-lg tabular-nums">100%</div>
              <div className="text-slate-400">{lang === 'kn' ? 'ಕನ್ನಡ & ಇಂಗ್ಲಿಷ್ ಬೆಂಬಲ' : 'Bilingual Support'}</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-[#FFD60A] font-bold text-lg tabular-nums">₹500+</div>
              <div className="text-slate-400">{lang === 'kn' ? 'ಬಜೆಟ್ ಸ್ನೇಹಿ ಯೋಜನೆ' : 'Budget-Aware'}</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-[#FFD60A] font-bold text-lg tabular-nums">5s</div>
              <div className="text-slate-400">{lang === 'kn' ? 'ತತ್ಕ್ಷಣ ವೇಳಾಪಟ್ಟಿ' : 'Instant AI Output'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#FFD60A] uppercase">
            <span>✦</span>
            <span>{lang === 'kn' ? 'ಯಾತ್ರೆಯ ವೈಶಿಷ್ಟ್ಯಗಳು' : 'WHY YAATRI'}</span>
            <span>✦</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {lang === 'kn' ? 'ನಿಜವಾದ ಸ್ಥಳೀಯ ಅನುಭವಕ್ಕಾಗಿ ರೂಪಿಸಲಾಗಿದೆ' : 'Engineered for True Local Discovery'}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            {lang === 'kn'
              ? 'ಕೇವಲ ಪ್ರವಾಸಿ ತಾಣಗಳಲ್ಲದೆ, ಸ್ಥಳೀಯರ ಮೆಚ್ಚಿನ ಆಹಾರ, ಗುಪ್ತ ತಾಣಗಳು ಮತ್ತು ನಿಖರ ಮಾರ್ಗಗಳ ಸಮನ್ವಯ.'
              : 'Not just tourist traps. Get real insider advice from Bangalore benne dosa spots to Hampi boulder sunsets.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-[#E85D04]/50 transition-all duration-300 hover:scale-[1.02] shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#E85D04]/15 border border-[#E85D04]/30 flex items-center justify-center text-[#E85D04]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">
              {lang === 'kn' ? 'AI ಪ್ರೇರಿತ ನಿಖರತೆ' : 'AI-Powered Precision'}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {lang === 'kn'
                ? 'ಜೆಮಿನೈ 3.8 ಫ್ಲ್ಯಾಶ್ ತಂತ್ರಜ್ಞಾನದಿಂದ ರೂಪಿಸಲಾದ ಸ್ಮಾರ್ಟ್ ವೇಳಾಪಟ್ಟಿಗಳು, ನಿಮ್ಮ ದಿನಗಳು ಮತ್ತು ಆಸಕ್ತಿಗೆ ಅನುಗುಣವಾಗಿ.'
                : 'State-of-the-art Gemini intelligence builds day-by-day itineraries tailored directly to your pacing and passions.'}
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-[#E85D04]/50 transition-all duration-300 hover:scale-[1.02] shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#FFD60A]/15 border border-[#FFD60A]/30 flex items-center justify-center text-[#FFD60A]">
              <Map className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">
              {lang === 'kn' ? 'ಪೂರ್ಣ ಕನ್ನಡ ಬೆಂಬಲ' : 'Bilingual Kannada & English'}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {lang === 'kn'
                ? 'ಪ್ರತಿಯೊಂದು ತಾಣದ ಹೆಸರು, ವಿವರಣೆ ಮತ್ತು ಸಲಹೆಗಳು ಅಪ್ಪಟ ಕನ್ನಡದಲ್ಲಿ ಲಭ್ಯವಿದ್ದು ಒಂದು ಕ್ಲಿಕ್‌ನಲ್ಲಿ ಬದಲಾಯಿಸಬಹುದು.'
                : 'Native Kannada support across all itineraries, locations, food guides, and navigation with instant toggle.'}
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-[#E85D04]/50 transition-all duration-300 hover:scale-[1.02] shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#1B4332]/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">
              {lang === 'kn' ? 'ಬಜೆಟ್ ಸ್ನೇಹಿ ಯೋಜನೆ' : 'Budget-Aware Intelligence'}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {lang === 'kn'
                ? 'ದಿನಕ್ಕೆ ₹500 ರಿಂದ ₹10,000 ವರೆಗೆ, ನಿಮ್ಮ ಜೇಬಿಗೆ ಹೊರೆಯಾಗದಂತೆ ಪ್ರವೇಶ ಶುಲ್ಕ ಮತ್ತು ಆಹಾರ ವೆಚ್ಚದ ಲೆಕ್ಕಾಚಾರ.'
                : 'From ₹500 backpacker routes to luxury stays, accurate daily spend predictions keep surprises at zero.'}
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-[#E85D04]/50 transition-all duration-300 hover:scale-[1.02] shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#E85D04]/15 border border-[#E85D04]/30 flex items-center justify-center text-[#FFD60A]">
              <Utensils className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">
              {lang === 'kn' ? 'ಅಸಲಿ ಆಹಾರ & ಗುಪ್ತ ತಾಣಗಳು' : 'Hidden Gems & Regional Food'}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {lang === 'kn'
                ? 'ದಾವಣಗೆರೆ ಬೆಣ್ಣೆ ದೋಸೆ, ಮೈಸೂರು ಪಾಕ್, ಮಂಗಳೂರು ನೀರ್ ದೋಸೆ ಜೊತೆಗೆ ಜನನಿಬಿಡವಲ್ಲದ ನಿಸರ್ಗ ತಾಣಗಳು.'
                : 'Curated local eateries, Dharwad pedas, Neer dosas, and quiet cliff treks far away from commercial buses.'}
            </p>
          </div>
        </div>
      </section>

      {/* 10/10 Traveler Suite Highlights Banner */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-b from-[#13131A] to-black/60 border border-[#E85D04]/30 p-6 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-[#E85D04]/10 blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FFD60A] tracking-widest uppercase">
                <span>✦</span>
                <span>{lang === 'kn' ? '10/10 ನಾವೀನ್ಯತೆ ಸೌಲಭ್ಯಗಳು' : 'THE 10/10 TRAVELER SUITE'}</span>
                <span>✦</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {lang === 'kn' ? 'ಸ್ಮಾರ್ಟ್ ಪ್ರವಾಸದ ಸಂಪೂರ್ಣ ಪರಿಕರಗಳು' : 'Engineered for Flawless Karnataka Journeys'}
              </h2>
            </div>
            <div className="text-xs text-slate-400 font-medium">
              {lang === 'kn' ? 'ಯೋಜನಾ ಪುಟದಲ್ಲಿ ಲೈವ್ ಆಗಿ ಲಭ್ಯವಿದೆ' : 'Interactive tools synced with every generated itinerary'}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Tool 1 */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-[#E85D04]/50 transition-all space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#E85D04]/20 border border-[#E85D04]/40 flex items-center justify-center text-[#E85D04]">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                {lang === 'kn' ? '24 ಗಂಟೆ ಟೈಮ್‌ಲೈನ್ ಸ್ಕ್ರಬ್ಬರ್' : '24h Interactive Timeline'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'kn'
                  ? 'ದಿನದ 5 ಹಂತಗಳನ್ನು ಸ್ಲೈಡ್ ಮಾಡಿ ನಕ್ಷೆಯ ಲೈವ್ ಮಾರ್ಕರ್‌ಗಳು ಮತ್ತು ಬೆಳಕಿನ ಬದಲಾವಣೆಯನ್ನು ವೀಕ್ಷಿಸಿ.'
                  : 'Scrub through morning dawn to starry night with synchronized Leaflet map marker panning.'}
              </p>
            </div>

            {/* Tool 2 */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-[#FFD60A]/50 transition-all space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#FFD60A]/20 border border-[#FFD60A]/40 flex items-center justify-center text-[#FFD60A]">
                <CloudSun className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                {lang === 'kn' ? 'ಲೈವ್ ಹವಾಮಾನ & ಸಾರಿಗೆ ಅಂತರ' : 'Live Climate & Transit'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'kn'
                  ? 'ತಾಪಮಾನ, ಮಳೆ ಸಾಧ್ಯತೆ, UV ಸೂಚ್ಯಂಕ ಮತ್ತು ಕೆಎಸ್ಆರ್‌ಟಿಸಿ/ವಂದೇ ಭಾರತ ರೈಲು ಸಮಯದ ಲೆಕ್ಕಾಚಾರ.'
                  : 'Real-time temperature, rainfall likelihood, and KSRTC Airavat / Vande Bharat transit durations.'}
              </p>
            </div>

            {/* Tool 3 */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-purple-500/50 transition-all space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                <Headphones className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                {lang === 'kn' ? 'ದ್ವಿಭಾಷಾ ಆಡಿಯೋ ಗೈಡ್' : 'Bilingual Audio Guides'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'kn'
                  ? 'ಹಂಪಿಯ ಕಲ್ಲಿನ ರಥ ಮತ್ತು ಬಾದಾಮಿಯ ಇತಿಹಾಸವನ್ನು ಕನ್ನಡ ಹಾಗೂ ಇಂಗ್ಲಿಷ್ ಧ್ವನಿಯಲ್ಲಿ ಆಲಿಸಿ.'
                  : 'Web Speech narration in English and native Kannada with animated acoustic waveform bars.'}
              </p>
            </div>

            {/* Tool 4 */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-emerald-500/50 transition-all space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Wallet className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                {lang === 'kn' ? 'ವೆಚ್ಚ ನಿರ್ವಹಣೆ & ಕರೆನ್ಸಿ ಬದಲಾವಣೆ' : 'Expense Tracker & Split'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'kn'
                  ? 'ಲೈವ್ ವೆಚ್ಚ ದಾಖಲಿಸಿ, INR, USD, EUR, GBP ಗೆ ಪರಿವರ್ತಿಸಿ ಮತ್ತು ಸ್ನೇಹಿತರ ನಡುವೆ ಬಿಲ್ ವಿಭಜಿಸಿ.'
                  : 'Track actual vs budget, multi-currency conversion (USD/EUR/GBP/AED), and 1-10 traveler split bill.'}
              </p>
            </div>

            {/* Tool 5 */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-amber-500/50 transition-all space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Utensils className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                {lang === 'kn' ? 'ಕರ್ನಾಟಕ ಲೆಜೆಂಡರಿ ಫುಡ್ ಟ್ರಯಲ್' : 'Iconic Food Trails'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'kn'
                  ? 'ಮೈಲಾರಿ ಬೆಣ್ಣೆ ದೋಸೆ, ಧಾರವಾಡ ಪೇಡಾ ಮತ್ತು ಕರಾವಳಿ ಖಾದ್ಯಗಳ ಅಧಿಕೃತ ಹೋಟೆಲ್ ಪಟ್ಟಿ.'
                  : 'Curated legendary eateries, 1935 Mysore Pak birthplace, Udupi temple breakfasts, and local tips.'}
              </p>
            </div>

            {/* Tool 6 */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-blue-500/50 transition-all space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                {lang === 'kn' ? 'ಸ್ಮಾರ್ಟ್ ಲಗೇಜ್ & ಪರಿಸರ ನಿಯಮ' : 'Packing & Eco-Etiquette'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'kn'
                  ? 'ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಜಿಗಣೆ ಸಾಕ್ಸ್, ದೇವಸ್ಥಾನ ಉಡುಪು ನಿಯಮ ಮತ್ತು ಪ್ಲಾಸ್ಟಿಕ್ ಮುಕ್ತ ವಲಯ ಮಾರ್ಗದರ್ಶಿ.'
                  : 'Interactive packing progress meter, temple dress codes, and Western Ghats eco-tourism rules.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Destination Showcase with Generated Photography */}
      <DestinationShowcase lang={lang} onSelectCity={onSelectCity} />

      {/* Sample Quick-Start Journeys Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-[#13131A] via-[#1B1B26] to-[#13131A] border border-[#E85D04]/30 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[#E85D04]/10 blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <span className="px-3 py-1 rounded-full bg-[#FFD60A]/10 border border-[#FFD60A]/30 text-xs text-[#FFD60A] font-bold uppercase tracking-wider">
                {lang === 'kn' ? 'ಸಿದ್ಧ ಯೋಜನೆಗಳು' : 'Curated Starter Itineraries'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {lang === 'kn'
                  ? 'ತಕ್ಷಣವೇ ನಿಮ್ಮ ಕನಸಿನ ಕರ್ನಾಟಕ ಯಾತ್ರೆಯನ್ನು ಯೋಜಿಸಿ'
                  : 'Ready to Experience the Magic of Karnataka?'}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {lang === 'kn'
                  ? 'ನಿಮ್ಮ ದಿನಗಳು ಮತ್ತು ಬಜೆಟ್‌ಗೆ ಅನುಗುಣವಾಗಿ ಕೆಲವೇ ಸೆಕೆಂಡುಗಳಲ್ಲಿ ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಪ್ರವಾಸ ನಕ್ಷೆ ಪಡೆಯಿರಿ.'
                  : 'Select your starting hub in Bangalore, Mysuru, Hampi, or Mangalore and let Yaatri generate your route in seconds.'}
              </p>
            </div>

            <button
              type="button"
              onClick={onStartPlanning}
              className="px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-white bg-[#E85D04] hover:bg-[#FA6607] shadow-xl shadow-[#E85D04]/30 hover:scale-105 active:scale-97 transition-all shrink-0 cursor-pointer"
            >
              {lang === 'kn' ? 'ಪ್ರವಾಸ ಯೋಜನೆ ರೂಪಿಸಿ ✦' : 'Start Planning ✦'}
            </button>
          </div>
        </div>
      </section>

      {/* Elegant Quiet Footer */}
      <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="text-base text-[#E85D04] font-bold">✦</span>
          <span className="font-bold text-white">Yaatri (ಯಾತ್ರಿ)</span>
          <span>— Karnataka AI Travel Planner</span>
        </div>

        <div className="flex items-center gap-6">
          <span>{lang === 'kn' ? 'ಸಿರಿಗನ್ನಡಂ ಗೆಲ್ಗೆ, ಸಿರಿಗನ್ನಡಂ ಬಾಳ್ಗೆ' : 'Made with pride for Karnataka'}</span>
          <span>·</span>
          <span>Powered by Gemini 3.8 Flash</span>
        </div>
      </footer>
    </div>
  );
};
