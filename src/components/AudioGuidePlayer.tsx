import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Headphones, 
  Sparkles, 
  Check, 
  Languages,
  Radio
} from 'lucide-react';

interface AudioGuideStory {
  id: string;
  titleEn: string;
  titleKn: string;
  location: string;
  durationSec: number;
  scriptEn: string;
  scriptKn: string;
}

const audioStories: AudioGuideStory[] = [
  {
    id: 'hampi-chariot',
    titleEn: 'The Musical Pillars & Chariot of Hampi',
    titleKn: 'ಹಂಪಿಯ ಕಲ್ಲಿನ ರಥ ಮತ್ತು ಸಂಗೀತ ಸ್ತಂಭಗಳು',
    location: 'Hampi (Vijayanagara)',
    durationSec: 42,
    scriptEn: 'Welcome to the magnificent Vijaya Vittala temple in Hampi. Before you stands the iconic stone chariot, carved out of massive granite blocks to honor Garuda. Observe the intricate wheels—they once freely rotated upon granite axles. In the adjoining Ranga Mantapa, 56 slender granite pillars resonate with the seven musical swaras when tapped. Built during the golden reign of King Krishnadevaraya, this masterpiece celebrates the pinnacle of Karnataka craftsmanship.',
    scriptKn: 'ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ವಿಶ್ವವಿಖ್ಯಾತ ವಿಜಯ ವಿಠ್ಠಲ ದೇವಾಲಯಕ್ಕೆ ನಿಮಗೆ ಸುಸ್ವಾಗತ. ನಿಮ್ಮ ಮುಂದೆ ಕಂಗೊಳಿಸುತ್ತಿರುವ ಕಲ್ಲಿನ ರಥವು ಗ್ರಾನೈಟ್ ಶಿಲೆಯಿಂದ ಕೆತ್ತಲ್ಪಟ್ಟ ಗರುಡನ ವಾಹನವಾಗಿದೆ. ಇದರ ಪಕ್ಕದಲ್ಲಿರುವ ರಂಗ ಮಂಟಪದಲ್ಲಿ 56 ಸಂಗೀತ ಸ್ತಂಭಗಳಿವೆ. ಇವುಗಳನ್ನು ನವಿರಾಗಿ ಸ್ಪರ್ಶಿಸಿದರೆ ಸಪ್ತಸ್ವರಗಳು ಧ್ವನಿಸುತ್ತವೆ. ಶ್ರೀ ಕೃಷ್ಣದೇವರಾಯರ ಕಾಲದ ಈ ಶಿಲ್ಪಕಲೆಯು ಕರ್ನಾಟಕದ ಹೆಮ್ಮೆಯ ಸಂಕೇತವಾಗಿದೆ.'
  },
  {
    id: 'badami-caves',
    titleEn: 'Rock-Cut Sanctuaries of Badami & Agastya Lake',
    titleKn: 'ಬಾದಾಮಿ ಗುಹೆಗಳು ಮತ್ತು ಅಗಸ್ತ್ಯ ಸರೋವರ',
    location: 'Badami (Bagalkote)',
    durationSec: 38,
    scriptEn: 'Gaze upon the sheer red sandstone cliffs of Badami, the 6th-century cradle of Chalukyan rock-cut architecture. As you ascend the cliff stairs, Cave 1 unveils the cosmic Tandava of eighteen-armed Nataraja, illustrating eighty-one classical dance poses. Below the cliffs rests the emerald Agastya lake, believed to possess sacred therapeutic waters, flanked by the Bhutanatha temple reflecting against the sunset.',
    scriptKn: 'ಚಾಲುಕ್ಯ ರಾಜರು 6ನೇ ಶತಮಾನದಲ್ಲಿ ಕೆತ್ತಿದ ಬಾದಾಮಿಯ ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಗುಹೆಗಳಿಗೆ ಸುಸ್ವಾಗತ. ಮೊದಲ ಗುಹೆಯಲ್ಲಿ ಹದಿನೆಂಟು ತೋಳುಗಳ ನಾಟ್ಯ ಶಿವನ ಅದ್ಭುತ ಶಿಲ್ಪವಿದೆ. ಗುಹೆಗಳ ಕೆಳಗೆ ಅಗಸ್ತ್ಯ ಸರೋವರ ಶಾಂತವಾಗಿ ಹರಿಯುತ್ತಿದ್ದು, ಸಂಜೆಯ ಸೂರ್ಯಾಸ್ತದಲ್ಲಿ ಭೂತನಾಥ ದೇವಾಲಯದ ನೀರಿನ ಪ್ರತಿಬಿಂಬವು ಕಣ್ಮನ ಸೆಳೆಯುತ್ತದೆ.'
  },
  {
    id: 'mysore-palace',
    titleEn: 'The Golden Lights of Amba Vilas Mysore Palace',
    titleKn: 'ಮೈಸೂರು ಅರಮನೆಯ ಲಕ್ಷ ದೀಪಗಳ ದೀಪಾಲಂಕಾರ',
    location: 'Mysuru',
    durationSec: 40,
    scriptEn: 'You are standing before Amba Vilas Palace, the royal seat of the Wadiyar dynasty. Designed by architect Henry Irwin in Indo-Saracenic grandeur, the palace features turquoise stained glass ceilings imported from Glasgow, intricately carved teakwood pavilions, and solid silver doors. Every Sunday evening and during festive Dussehra, nearly one hundred thousand golden incandescent bulbs illuminate the palace facade in breathtaking harmony.',
    scriptKn: 'ಒಡೆಯರ್ ರಾಜವಂಶದ ರಾಜಭವನವಾದ ಮೈಸೂರಿನ ಅಂಬಾವಿಲಾಸ ಅರಮನೆಗೆ ಸುಸ್ವಾಗತ. ಇಂಡೋ-ಸಾರ್ಸೆನಿಕ್ ಶೈಲಿಯ ಈ ಭವ್ಯ ಅರಮನೆಯು ಗಾಜಿನ ಮೇಲ್ಛಾವಣಿಗಳು, ರೇಷ್ಮೆ ಕಲಾಕೃತಿಗಳು ಮತ್ತು ಬೆಳ್ಳಿಯ ದ್ವಾರಗಳಿಂದ ಕಂಗೊಳಿಸುತ್ತದೆ. ಪ್ರತಿ ಭಾನುವಾರ ಸಂಜೆ ಸುಮಾರು ಒಂದು ಲಕ್ಷ ಬಲ್ಬ್‌ಗಳಿಂದ ಬೆಳಗುವ ಈ ಅರಮನೆಯ ನೋಟವು ಜಗತ್ಪ್ರಸಿದ್ಧವಾಗಿದೆ.'
  },
  {
    id: 'st-marys',
    titleEn: "Prehistoric Hexagonal Basalt Columns of St. Mary's",
    titleKn: "ಸೇಂಟ್ ಮೇರಿಸ್ ಜ್ವಾಲಾಮುಖಿ ಷಟ್ಕೋನ ಶಿಲಾ ದ್ವೀಪ",
    location: 'Malpe, Udupi',
    durationSec: 35,
    scriptEn: 'Rising dramatically from the crystal-clear Arabian Sea, St. Mary’s Island is an extraordinary geological treasure. Over eighty-eight million years ago, when Madagascar detached from India, sub-aerial volcanic lava cooled under unique atmospheric pressures, cracking into geometric hexagonal columnar basalt pillars found nowhere else in South Asia.',
    scriptKn: 'ಉಡುಪಿಯ ಮಾಲ್ಪೆ ಕಡಲತೀರದಿಂದ ಬೋಟ್ ಮೂಲಕ ತಲುಪಬಹುದಾದ ಸೇಂಟ್ ಮೇರಿಸ್ ದ್ವೀಪವು ಜಿಯೋಲಾಜಿಕಲ್ ವಿಸ್ಮಯವಾಗಿದೆ. ಸುಮಾರು 88 ಮಿಲಿಯನ್ ವರ್ಷಗಳ ಹಿಂದೆ ಜ್ವಾಲಾಮುಖಿಯ ಲಾವಾರಸವು ತಣ್ಣಗಾಗಿ ನೈಸರ್ಗಿಕ ಷಟ್ಕೋನ ಕಂಬಗಳಾಗಿ ಮಾರ್ಪಟ್ಟ ಈ ದ್ವೀಪವು ಭಾರತದ ಅತ್ಯಂತ ಅಪರೂಪದ ಪ್ರಾಕೃತಿಕ ತಾಣವಾಗಿದೆ.'
  },
  {
    id: 'gol-gumbaz',
    titleEn: 'The Whispering Dome Physics of Gol Gumbaz',
    titleKn: 'ವಿಜಯಪುರದ ಗೋಲಗುಮ್ಮಟದ ಪಿಸುಗುಟ್ಟುವ ವೈಜ್ಞಾನಿಕ ವಿಸ್ಮಯ',
    location: 'Vijayapura (Bijapur)',
    durationSec: 36,
    scriptEn: 'Welcome to Gol Gumbaz, the mausoleum of Sultan Mohammed Adil Shah built in 1656. The colossal dome, spanning forty-four meters across, hangs suspended without a single central pillar. In the whispering gallery lining the interior dome, even the softest human whisper or breath ricochets distinctly eleven times across the acoustic hall.',
    scriptKn: '1656 ರಲ್ಲಿ ನಿರ್ಮಿಸಲಾದ ಸುಲ್ತಾನ್ ಮಹಮ್ಮದ್ ಆದಿಲ್ ಶಾಹಿ ಅವರ ಸಮಾಧಿ ಮಂದಿರವಾದ ಗೋಲಗುಮ್ಮಟಕ್ಕೆ ಸ್ವಾಗತ. ಯಾವುದೇ ಕಂಬಗಳಿಲ್ಲದೆ ನಿಂತಿರುವ ವಿಶ್ವದ ಎರಡನೇ ಅತಿ ದೊಡ್ಡ ಗುಮ್ಮಟವಿದು. ಒಳಗಿನ ಗ್ಯಾಲರಿಯಲ್ಲಿ ಪಿಸುಗುಟ್ಟಿದ ಸಣ್ಣ ಧ್ವನಿಯೂ 11 ಬಾರಿ ಸ್ಪಷ್ಟವಾಗಿ ಪ್ರತಿಧ್ವನಿಸುತ್ತದೆ.'
  }
];

