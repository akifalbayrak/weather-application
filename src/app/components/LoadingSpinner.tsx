'use client';

import { useLanguage } from '../contexts/LanguageContext';

export default function LoadingSpinner() {
  const { t } = useLanguage();

  return (
    <div className="flex justify-center items-center py-12">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full animate-pulse"></div>
        </div>
      </div>
      <span className="ml-4 text-white text-lg">{t.loadingText}</span>
    </div>
  );
} 