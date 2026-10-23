import React, { useState } from 'react';
import { 
  CloudSun, 
  Droplets, 
  Wind, 
  Thermometer, 
  Navigation, 
  Bus, 
  Train, 
  Car, 
  Sparkles,
  MapPin,
  Clock,
  SunMedium,
  CheckCircle2,
  Compass
} from 'lucide-react';

interface DestinationWeatherProps {
  currentCity: string;
  lang: 'en' | 'kn';
}

interface CityWeatherProfile {
  tempC: number;
  feelsLikeC: number;
  conditionEn: string;
  conditionKn: string;
  humidity: number;
  rainfallChance: number;
  uvIndex: number;
  windKmH: number;
  bestHoursEn: string;
  bestHoursKn: string;
  distanceFromBlrKm: number;
  travelTimeBus: string;
  travelTimeTrain: string;
  travelTimeCar: string;
  highwayTipEn: string;
  highwayTipKn: string;
}

const cityDataMap: Record<string, CityWeatherProfile> = {
  Bangalore: {
    tempC: 24,
    feelsLikeC: 25,
    conditionEn: 'Pleasant & Breezy',
    conditionKn: 'ತಂಪಾದ ಹಿತಕರ ವಾತಾವರಣ',
    humidity: 58,
    rainfallChance: 15,
    uvIndex: 5,
    windKmH: 14,
    bestHoursEn: '06:30 AM – 10:30 AM & 04:30 PM – 08:00 PM',
    bestHoursKn: 'ಬೆಳಿಗ್ಗೆ 06:30 – 10:30 & ಸಂಜೆ 04:30 – 08:00',
    distanceFromBlrKm: 0,
    travelTimeBus: 'Local BMTC / Metro',
    travelTimeTrain: 'Namma Metro / Suburban',
    travelTimeCar: 'City Ring Road (NICE)',
    highwayTipEn: 'Visit Cubbon Park & Vidhana Soudha during early morning hours before traffic peaks.',
    highwayTipKn: 'ಬೆಳಿಗ್ಗೆ ಸಂಚಾರ ದಟ್ಟಣೆಗೂ ಮುನ್ನ ಕಬ್ಬನ್ ಪಾರ್ಕ್ ಮತ್ತು ವಿಧಾನಸೌಧ ವೀಕ್ಷಿಸಿ.'
  },
  Mysuru: {
    tempC: 27,
    feelsLikeC: 28,
    conditionEn: 'Warm Sunshine & Mild Evening',
    conditionKn: 'ಬೆಚ್ಚನೆಯ ಬಿಸಿಲು & ತಂಪಾದ ಸಂಜೆ',
    humidity: 62,
    rainfallChance: 10,
    uvIndex: 6,
    windKmH: 11,
    bestHoursEn: '07:00 AM – 11:00 AM & 04:00 PM – 07:30 PM',
    bestHoursKn: 'ಬೆಳಿಗ್ಗೆ 07:00 – 11:00 & ಸಂಜೆ 04:00 – 07:30',
    distanceFromBlrKm: 145,
    travelTimeBus: '2.5 hrs (KSRTC Airavat)',
    travelTimeTrain: '1.5 hrs (Vande Bharat)',
    travelTimeCar: '2 hrs (Mysuru Expressway)',
    highwayTipEn: 'Stop at Maddur Tiffany’s on Bangalore-Mysuru expressway for piping hot Maddur Vada.',
    highwayTipKn: 'ಬೆಂಗಳೂರು-ಮೈಸೂರು ಎಕ್ಸ್‌ಪ್ರೆಸ್‌ವೇಯಲ್ಲಿ ಬಿಸಿ ಬಿಸಿ ಮದ್ದೂರು ವಡೆಗಾಗಿ ಮದ್ದೂರು ಟಿಫನೀಸ್‌ಗೆ ಭೇಟಿ ನೀಡಿ.'
  },
  Hampi: {
    tempC: 31,
    feelsLikeC: 33,
    conditionEn: 'Sunny & Crisp Boulder Skies',
    conditionKn: 'ಬಿಸಿಲು & ಸ್ಪಷ್ಟ ನೀಲಿ ಆಕಾಶ',
    humidity: 42,
    rainfallChance: 5,
    uvIndex: 8,
    windKmH: 16,
    bestHoursEn: '06:00 AM – 09:30 AM & 04:30 PM – 06:45 PM',
    bestHoursKn: 'ಮುಂಜಾನೆ 06:00 – 09:30 & ಸಂಜೆ 04:30 – 06:45',
    distanceFromBlrKm: 340,
    travelTimeBus: '6.5 hrs (KSRTC Sleeper)',
    travelTimeTrain: '5.5 hrs (Hampi Express)',
    travelTimeCar: '6 hrs via NH 50',
    highwayTipEn: 'Explore Vittala Temple and Matanga Hill at sunrise; rent a bicycle or moped early.',
    highwayTipKn: 'ಸೂರ್ಯೋದಯದ ಸಮಯದಲ್ಲಿ ವಿಠ್ಠಲ ದೇಗುಲ ಮತ್ತು ಮಾತಂಗ ಬೆಟ್ಟವನ್ನು ವೀಕ್ಷಿಸಿ; ಸೈಕಲ್ ಬಾಡಿಗೆಗೆ ಪಡೆಯಿರಿ.'
  },
  Coorg: {
    tempC: 20,
    feelsLikeC: 19,
    conditionEn: 'Misty Ghats & Coffee Fog',
    conditionKn: 'ಮಂಜಿನ ಕಾಫಿ ಬೆಟ್ಟಗಳು & ತಂಗಾಳಿ',
    humidity: 82,
    rainfallChance: 35,
    uvIndex: 4,
    windKmH: 12,
    bestHoursEn: '07:00 AM – 01:00 PM & 03:30 PM – 06:30 PM',
    bestHoursKn: 'ಬೆಳಿಗ್ಗೆ 07:00 – 01:00 & ಸಂಜೆ 03:30 – 06:30',
    distanceFromBlrKm: 250,
    travelTimeBus: '5.5 hrs (KSRTC Club Class)',
    travelTimeTrain: 'To Mysuru (1.5h) + Cab (2.5h)',
    travelTimeCar: '4.5 hrs via Kushalnagar',
    highwayTipEn: 'Pack a light fleece layer and waterproof shoes for Abbey and Iruppu falls.',
    highwayTipKn: 'ಅಬ್ಬಿ ಜಲಪಾತ ಮತ್ತು ಕಾಫಿ ತೋಟಗಳ ನಡಿಗೆಗೆ ಮಳೆ ಜಾಕೆಟ್ ಮತ್ತು ಜಲನಿರೋಧಕ ಶೂಗಳನ್ನು ಕೊಂಡೊಯ್ಯಿರಿ.'
  },
  Gokarna: {
    tempC: 29,
    feelsLikeC: 32,
    conditionEn: 'Tropical Coastal Breeze',
    conditionKn: 'ಕರಾವಳಿಯ ಉಲ್ಲಾಸದ ತಂಗಾಳಿ',
    humidity: 75,
    rainfallChance: 20,
    uvIndex: 7,
    windKmH: 18,
    bestHoursEn: '06:30 AM – 10:00 AM & 04:00 PM – 07:00 PM',
    bestHoursKn: 'ಮುಂಜಾನೆ 06:30 – 10:00 & ಸಂಜೆ 04:00 – 07:00',
    distanceFromBlrKm: 485,
    travelTimeBus: '9 hrs (Non-stop Sleeper)',
    travelTimeTrain: '8.5 hrs (Panchaganga Exp)',
    travelTimeCar: '8 hrs via NH 48 / NH 66',
    highwayTipEn: 'Trek between Kudle Beach and Om Beach during evening low tide for scenic cliff views.',
    highwayTipKn: 'ಸಂಜೆ ಕಡಿಮೆ ಉಬ್ಬರವಿಳಿತದ ಸಮಯದಲ್ಲಿ ಕುಡ್ಲೆ ಬೀಚ್‌ನಿಂದ ಓಂ ಬೀಚ್‌ಗೆ ಬಂಡೆಗಳ ಮೇಲೆ ಸುಲಭವಾಗಿ ಚಾರಣ ಮಾಡಿ.'
  },
  Udupi: {
    tempC: 28,
    feelsLikeC: 31,
    conditionEn: 'Warm Coastal & Ocean Mist',
    conditionKn: 'ಕರಾವಳಿಯ ತೀರ & ತೇವಾಂಶ',
    humidity: 78,
    rainfallChance: 25,
    uvIndex: 7,
    windKmH: 15,
    bestHoursEn: '06:00 AM – 10:30 AM & 04:00 PM – 07:30 PM',
    bestHoursKn: 'ಬೆಳಿಗ್ಗೆ 06:00 – 10:30 & ಸಂಜೆ 04:00 – 07:30',
    distanceFromBlrKm: 405,
    travelTimeBus: '7.5 hrs (KSRTC Airavat)',
    travelTimeTrain: '6 hrs (Vistadome Express)',
    travelTimeCar: '7 hrs via Shiradi Ghat',
    highwayTipEn: 'Take the scenic Vistadome train ride through Sakleshpur Western Ghats tunnels.',
    highwayTipKn: 'ಸಕಲೇಶಪುರ ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಸುರಂಗಗಳ ಮೂಲಕ ಸಾಗುವ ವಿಸ್ಟಾಡೋಮ್ ಗಾಜಿನ ರೈಲಿನಲ್ಲಿ ಪ್ರಯಾಣಿಸಿ.'
  },
  Badami: {
    tempC: 32,
    feelsLikeC: 34,
    conditionEn: 'Dry Warm & Golden Sun',
    conditionKn: 'ಒಣ ಬಿಸಿಲು & ಕೆಂಪು ಶಿಲೆಯ ಕಾಂತಿ',
    humidity: 38,
    rainfallChance: 5,
    uvIndex: 8,
    windKmH: 13,
    bestHoursEn: '06:30 AM – 09:30 AM & 04:30 PM – 06:30 PM',
    bestHoursKn: 'ಮುಂಜಾನೆ 06:30 – 09:30 & ಸಂಜೆ 04:30 – 06:30',
    distanceFromBlrKm: 450,
    travelTimeBus: '8.5 hrs (KSRTC Sleeper)',
    travelTimeTrain: '8 hrs (Gol Gumbaz Exp)',
    travelTimeCar: '7.5 hrs via NH 50',
    highwayTipEn: 'Climb Cave 4 at sunset for an iconic golden view over the red cliffs and Agastya Lake.',
    highwayTipKn: 'ಸೂರ್ಯಾಸ್ತದ ಸಮಯದಲ್ಲಿ 4ನೇ ಗುಹೆಯನ್ನು ಹತ್ತಿ ಅಗಸ್ತ್ಯ ಸರೋವರದ ರಮಣೀಯ ನೋಟವನ್ನು ಕಣ್ತುಂಬಿಕೊಳ್ಳಿ.'
  },
  Chikmagalur: {
    tempC: 22,
    feelsLikeC: 21,
    conditionEn: 'Cool Mountain Air & Mist',
    conditionKn: 'ಗಿರಿಶಿಖರದ ತಂಪಾದ ಮಂಜಿನ ಗಾಳಿ',
    humidity: 76,
    rainfallChance: 20,
    uvIndex: 5,
    windKmH: 14,
    bestHoursEn: '06:00 AM – 11:00 AM & 03:30 PM – 06:30 PM',
    bestHoursKn: 'ಮುಂಜಾನೆ 06:00 – 11:00 & ಸಂಜೆ 03:30 – 06:30',
    distanceFromBlrKm: 245,
    travelTimeBus: '4.5 hrs (KSRTC Airavat)',
    travelTimeTrain: '3.5 hrs to Birur + 40m Cab',
    travelTimeCar: '4 hrs via Hassan NH 75',
    highwayTipEn: 'Start by 5:30 AM for Mullayanagiri summit to walk above the early morning cloud inversion.',
    highwayTipKn: 'ಮೋಡಗಳ ಸಮುದ್ರವನ್ನು ಕಣ್ತುಂಬಿಕೊಳ್ಳಲು ಮುಳ್ಳಯ್ಯನಗಿರಿ ಶಿಖರಕ್ಕೆ ಮುಂಜಾನೆ 5:30 ಕ್ಕೆ ಹೊರಡಿ.'
  }
};

