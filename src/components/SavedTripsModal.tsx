import React, { useState, useEffect } from 'react';
import { 
  Bookmark, 
  Trash2, 
  Calendar, 
  MapPin, 
  IndianRupee, 
  X, 
  ArrowRight, 
  Download, 
  Clock, 
  Compass,
  Sparkles
} from 'lucide-react';
import { SavedTripEntry, getSavedTrips, deleteTripFromVault } from '../lib/storage.ts';
import { exportItineraryToPDF } from '../lib/pdf-export.ts';
import { exportItineraryToICal } from '../lib/ical-export.ts';
import { ConfirmModal } from './ConfirmModal.tsx';

interface SavedTripsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTrip: (entry: SavedTripEntry) => void;
  lang: 'en' | 'kn';
}

export const SavedTripsModal: React.FC<SavedTripsModalProps> = ({
  isOpen,
  onClose,
  onSelectTrip,
  lang,
}) => {
  const [savedTrips, setSavedTrips] = useState<SavedTripEntry[]>([]);
  const [tripToDelete, setTripToDelete] = useState<SavedTripEntry | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSavedTrips(getSavedTrips());
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const confirmDelete = () => {
    if (!tripToDelete) return;
    const updated = deleteTripFromVault(tripToDelete.id);
    setSavedTrips(updated);
    setTripToDelete(null);
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="saved-trips-title"
      >
        <div 
          className="w-full max-w-2xl max-h-[85vh] rounded-3xl bg-[#13131A] border border-[#E85D04]/30 shadow-2xl shadow-black flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between gap-4 shrink-0 bg-[#161622]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E85D04]/20 border border-[#E85D04]/40 flex items-center justify-center text-[#FFD60A]">
                <Bookmark className="w-5 h-5" />
              </div>
              <div>
                <h2 id="saved-trips-title" className="text-lg font-bold text-white flex items-center gap-2">
                  <span>{lang === 'kn' ? 'ಉಳಿಸಲಾದ ಯಾತ್ರೆಗಳ ವಾಲ್ಟ್' : 'Saved Trips Vault'}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-[#FFD60A]">
                    {savedTrips.length}
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  {lang === 'kn' ? 'ಸ್ಥಳೀಯ ಮೆಮೊರಿಯಲ್ಲಿ ಸುರಕ್ಷಿತವಾಗಿ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ' : 'Stored securely in your local browser history'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Trips List / Empty State */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {savedTrips.length === 0 ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500">
                  <Compass className="w-8 h-8 text-[#E85D04]/60" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white">
                    {lang === 'kn' ? 'ಯಾವುದೇ ಉಳಿಸಿದ ಪ್ರವಾಸಗಳಿಲ್ಲ' : 'No Saved Trips Yet'}
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                    {lang === 'kn'
                      ? 'ವೇಳಾಪಟ್ಟಿ ಪುಟದಲ್ಲಿ "Save Trip" ಕ್ಲಿಕ್ ಮಾಡಿ ನಂತರದಲ್ಲಿ ಸುಲಭವಾಗಿ ತೆರೆಯಲು ಇಲ್ಲಿ ಸಂಗ್ರಹಿಸಿ.'
                      : 'Generate an itinerary and click "Save Trip" to store your favorite routes for offline access.'}
                  </p>
                </div>
              </div>
            ) : (
              savedTrips.map((trip) => {
                const formattedDate = new Date(trip.createdAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                });

                return (
                  <div
                    key={trip.id}
                    className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-[#E85D04]/50 transition-all space-y-3 shadow-lg group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#E85D04]/15 border border-[#E85D04]/30 text-[#FFD60A]">
                            {trip.daysCount} {lang === 'kn' ? 'ದಿನಗಳು' : 'Days'}
                          </span>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3 text-slate-500" />
                            {formattedDate}
                          </span>
                        </div>

                        <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#FFD60A] transition-colors leading-snug">
                          {lang === 'kn' && trip.titleKannada ? trip.titleKannada : trip.title}
                        </h3>

                        <div className="flex items-center gap-3 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#E85D04]" />
                            {trip.city}
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1 font-mono text-emerald-400">
                            <IndianRupee className="w-3 h-3" />
                            ₹{trip.totalBudgetInr.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      {/* Delete icon */}
                      <button
                        type="button"
                        onClick={() => setTripToDelete(trip)}
                        className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer shrink-0"
                        title={lang === 'kn' ? 'ಅಳಿಸಿ' : 'Delete from vault'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => exportItineraryToPDF(trip.itinerary, lang)}
                          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" />
                          <span>PDF</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => exportItineraryToICal(trip.itinerary, lang)}
                          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Calendar className="w-3 h-3" />
                          <span>.ICS</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          onSelectTrip(trip);
                          onClose();
                        }}
                        className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#E85D04] to-[#C44601] hover:from-[#FA6607] hover:to-[#E85D04] text-xs font-bold text-white shadow-md shadow-[#E85D04]/30 flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <span>{lang === 'kn' ? 'ತೆರೆಯಿರಿ' : 'Load Itinerary'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Confirmation before deletion */}
      <ConfirmModal
        isOpen={tripToDelete !== null}
        title={lang === 'kn' ? 'ಪ್ರವಾಸವನ್ನು ಅಳಿಸುವುದೇ?' : 'Delete Saved Trip?'}
        message={
          lang === 'kn'
            ? `ನೀವು "${tripToDelete?.title}" ಪ್ರವಾಸವನ್ನು ನಿಮ್ಮ ಸ್ಥಳೀಯ ಸಂಗ್ರಹದಿಂದ ಖಾಯಂ ಆಗಿ ಅಳಿಸಲು ಬಯಸುವಿರಾ?`
            : `Are you sure you want to permanently remove "${tripToDelete?.title}" from your saved trips vault?`
        }
        confirmLabel={lang === 'kn' ? 'ಹೌದು, ಅಳಿಸಿ' : 'Delete Trip'}
        cancelLabel={lang === 'kn' ? 'ರದ್ದು' : 'Cancel'}
        onConfirm={confirmDelete}
        onCancel={() => setTripToDelete(null)}
      />
    </>
  );
};
