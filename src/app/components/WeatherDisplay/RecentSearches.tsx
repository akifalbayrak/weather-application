import { Translations } from '../../utils/translations';

interface RecentSearchesProps {
  recentSearches: string[];
  t: Translations;
  onCityClick: (cityName: string) => void;
  onRemoveCity: (cityName: string) => void;
}

export default function RecentSearches({ recentSearches, t, onCityClick, onRemoveCity }: RecentSearchesProps) {
  return (
    <div className="bg-gradient-to-br from-blue-700/60 to-purple-800/60 rounded-2xl p-4 sm:p-6 border border-white/20 shadow flex flex-col gap-2">
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="7" width="18" height="13" rx="2" fill="currentColor" className="text-blue-900" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 3v4M8 3v4M4 11h16" />
        </svg>
        {t.recentSearches}
      </h3>
      {recentSearches.length > 0 ? (
        <div className="space-y-2">
          {recentSearches.map((city, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
              <button
                onClick={() => onCityClick(city)}
                className="text-white font-medium text-base truncate w-full"
              >
                {city}
              </button>
              <button
                onClick={() => onRemoveCity(city)}
                className="p-1 text-red-300 hover:text-red-100 hover:bg-red-500/20 rounded-full transition-colors"
                title="Remove from recent searches"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[60px]">
          <p className="text-blue-100 text-base font-light text-center">{t.noRecentSearches}</p>
        </div>
      )}
    </div>
  );
} 