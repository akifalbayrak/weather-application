'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { weatherApi, GeoCity } from '../utils/weatherApi';

interface SearchBarProps {
  onSearch: (cityName: string) => void;
  onLocationClick: () => void;
}

export default function SearchBar({ onSearch, onLocationClick }: SearchBarProps) {
  const [cityName, setCityName] = useState('');
  const { t, language } = useLanguage();
  const [suggestions, setSuggestions] = useState<GeoCity[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!cityName.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setLoading(true);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(async () => {
      try {
        const results = await weatherApi.getGeoByCity(cityName, language, 5);
        setSuggestions(results);
        setShowSuggestions(true);
      } catch {
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setLoading(false);
      }
    }, 300);
    // Cleanup
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [cityName, language]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    if (showSuggestions) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSuggestions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityName.trim()) {
      onSearch(cityName.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: GeoCity) => {
    const label = suggestion.name + (suggestion.state ? ', ' + suggestion.state : '') + ', ' + suggestion.country;
    setCityName(label);
    onSearch(label);
    setShowSuggestions(false);
    if (inputRef.current) inputRef.current.blur();
  };

  return (
    <div ref={containerRef} className="mb-6 sm:mb-8 relative max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white/90 backdrop-blur-sm border border-white/20 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent text-sm sm:text-base"
            onFocus={() => cityName && suggestions.length > 0 && setShowSuggestions(true)}
            autoComplete="off"
            ref={inputRef}
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 mt-2 bg-white/90 backdrop-blur-md rounded-lg shadow-lg z-20 border border-white/30 max-h-60 overflow-y-auto">
              {suggestions.map((s, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-100 text-gray-800 text-sm border-b border-white/10 last:border-b-0"
                  onMouseDown={() => handleSuggestionClick(s)}
                >
                  {s.name}{s.state ? `, ${s.state}` : ''}, {s.country}
                </li>
              ))}
              {loading && (
                <li className="px-4 py-2 text-gray-400 italic">{t.loadingText}</li>
              )}
            </ul>
          )}
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