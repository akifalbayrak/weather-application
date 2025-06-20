'use client';

import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface SearchBarProps {
  onSearch: (cityName: string) => void;
  onLocationClick: () => void;
}

export default function SearchBar({ onSearch, onLocationClick }: SearchBarProps) {
  const [cityName, setCityName] = useState('');
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityName.trim()) {
      onSearch(cityName.trim());
    }
  };

  return (
    <div className="mb-6 sm:mb-8">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-2xl mx-auto">
        <div className="flex-1 relative">
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white/90 backdrop-blur-sm border border-white/20 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent text-sm sm:text-base"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 transition-colors border border-white/20 text-sm sm:text-base"
          >
            {t.searchButton}
          </button>
          <button
            type="button"
            onClick={onLocationClick}
            className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 bg-blue-600/80 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors border border-blue-500/20 text-sm sm:text-base"
          >
            <span className="hidden sm:inline">📍 {t.locationButton}</span>
            <span className="sm:hidden">📍</span>
          </button>
        </div>
      </form>
    </div>
  );
} 