import React, { useState, useMemo } from 'react';
import { ArrowUpRight, Compass, MapPin, Sparkles, Filter, Search, RotateCcw } from 'lucide-react';

export interface DestinationItem {
  id: string;
  city: string;
  name: string;
  name_kannada: string;
  category: 'heritage' | 'coastal' | 'hills' | 'wildlife';
  image?: string;
  gradient: string;
  tag: string;
  tag_kn: string;
  desc: string;
  desc_kn: string;
}

export const destinationsData: DestinationItem[] = [
  // 1. Hampi
  {
    id: 'hampi',
    city: 'Hampi',
    name: 'Hampi Ruins & Boulder Trails',
    name_kannada: 'ಹಂಪಿಯ ಐತಿಹಾಸಿಕ ಶಿಲ್ಪಕಲೆ',
    category: 'heritage',
    image: '/images/hampi.jpg',
    gradient: 'from-amber-900/80 via-orange-950/60 to-[#0A0A0F]',
    tag: 'UNESCO Heritage',
    tag_kn: 'ವಿಶ್ವ ಪರಂಪರೆ',
    desc: 'Golden stone chariot, musical pillars, and ancient Vijayanagara empire ruins.',
    desc_kn: 'ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ವೈಭವ, ಕಲ್ಲಿನ ರಥ ಮತ್ತು ತುಂಗಭದ್ರಾ ನದಿಯ ತೀರ.'
  },
  // 2. Mysuru
  {
    id: 'mysuru',
    city: 'Mysuru',
    name: 'Mysore Palace & Royal Heritage',
    name_kannada: 'ಮೈಸೂರು ಅರಮನೆ & ಸಂಸ್ಕೃತಿ',
    category: 'heritage',
    image: '/images/mysore.jpg',
    gradient: 'from-amber-800/80 via-yellow-950/60 to-[#0A0A0F]',
    tag: 'Royal City',
    tag_kn: 'ರಾಜ ನಗರಿ',
    desc: 'Grand illuminated palace, Mysore Pak, sandalwood, and silk weaving legacy.',
    desc_kn: 'ಲಕ್ಷ ದೀಪಗಳ ಅರಮನೆ, ಅಸಲಿ ಮೈಸೂರು ಪಾಕ್ ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ರೇಷ್ಮೆ.'
  },
  // 3. Coorg
  {
    id: 'coorg',
    city: 'Bangalore',
    name: 'Coorg Coffee Hills & Waterfalls',
    name_kannada: 'ಕೊಡಗಿನ ಹಸಿರು ಗಿರಿಧಾಮಗಳು',
    category: 'hills',
    image: '/images/coorg.jpg',
    gradient: 'from-emerald-950/80 via-teal-950/60 to-[#0A0A0F]',
    tag: 'Western Ghats',
    tag_kn: 'ಪಶ್ಚಿಮ ಘಟ್ಟ',
    desc: 'Misty hills, aromatic arabica estates, Abbey waterfalls, and lush trekking trails.',
    desc_kn: 'ಮಂಜಿನ ಗಿರಿಶಿಖರಗಳು, ಸುಗಂಧಭರಿತ ಕಾಫಿ ತೋಟಗಳು ಮತ್ತು ಅಬ್ಬಿ ಜಲಪಾತ.'
  },
  // 4. Jog Falls
  {
    id: 'jog',
    city: 'Hubli',
    name: 'Jog Falls & Sharavathi Valley',
    name_kannada: 'ಜೋಗ ಜಲಪಾತ & ಶರಾವತಿ ಕಣಿವೆ',
    category: 'hills',
    image: '/images/jog.jpg',
    gradient: 'from-blue-950/80 via-slate-900/60 to-[#0A0A0F]',
    tag: 'Cascading Marvel',
    tag_kn: 'ರುದ್ರರಮಣೀಯ ಜಲಪಾತ',
    desc: 'India’s second-highest plunge waterfall dropping 830 feet through misty rocky chasms.',
    desc_kn: '830 ಅಡಿ ಎತ್ತರದಿಂದ ಧುಮ್ಮಿಕ್ಕುವ ನಾಲ್ಕು ಧಾರೆಯ ವಿಶ್ವವಿಖ್ಯಾತ ಜೋಗ ಜಲಪಾತ.'
  },
  // 5. Chikmagalur
  {
    id: 'chikmagalur',
    city: 'Chikmagalur',
    name: 'Chikmagalur & Mullayanagiri Peak',
    name_kannada: 'ಚಿಕ್ಕಮಗಳೂರು & ಮುಳ್ಳಯ್ಯನಗಿರಿ',
    category: 'hills',
    image: '/images/chikmagalur.jpg',
    gradient: 'from-emerald-900/80 via-green-950/60 to-[#0A0A0F]',
    tag: 'Highest Peak',
    tag_kn: 'ಎತ್ತರದ ಶಿಖರ',
    desc: '1,930m peak above the clouds, first coffee birthplace of India, and Hebbe forest cascades.',
    desc_kn: 'ಮೋಡಗಳ ಮೇಲಿರುವ ಅತ್ಯುನ್ನತ ಶಿಖರ, ಭಾರತದ ಪ್ರಥಮ ಕಾಫಿ ನಾಡು ಮತ್ತು ಹೆಬ್ಬೆ ಜಲಪಾತ.'
  },
  // 6. Gokarna
  {
    id: 'gokarna',
    city: 'Gokarna',
    name: 'Gokarna Om Beach & Cliff Hikes',
    name_kannada: 'ಗೋಕರ್ಣ ಓಂ ಬೀಚ್ & ಕ್ಲಿಫ್ ಟ್ರೆಕ್',
    category: 'coastal',
    image: '/images/gokarna.jpg',
    gradient: 'from-cyan-950/80 via-blue-950/60 to-[#0A0A0F]',
    tag: 'Sacred Coast',
    tag_kn: 'ಪವಿತ್ರ ಕಡಲತೀರ',
    desc: 'Natural Om-shaped coastline, cliff trails connecting Half Moon beach, and Atmalinga shrine.',
    desc_kn: 'ನೈಸರ್ಗಿಕ ಓಂ ಆಕಾರದ ಸಮುದ್ರ ತೀರ, ಬಂಡೆಗಳ ಚಾರಣ ಮತ್ತು ಪುರಾತನ ಮಹಾಬಲೇಶ್ವರ ಕ್ಷೇತ್ರ.'
  },
  // 7. Udupi & Malpe
  {
    id: 'udupi',
    city: 'Udupi',
    name: "Udupi Krishna Matha & St. Mary's",
    name_kannada: 'ಉಡುಪಿ ಶ್ರೀ ಕೃಷ್ಣ ಮಠ & ಸೇಂಟ್ ಮೇರಿಸ್',
    category: 'coastal',
    image: '/images/udupi.jpg',
    gradient: 'from-sky-950/80 via-indigo-950/60 to-[#0A0A0F]',
    tag: 'Volcanic Basalt',
    tag_kn: 'ಜ್ವಾಲಾಮುಖಿ ದ್ವೀಪ',
    desc: 'Prehistoric hexagonal basalt pillars in the sea, 13th-century Matha, and Goli Baje.',
    desc_kn: 'ಷಟ್ಕೋನ ಶಿಲೆಗಳ ಸಾಗರ ದ್ವೀಪ, ಶ್ರೀ ಕೃಷ್ಣನ ಕನಕನ ಕಿಂಡಿ ಮತ್ತು ಕರಾವಳಿಯ ಅಸಲಿ ತಿನಿಸುಗಳು.'
  },
  // 8. Badami & Pattadakal
  {
    id: 'badami',
    city: 'Badami',
    name: 'Badami Cave Temples & Pattadakal',
    name_kannada: 'ಬಾದಾಮಿ ಗುಹೆಗಳು & ಪಟ್ಟದಕಲ್ಲು',
    category: 'heritage',
    image: '/images/badami.jpg',
    gradient: 'from-rose-950/80 via-amber-950/60 to-[#0A0A0F]',
    tag: 'UNESCO Chalukya',
    tag_kn: 'ಚಾಲುಕ್ಯ ಪರಂಪರೆ',
    desc: '6th-century red sandstone rock-cut cave temples and royal coronation coronation shrines.',
    desc_kn: 'ಅಗಸ್ತ್ಯ ಸರೋವರದ ತೀರದಲ್ಲಿರುವ ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಗುಹೆಗಳು ಮತ್ತು ಯುನೆಸ್ಕೋ ಪಟ್ಟದಕಲ್ಲು.'
  },
  // 9. Belur & Halebidu
  {
    id: 'belur',
    city: 'Belur',
    name: 'Belur & Halebidu Hoysala Marvels',
    name_kannada: 'ಬೇಲೂರು & ಹಳೇಬೀಡು ಹೊಯ್ಸಳ ಶಿಲ್ಪ',
    category: 'heritage',
    image: '/images/belur.jpg',
    gradient: 'from-stone-900/80 via-amber-950/60 to-[#0A0A0F]',
    tag: 'Hoysala UNESCO',
    tag_kn: 'ಹೊಯ್ಸಳ ರತ್ನ',
    desc: 'Star-shaped soapstone platforms, intricate Madanika dancing sculptures, and elephant friezes.',
    desc_kn: 'ದರ್ಪಣ ಸುಂದರಿಯರ ಕಲ್ಲಿನ ಕೆತ್ತನೆ, ನಕ್ಷತ್ರಾಕಾರದ ಚೆನ್ನಕೇಶವ ದೇವಾಲಯ ಮತ್ತು ಹೊಯ್ಸಳ ವೈಭವ.'
  },
  // 10. Murudeshwar
  {
    id: 'murudeshwar',
    city: 'Murudeshwar',
    name: 'Murudeshwar Giant Shiva & Sea',
    name_kannada: 'ಮುರುಡೇಶ್ವರ ಮಹಾ ಶಿವನ ಸನ್ನಿಧಿ',
    category: 'coastal',
    image: '/images/murudeshwar.jpg',
    gradient: 'from-cyan-900/80 via-teal-950/60 to-[#0A0A0F]',
    tag: 'Colossal Shrine',
    tag_kn: 'ಮಹಾ ಸನ್ನಿಧಿ',
    desc: '123-ft coastal Shiva statue, 20-story Rajagopuram elevator, and Netrani coral scuba diving.',
    desc_kn: 'ಅರಬ್ಬೀ ಸಮುದ್ರದ ತೀರದಲ್ಲಿರುವ ಬೃಹತ್ ಶಿವನ ಪ್ರತಿಮೆ ಮತ್ತು ನೇತ್ರಾಣಿ ದ್ವೀಪದ ಹವಳ ತಾಣ.'
  },
  // 11. Dandeli
  {
    id: 'dandeli',
    city: 'Dandeli',
    name: 'Dandeli River Rafting & Wildlife',
    name_kannada: 'ದಾಂಡೇಲಿ ಕಾಳಿ ನದಿ & ವನ್ಯಧಾಮ',
    category: 'wildlife',
    image: '/images/dandeli.jpg',
    gradient: 'from-emerald-950/90 via-slate-900/60 to-[#0A0A0F]',
    tag: 'White Water Rapids',
    tag_kn: 'ರೋಮಾಂಚಕ ರಾಫ್ಟಿಂಗ್',
    desc: 'Grade 3/4 rapids on Kali river, Malabar hornbill canopies, and dense evergreen jungle safaris.',
    desc_kn: 'ಕಾಳಿ ನದಿಯಲ್ಲಿ ಸಾಹಸಿ ರಾಫ್ಟಿಂಗ್, ಹಾರ್ನ್‌ಬಿಲ್ ಪಕ್ಷಿ ಸಂಕುಲ ಮತ್ತು ದಟ್ಟ ಕಾನನ.'
  },
  // 12. Bandipur
  {
    id: 'bandipur',
    city: 'Bandipur',
    name: 'Bandipur & Kabini Tiger Reserves',
    name_kannada: 'ಬಂಡೀಪುರ & ಕಬಿನಿ ಹುಲಿ ಸಂರಕ್ಷಿತಾರಣ್ಯ',
    category: 'wildlife',
    image: '/images/bandipur.jpg',
    gradient: 'from-yellow-950/80 via-amber-950/60 to-[#0A0A0F]',
    tag: 'Big Cat Safari',
    tag_kn: 'ಹುಲಿ ಸಫಾರಿ',
    desc: 'Royal Bengal tigers, wild elephant herds, Nagarhole boat safari, and Gopalaswamy misty hills.',
    desc_kn: 'ಬಂಗಾಳದ ಹುಲಿಗಳು, ಆನೆ ಹಿಂಡುಗಳು ಮತ್ತು ಕಬಿನಿ ನದಿಯ ದೋಣಿ ಸಫಾರಿ.'
  },
  // 13. Agumbe
  {
    id: 'agumbe',
    city: 'Agumbe',
    name: 'Agumbe Rainforest & Cloud Valleys',
    name_kannada: 'ಆಗುಂಬೆ ಮಳೆಕಾಡು & ಸೂರ್ಯಾಸ್ತ',
    category: 'hills',
    image: '/images/agumbe.jpg',
    gradient: 'from-teal-950/90 via-emerald-950/60 to-[#0A0A0F]',
    tag: 'Cherrapunji of South',
    tag_kn: 'ದಕ್ಷಿಣದ ಚಿರಾಪುಂಜಿ',
    desc: 'Highest rainfall rainforest, King Cobra habitat, Kundadri Jain temple, and Arabian sea sunset.',
    desc_kn: 'ದಕ್ಷಿಣದ ಅತಿ ಹೆಚ್ಚು ಮಳೆ ಬೀಳುವ ತಾಣ, ಕುಂದಾದ್ರಿ ಬೆಟ್ಟ ಮತ್ತು ಕಣಿವೆಯ ಸೂರ್ಯಾಸ್ತ.'
  },
  // 14. Vijayapura
  {
    id: 'vijayapura',
    city: 'Vijayapura',
    name: 'Vijayapura Gol Gumbaz Whispering Dome',
    name_kannada: 'ವಿಜಯಪುರ ಗೋಲಗುಮ್ಮಟ & ಆದಿಲ್ ಶಾಹಿ',
    category: 'heritage',
    image: '/images/vijayapura.jpg',
    gradient: 'from-amber-950/80 via-orange-950/60 to-[#0A0A0F]',
    tag: 'Whispering Dome',
    tag_kn: 'ಪಿಸುಗುಟ್ಟುವ ಗುಮ್ಮಟ',
    desc: 'World’s 2nd largest unsupported dome echoing whispers 11 times, and Ibrahim Rauza palace.',
    desc_kn: 'ಯಾವುದೇ ಕಂಬಗಳಿಲ್ಲದ ವಿಶ್ವದ ಎರಡನೇ ಅತಿ ದೊಡ್ಡ ಗುಮ್ಮಟ ಮತ್ತು ದಖ್ಖನ್ ತಾಜ್ ಮಹಲ್.'
  }
];

