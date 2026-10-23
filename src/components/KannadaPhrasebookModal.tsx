import React, { useState, useEffect } from 'react';
import { 
  Languages, 
  Volume2, 
  X, 
  Search, 
  Sparkles, 
  Heart, 
  Check, 
  Navigation, 
  Utensils, 
  ShoppingBag, 
  AlertCircle 
} from 'lucide-react';

interface PhraseItem {
  id: string;
  category: 'greetings' | 'transit' | 'food' | 'bargain' | 'emergency';
  kannada: string;
  kannadaScript: string;
  englishMeaning: string;
  pronunciationGuide: string;
  contextTip: string;
}

const phrasesData: PhraseItem[] = [
  // Greetings
  {
    id: 'p1',
    category: 'greetings',
    kannada: 'ನಮಸ್ಕಾರ',
    kannadaScript: 'Namaskara',
    englishMeaning: 'Hello / Greetings / Welcome',
    pronunciationGuide: 'Nuh-muh-skah-rah',
    contextTip: 'Traditional respectful greeting suitable for elders, temple priests, and hotel staff.',
  },
  {
    id: 'p2',
    category: 'greetings',
    kannada: 'ಊಟ ಆಯ್ತಾ?',
    kannadaScript: 'Oota aayitha?',
    englishMeaning: 'Did you eat? / How are you doing?',
    pronunciationGuide: 'Oo-tah aah-yee-thah',
    contextTip: 'The ultimate warm Kannada icebreaker! Asking this shows deep care and friendship.',
  },
  {
    id: 'p3',
    category: 'greetings',
    kannada: 'ತುಂಬಾ ಧನ್ಯವಾದಗಳು',
    kannadaScript: 'Thumba dhanyavaadagalu',
    englishMeaning: 'Thank you very much',
    pronunciationGuide: 'Thoom-bah dhun-yuh-vah-duh-guhl-oo',
    contextTip: 'Expresses sincere gratitude for homestay hosts and helpful tour guides.',
  },
  {
    id: 'p4',
    category: 'greetings',
    kannada: 'ಹೋಗಿ ಬರ್ತೀನಿ',
    kannadaScript: 'Hogi barthini',
    englishMeaning: 'Goodbye (Literally: "I will go and come back")',
    pronunciationGuide: 'Hoh-gee burr-thee-nee',
    contextTip: 'Kannada culture avoids saying "I leave permanently"; you always say you will return.',
  },

  // Transit & Directions
  {
    id: 'p5',
    category: 'transit',
    kannada: 'ದಯವಿಟ್ಟು ಇಲ್ಲಿ ನಿಲ್ಲಿಸಿ',
    kannadaScript: 'Dayavittu illi nillisi',
    englishMeaning: 'Please stop here',
    pronunciationGuide: 'Dhuh-yuh-vitt-oo ill-ee nil-liss-ee',
    contextTip: 'Use with auto-rickshaw drivers or KSRTC bus conductors at your drop point.',
  },
  {
    id: 'p6',
    category: 'transit',
    kannada: 'ಮೀಟರ್ ಹಾಕಿ ಸರ್',
    kannadaScript: 'Meter haaki sir',
    englishMeaning: 'Please turn on the meter, sir',
    pronunciationGuide: 'Mee-turr haah-kee sir',
    contextTip: 'Essential when boarding city auto-rickshaws in Bangalore or Mysore.',
  },
  {
    id: 'p7',
    category: 'transit',
    kannada: 'ಈ ದಾರಿ ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತೆ?',
    kannadaScript: 'Ee daari ellige hoguththe?',
    englishMeaning: 'Where does this road lead to?',
    pronunciationGuide: 'Ee daah-ree ell-ee-geh hoh-gooth-theh',
    contextTip: 'Handy when trekking rural trails in Western Ghats, Coorg, or Hampi boulders.',
  },

  // Food & Dining
  {
    id: 'p8',
    category: 'food',
    kannada: 'ಒಂದು ಕಪ್ ಬಿಸಿ ಫಿಲ್ಟರ್ ಕಾಫಿ ಕೊಡಿ',
    kannadaScript: 'Ondhu cup bisi filter kaapi kodi',
    englishMeaning: 'Please give one cup of hot filter coffee',
    pronunciationGuide: 'On-dhoo cup bee-see fill-turr kah-pee koh-dee',
    contextTip: 'Order at classic Darshinis across Bangalore, Mysore, and Chikmagalur.',
  },
  {
    id: 'p9',
    category: 'food',
    kannada: 'ಖಾರ ಕಮ್ಮಿ ಮಾಡಿ',
    kannadaScript: 'Khaara kammi maadi',
    englishMeaning: 'Make it less spicy, please',
    pronunciationGuide: 'Khah-rah kum-mee mah-dee',
    contextTip: 'Helpful when dining in North Karnataka khanavalis or fiery coastal curry houses.',
  },
  {
    id: 'p10',
    category: 'food',
    kannada: 'ಇಲ್ಲಿ ಪ್ರಸಿದ್ಧ ತಿನಿಸು ಯಾವುದು?',
    kannadaScript: 'Illi prasiddha thinisu yaavudhu?',
    englishMeaning: 'What is the signature famous dish here?',
    pronunciationGuide: 'Ill-ee pruh-sidd-huh thee-nee-soo yah-voo-dhoo',
    contextTip: 'Unlocks off-menu culinary gems from local chefs.',
  },

  // Shopping & Bargaining
  {
    id: 'p11',
    category: 'bargain',
    kannada: 'ಇದು ಎಷ್ಟು ರೂಪಾಯಿ?',
    kannadaScript: 'Idu eshtu roopayi?',
    englishMeaning: 'How much does this cost?',
    pronunciationGuide: 'Ee-dhoo esh-too roo-pah-yee',
    contextTip: 'Standard price inquiry at street bazaars, sandalwood emporiums, and fruit markets.',
  },
  {
    id: 'p12',
    category: 'bargain',
    kannada: 'ಸ್ವಲ್ಪ ಕಮ್ಮಿ ಮಾಡಿ',
    kannadaScript: 'Svalpa kammi maadi',
    englishMeaning: 'Please reduce the price a little bit',
    pronunciationGuide: 'Svul-pah kum-mee mah-dee',
    contextTip: 'Polite negotiation phrase when buying Channapatna wooden toys or spices.',
  },

  // Safety & Help
  {
    id: 'p13',
    category: 'emergency',
    kannada: 'ಸ್ವಲ್ಪ ಸಹಾಯ ಮಾಡಿ',
    kannadaScript: 'Svalpa sahaaya maadi',
    englishMeaning: 'Please help me',
    pronunciationGuide: 'Svul-pah sah-hah-yuh mah-dee',
    contextTip: 'Respectful appeal that immediately gathers friendly locals around you.',
  },
  {
    id: 'p14',
    category: 'emergency',
    kannada: 'ಇಲ್ಲಿ ಕುಡಿಯುವ ನೀರು ಸಿಗುತ್ತಾ?',
    kannadaScript: 'Illi kudiyuva neeru siguththe?',
    englishMeaning: 'Can I get safe drinking water here?',
    pronunciationGuide: 'Ill-ee koo-dee-yoo-vah nee-roo see-gooth-theh',
    contextTip: 'Useful while exploring ancient ruins in Hampi or Badami under the sun.',
  },
];

