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
    <div className="mb-8">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
        <div className="flex-1 relative">
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full px-4 py-3 rounded-lg bg-white/90 backdrop-blur-sm border border-white/20 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 transition-colors border border-white/20"
          >
            {t.searchButton}
          </button>
          <button
            type="button"
            onClick={onLocationClick}
            className="px-6 py-3 bg-blue-600/80 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors border border-blue-500/20"
          >
            📍 {t.locationButton}
          </button>
        </div>
      </form>
    </div>
  );
} 