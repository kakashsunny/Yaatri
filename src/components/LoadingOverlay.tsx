import React, { useEffect, useState } from 'react';
import { Compass, Sparkles, MapPin } from 'lucide-react';

interface LoadingOverlayProps {
  lang: 'en' | 'kn';
  city: string;
}

const loadingSteps = [
  {
    en: 'ಯಾತ್ರಿ is exploring Karnataka for you...',
    kn: 'ಯಾತ್ರಿ ನಿಮಗಾಗಿ ಕರ್ನಾಟಕದ ಸುಂದರ ತಾಣಗಳನ್ನು ಶೋಧಿಸುತ್ತಿದೆ...',
  },
  {
    en: 'Finding hidden gems off the beaten path...',
    kn: 'ಅಜ್ಞಾತ ಮತ್ತು ನಿಸರ್ಗ ರಮಣೀಯ ತಾಣಗಳನ್ನು ಅನ್ವೇಷಿಸಲಾಗುತ್ತಿದೆ...',
  },
  {
    en: 'Curating authentic local food and cultural stops...',
    kn: 'ಕರಾವಳಿ ಮತ್ತು ಮಲೆನಾಡಿನ ಅಸಲಿ ರುಚಿಗಳನ್ನು ಜೋಡಿಸಲಾಗುತ್ತಿದೆ...',
  },
  {
    en: 'Calculating budget-optimized daily routes & maps...',
    kn: 'ಬಜೆಟ್ ಮತ್ತು ಪ್ರಯಾಣದ ಮಾರ್ಗಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...',
  },
  {
    en: 'Crafting your perfect adventure...',
    kn: 'ನಿಮ್ಮ ಅದ್ಭುತ ಪ್ರವಾಸದ ಯೋಜನೆ ರೂಪಿಸಲಾಗುತ್ತಿದೆ...',
  },
  {
    en: 'Almost ready...',
    kn: 'ಕ್ಷಣಾರ್ಧದಲ್ಲಿ ನಿಮ್ಮ ವೇಳಾಪಟ್ಟಿ ಸಿದ್ಧವಾಗಲಿದೆ...',
  },
];

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ lang, city }) => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % loadingSteps.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  const currentStep = loadingSteps[stepIndex];

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A0F]/95 backdrop-blur-xl px-4 text-center">
      <div className="relative mb-8">
        {/* Glowing pulse rings */}
        <div className="absolute inset-0 rounded-full bg-[#E85D04]/20 animate-ping duration-1000 scale-125" />
        <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#E85D04]/30 via-[#FFD60A]/20 to-[#1B4332]/30 blur-xl animate-pulse" />

        {/* Central Rotating Emblem */}
        <div className="relative w-24 h-24 rounded-3xl overflow-hidden bg-[#13131A] border border-[#E85D04]/40 flex items-center justify-center shadow-2xl shadow-[#E85D04]/30 p-2">
          <img
            src="/assets/aistudio/Orange_Y_Compass_Map_Pin_Icon_bd1d2893.png"
            alt="Yaatri"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain animate-pulse"
          />
        </div>
      </div>

      <div className="max-w-md space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/30 text-xs text-[#FFD60A] font-medium tracking-wide">
          <MapPin className="w-3.5 h-3.5 text-[#E85D04]" />
          <span>Starting from {city || 'Karnataka'}</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white transition-all duration-300">
          {lang === 'kn' ? currentStep.kn : currentStep.en}
        </h3>

        <p className="text-xs text-slate-400 font-kannada">
          {lang === 'kn' ? currentStep.en : currentStep.kn}
        </p>

        {/* Loading Progress Bar */}
        <div className="w-64 h-1.5 bg-slate-800 rounded-full mx-auto overflow-hidden mt-6">
          <div
            className="h-full bg-gradient-to-r from-[#E85D04] via-[#FFD60A] to-[#E85D04] animate-pulse rounded-full transition-all duration-500"
            style={{ width: `${Math.min(((stepIndex + 1) / loadingSteps.length) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
