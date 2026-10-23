import React, { useState } from 'react';
import { 
  Utensils, 
  MapPin, 
  Clock, 
  IndianRupee, 
  Sparkles, 
  Flame, 
  Coffee,
  Heart,
  ExternalLink,
  Award
} from 'lucide-react';

interface EateryItem {
  id: string;
  name: string;
  nameKn: string;
  region: 'mysore' | 'coastal' | 'malenadu' | 'north';
  regionLabelEn: string;
  regionLabelKn: string;
  city: string;
  signatureDishEn: string;
  signatureDishKn: string;
  isVeg: boolean;
  priceForTwo: number;
  timings: string;
  tipEn: string;
  tipKn: string;
}

const foodTrailData: EateryItem[] = [
  {
    id: 'mylari',
    name: 'Original Vinayaka Mylari Hotel',
    nameKn: 'ವಿನಾಯಕ ಮೈಲಾರಿ ಹೋಟೆಲ್ (ಅಗ್ರಹಾರ)',
    region: 'mysore',
    regionLabelEn: 'Old Mysuru',
    regionLabelKn: 'ಹಳೆ ಮೈಸೂರು',
    city: 'Mysuru (Agrahara)',
    signatureDishEn: 'Mylari Butter Dosa with Sagu & Coconut Butter',
    signatureDishKn: 'ಮೈಲಾರಿ ಬೆಣ್ಣೆ ದೋಸೆ ಮತ್ತು ಸಾಗು',
    isVeg: true,
    priceForTwo: 180,
    timings: '06:30 AM – 01:30 PM & 03:00 PM – 08:30 PM',
    tipEn: 'Order with freshly churned white butter dollop; arrive before 8:30 AM to beat the queue.',
    tipKn: 'ಬಿಸಿ ಬಿಸಿ ಬೆಣ್ಣೆ ದೋಸೆಯನ್ನು ಸವಿಯಿರಿ; ಉದ್ದನೆಯ ಕ್ಯೂ ತಪ್ಪಿಸಲು ಮುಂಜಾನೆ 8:30 ಕ್ಕೂ ಮುನ್ನ ತೆರಳಿ.'
  },
  {
    id: 'guru-sweet',
    name: 'Guru Sweet Mart (Birthplace of Mysore Pak)',
    nameKn: 'ಗುರು ಸ್ವೀಟ್ ಮಾರ್ಟ್ (ಮೈಸೂರು ಪಾಕ್ ಉಗಮ ಸ್ಥಾನ)',
    region: 'mysore',
    regionLabelEn: 'Old Mysuru',
    regionLabelKn: 'ಹಳೆ ಮೈಸೂರು',
    city: 'Mysuru (Devaraja Market)',
    signatureDishEn: 'Original Melt-in-Mouth Royal Ghee Mysore Pak',
    signatureDishKn: 'ಅಸಲಿ ಶುದ್ಧ ತುಪ್ಪದ ಮೈಸೂರು ಪಾಕ್',
    isVeg: true,
    priceForTwo: 220,
    timings: '09:00 AM – 10:00 PM',
    tipEn: 'Crafted by royal descendants of Kakasura Madappa, the royal chef who invented the sweet in 1935.',
    tipKn: 'ರಾಜಮನೆತನದ ಅಡುಗೆಯವರಾದ ಕಾಕಾಸುರ ಮಾದಪ್ಪನವರ ವಂಶಸ್ಥರು ತಯಾರಿಸುವ ಅಸಲಿ ಮೈಸೂರು ಪಾಕ್.'
  },
  {
    id: 'mitra-samaj',
    name: 'Mitra Samaj Udupi',
    nameKn: 'ಮಿತ್ರ ಸಮಾಜ ಉಡುಪಿ',
    region: 'coastal',
    regionLabelEn: 'Karavali Coast',
    regionLabelKn: 'ಕರಾವಳಿ',
    city: 'Udupi (Car Street)',
    signatureDishEn: 'Udupi Goli Baje, Kadubu & Masala Dosa',
    signatureDishKn: 'ಗೋಲಿ ಬಜೆ, ಮೂಡೆ ಕಡುಬು ಮತ್ತು ತುಪ್ಪದ ಮಸಾಲೆ ದೋಸೆ',
    isVeg: true,
    priceForTwo: 160,
    timings: '06:00 AM – 09:30 PM',
    tipEn: 'Located right next to Sri Krishna Temple. Do not miss the evening piping hot Goli Baje batch at 4:30 PM.',
    tipKn: 'ಶ್ರೀ ಕೃಷ್ಣ ದೇವಾಲಯದ ರಥಬೀದಿಯಲ್ಲಿದೆ. ಸಂಜೆ 4:30 ಕ್ಕೆ ಬರುವ ಬಿಸಿ ಬಿಸಿ ಗೋಲಿ ಬಜೆ ಮಿಸ್ ಮಾಡಬೇಡಿ.'
  },
  {
    id: 'giri-manjas',
    name: "Giri Manja's Seafood",
    nameKn: 'ಗಿರಿ ಮಂಜಾಸ್ ಕರಾವಳಿ ಸೀಫುಡ್',
    region: 'coastal',
    regionLabelEn: 'Karavali Coast',
    regionLabelKn: 'ಕರಾವಳಿ',
    city: 'Mangaluru (Carstreet)',
    signatureDishEn: 'Anjal Tawa Fry & Traditional Boiled Rice Fish Curry',
    signatureDishKn: 'ಅಂಜಲ್ ತವಾ ಫ್ರೈ ಮತ್ತು ಕುಚಲಕ್ಕಿ ಊಟ',
    isVeg: false,
    priceForTwo: 500,
    timings: '11:30 AM – 03:30 PM (Lunch only)',
    tipEn: 'An iconic heritage house serving fresh morning catch in authentic Konkani and Tulu spices.',
    tipKn: 'ಮಂಗಳೂರಿನ ಪಾರಂಪರಿಕ ಮನೆಯಲ್ಲಿ ತಯಾರಾಗುವ ತಾಜಾ ಮೀನು ಊಟ; ಮಧ್ಯಾಹ್ನದ ಊಟಕ್ಕೆ ಮಾತ್ರ ತೆರೆಯುತ್ತದೆ.'
  },
  {
    id: 'vidyarthi-bhavan',
    name: 'Vidyarthi Bhavan Gandhi Bazaar',
    nameKn: 'ವಿದ್ಯಾರ್ಥಿ ಭವನ ಗಾಂಧಿ ಬಜಾರ್',
    region: 'mysore',
    regionLabelEn: 'Bengaluru Heritage',
    regionLabelKn: 'ಬೆಂಗಳೂರು',
    city: 'Bangalore (Basavanagudi)',
    signatureDishEn: 'Crispy Golden Masala Dosa & Foaming Filter Kaapi',
    signatureDishKn: 'ಗರಿಗರಿ ಮಸಾಲೆ ದೋಸೆ ಮತ್ತು ಘಮಘಮಿಸುವ ಫಿಲ್ಟರ್ ಕಾಫಿ',
    isVeg: true,
    priceForTwo: 200,
    timings: '06:30 AM – 11:30 AM & 02:00 PM – 08:00 PM (Closed Fridays)',
    tipEn: 'Serving since 1943. Watch the waiters balance up to 20 plates of dosa in a single arm stack!',
    tipKn: '1943 ರಿಂದ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿರುವ ಐತಿಹಾಸಿಕ ತಾಣ; ಒಂದೇ ಕೈಯಲ್ಲಿ 20 ದೋಸೆ ಪ್ಲೇಟ್ ಹೊರುವ ದೃಶ್ಯ ಅದ್ಭುತ.'
  },
  {
    id: 'basaveshwara-khanavali',
    name: 'Basaveshwara Khanavali Hubli',
    nameKn: 'ಬಸವೇಶ್ವರ ಖಾನಾವಳಿ ಹುಬ್ಬಳ್ಳಿ',
    region: 'north',
    regionLabelEn: 'North Karnataka',
    regionLabelKn: 'ಉತ್ತರ ಕರ್ನಾಟಕ',
    city: 'Hubli / Dharwad',
    signatureDishEn: 'Jolada Rotti Meals with Yennegai Brinjal & Shenga Chutney',
    signatureDishKn: 'ಬಿಸಿ ಜೋಳದ ರೊಟ್ಟಿ, ಎಣ್ಣೆಗಾಯಿ ಬದನೆಕಾಯಿ & ಶೇಂಗಾ ಚಟ್ನಿ',
    isVeg: true,
    priceForTwo: 250,
    timings: '11:00 AM – 04:00 PM & 07:00 PM – 10:30 PM',
    tipEn: 'Authentic Lingayat culinary tradition. Pair your hot puffed rotti with fresh buffalo curd and jaggery.',
    tipKn: 'ಉತ್ತರ ಕರ್ನಾಟಕದ ಅಪ್ಪಟ ಊಟ; ಬಿಸಿ ಜೋಳದ ರೊಟ್ಟಿಗೆ ಗಟ್ಟಿ ಮೊಸರು ಮತ್ತು ಬೆಲ್ಲವನ್ನು ಜೊತೆಯಾಗಿ ಸವಿಯಿರಿ.'
  },
  {
    id: 'coorg-cuisine',
    name: 'Taste of Coorg / Coorg Cuisine',
    nameKn: 'ಟೇಸ್ಟ್ ಆಫ್ ಕೊಡಗು',
    region: 'malenadu',
    regionLabelEn: 'Malenadu & Coorg',
    regionLabelKn: 'ಮಲೆನಾಡು & ಕೊಡಗು',
    city: 'Madikeri, Coorg',
    signatureDishEn: 'Akki Rotti with Kaad Mange Curry & Bamboo Shoot Fry',
    signatureDishKn: 'ಅಕ್ಕಿ ರೊಟ್ಟಿ, ಕಾಡು ಮಾವಿನಕಾಯಿ ಸಾರು & ಕಣಿಲೆ ಪಲ್ಯ',
    isVeg: true,
    priceForTwo: 350,
    timings: '12:00 PM – 09:30 PM',
    tipEn: 'Try dishes cooked with Kachampuli (Coorg wild black vinegar)—a signature flavor native to Kodagu.',
    tipKn: 'ಕೊಡಗಿನ ಸಾಂಪ್ರದಾಯಿಕ ಕಾಚಂಪುಳಿ ಹುಳಿಯೊಂದಿಗೆ ಸಿದ್ಧಪಡಿಸಿದ ಅಧಿಕೃತ ಖಾದ್ಯಗಳನ್ನು ಸವಿಯಿರಿ.'
  },
  {
    id: 'babu-singh-peda',
    name: 'Babu Singh Thakur Dharwad Peda',
    nameKn: 'ಬಾಬು ಸಿಂಗ್ ಠಾಕೂರ್ ಧಾರವಾಡ ಪೇಡಾ',
    region: 'north',
    regionLabelEn: 'North Karnataka',
    regionLabelKn: 'ಉತ್ತರ ಕರ್ನಾಟಕ',
    city: 'Dharwad (Line Bazaar)',
    signatureDishEn: 'Caramelized Buffalo Milk Dharwad Peda (GI Tagged)',
    signatureDishKn: 'ಜಿಐ ಟ್ಯಾಗ್ ಪಡೆದ ಅಪ್ಪಟ ಧಾರವಾಡ ಪೇಡಾ',
    isVeg: true,
    priceForTwo: 200,
    timings: '08:00 AM – 09:30 PM',
    tipEn: 'Dating back to 1912, slow-roasted over firewood with natural Dharwad buffalo milk and sugar dust.',
    tipKn: '1912 ರಿಂದ ಆರಂಭವಾದ ವಿಶ್ವಪ್ರಸಿದ್ಧ ಪೇಡಾ; ಕಟು ಸಕ್ಕರೆ ಮತ್ತು ಅಪ್ಪಟ ಹಾಲಿನಿಂದ ನೈಸರ್ಗಿಕವಾಗಿ ತಯಾರಿಸಲಾಗುತ್ತದೆ.'
  }
];