export const DestinationWeather: React.FC<DestinationWeatherProps> = ({ currentCity, lang }) => {
  const [selectedHub, setSelectedHub] = useState<string>(
    cityDataMap[currentCity] ? currentCity : 'Mysuru'
  );

  const weather = cityDataMap[selectedHub] || cityDataMap.Mysuru;

  return (
    <div className="rounded-2xl bg-[#13131A] border border-white/10 p-5 sm:p-6 space-y-6 shadow-xl shadow-black/60">
      {/* Title & Hub Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FFD60A] tracking-wider uppercase">
            <CloudSun className="w-4 h-4 text-[#FFD60A]" />
            <span>{lang === 'kn' ? 'ಲೈವ್ ಹವಾಮಾನ & ಪ್ರಯಾಣದ ಮಾಹಿತಿ' : 'Live Weather & Transit Distance'}</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            {lang === 'kn' ? `${selectedHub} ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ & ಸಾರಿಗೆ` : `${selectedHub} Climate & Transit Insights`}
          </h3>
        </div>

        {/* Quick Hub Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {Object.keys(cityDataMap).map((hub) => (
            <button
              key={hub}
              type="button"
              onClick={() => setSelectedHub(hub)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedHub === hub
                  ? 'bg-[#E85D04] text-white shadow-md shadow-[#E85D04]/30'
                  : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              {hub}
            </button>
          ))}
        </div>
      </div>

      {/* Weather Stats KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Temp Card */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>{lang === 'kn' ? 'ತಾಪಮಾನ' : 'Temperature'}</span>
            <Thermometer className="w-4 h-4 text-[#E85D04]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {weather.tempC}°C
          </div>
          <div className="text-[11px] text-amber-300 font-medium">
            {lang === 'kn' ? weather.conditionKn : weather.conditionEn}
          </div>
        </div>

        {/* Humidity Card */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>{lang === 'kn' ? 'ತೇವಾಂಶ' : 'Humidity'}</span>
            <Droplets className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {weather.humidity}%
          </div>
          <div className="text-[11px] text-slate-400">
            {lang === 'kn' ? 'ಹಿತಕರ ತಂಗಾಳಿ' : 'Optimal air moisture'}
          </div>
        </div>

        {/* Rain Probability Card */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>{lang === 'kn' ? 'ಮಳೆ ಸಾಧ್ಯತೆ' : 'Rain Chance'}</span>
            <CloudSun className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {weather.rainfallChance}%
          </div>
          <div className="text-[11px] text-emerald-400 font-medium">
            {weather.rainfallChance < 20 ? (lang === 'kn' ? 'ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ ದಿನ' : 'Clear exploring skies') : (lang === 'kn' ? 'ಲಘು ತುಂತುರು' : 'Occasional drizzle')}
          </div>
        </div>

        {/* Wind & UV Card */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>{lang === 'kn' ? 'ಗಾಳಿ & UV ಸೂಚ್ಯಂಕ' : 'Wind & UV Index'}</span>
            <Wind className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {weather.windKmH} <span className="text-xs font-normal text-slate-400">km/h</span>
          </div>
          <div className="text-[11px] text-slate-400">
            UV: {weather.uvIndex} / 10 ({weather.uvIndex > 6 ? (lang === 'kn' ? 'ಸನ್‌ಸ್ಕ್ರೀನ್ ಬಳಸಿ' : 'Sun protection advised') : (lang === 'kn' ? 'ಹಿತಕರ' : 'Mild UV')})
          </div>
        </div>
      </div>

      {/* Best Hours to Explore Banner */}
      <div className="p-3.5 rounded-xl bg-[#E85D04]/10 border border-[#E85D04]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-white">
          <Clock className="w-4 h-4 text-[#FFD60A] shrink-0" />
          <span className="font-semibold">
            {lang === 'kn' ? 'ವೀಕ್ಷಣೆಗೆ ಅತ್ಯುತ್ತಮ ಸಮಯ:' : 'Prime Exploration Window:'}
          </span>
          <span className="text-[#FFD60A] font-bold">
            {lang === 'kn' ? weather.bestHoursKn : weather.bestHoursEn}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>{lang === 'kn' ? 'ಕಡಿಮೆ ಬಿಸಿಲು & ಸುಂದರ ಛಾಯಾಗ್ರಹಣ' : 'Avoids peak midday heat & ideal lighting'}</span>
        </div>
      </div>

      {/* Transit Distance & Transport Comparison */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-bold text-white uppercase tracking-wider">
            {lang === 'kn' ? 'ಬೆಂಗಳೂರಿನಿಂದ ಪ್ರಯಾಣದ ಆಯ್ಕೆಗಳು & ಸಮಯ' : 'Travel Distance & Transit from Bengaluru Hub'}
          </span>
          <span className="font-mono text-[#E85D04] font-bold">
            {weather.distanceFromBlrKm > 0 ? `~${weather.distanceFromBlrKm} km distance` : 'Origin City Hub'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Train Card */}
          <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
              <Train className="w-4 h-4 text-cyan-400" />
              <span>{lang === 'kn' ? 'ರೈಲು ಮಾರ್ಗ' : 'Train / Express'}</span>
            </div>
            <div className="text-sm font-bold text-white">
              {weather.travelTimeTrain}
            </div>
            <div className="text-[11px] text-slate-400">
              {lang === 'kn' ? 'ಆರಾಮದಾಯಕ & ಸಮಯ ಉಳಿತಾಯ' : 'Vande Bharat / Intercity routes'}
            </div>
          </div>

          {/* Bus Card */}
          <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
              <Bus className="w-4 h-4 text-amber-400" />
              <span>{lang === 'kn' ? 'ಕೆಎಸ್ಆರ್‌ಟಿಸಿ ಬಸ್' : 'KSRTC Airavat'}</span>
            </div>
            <div className="text-sm font-bold text-white">
              {weather.travelTimeBus}
            </div>
            <div className="text-[11px] text-slate-400">
              {lang === 'kn' ? 'ರಾತ್ರಿ ಸ್ಲೀಪರ್ & ಕ್ಲಬ್ ಕ್ಲಾಸ್' : 'High frequency & sleeper coaches'}
            </div>
          </div>

          {/* Car / Cab Card */}
          <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
              <Car className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'kn' ? 'ಕಾರು / ಟ್ಯಾಕ್ಸಿ' : 'Self-Drive / Cab'}</span>
            </div>
            <div className="text-sm font-bold text-white">
              {weather.travelTimeCar}
            </div>
            <div className="text-[11px] text-slate-400">
              {lang === 'kn' ? 'ಹೈವೇ ಪ್ರವಾಸ & ಫೋಟೋ ಸ್ಟಾಪ್' : 'Scenic highway pitstops & flexible'}
            </div>
          </div>
        </div>
      </div>

      {/* Local Road-Trip Insider Tip */}
      <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5 text-xs text-slate-300">
        <Sparkles className="w-4 h-4 text-[#FFD60A] shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-white">{lang === 'kn' ? 'ಹೈವೇ ಸಲಹೆ: ' : 'Road Insider Tip: '}</span>
          <span>{lang === 'kn' ? weather.highwayTipKn : weather.highwayTipEn}</span>
        </div>
      </div>
    </div>
  );
};
