import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Check, 
  Plus, 
  Trash2, 
  Sparkles, 
  ShieldAlert, 
  Shirt, 
  Compass, 
  SunMedium, 
  CloudRain,
  RotateCcw
} from 'lucide-react';
import { getStoredPackingList, setStoredPackingList, StoredPackingItem } from '../lib/storage.ts';
import { ConfirmModal } from './ConfirmModal.tsx';

interface ChecklistItem extends StoredPackingItem {}

const defaultItems: ChecklistItem[] = [
  { id: '1', category: 'clothing', labelEn: 'Modest temple attire (shoulders & knees covered for Udupi/Murudeshwar)', labelKn: 'ದೇವಸ್ಥಾನಗಳಿಗೆ ಸೂಕ್ತ ಸಾಂಪ್ರದಾಯಿಕ ಉಡುಪು (ಧೋತಿ/ಕುರ್ತಾ/ಸೀರೆ/ಸಭ್ಯ ವಸ್ತ್ರ)', checked: false, essential: true },
  { id: '2', category: 'clothing', labelEn: 'Comfortable slip-on walking shoes (easy to remove outside temple sanctums)', labelKn: 'ಸುಲಭವಾಗಿ ತೆಗೆಯಬಹುದಾದ ವಾಕಿಂಗ್ ಶೂ ಅಥವಾ ಚಪ್ಪಲಿ', checked: false, essential: true },
  { id: '3', category: 'nature', labelEn: 'Western Ghats leech socks & salt pouch (for Agumbe & Coorg trails)', labelKn: 'ಮಲೆನಾಡು & ಆಗುಂಬೆ ಚಾರಣಕ್ಕೆ ಜಿಗಣೆ ರಕ್ಷಣಾ ಕಾಲುಚೀಲಗಳು', checked: false, essential: true },
  { id: '4', category: 'nature', labelEn: 'Compact travel umbrella or lightweight rain poncho', labelKn: 'ಚಿಕ್ಕ ಛತ್ರಿ ಅಥವಾ ಹಗುರವಾದ ಮಳೆ ಕೋಟ್', checked: false },
  { id: '5', category: 'coastal', labelEn: 'High-SPF sun protection lotion & polarized sunglasses', labelKn: 'ಕರಾವಳಿ ಬಿಸಿಲಿಗೆ ಸನ್‌ಸ್ಕ್ರೀನ್ & ಸನ್‌ಗ್ಲಾಸ್', checked: false },
  { id: '6', category: 'coastal', labelEn: 'Quick-dry microfiber beach towel & waterproof pouch', labelKn: 'ಜಲನಿರೋಧಕ ಮೊಬೈಲ್ ಪೌಚ್ & ಟವೆಲ್', checked: false },
  { id: '7', category: 'gadgets', labelEn: '10,000mAh+ Power bank for full-day photo expeditions', labelKn: 'ಫೋಟೋ & ಮ್ಯಾಪ್ ಬಳಕೆಗಾಗಿ ಪವರ್ ಬ್ಯಾಂಕ್', checked: false, essential: true },
  { id: '8', category: 'gadgets', labelEn: 'Personal hydration flask (Karnataka eco-reserves ban single-use plastic)', labelKn: 'ಮರುಬಳಕೆಯ ನೀರಿನ ಬಾಟಲ್ (ಪ್ಲಾಸ್ಟಿಕ್ ಮುಕ್ತ ವಲಯ)', checked: false, essential: true },
];