interface KannadaPhrasebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'kn';
}

export const KannadaPhrasebookModal: React.FC<KannadaPhrasebookModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const speakPhrase = (phrase: PhraseItem) => {
    setActiveAudioId(phrase.id);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(phrase.kannada);
        utterance.lang = 'kn-IN';
        utterance.rate = 0.85; // slightly slower for clean traveler listening

        const voices = window.speechSynthesis.getVoices();
        const knVoice = voices.find((v) => v.lang.startsWith('kn') || v.lang.includes('IN'));
        if (knVoice) utterance.voice = knVoice;

        utterance.onend = () => setActiveAudioId(null);
        utterance.onerror = () => setActiveAudioId(null);

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        // Fallback simulation timer
        setTimeout(() => setActiveAudioId(null), 1800);
      }
    } else {
      setTimeout(() => setActiveAudioId(null), 1800);
    }
  };

  const filteredPhrases = phrasesData.filter((p) => {
    const matchesCat = activeCategory === 'all' || p.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.kannada.includes(q) ||
      p.kannadaScript.toLowerCase().includes(q) ||
      p.englishMeaning.toLowerCase().includes(q) ||
      p.contextTip.toLowerCase().includes(q);

    return matchesCat && matchesSearch;
  });

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="phrasebook-title"
    >
      <div 
        className="w-full max-w-3xl max-h-[85vh] rounded-3xl bg-[#13131A] border border-[#FFD60A]/40 shadow-2xl shadow-black flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between gap-4 shrink-0 bg-[#161622]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E85D04] to-[#C44601] flex items-center justify-center text-white shadow-md shadow-[#E85D04]/30">
              <Languages className="w-5 h-5" />
            </div>
            <div>
              <h2 id="phrasebook-title" className="text-lg font-bold text-white flex items-center gap-2">
                <span>{lang === 'kn' ? 'ಕರ್ನಾಟಕ ಪ್ರವಾಸ ಕನ್ನಡ ನುಡಿಮುತ್ತುಗಳು' : 'Kannada Travel Phrasebook'}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFD60A]/10 text-[#FFD60A] border border-[#FFD60A]/30">
                  Audio Guide
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {lang === 'kn' ? 'ಧ್ವನಿ ಉಚ್ಚಾರಣೆ ಮತ್ತು ಸಾಂದರ್ಭಿಕ ಬಳಕೆ ಸಲಹೆಗಳೊಂದಿಗೆ' : 'Click the speaker icon to hear authentic spoken Kannada pronunciation'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close phrasebook"
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="p-4 sm:p-6 pb-2 space-y-4 shrink-0 border-b border-white/5">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === 'kn' ? 'ನುಡಿಗಟ್ಟು ಅಥವಾ ಅರ್ಥ ಹುಡುಕಿ (ಉದಾ: ಕಾಫಿ, ಮೀಟರ್, ನಮಸ್ಕಾರ)...' : 'Search phrase or meaning (e.g. coffee, meter, hello)...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E85D04]"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            {[
              { id: 'all', en: 'All Phrases', kn: 'ಎಲ್ಲಾ ನುಡಿಗಟ್ಟು' },
              { id: 'greetings', en: '👋 Greetings', kn: '👋 ಶುಭಾಶಯಗಳು' },
              { id: 'transit', en: '🚕 Auto & Transit', kn: '🚕 ಸಾರಿಗೆ & ಆಟೋ' },
              { id: 'food', en: '🍲 Food & Kaapi', kn: '🍲 ಊಟ & ಕಾಫಿ' },
              { id: 'bargain', en: '🛍️ Shopping', kn: '🛍️ ಖರೀದಿ' },
              { id: 'emergency', en: '🛡️ Safety & Help', kn: '🛡️ ಸಹಾಯ' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#E85D04] text-white shadow-md shadow-[#E85D04]/30'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                {lang === 'kn' ? cat.kn : cat.en}
              </button>
            ))}
          </div>
        </div>

        {/* Phrases Cards List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {filteredPhrases.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              No matching phrases found. Try clearing your search query.
            </div>
          ) : (
            filteredPhrases.map((phrase) => {
              const isPlaying = activeAudioId === phrase.id;
              return (
                <div
                  key={phrase.id}
                  className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-[#FFD60A]/40 transition-all space-y-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-base sm:text-lg font-bold font-kannada text-[#FFD60A]">
                        {phrase.kannada}
                      </span>
                      <span className="text-xs font-semibold text-slate-300">
                        ({phrase.kannadaScript})
                      </span>
                    </div>

                    <div className="text-xs font-medium text-white">
                      "{phrase.englishMeaning}"
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                      <span className="text-amber-300/90 font-mono">
                        Say: {phrase.pronunciationGuide}
                      </span>
                      <span>·</span>
                      <span className="italic text-slate-400">
                        💡 {phrase.contextTip}
                      </span>
                    </div>
                  </div>

                  {/* Audio Listen Button */}
                  <button
                    type="button"
                    onClick={() => speakPhrase(phrase)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer ${
                      isPlaying
                        ? 'bg-[#FFD60A] text-black shadow-lg shadow-[#FFD60A]/30 scale-105'
                        : 'bg-white/10 hover:bg-[#E85D04] text-white border border-white/15'
                    }`}
                  >
                    <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
                    <span>{isPlaying ? 'Speaking...' : 'Listen'}</span>
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
