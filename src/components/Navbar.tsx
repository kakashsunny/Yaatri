'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Bookmark, Search, Languages, Menu, X } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle.tsx';

interface NavbarProps {
  lang?: 'en' | 'kn';
  onToggleLang?: (lang: 'en' | 'kn') => void;
  hasItinerary?: boolean;
  currentView?: string;
  onNavigate?: (view: any) => void;
  onOpenCommandPalette?: () => void;
  onOpenSavedTrips?: () => void;
  onOpenPhrasebook?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang = 'en',
  onToggleLang,
  hasItinerary = true,
  onNavigate,
  onOpenCommandPalette,
  onOpenSavedTrips,
  onOpenPhrasebook,
}) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile drawer on Escape key
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const navLinks = [
    {
      to: '/discover',
      labelEn: 'Discover',
      labelKn: 'ಮುಖಪುಟ',
      isActive: pathname === '/discover' || pathname === '/',
    },
    {
      to: '/destinations',
      labelEn: 'Destinations',
      labelKn: 'ಪ್ರಮುಖ ತಾಣಗಳು',
      isActive: pathname === '/destinations',
    },
    {
      to: '/plan',
      labelEn: 'Trip Planner',
      labelKn: 'ಪ್ರವಾಸ ಯೋಜನೆ',
      isActive: pathname === '/plan',
    },
    {
      to: '/itinerary',
      labelEn: 'My Itinerary',
      labelKn: 'ನಿಮ್ಮ ಪ್ರವಾಸ ವೇಳಾಪಟ್ಟಿ',
      isActive: pathname === '/itinerary',
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0A0A0F]/85 border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <Link
          to="/discover"
          onClick={(e) => {
            if (onNavigate) {
              e.preventDefault();
              onNavigate('/discover');
            }
          }}
          className="flex items-center gap-2.5 text-left group cursor-pointer shrink-0"
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-black/60 border border-[#E85D04]/40 flex items-center justify-center shadow-md shadow-[#E85D04]/20 group-hover:scale-105 transition-transform shrink-0">
            <img
              src="/assets/aistudio/Orange_Y_Compass_Map_Pin_Icon_bd1d2893.png"
              alt="Yaatri Logo with orange compass map pin"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-[#FFD60A] transition-colors">
                Yaatri
              </span>
              <span className="text-sm font-semibold font-kannada text-[#E85D04]">
                ಯಾತ್ರಿ
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
              {lang === 'kn' ? 'ಕರ್ನಾಟಕ ಪ್ರವಾಸ ಮಾರ್ಗದರ್ಶಿ' : 'Karnataka AI Guide'}
            </span>
          </div>
        </Link>

        {/* Zone 2: Navigation Links using <Link to="..."> */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate(link.to);
                }
              }}
              className={`whitespace-nowrap transition-colors duration-200 ${
                link.isActive
                  ? 'text-[#E85D04] font-bold border-b-2 border-[#E85D04] pb-0.5'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {lang === 'kn' ? link.labelKn : link.labelEn}
            </Link>
          ))}
        </nav>

        {/* Zone 3: Quick Tools & Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Quick Search / Command Palette (Cmd+K) button */}
          {onOpenCommandPalette && (
            <button
              type="button"
              onClick={onOpenCommandPalette}
              aria-label="Open command search"
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#E85D04]" />
              <span className="hidden sm:inline text-[11px]">Search</span>
              <kbd className="hidden sm:inline-flex px-1.5 py-0.2 rounded text-[9px] font-mono bg-white/10 text-slate-400 border border-white/10">
                ⌘K
              </kbd>
            </button>
          )}

          {/* Kannada Phrasebook quick launch button */}
          {onOpenPhrasebook && (
            <button
              type="button"
              onClick={onOpenPhrasebook}
              aria-label="Open Kannada Phrasebook"
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
              title="Kannada Audio Phrasebook"
            >
              <Languages className="w-3.5 h-3.5 text-[#FFD60A]" />
              <span className="hidden md:inline text-[11px]">Phrasebook</span>
            </button>
          )}

          {/* Saved Trips Vault button */}
          {onOpenSavedTrips && (
            <button
              type="button"
              onClick={onOpenSavedTrips}
              aria-label="View saved trips vault"
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
              title="Saved Trips"
            >
              <Bookmark className="w-3.5 h-3.5 text-[#E85D04]" />
              <span className="hidden md:inline text-[11px]">Saved</span>
            </button>
          )}

          {/* Language Toggle */}
          {onToggleLang && (
            <LanguageToggle currentLang={lang} onToggle={onToggleLang} floating={false} />
          )}

          {/* Plan Trip CTA */}
          <Link
            to="/plan"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate('/plan');
              }
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#E85D04] to-[#C44601] hover:from-[#FA6607] hover:to-[#E85D04] rounded-lg shadow-md shadow-[#E85D04]/25 hover:shadow-lg active:scale-97 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFD60A]" />
            <span>{lang === 'kn' ? 'ಯೋಜಿಸಿ' : 'Plan Trip'}</span>
          </Link>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={isMobileMenuOpen}
            className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-[#E85D04]" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#0E0E17]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 transition-all animate-fade-in shadow-2xl">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate(link.to);
                  }
                }}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  link.isActive
                    ? 'bg-[#E85D04]/15 text-[#E85D04] font-bold border border-[#E85D04]/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{lang === 'kn' ? link.labelKn : link.labelEn}</span>
                <span className="text-xs font-mono opacity-60">→</span>
              </Link>
            ))}
          </nav>

          {/* Mobile Quick Action Strip */}
          <div className="pt-2 border-t border-white/10 grid grid-cols-3 gap-2">
            {onOpenCommandPalette && (
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenCommandPalette();
                }}
                className="py-2 px-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-slate-300 flex flex-col items-center gap-1 cursor-pointer"
              >
                <Search className="w-4 h-4 text-[#E85D04]" />
                <span>Search</span>
              </button>
            )}

            {onOpenPhrasebook && (
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenPhrasebook();
                }}
                className="py-2 px-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-slate-300 flex flex-col items-center gap-1 cursor-pointer"
              >
                <Languages className="w-4 h-4 text-[#FFD60A]" />
                <span>Kannada</span>
              </button>
            )}

            {onOpenSavedTrips && (
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenSavedTrips();
                }}
                className="py-2 px-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-slate-300 flex flex-col items-center gap-1 cursor-pointer"
              >
                <Bookmark className="w-4 h-4 text-[#E85D04]" />
                <span>Saved</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