export const AudioGuidePlayer: React.FC<{ lang: 'en' | 'kn' }> = ({ lang }) => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [speechSupported, setSpeechSupported] = useState(true);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressTimerRef = useRef<any>(null);

  const currentStory = audioStories[selectedStoryIndex] || audioStories[0];

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    } else {
      setSpeechSupported(false);
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      clearInterval(progressTimerRef.current);
    };
  }, []);

  const stopAudio = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    clearInterval(progressTimerRef.current);
    setIsPlaying(false);
    setCurrentProgress(0);
  };

  const playAudio = () => {
    if (!synthRef.current) {
      // Graceful simulated playback for iframes and browsers without Web Speech
      setIsPlaying(true);
      const startTime = Date.now();
      const estimatedDuration = (currentStory.durationSec * 1000) / playbackRate;

      progressTimerRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const pct = Math.min((elapsed / estimatedDuration) * 100, 100);
        setCurrentProgress(pct);
        if (pct >= 100) {
          clearInterval(progressTimerRef.current);
          setIsPlaying(false);
        }
      }, 100);
      return;
    }

    try {
      synthRef.current.cancel();
      clearInterval(progressTimerRef.current);

      const script = lang === 'kn' ? currentStory.scriptKn : currentStory.scriptEn;
      const utterance = new SpeechSynthesisUtterance(script);

      // Pick voice
      const voices = synthRef.current.getVoices();
      if (lang === 'kn') {
        const knVoice = voices.find(v => v.lang.startsWith('kn') || v.lang.includes('IN'));
        if (knVoice) utterance.voice = knVoice;
        utterance.lang = 'kn-IN';
      } else {
        const enVoice = voices.find(v => v.lang.startsWith('en-IN') || v.lang.startsWith('en'));
        if (enVoice) utterance.voice = enVoice;
        utterance.lang = 'en-IN';
      }

      utterance.rate = playbackRate;
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        setIsPlaying(true);
        const startTime = Date.now();
        const estimatedDuration = (currentStory.durationSec * 1000) / playbackRate;

        progressTimerRef.current = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const pct = Math.min((elapsed / estimatedDuration) * 100, 100);
          setCurrentProgress(pct);
          if (pct >= 100) {
            clearInterval(progressTimerRef.current);
            setIsPlaying(false);
          }
        }, 100);
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setCurrentProgress(100);
        clearInterval(progressTimerRef.current);
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        clearInterval(progressTimerRef.current);
      };

      utteranceRef.current = utterance;
      synthRef.current.speak(utterance);
    } catch (err) {
      console.warn('Speech playback fallback:', err);
      setIsPlaying(false);
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      playAudio();
    }
  };

  const handleSelectStory = (idx: number) => {
    stopAudio();
    setSelectedStoryIndex(idx);
  };

  return (
    <div className="rounded-2xl bg-[#13131A] border border-white/10 p-5 sm:p-6 space-y-6 shadow-xl shadow-black/60">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E85D04] tracking-wider uppercase">
            <Headphones className="w-4 h-4 text-[#E85D04]" />
            <span>{lang === 'kn' ? 'ದ್ವಿಭಾಷಾ ಆಡಿಯೋ ಗೈಡ್ ನಿರೂಪಣೆ' : 'Bilingual Cultural Audio Guide'}</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            {lang === 'kn' ? 'ಕರ್ನಾಟಕದ ಸ್ಮಾರಕಗಳ ಧ್ವನಿ ಸೌಂದರ್ಯ' : 'Voices of Karnataka Heritage'}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {/* Rate Selector */}
          <div className="flex items-center gap-1 bg-black/40 rounded-lg p-1 border border-white/10 text-xs">
            {[0.9, 1.0, 1.2].map((rate) => (
              <button
                key={rate}
                type="button"
                onClick={() => {
                  setPlaybackRate(rate);
                  if (isPlaying) {
                    stopAudio();
                  }
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer transition-colors ${
                  playbackRate === rate ? 'bg-[#E85D04] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>

          <div className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-slate-300">
            {lang === 'kn' ? 'ಕನ್ನಡ ಧ್ವನಿ' : 'English Voice'}
          </div>
        </div>
      </div>

      {/* Main Player Visualizer Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-black/80 via-[#1a120b] to-black/80 border border-[#E85D04]/30 space-y-4 shadow-inner">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFD60A]">
              📍 {currentStory.location}
            </span>
            <h4 className="text-lg sm:text-xl font-extrabold text-white">
              {lang === 'kn' ? currentStory.titleKn : currentStory.titleEn}
            </h4>
            <p className="text-xs text-slate-400">
              {lang === 'kn' ? 'ಅಧಿಕೃತ ಇತಿಹಾಸ & ವಾಸ್ತುಶಿಲ್ಪದ ರಹಸ್ಯಗಳು' : 'Historical folklore & architectural acoustics narrative'}
            </p>
          </div>

          {/* Play / Stop Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleTogglePlay}
              className={`px-5 py-3 rounded-xl flex items-center gap-2 font-bold text-sm text-white transition-all shadow-lg cursor-pointer ${
                isPlaying 
                  ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/30' 
                  : 'bg-[#E85D04] hover:bg-[#ff6e0f] shadow-[#E85D04]/30 hover:scale-105'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>{lang === 'kn' ? 'ನಿಲ್ಲಿಸಿ' : 'Stop Audio'}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>{lang === 'kn' ? 'ಆಡಿಯೋ ಆಲಿಸಿ' : 'Listen Now'}</span>
                </>
              )}
            </button>

            {currentProgress > 0 && (
              <button
                type="button"
                onClick={stopAudio}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white cursor-pointer"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Animated Waveform Bars */}
        <div className="flex items-end gap-1.5 h-10 pt-2 px-1">
          {[40, 75, 55, 90, 60, 100, 45, 80, 65, 95, 50, 85, 70, 40, 90, 60, 80, 50, 70, 85, 60, 45].map((height, i) => (
            <div
              key={i}
              className={`flex-1 rounded-full transition-all duration-300 ${
                isPlaying 
                  ? 'bg-gradient-to-t from-[#E85D04] to-[#FFD60A] animate-pulse' 
                  : 'bg-white/15'
              }`}
              style={{
                height: isPlaying ? `${Math.max(20, (height * (Math.sin(i + Date.now() / 300) + 1.2)) / 2)}%` : '20%'
              }}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="space-y-1">
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-[#E85D04] h-full transition-all duration-200" 
              style={{ width: `${currentProgress}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>{isPlaying ? 'Playing narrative...' : 'Ready'}</span>
            <span>~{currentStory.durationSec}s narration</span>
          </div>
        </div>
      </div>

      {/* Story Track Selection Grid */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          {lang === 'kn' ? 'ಆಡಿಯೋ ಟ್ರ್ಯಾಕ್ ಆಯ್ಕೆಮಾಡಿ:' : 'Select Landmark Audio Track:'}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {audioStories.map((story, idx) => {
            const isSelected = idx === selectedStoryIndex;
            return (
              <button
                key={story.id}
                type="button"
                onClick={() => handleSelectStory(idx)}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected 
                    ? 'bg-[#E85D04]/15 border-[#E85D04] text-white shadow-md shadow-[#E85D04]/20' 
                    : 'bg-black/30 border-white/10 text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">
                    {lang === 'kn' ? story.titleKn : story.titleEn}
                  </div>
                  <div className="text-[11px] text-[#FFD60A] truncate">
                    📍 {story.location}
                  </div>
                </div>
                <div className="shrink-0 text-slate-400">
                  {isSelected && isPlaying ? (
                    <Radio className="w-4 h-4 text-[#E85D04] animate-spin" />
                  ) : (
                    <Volume2 className="w-4 h-4 opacity-60" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