export const KarnatakaFoodTrail: React.FC<{ lang: 'en' | 'kn' }> = ({ lang }) => {
  const [activeRegion, setActiveRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEateries = foodTrailData.filter((item) => {
    const matchesRegion = activeRegion === 'all' || item.region === activeRegion;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.nameKn.includes(q) ||
      item.signatureDishEn.toLowerCase().includes(q) ||
      item.signatureDishKn.includes(q) ||
      item.city.toLowerCase().includes(q);

    return matchesRegion && matchesQuery;
  });

  return (
    <div className="rounded-2xl bg-[#13131A] border border-white/10 p-5 sm:p-6 space-y-6 shadow-xl shadow-black/60">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E85D04] tracking-wider uppercase">
            <Utensils className="w-4 h-4 text-[#E85D04]" />
            <span>{lang === 'kn' ? 'ಕರ್ನಾಟಕದ ರುಚಿ ವೈಭವ & ಐತಿಹಾಸಿಕ ತಾಣಗಳು' : 'Iconic Karnataka Gastronomy Trail'}</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            {lang === 'kn' ? 'ಲೆಜೆಂಡರಿ ಹೋಟೆಲ್‌ಗಳು & ಸಾಂಪ್ರದಾಯಿಕ ತಿನಿಸುಗಳು' : 'Legendary Eateries & Local Food Secrets'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'kn'
              ? 'ಮೈಲಾರಿ ಬೆಣ್ಣೆ ದೋಸೆಯಿಂದ ಧಾರವಾಡ ಪೇಡಾ ಮತ್ತು ಕರಾವಳಿ ತಿನಿಸುಗಳವರೆಗೆ ನೈಜ ರುಚಿಗಳು.'
              : 'From 1935 Mysore Pak birthplace to woodfired Dharwad pedas and Udupi temple breakfasts.'}
          </p>
        </div>

        {/* Search bar */}
        <div className="w-full md:w-64">
          <input
            type="text"
            placeholder={lang === 'kn' ? 'ಖಾದ್ಯ ಅಥವಾ ಹೋಟೆಲ್ ಹುಡುಕಿ...' : 'Search food or eatery...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3.5 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E85D04]"
          />
        </div>
      </div>

      {/* Region Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', en: 'All Regions', kn: 'ಎಲ್ಲಾ ಭಾಗಗಳು' },
          { id: 'mysore', en: 'Old Mysuru & Blr', kn: 'ಮೈಸೂರು & ಬೆಂಗಳೂರು' },
          { id: 'coastal', en: 'Karavali Coast', kn: 'ಕರಾವಳಿ' },
          { id: 'north', en: 'North Karnataka', kn: 'ಉತ್ತರ ಕರ್ನಾಟಕ' },
          { id: 'malenadu', en: 'Malenadu & Coorg', kn: 'ಮಲೆನಾಡು & ಕೊಡಗು' },
        ].map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveRegion(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeRegion === cat.id
                ? 'bg-[#E85D04] text-white shadow-md shadow-[#E85D04]/30'
                : 'bg-black/40 text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            {lang === 'kn' ? cat.kn : cat.en}
          </button>
        ))}
      </div>

      {/* Empty State when no match */}
      {filteredEateries.length === 0 ? (
        <div className="py-12 text-center text-xs text-slate-400 space-y-2">
          <div>No eateries matching "{searchQuery}".</div>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveRegion('all');
            }}
            className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredEateries.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-2xl bg-black/40 border border-white/10 hover:border-[#E85D04]/60 p-4 space-y-3 transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between shadow-lg"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-[#FFD60A]">
                  {lang === 'kn' ? item.regionLabelKn : item.regionLabelEn}
                </span>

                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border ${
                  item.isVeg 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                }`}>
                  {item.isVeg ? 'Pure Veg' : 'Non-Veg / Seafood'}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-[#FFD60A] transition-colors leading-snug">
                  {lang === 'kn' ? item.nameKn : item.name}
                </h4>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#E85D04] shrink-0" />
                  <span>{item.city}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <div className="text-[10px] font-bold text-[#FFD60A] uppercase tracking-wider flex items-center gap-1">
                  <Flame className="w-3 h-3 text-[#E85D04]" />
                  <span>{lang === 'kn' ? 'ಪ್ರಸಿದ್ಧ ತಿನಿಸು:' : 'Must-Try Signature:'}</span>
                </div>
                <div className="text-xs font-semibold text-white">
                  {lang === 'kn' ? item.signatureDishKn : item.signatureDishEn}
                </div>
              </div>

              <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                {lang === 'kn' ? item.tipKn : item.tipEn}
              </p>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1 text-slate-400 font-mono">
                <IndianRupee className="w-3 h-3 text-slate-500" />
                <span>~₹{item.priceForTwo} for 2</span>
              </div>

              <div className="flex items-center gap-1 text-slate-400 text-[10px]">
                <Clock className="w-3 h-3" />
                <span className="truncate max-w-[100px]">{item.timings.split('&')[0]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
};
