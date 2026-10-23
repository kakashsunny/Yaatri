import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Compass, 
  Bookmark, 
  Languages, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  X,
  Keyboard
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
  onOpenSavedTrips: () => void;
  onOpenPhrasebook: () => void;
  onToggleLang: (lang: 'en' | 'kn') => void;
  lang: 'en' | 'kn';
  destinations: Array<{ name: string; city: string; category: string }>;
  onSelectCity: (city: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenSavedTrips,
  onOpenPhrasebook,
  onToggleLang,
  lang,
  destinations,
  onSelectCity,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    setQuery('');
    setSelectedIndex(0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Build searchable commands list
  const systemActions = [
    {
      id: 'plan',
      label: lang === 'kn' ? 'ಹೊಸ ಪ್ರವಾಸ ರೂಪಿಸಿ' : 'Generate New Itinerary',
      detail: 'Open the trip planner to configure days, budget, and vibe',
      icon: Sparkles,
      action: () => {
        onNavigate('/plan');
        onClose();
      },
    },
    {
      id: 'destinations',
      label: lang === 'kn' ? 'ಕರ್ನಾಟಕ ತಾಣಗಳನ್ನು ನೋಡಿ' : 'Browse All 14 Destinations',
      detail: 'Scroll to the curated destinations showcase',
      icon: Compass,
      action: () => {
        onNavigate('/destinations');
        onClose();
      },
    },
    {
      id: 'saved_trips',
      label: lang === 'kn' ? 'ಉಳಿಸಲಾದ ಪ್ರವಾಸಗಳ ವಾಲ್ಟ್' : 'View Saved Trips Vault',
      detail: 'Review previously saved multi-day itineraries from localStorage',
      icon: Bookmark,
      action: () => {
        onClose();
        onOpenSavedTrips();
      },
    },
    {
      id: 'phrasebook',
      label: lang === 'kn' ? 'ಕನ್ನಡ ಪ್ರವಾಸ ನುಡಿಮುತ್ತುಗಳು' : 'Open Kannada Audio Phrasebook',
      detail: 'Hear spoken pronunciations of common Kannada traveler phrases',
      icon: Languages,
      action: () => {
        onClose();
        onOpenPhrasebook();
      },
    },
    {
      id: 'toggle_lang',
      label: lang === 'kn' ? 'Switch to English' : 'ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿ (Switch to Kannada)',
      detail: 'Toggle app interface language between English and Kannada',
      icon: Languages,
      action: () => {
        onToggleLang(lang === 'kn' ? 'en' : 'kn');
        onClose();
      },
    },
  ];

  const matchedDestinations = destinations
    .filter(
      (d) =>
        !query ||
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.city.toLowerCase().includes(query.toLowerCase()) ||
        d.category.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 6)
    .map((dest) => ({
      id: `dest_${dest.city}`,
      label: `${dest.name} (${dest.city})`,
      detail: `Launch planner pre-focused on ${dest.city}`,
      icon: MapPin,
      action: () => {
        onSelectCity(dest.city);
        onClose();
      },
    }));

  const matchedActions = systemActions.filter(
    (a) =>
      !query ||
      a.label.toLowerCase().includes(query.toLowerCase()) ||
      a.detail.toLowerCase().includes(query.toLowerCase())
  );

  const combinedItems = [...matchedActions, ...matchedDestinations];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="w-full max-w-xl rounded-2xl bg-[#13131A] border border-[#E85D04]/40 shadow-2xl shadow-black overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-[#161622]">
          <Search className="w-5 h-5 text-[#E85D04] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder={
              lang === 'kn'
                ? 'ತಾಣ, ಕ್ರಮ ಅಥವಾ ಆದೇಶ ಹುಡುಕಿ (ಉದಾ: ಹಂಪಿ, ಬಜೆಟ್, ಭಾಷೆ)...'
                : 'Type a command, destination, or feature (e.g. Hampi, Coorg, phrasebook)...'
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {combinedItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No results found for "{query}". Try "Hampi", "Phrasebook", or "Saved Trips".
            </div>
          ) : (
            combinedItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.action}
                  className="w-full p-3 rounded-xl text-left hover:bg-white/5 transition-all flex items-center justify-between gap-3 group cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-[#E85D04]/20 border border-white/10 group-hover:border-[#E85D04]/40 flex items-center justify-center text-slate-300 group-hover:text-[#FFD60A] transition-colors shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white group-hover:text-[#FFD60A] transition-colors truncate">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {item.detail}
                      </div>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors shrink-0" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="p-3 border-t border-white/5 bg-black/40 flex items-center justify-between text-[11px] text-slate-400 px-4">
          <div className="flex items-center gap-2">
            <Keyboard className="w-3.5 h-3.5 text-slate-500" />
            <span>Shortcuts:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono">P</kbd>
            <span>Plan</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono">D</kbd>
            <span>Destinations</span>
          </div>
          <span>Yaatri AI Studio</span>
        </div>
      </div>
    </div>
  );
};
