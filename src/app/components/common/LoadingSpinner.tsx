'use client';

import { useLanguage } from '../../contexts/LanguageContext';

export default function LoadingSpinner() {
  const { t } = useLanguage();

  return (
    <div className="flex justify-center items-center py-8 sm:py-12">
      <div className="relative">
        <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full animate-pulse"></div>
        </div>
      </div>
      <span className="ml-3 sm:ml-4 text-white text-base sm:text-lg">{t.loadingText}</span>
    </div>
  );
} 