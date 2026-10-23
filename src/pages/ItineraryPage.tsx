/**
 * ============================================================================
 * YAATRI ITINERARY SUITE (ಯಾತ್ರಿ ಪ್ರವಾಸ ವೇಳಾಪಟ್ಟಿ)
 * Interactive multi-day traveler control center featuring:
 * - Leaflet geospatial route mapping & 24h timeline day scrubber
 * - Live district climate & transit calculations
 * - Cultural audio guide narrations with waveform animation
 * - Itemized expense tracker & multi-currency group bill split
 * - Karnataka regional food trail
 * - Smart eco-packing checklist
 * - PDF print export & RFC 5545 iCalendar (.ics) export
 * - LocalStorage trip vault persistence
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  IndianRupee, 
  Share2, 
  Check, 
  RotateCcw, 
  Sparkles, 
  Briefcase, 
  SunMedium, 
  BookmarkCheck,
  Bookmark,
  Printer,
  Download,
  Clock,
  CloudSun,
  Headphones,
  Wallet,
  Utensils,
  Navigation,
  Languages
} from 'lucide-react';
import { ItineraryResponse, LocationItem } from '../types/itinerary.ts';
import { DayAccordion } from '../components/DayAccordion.tsx';
import { MapView } from '../components/MapView.tsx';
import { TripCalendarView } from '../components/TripCalendarView.tsx';
import { TimelineScrubber } from '../components/TimelineScrubber.tsx';
import { DestinationWeather } from '../components/DestinationWeather.tsx';
import { AudioGuidePlayer } from '../components/AudioGuidePlayer.tsx';
import { TripExpenseTracker } from '../components/TripExpenseTracker.tsx';
import { KarnatakaFoodTrail } from '../components/KarnatakaFoodTrail.tsx';
import { SmartPackingGuide } from '../components/SmartPackingGuide.tsx';
import { exportItineraryToPDF } from '../lib/pdf-export.ts';
import { exportItineraryToICal } from '../lib/ical-export.ts';
import { saveTripToVault, getSavedTrips } from '../lib/storage.ts';

interface ItineraryPageProps {
  itinerary: ItineraryResponse;
  lang: 'en' | 'kn';
  onPlanAnother: () => void;
  onOpenPhrasebook?: () => void;
  onOpenSavedTrips?: () => void;
}

type FeatureTab = 'route' | 'weather' | 'audio' | 'expenses' | 'food' | 'packing';

export const ItineraryPage: React.FC<ItineraryPageProps> = ({ 
  itinerary, 
  lang, 
  onPlanAnother,
  onOpenPhrasebook,
  onOpenSavedTrips
}) => {
  const [selectedDay, setSelectedDay] = useState<number | 'all'>('all');
  const [visualView, setVisualView] = useState<'map' | 'calendar' | 'both'>('both');
  const [copied, setCopied] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [isExportingICal, setIsExportingICal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [activeFeatureTab, setActiveFeatureTab] = useState<FeatureTab>('route');
  const [activeLocationIndex, setActiveLocationIndex] = useState<number>(0);

  // Check if current trip is already saved in vault
  useEffect(() => {
    const saved = getSavedTrips();
    const alreadySaved = saved.some(t => t.title === itinerary.title);
    setIsSaved(alreadySaved);
  }, [itinerary.title]);

  // Collect all locations for map view
  const allLocations: LocationItem[] = itinerary.days.flatMap((d) => d.locations);

  // Active locations based on day tab
  const displayedLocations = selectedDay === 'all'
    ? allLocations
    : itinerary.days.find((d) => d.day === selectedDay)?.locations || allLocations;

  // Infer primary destination city for weather from first location or fallback
  const primaryCity = allLocations[0]?.name?.includes('Hampi') 
    ? 'Hampi'
    : allLocations[0]?.name?.includes('Mysore') || allLocations[0]?.name?.includes('Palace')
    ? 'Mysuru'
    : allLocations[0]?.name?.includes('Coorg') || allLocations[0]?.name?.includes('Madikeri')
    ? 'Coorg'
    : allLocations[0]?.name?.includes('Gokarna')
    ? 'Gokarna'
    : allLocations[0]?.name?.includes('Udupi')
    ? 'Udupi'
    : allLocations[0]?.name?.includes('Badami')
    ? 'Badami'
    : allLocations[0]?.name?.includes('Chikmagalur')
    ? 'Chikmagalur'
    : 'Mysuru';

  const handleSaveToVault = () => {
    saveTripToVault(itinerary);
    setIsSaved(true);
  };

  const handleShare = () => {
    const shareText = `🌟 Check out my Karnataka itinerary crafted by Yaatri: "${itinerary.title}"\n📍 Total ${itinerary.days.length} Days | Est. Budget: ₹${itinerary.total_estimated_budget_inr.toLocaleString('en-IN')}\nBest season: ${itinerary.best_time_to_visit}\n\nPlan your Karnataka journey at: ${window.location.origin}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    try {
      setIsExportingPDF(true);
      exportItineraryToPDF(itinerary, lang);
    } catch (err) {
      // safe error handling
    } finally {
      setTimeout(() => setIsExportingPDF(false), 600);
    }
  };

  const handleDownloadICal = () => {
    try {
      setIsExportingICal(true);
      exportItineraryToICal(itinerary, lang);
    } catch (err) {
      // safe error handling
    } finally {
      setTimeout(() => setIsExportingICal(false), 600);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* 1. Hero Strip at Top */}
      <section className="space-y-3 border-b border-white/10 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E85D04]/15 border border-[#E85D04]/30 text-xs font-bold text-[#FFD60A] uppercase tracking-wider">
            <span>✦</span>
            <span>{lang === 'kn' ? 'ಸಿದ್ಧಪಡಿಸಿದ ಯಾತ್ರೆ' : 'PERSONALIZED ITINERARY'}</span>
            <span>✦</span>
          </div>

          {/* Action buttons bar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Save Trip to Vault */}
            <button
              type="button"
              onClick={handleSaveToVault}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                isSaved
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'text-emerald-400 fill-current' : 'text-[#FFD60A]'}`} />
              <span>{isSaved ? (lang === 'kn' ? 'ವಾಲ್ಟ್‌ನಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ ✓' : 'Saved to Vault ✓') : (lang === 'kn' ? 'ವಾಲ್ಟ್‌ಗೆ ಉಳಿಸಿ' : 'Save Trip')}</span>
            </button>

            {/* Calendar Export (.ICS) */}
            <button
              type="button"
              onClick={handleDownloadICal}
              disabled={isExportingICal}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              title="Add to Google or Apple Calendar"
            >
              <Calendar className="w-3.5 h-3.5 text-[#FFD60A]" />
              <span>{isExportingICal ? 'Exporting...' : (lang === 'kn' ? 'ಕ್ಯಾಲೆಂಡರ್ (.ics)' : 'Calendar (.ics)')}</span>
            </button>

            {/* PDF Export */}
            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={isExportingPDF}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5 text-[#E85D04]" />
              <span>{isExportingPDF ? (lang === 'kn' ? 'ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...' : 'Saving...') : (lang === 'kn' ? 'PDF ಡೌನ್‌ಲೋಡ್' : 'PDF Export')}</span>
            </button>

            {/* Print */}
            <button
              type="button"
              onClick={handlePrint}
              className="hidden sm:inline-flex px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span>{lang === 'kn' ? 'ಮುದ್ರಿಸಿ' : 'Print'}</span>
            </button>

            {/* Share */}
            <button
              type="button"
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#E85D04] to-[#C44601] hover:from-[#FA6607] hover:to-[#E85D04] text-xs font-bold text-white shadow-md shadow-[#E85D04]/30 active:scale-97 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#FFD60A]" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? (lang === 'kn' ? 'ನಕಲಿಸಲಾಗಿದೆ!' : 'Copied!') : (lang === 'kn' ? 'ಹಂಚಿಕೊಳ್ಳಿ' : 'Share')}</span>
            </button>

            {/* Plan Another */}
            <button
              type="button"
              onClick={onPlanAnother}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#FFD60A]" />
              <span>{lang === 'kn' ? 'ಮತ್ತೊಂದು' : 'New Plan'}</span>
            </button>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          {lang === 'kn' && itinerary.title_kannada ? itinerary.title_kannada : itinerary.title}
        </h1>

        {itinerary.title_kannada && lang === 'en' && (
          <h2 className="text-xl sm:text-2xl font-bold font-kannada text-[#E85D04]">
            {itinerary.title_kannada}
          </h2>
        )}

        <p className="text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed pt-2">
          {lang === 'kn' && itinerary.summary_kannada ? itinerary.summary_kannada : itinerary.summary}
        </p>
      </section>

      {/* 2. Top Summary & KPI Card */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Budget KPI Widget */}
        <div className="p-6 rounded-2xl bg-[#13131A] border border-[#E85D04]/30 shadow-xl shadow-black/50 space-y-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <IndianRupee className="w-20 h-20 text-[#FFD60A]" />
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {lang === 'kn' ? 'ಅಂದಾಜು ಒಟ್ಟು ಬಜೆಟ್' : 'Total Trip Budget Estimate'}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-[#FFD60A] tabular-nums">
              ₹{itinerary.total_estimated_budget_inr.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-slate-400 font-medium">INR</span>
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-1 pt-1">
            <span>~₹{Math.round(itinerary.total_estimated_budget_inr / itinerary.days.length).toLocaleString('en-IN')} / {lang === 'kn' ? 'ದಿನಕ್ಕೆ' : 'day'}</span>
            <span>·</span>
            <span>{itinerary.days.length} {lang === 'kn' ? 'ದಿನಗಳು' : 'days'}</span>
          </div>
        </div>

        {/* Best Time to Visit */}
        <div className="p-6 rounded-2xl bg-[#13131A] border border-white/10 shadow-xl shadow-black/50 space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <SunMedium className="w-4 h-4 text-[#E85D04]" />
            <span>{lang === 'kn' ? 'ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ಸಮಯ' : 'Best Time to Visit'}</span>
          </div>
          <div className="text-lg font-bold text-white">
            {itinerary.best_time_to_visit || 'October – March'}
          </div>
          <div className="text-xs text-slate-400">
            {lang === 'kn'
              ? 'ಕರಾವಳಿ ಮತ್ತು ಪಶ್ಚಿಮ ಘಟ್ಟಗಳಲ್ಲಿ ಆಹ್ಲಾದಕರ ಹವಾಮಾನವಿರುತ್ತದೆ.'
              : 'Cool breezes across Deccan plateau and lush post-monsoon waterfalls.'}
          </div>
        </div>

        {/* Total Stops & Coverage */}
        <div className="p-6 rounded-2xl bg-[#13131A] border border-white/10 shadow-xl shadow-black/50 space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#FFD60A]" />
            <span>{lang === 'kn' ? 'ಯಾತ್ರೆಯ ವಿಸ್ತಾರ' : 'Journey Coverage'}</span>
          </div>
          <div className="text-lg font-bold text-white">
            {allLocations.length} {lang === 'kn' ? 'ವಿಶೇಷ ತಾಣಗಳು' : 'Handpicked Spots'}
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {itinerary.highlights?.slice(0, 3).map((hl, i) => (
              <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300">
                {hl}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Master 10/10 Interactive Traveler Suite Tabs */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 scrollbar-none">
          {[
            { id: 'route', icon: Clock, en: '⏱️ Route & 24h Timeline', kn: '⏱️ ನಕ್ಷೆ & 24 ಗಂಟೆ ಟೈಮ್‌ಲೈನ್' },
            { id: 'weather', icon: CloudSun, en: '⛅ Live Climate & Transit', kn: '⛅ ಲೈವ್ ಹವಾಮಾನ & ಸಾರಿಗೆ' },
            { id: 'audio', icon: Headphones, en: '🎙️ Audio Guide Narratives', kn: '🎙️ ದ್ವಿಭಾಷಾ ಆಡಿಯೋ ಗೈಡ್' },
            { id: 'expenses', icon: Wallet, en: '💳 Expense Tracker & Split', kn: '💳 ಬಜೆಟ್ & ಗ್ರೂಪ್ ಬಿಲ್' },
            { id: 'food', icon: Utensils, en: '🍲 Karnataka Food Trail', kn: '🍲 ಅಧಿಕೃತ ಆಹಾರ ವೈಭವ' },
            { id: 'packing', icon: Briefcase, en: '🎒 Smart Packing & Rules', kn: '🎒 ಪ್ಯಾಕಿಂಗ್ & ಪರಿಸರ ನೀತಿ' },
          ].map((tab) => {
            const isActive = activeFeatureTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFeatureTab(tab.id as FeatureTab)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#E85D04] to-[#C44601] text-white shadow-lg shadow-[#E85D04]/30 ring-1 ring-[#FFD60A]/40'
                    : 'bg-[#13131A] text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                <span>{lang === 'kn' ? tab.kn : tab.en}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Route & 24h Timeline */}
        {activeFeatureTab === 'route' && (
          <div className="space-y-6">
            {/* Interactive Timeline Scrubber */}
            <TimelineScrubber
              locations={displayedLocations}
              lang={lang}
              activeLocationIndex={activeLocationIndex}
              onSelectLocationIndex={(idx) => setActiveLocationIndex(idx)}
            />

            {/* Map and Calendar Visualizers */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                  <Navigation className="w-4 h-4 text-[#E85D04]" />
                  <span>{lang === 'kn' ? 'ನಕ್ಷೆ ಮತ್ತು ಕ್ಯಾಲೆಂಡರ್ ವೀಕ್ಷಣೆ' : 'Geospatial Route & Schedule'}</span>
                </div>

                {/* Mode Switcher */}
                <div className="inline-flex items-center p-1 bg-[#13131A] border border-white/10 rounded-xl text-xs font-semibold self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setVisualView('map')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      visualView === 'map'
                        ? 'bg-[#E85D04] text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {lang === 'kn' ? 'ನಕ್ಷೆ' : 'Route Map'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisualView('calendar')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      visualView === 'calendar'
                        ? 'bg-[#E85D04] text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {lang === 'kn' ? 'ಕ್ಯಾಲೆಂಡರ್' : 'Trip Calendar'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisualView('both')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      visualView === 'both'
                        ? 'bg-[#E85D04] text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {lang === 'kn' ? 'ಎರಡೂ ವೀಕ್ಷಿಸಿ' : 'Show Both'}
                  </button>
                </div>
              </div>

              {(visualView === 'map' || visualView === 'both') && (
                <MapView
                  locations={displayedLocations}
                  lang={lang}
                  selectedDay={selectedDay === 'all' ? undefined : selectedDay}
                  activeLocationIndex={activeLocationIndex}
                />
              )}

              {(visualView === 'calendar' || visualView === 'both') && (
                <TripCalendarView
                  itinerary={itinerary}
                  lang={lang}
                  selectedDay={selectedDay}
                  onSelectDay={(dayNum) => setSelectedDay(dayNum)}
                />
              )}
            </div>

            {/* Day Selector & Accordion */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 scrollbar-none">
                <button
                  type="button"
                  onClick={() => setSelectedDay('all')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                    selectedDay === 'all'
                      ? 'bg-[#E85D04] text-white shadow-lg shadow-[#E85D04]/30'
                      : 'bg-[#13131A] text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  {lang === 'kn' ? 'ಎಲ್ಲಾ ದಿನಗಳು' : 'All Days View'}
                </button>

                {itinerary.days.map((day) => (
                  <button
                    key={day.day}
                    type="button"
                    onClick={() => setSelectedDay(day.day)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                      selectedDay === day.day
                        ? 'bg-[#E85D04] text-white shadow-lg shadow-[#E85D04]/30'
                        : 'bg-[#13131A] text-slate-400 hover:text-white border border-white/10'
                    }`}
                  >
                    {lang === 'kn' ? `ದಿನ ${day.day}` : `Day ${day.day}`}
                  </button>
                ))}
              </div>

              {/* Day Cards / Accordions */}
              <div className="space-y-6">
                {itinerary.days
                  .filter((d) => selectedDay === 'all' || d.day === selectedDay)
                  .map((day) => (
                    <DayAccordion
                      key={day.day}
                      day={day}
                      lang={lang}
                      isDefaultOpen={true}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Live Climate & Transit */}
        {activeFeatureTab === 'weather' && (
          <DestinationWeather currentCity={primaryCity} lang={lang} />
        )}

        {/* Tab 3: Bilingual Audio Guide Narratives */}
        {activeFeatureTab === 'audio' && (
          <AudioGuidePlayer lang={lang} />
        )}

        {/* Tab 4: Expense Tracker & Split Bill */}
        {activeFeatureTab === 'expenses' && (
          <TripExpenseTracker
            estimatedBudgetInr={itinerary.total_estimated_budget_inr}
            totalDays={itinerary.days.length}
            lang={lang}
            tripKey={itinerary.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}
          />
        )}

        {/* Tab 5: Karnataka Food Trail */}
        {activeFeatureTab === 'food' && (
          <KarnatakaFoodTrail lang={lang} />
        )}

        {/* Tab 6: Smart Packing & Eco Rules */}
        {activeFeatureTab === 'packing' && (
          <SmartPackingGuide lang={lang} />
        )}
      </section>

      {/* 4. Packing Tips & Cultural Etiquette Section Summary */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        {/* Packing Checklist */}
        <div className="p-6 rounded-2xl bg-[#13131A] border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
            <Briefcase className="w-4 h-4 text-[#FFD60A]" />
            <span>{lang === 'kn' ? 'ಪ್ರವಾಸದ ಅಗತ್ಯ ಸಲಹೆಗಳು' : 'Quick Travel Essentials'}</span>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-300">
            {(lang === 'kn' && itinerary.packing_tips_kannada?.length
              ? itinerary.packing_tips_kannada
              : itinerary.packing_tips
            ).map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <BookmarkCheck className="w-4 h-4 text-[#E85D04] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Highlights & Cultural Etiquette */}
        <div className="p-6 rounded-2xl bg-[#13131A] border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#E85D04]" />
            <span>{lang === 'kn' ? 'ಕರ್ನಾಟಕ ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆ' : 'Karnataka Living Heritage'}</span>
          </div>

          <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
            <p>
              {lang === 'kn'
                ? '• ದೇವಸ್ಥಾನಗಳಿಗೆ ಭೇಟಿ ನೀಡುವಾಗ ಸಾಂಪ್ರದಾಯಿಕ ಉಡುಪು ಧರಿಸಿ ಮತ್ತು ಪಾದರಕ್ಷೆಗಳನ್ನು ನಿಗದಿತ ಸ್ಥಳದಲ್ಲಿ ಇರಿಸಿ.'
                : '• Dress modestly when visiting ancient living temples like Chamundeshwari or Virupaksha.'}
            </p>
            <p>
              {lang === 'kn'
                ? '• ಸ್ಥಳೀಯ ಹೋಟೆಲ್‌ಗಳಲ್ಲಿ ಬಿಸಿ ಫಿಲ್ಟರ್ ಕಾಫಿ ಮತ್ತು ಬಾಳೆ ಎಲೆಯಲ್ಲಿ ಊಟ ಸವಿಯುವುದು ಕರ್ನಾಟಕದ ಪರಂಪರೆ.'
                : '• Try filter coffee at small local Darshinis and opt for banana leaf meals for an authentic experience.'}
            </p>
            <p>
              {lang === 'kn'
                ? '• ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಅರಣ್ಯ ಪ್ರದೇಶಗಳಲ್ಲಿ ಪ್ಲಾಸ್ಟಿಕ್ ಬಳಸುವುದನ್ನು ಕಡ್ಡಾಯವಾಗಿ ನಿಷೇಧಿಸಲಾಗಿದೆ.'
                : '• Karnataka’s Western Ghats are eco-sensitive; carry a refillable water bottle and avoid single-use plastics.'}
            </p>
          </div>
        </div>
      </section>

      {/* 5. Bottom Floating Bar / Re-Plan */}
      <footer className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={onPlanAnother}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-[#FFD60A]" />
          <span>{lang === 'kn' ? 'ಬೇರೊಂದು ನಗರದಿಂದ ಪ್ರವಾಸ ಯೋಜಿಸಿ' : 'Plan a Different City Journey'}</span>
        </button>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          {onOpenPhrasebook && (
            <button
              type="button"
              onClick={onOpenPhrasebook}
              className="w-full sm:w-auto px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Languages className="w-4 h-4 text-[#FFD60A]" />
              <span>{lang === 'kn' ? 'ಕನ್ನಡ ನುಡಿಮುತ್ತುಗಳು' : 'Kannada Phrasebook'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleDownloadICal}
            className="w-full sm:w-auto px-4 py-3 rounded-xl bg-[#13131A] hover:bg-[#1B1B26] border border-[#FFD60A]/40 text-xs font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#FFD60A]" />
            <span>{lang === 'kn' ? 'ಕ್ಯಾಲೆಂಡರ್ (.ics)' : 'Add to Calendar (.ics)'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={isExportingPDF}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#13131A] hover:bg-[#1B1B26] border border-[#E85D04]/40 text-xs font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4 text-[#E85D04]" />
            <span>{isExportingPDF ? (lang === 'kn' ? 'ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...' : 'Generating PDF...') : (lang === 'kn' ? 'PDF ಡೌನ್‌ಲೋಡ್' : 'Download Itinerary PDF')}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#E85D04] to-[#C44601] text-xs font-bold text-white shadow-xl shadow-[#E85D04]/30 hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-[#FFD60A]" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? (lang === 'kn' ? 'ನಕಲಿಸಲಾಗಿದೆ!' : 'Copied!') : (lang === 'kn' ? 'ಸ್ನೇಹಿತರೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಿ' : 'Share Itinerary')}</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