export const SmartPackingGuide: React.FC<{ lang: 'en' | 'kn' }> = ({ lang }) => {
  const [items, setItems] = useState<ChecklistItem[]>(() => {
    const stored = getStoredPackingList();
    return stored && stored.length > 0 ? stored : defaultItems;
  });
  const [newItemText, setNewItemText] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    setStoredPackingList(items);
  }, [items]);

  const checkedCount = items.filter(i => i.checked).length;
  const progressPct = Math.round((checkedCount / Math.max(items.length, 1)) * 100);

  const toggleCheck = (id: string) => {
    setItems(items.map(i => i.id === id ? { ...i, checked: !i.checked } : i));
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      category: 'gadgets',
      labelEn: newItemText.trim(),
      labelKn: newItemText.trim(),
      checked: true,
    };

    setItems([...items, newItem]);
    setNewItemText('');
  };

  const resetChecklist = () => {
    setItems(defaultItems.map(i => ({ ...i, checked: false })));
    setShowResetConfirm(false);
  };

  return (
    <div className="rounded-2xl bg-[#13131A] border border-white/10 p-5 sm:p-6 space-y-6 shadow-xl shadow-black/60">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FFD60A] tracking-wider uppercase">
            <Briefcase className="w-4 h-4 text-[#FFD60A]" />
            <span>{lang === 'kn' ? 'ಸ್ಮಾರ್ಟ್ ಲಗೇಜ್ ಪ್ಯಾಕಿಂಗ್ & ನಿಯಮಗಳು' : 'Smart Packing Checklist & Eco-Etiquette'}</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            {lang === 'kn' ? 'ಪ್ರವಾಸದ ಸಿದ್ಧತೆ & ಅಗತ್ಯ ವಸ್ತುಗಳ ಪಟ್ಟಿ' : 'Karnataka Travel Gear & Cultural Readiness'}
          </h3>
        </div>

        <button
          type="button"
          onClick={() => setShowResetConfirm(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{lang === 'kn' ? 'ಮರುಹೊಂದಿಸಿ' : 'Reset List'}</span>
        </button>
      </div>

      {/* Progress Meter */}
      <div className="space-y-2 p-4 rounded-xl bg-black/40 border border-white/10">
        <div className="flex justify-between items-center text-xs">
          <span className="text-white font-semibold">
            {lang === 'kn' ? 'ಪ್ಯಾಕಿಂಗ್ ಸಿದ್ಧತೆ:' : 'Packing Progress:'}
          </span>
          <span className="font-mono text-[#FFD60A] font-bold">
            {checkedCount} / {items.length} {lang === 'kn' ? 'ವಸ್ತುಗಳು ಸಿದ್ಧ' : 'items packed'} ({progressPct}%)
          </span>
        </div>
        <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#E85D04] to-[#FFD60A] transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Checklist Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleCheck(item.id)}
            role="checkbox"
            aria-checked={item.checked}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                toggleCheck(item.id);
              }
            }}
            className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
              item.checked 
                ? 'bg-[#E85D04]/10 border-[#E85D04]/40 text-slate-200' 
                : 'bg-black/30 border-white/10 text-slate-400 hover:border-white/20'
            }`}
          >
            <div 
              className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                item.checked 
                  ? 'bg-[#E85D04] text-white shadow-md shadow-[#E85D04]/30' 
                  : 'bg-slate-800 border border-white/20'
              }`}
            >
              {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>

            <div className="min-w-0 flex-1">
              <div className={`text-xs ${item.checked ? 'line-through text-slate-400' : 'text-white font-medium'}`}>
                {lang === 'kn' ? item.labelKn : item.labelEn}
              </div>
              {item.essential && (
                <span className="inline-block mt-1 px-1.5 py-0.2 text-[9px] font-bold uppercase rounded bg-[#FFD60A]/10 text-[#FFD60A] border border-[#FFD60A]/30">
                  {lang === 'kn' ? 'ಅತ್ಯಗತ್ಯ' : 'Essential'}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Item */}
      <form onSubmit={handleAddItem} className="flex gap-2">
        <label htmlFor="custom-packing-input" className="sr-only">Add custom item</label>
        <input
          id="custom-packing-input"
          type="text"
          placeholder={lang === 'kn' ? 'ನಿಮ್ಮದೇ ವಸ್ತು ಸೇರಿಸಿ (ಉದಾ: ಪವರ್ ಬ್ಯಾಂಕ್ ಕೇಬಲ್)...' : 'Add custom packing item...'}
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E85D04]"
        />
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#ff6e0f] text-xs font-bold text-white transition-colors cursor-pointer shrink-0"
        >
          {lang === 'kn' ? 'ಸೇರಿಸಿ' : 'Add'}
        </button>
      </form>

      {/* Cultural Etiquette & Eco-Rule Banner */}
      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
        <ShieldAlert className="w-4 h-4 text-[#FFD60A] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-white">
            {lang === 'kn' ? 'ಕರ್ನಾಟಕ ಪರಂಪರೆ & ಪರಿಸರ ನೀತಿ ನಿಯಮಗಳು: ' : 'Karnataka Cultural Etiquette & Eco-Tourism Rules: '}
          </span>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            {lang === 'kn'
              ? 'ದೇವಾಲಯಗಳ ಗರ್ಭಗುಡಿಯ ಹೊರಗೆ ಪಾದರಕ್ಷೆ ಬಿಡಿ. ಬಂಡೀಪುರ ಮತ್ತು ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಅರಣ್ಯ ವಲಯಗಳಲ್ಲಿ ಪ್ಲಾಸ್ಟಿಕ್ ನಿಷೇಧ ಕಡ್ಡಾಯವಾಗಿದೆ.'
              : 'Remove footwear outside temple complexes. Plastic carry bags are strictly banned across Western Ghats reserve forests.'}
          </p>
        </div>
      </div>

      {/* Reset Confirmation */}
      <ConfirmModal
        isOpen={showResetConfirm}
        title={lang === 'kn' ? 'ಪ್ಯಾಕಿಂಗ್ ಪಟ್ಟಿಯನ್ನು ಮರುಹೊಂದಿಸುವುದೇ?' : 'Reset Packing Checklist?'}
        message={
          lang === 'kn'
            ? 'ಇದು ನಿಮ್ಮ ಎಲ್ಲಾ ಗುರುತುಗಳನ್ನು ಅಳಿಸಿ ಮೂಲ ಪಟ್ಟಿಗೆ ಮರುಹೊಂದಿಸುತ್ತದೆ.'
            : 'This will uncheck all items and restore the initial packing recommendations.'
        }
        confirmLabel={lang === 'kn' ? 'ಹೌದು, ಮರುಹೊಂದಿಸಿ' : 'Reset List'}
        cancelLabel={lang === 'kn' ? 'ರದ್ದು' : 'Cancel'}
        onConfirm={resetChecklist}
        onCancel={() => setShowResetConfirm(false)}
      />
    </div>
  );
};
