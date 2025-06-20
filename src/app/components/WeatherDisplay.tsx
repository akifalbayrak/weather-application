'use client';

import Image from 'next/image';
import { WeatherData } from '../page';
import { weatherApi } from '../utils/weatherApi';
import { useLanguage } from '../contexts/LanguageContext';

interface WeatherDisplayProps {
  weatherData: WeatherData;
  recentSearches: string[];
  onCityClick: (cityName: string) => void;
  onRemoveCity: (cityName: string) => void;
}

export default function WeatherDisplay({ weatherData, recentSearches, onCityClick, onRemoveCity }: WeatherDisplayProps) {
  const { t } = useLanguage();

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {/* Main Weather Card */}
      <div className="sm:col-span-2 lg:col-span-1">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {weatherData.name}, {weatherData.sys.country}
            </h2>
            <div className="flex items-center justify-center mb-4">
              <Image
                src={weatherApi.getWeatherIconUrl(weatherData.weather[0].icon)}
                alt={weatherData.weather[0].description}
                width={80}
                height={80}
                className="w-16 h-16 sm:w-20 sm:h-20"
              />
              <div className="ml-3 sm:ml-4">
                <div className="text-3xl sm:text-4xl font-bold text-white">
                  {weatherApi.formatTemperature(weatherData.main.temp)}
                </div>
                <div className="text-base sm:text-lg text-blue-100 capitalize">
                  {weatherData.weather[0].description}
                </div>
              </div>
            </div>
            <div className="text-blue-100 text-sm sm:text-base">
              {t.temperature.feelsLike} {weatherApi.formatTemperature(weatherData.main.feels_like)}
            </div>
          </div>
        </div>
      </div>

      {/* Temperature Details */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">{t.temperature.title}</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-blue-100 text-sm sm:text-base">{t.temperature.high}</span>
            <span className="text-white font-semibold text-sm sm:text-base">{weatherApi.formatTemperature(weatherData.main.temp_max)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-100 text-sm sm:text-base">{t.temperature.low}</span>
            <span className="text-white font-semibold text-sm sm:text-base">{weatherApi.formatTemperature(weatherData.main.temp_min)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-100 text-sm sm:text-base">{t.temperature.humidity}</span>
            <span className="text-white font-semibold text-sm sm:text-base">{weatherData.main.humidity}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-100 text-sm sm:text-base">{t.temperature.pressure}</span>
            <span className="text-white font-semibold text-sm sm:text-base">{weatherData.main.pressure} hPa</span>
          </div>
        </div>
      </div>

      {/* Wind Information */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">{t.wind.title}</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-blue-100 text-sm sm:text-base">{t.wind.speed}</span>
            <span className="text-white font-semibold text-sm sm:text-base">{weatherData.wind.speed} m/s</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-100 text-sm sm:text-base">{t.wind.direction}</span>
            <span className="text-white font-semibold text-sm sm:text-base">{weatherApi.getWindDirection(weatherData.wind.deg)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-100 text-sm sm:text-base">{t.wind.visibility}</span>
            <span className="text-white font-semibold text-sm sm:text-base">{weatherApi.formatVisibility(weatherData.visibility)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-100 text-sm sm:text-base">{t.wind.cloudCover}</span>
            <span className="text-white font-semibold text-sm sm:text-base">{weatherData.clouds.all}%</span>
          </div>
        </div>
      </div>

      {/* Sun Times */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">{t.sun.title}</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-blue-100 text-sm sm:text-base">{t.sun.sunrise}</span>
            <span className="text-white font-semibold text-sm sm:text-base">{weatherApi.formatTime(weatherData.sys.sunrise)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-100 text-sm sm:text-base">{t.sun.sunset}</span>
            <span className="text-white font-semibold text-sm sm:text-base">{weatherApi.formatTime(weatherData.sys.sunset)}</span>
          </div>
        </div>
      </div>

      {/* Location Info */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">{t.location.title}</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-blue-100 text-sm sm:text-base">{t.location.latitude}</span>
            <span className="text-white font-semibold text-sm sm:text-base">{weatherData.coord.lat.toFixed(4)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-100 text-sm sm:text-base">{t.location.longitude}</span>
            <span className="text-white font-semibold text-sm sm:text-base">{weatherData.coord.lon.toFixed(4)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-100 text-sm sm:text-base">{t.location.timezone}</span>
            <span className="text-white font-semibold text-sm sm:text-base">UTC{weatherData.timezone >= 0 ? '+' : ''}{weatherData.timezone / 3600}</span>
          </div>
        </div>
      </div>

       {/* Recent Searches */}
       <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">{t.recentSearches}</h3>
        {recentSearches.length > 0 ? (
          <div className="space-y-2">
            {recentSearches.map((city, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/10 transition-colors">
                <button
                  onClick={() => onCityClick(city)}
                  className="flex-1 text-left text-blue-100 hover:text-white text-sm sm:text-base"
                >
                  <span className="truncate">{city}</span>
                </button>
                <button
                  onClick={() => onRemoveCity(city)}
                  className="ml-2 p-1 text-red-300 hover:text-red-100 hover:bg-red-500/20 rounded transition-colors"
                  title="Remove from recent searches"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-blue-200 text-xs sm:text-sm">{t.noRecentSearches}</p>
        )}
      </div>
    </div>
  );
} 