interface DestinationShowcaseProps {
  lang: 'en' | 'kn';
  onSelectCity: (city: string) => void;
}

type DestinationCategory = 'all' | 'heritage' | 'coastal' | 'hills' | 'wildlife';

export const DestinationShowcase: React.FC<DestinationShowcaseProps> = ({ lang, onSelectCity }) => {
  const [activeCategory, setActiveCategory] = useState<DestinationCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered by category and search query
  const filteredDestinations = useMemo(() => {
    return destinationsData.filter((dest) => {
      const matchesCat = activeCategory === 'all' || dest.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        dest.name.toLowerCase().includes(q) ||
        dest.name_kannada.includes(q) ||
        dest.city.toLowerCase().includes(q) ||
        dest.desc.toLowerCase().includes(q) ||
        dest.tag.toLowerCase().includes(q);

      return matchesCat && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const categories: Array<{ id: DestinationCategory; labelEn: string; labelKn: string; count: number }> = [
    { id: 'all', labelEn: 'All Highlights', labelKn: 'ಎಲ್ಲಾ ತಾಣಗಳು', count: destinationsData.length },
    { id: 'heritage', labelEn: 'Heritage & Architecture', labelKn: 'ಪರಂಪರೆ & ಸ್ಮಾರಕ', count: destinationsData.filter(d => d.category === 'heritage').length },
    { id: 'coastal', labelEn: 'Coast & Beaches', labelKn: 'ಕಡಲತೀರ & ಬೀಚ್', count: destinationsData.filter(d => d.category === 'coastal').length },
    { id: 'hills', labelEn: 'Hills & Coffee', labelKn: 'ಗಿರಿಧಾಮ & ಕಾಫಿ', count: destinationsData.filter(d => d.category === 'hills').length },
    { id: 'wildlife', labelEn: 'Adventure & Wildlife', labelKn: 'ಸಾಹಸ & ವನ್ಯಜೀವಿ', count: destinationsData.filter(d => d.category === 'wildlife').length },
  ];

  return (
    <section id="destinations-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#FFD60A] uppercase">
            <span>✦</span>
            <span>{lang === 'kn' ? 'ಕರ್ನಾಟಕದ 14 ರಮಣೀಯ ತಾಣಗಳು' : '14 ICONIC KARNATAKA DESTINATIONS'}</span>
            <span>✦</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {lang === 'kn' ? 'ಕರ್ನಾಟಕವನ್ನು ಅನ್ವೇಷಿಸಿ' : 'Discover the Soul of Karnataka'}
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            {lang === 'kn'
              ? 'ಹೊಯ್ಸಳ ಶಿಲ್ಪಕಲೆ, ಕರಾವಳಿಯ ಪವಿತ್ರ ಕಡಲತೀರಗಳು, ಮಲೆನಾಡಿನ ಕಾಫಿ ಬೆಟ್ಟಗಳು ಮತ್ತು ದಟ್ಟ ವನ್ಯಧಾಮಗಳ ಪರಿಪೂರ್ಣ ಸಂಗ್ರಹ.'
              : 'From 6th-century rock-cut Chalukya caves to volcanic basalt islands and misty coffee peaks.'}
          </p>
        </div>

        {/* Live Search Input with accessibility label */}
        <div className="w-full md:w-72 relative">
          <label htmlFor="destination-search-input" className="sr-only">
            {lang === 'kn' ? 'ತಾಣ ಹುಡುಕಿ' : 'Search destination'}
          </label>
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="destination-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'kn' ? 'ತಾಣ ಹುಡುಕಿ (ಉದಾ: ಹಂಪಿ, ಬೀಚ್)...' : 'Filter spots (e.g. Hampi, Coorg)...'}
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#13131A] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E85D04] transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 pr-2">
          <Filter className="w-3.5 h-3.5 text-[#E85D04]" />
          <span>{lang === 'kn' ? 'ವರ್ಗಗಳು:' : 'Filter:'}</span>
        </div>

        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-[#E85D04] text-white shadow-md shadow-[#E85D04]/30'
                : 'bg-[#13131A] text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            <span>{lang === 'kn' ? cat.labelKn : cat.labelEn}</span>
            <span className="ml-1.5 text-[10px] opacity-75 font-mono">({cat.count})</span>
          </button>
        ))}
      </div>

      {/* Destinations Grid or Empty State */}
      {filteredDestinations.length === 0 ? (
        <div className="py-16 text-center space-y-4 rounded-3xl bg-[#13131A]/60 border border-white/10 p-8 max-w-lg mx-auto">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500">
            <Compass className="w-8 h-8 text-[#E85D04]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">
              {lang === 'kn' ? 'ಯಾವುದೇ ತಾಣಗಳು ಕಂಡುಬಂದಿಲ್ಲ' : 'No Matching Destinations Found'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {lang === 'kn'
                ? `"${searchQuery}" ಗೆ ಹೊಂದಿಕೆಯಾಗುವ ತಾಣಗಳಿಲ್ಲ. ದಯವಿಟ್ಟು ಬೇರೆ ಹೆಸರಿನೊಂದಿಗೆ ಹುಡುಕಿ.`
                : `We could not find any spot matching "${searchQuery}". Try searching for Hampi, Gokarna, or Mysore.`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{lang === 'kn' ? 'ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ' : 'Reset All Filters'}</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map((dest) => (
            <article
              key={dest.id}
              onClick={() => onSelectCity(dest.city)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#13131A] border border-white/10 hover:border-[#E85D04]/60 shadow-xl shadow-black/60 cursor-pointer transition-all duration-300 hover:scale-[1.02] flex flex-col justify-end"
            >
              {/* Background Photography or Themed Ambient Scrim */}
              {dest.image ? (
                <img
                  src={dest.image}
                  alt={`${dest.name} scenic photograph`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${dest.gradient} opacity-90 group-hover:opacity-100 transition-opacity`}>
                  <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-[#E85D04]/20 blur-2xl" />
                </div>
              )}

              {/* Dark Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/65 to-transparent opacity-95 group-hover:opacity-90 transition-opacity" />

              {/* Top Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full bg-[#13131A]/85 backdrop-blur-md border border-[#FFD60A]/30 text-[#FFD60A]">
                  {lang === 'kn' ? dest.tag_kn : dest.tag}
                </span>
              </div>

              {/* Top Right Action Arrow */}
              <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#E85D04] group-hover:text-white transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>

              {/* Bottom Content Card Info */}
              <div className="relative p-5 space-y-1.5 z-10">
                <div className="flex items-center gap-1.5 text-xs text-[#E85D04] font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{dest.city}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#FFD60A] transition-colors leading-snug">
                  {dest.name}
                </h3>

                <p className="text-xs font-semibold font-kannada text-amber-200/90">
                  {dest.name_kannada}
                </p>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed pt-1">
                  {lang === 'kn' ? dest.desc_kn : dest.desc}
                </p>

                <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-[#FFD60A] group-hover:translate-x-1 transition-transform">
                  <span>{lang === 'kn' ? 'ಪ್ರವಾಸ ಯೋಜನೆ ರಚಿಸಿ →' : 'Plan This Journey →'}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
