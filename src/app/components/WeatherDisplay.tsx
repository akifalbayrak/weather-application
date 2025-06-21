'use client';

import Image from 'next/image';
import { WeatherData, ForecastData, AirPollutionData } from '../utils/weatherApi';
import { weatherApi } from '../utils/weatherApi';
import { useLanguage } from '../contexts/LanguageContext';

interface WeatherDisplayProps {
  weatherData: WeatherData;
  forecastData?: ForecastData | null;
  airPollutionData?: AirPollutionData | null;
  weatherMapUrl?: string | null;
  recentSearches: string[];
  onCityClick: (cityName: string) => void;
  onRemoveCity: (cityName: string) => void;
}

export default function WeatherDisplay({ weatherData, forecastData, airPollutionData, weatherMapUrl, recentSearches, onCityClick, onRemoveCity }: WeatherDisplayProps) {
  const { t } = useLanguage();

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {/* Main Weather Card */}
      <div className="sm:col-span-2 lg:col-span-1">
        <div className="bg-gradient-to-br from-blue-700/70 to-purple-800/70 rounded-2xl p-6 border border-white/20 shadow-xl flex flex-col items-center">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
              <svg className="w-7 h-7 text-yellow-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="currentColor" className="text-yellow-300" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95-7.07l-1.41 1.41M6.05 17.95l-1.41 1.41M17.95 17.95l-1.41-1.41M6.05 6.05L4.64 4.64" /></svg>
              {weatherData.name}, {weatherData.sys.country}
            </h2>
            <div className="flex items-center justify-center mb-4">
              <Image
                src={weatherApi.getWeatherIconUrl(weatherData.weather[0].icon)}
                alt={weatherData.weather[0].description}
                width={80}
                height={80}
                className="w-20 h-20 drop-shadow-lg"
              />
              <div className="ml-4">
                <div className="text-4xl font-bold text-white">
                  <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400/80 to-orange-500/80 text-white shadow">
                    {weatherApi.formatTemperature(weatherData.main.temp)}
                  </span>
                </div>
                <div className="text-lg text-blue-100 capitalize font-semibold mt-2">
                  {weatherData.weather[0].description}
                </div>
              </div>
            </div>
            <div className="text-blue-100 text-base font-medium">
              {t.temperature.feelsLike} <span className="font-bold text-white">{weatherApi.formatTemperature(weatherData.main.feels_like)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Temperature Details */}
      <div className="bg-gradient-to-br from-blue-700/60 to-purple-800/60 rounded-2xl p-4 sm:p-6 border border-white/20 shadow flex flex-col gap-2">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-orange-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3" /></svg>
          {t.temperature.title}
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-blue-100 text-base">{t.temperature.high}</span>
            <span className="text-white font-semibold text-base">{weatherApi.formatTemperature(weatherData.main.temp_max)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-100 text-base">{t.temperature.low}</span>
            <span className="text-white font-semibold text-base">{weatherApi.formatTemperature(weatherData.main.temp_min)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-100 text-base">{t.temperature.humidity}</span>
            <span className="text-white font-semibold text-base">{weatherData.main.humidity}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-100 text-base">{t.temperature.pressure}</span>
            <span className="text-white font-semibold text-base">{weatherData.main.pressure} hPa</span>
          </div>
        </div>
      </div>

      {/* Wind Information */}
      <div className="bg-gradient-to-br from-blue-700/60 to-purple-800/60 rounded-2xl p-4 sm:p-6 border border-white/20 shadow flex flex-col gap-2">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0l-4.243 4.243" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11V7a2 2 0 10-4 0v4m4 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          {t.wind.title}
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-blue-100 text-base">{t.wind.speed}</span>
            <span className="text-white font-semibold text-base flex items-center gap-1">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0l-4.243 4.243" /></svg>
              {weatherData.wind.speed} m/s
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-100 text-base">{t.wind.direction}</span>
            <span className="text-white font-semibold text-base">{weatherApi.getWindDirection(weatherData.wind.deg)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-100 text-base">{t.wind.visibility}</span>
            <span className="text-white font-semibold text-base">{weatherApi.formatVisibility(weatherData.visibility)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-100 text-base">{t.wind.cloudCover}</span>
            <span className="text-white font-semibold text-base">{weatherData.clouds.all}%</span>
          </div>
        </div>
      </div>

      {/* Sun Times */}
      <div className="bg-gradient-to-br from-blue-700/60 to-purple-800/60 rounded-2xl p-4 sm:p-6 border border-white/20 shadow flex flex-col gap-2">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-yellow-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="currentColor" className="text-yellow-300" /></svg>
          {t.sun.title}
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-blue-100 text-base">{t.sun.sunrise}</span>
            <span className="text-white font-semibold text-base">{weatherApi.formatTime(weatherData.sys.sunrise)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-100 text-base">{t.sun.sunset}</span>
            <span className="text-white font-semibold text-base">{weatherApi.formatTime(weatherData.sys.sunset)}</span>
          </div>
        </div>
      </div>

      {/* Location Info */}
      <div className="bg-gradient-to-br from-blue-700/60 to-purple-800/60 rounded-2xl p-4 sm:p-6 border border-white/20 shadow flex flex-col gap-2">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="currentColor" className="text-green-300" /></svg>
          {t.location.title}
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-blue-100 text-base">{t.location.latitude}</span>
            <span className="text-white font-semibold text-base">{weatherData.coord.lat.toFixed(4)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-100 text-base">{t.location.longitude}</span>
            <span className="text-white font-semibold text-base">{weatherData.coord.lon.toFixed(4)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-100 text-base">{t.location.timezone}</span>
            <span className="text-white font-semibold text-base">UTC{weatherData.timezone >= 0 ? '+' : ''}{weatherData.timezone / 3600}</span>
          </div>
        </div>
      </div>

      {/* Recent Searches */}
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
                  className="text-white font-medium text-base truncate"
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


      {/* Weather Forecast Section */}
      {forecastData && forecastData.list && (
        <div className="bg-gradient-to-br from-blue-800/60 to-purple-700/60 rounded-2xl p-4 sm:p-6 border border-white/20 col-span-full shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2">
            <svg className="w-7 h-7 text-yellow-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414M17.95 17.95l-1.414-1.414M6.05 6.05L4.636 4.636" /></svg>
            {t.forecastTitle}
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-white text-base rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/60">
                  <th className="px-4 py-3 font-semibold text-left rounded-tl-xl">{t.forecastDateTime}</th>
                  <th className="px-4 py-3 font-semibold text-left">{t.temperature.title}</th>
                  <th className="px-4 py-3 font-semibold text-left">{t.forecastWeather}</th>
                  <th className="px-4 py-3 font-semibold text-left rounded-tr-xl">{t.wind.speed}</th>
                </tr>
              </thead>
              <tbody>
                {forecastData.list.slice(0, 8).map((item: ForecastData['list'][number], idx: number) => (
                  <tr key={idx} className="transition hover:bg-blue-800/30 border-b border-white/10">
                    <td className="px-4 py-3 whitespace-nowrap font-mono text-lg font-medium text-blue-200">
                      {weatherApi.formatTime(item.dt)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400/80 to-orange-500/80 text-white font-bold shadow">
                        {weatherApi.formatTemperature(item.main.temp)}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex items-center gap-2 capitalize">
                      <Image
                        src={weatherApi.getWeatherIconUrl(item.weather[0].icon)}
                        alt={item.weather[0].description}
                        className="w-8 h-8 drop-shadow"
                        width={32}
                        height={32}
                      />
                      <span className="text-blue-100 font-semibold">{item.weather[0].description}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 font-semibold text-blue-300">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0l-4.243 4.243M15 11V7a2 2 0 10-4 0v4m4 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        {item.wind.speed} m/s
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Air Pollution Section */}
      {airPollutionData && airPollutionData.list && airPollutionData.list.length > 0 && (
        <div className="bg-gradient-to-br from-green-700/60 to-blue-700/60 rounded-2xl p-4 sm:p-6 border border-white/20 col-span-full shadow-xl mt-4">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2">
            <svg className="w-7 h-7 text-green-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="currentColor" className="text-green-300" /><path strokeLinecap="round" strokeLinejoin="round" d="M2 12h2m16 0h2M12 2v2m0 16v2m4.24-13.66l-1.42 1.42M6.34 17.66l-1.42 1.42M17.66 17.66l-1.42-1.42M6.34 6.34L4.92 4.92" /></svg>
            {t.airPollutionTitle}
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-white text-base rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-green-900/60">
                  <th className="px-4 py-3 font-semibold text-left rounded-tl-xl">{t.forecastDateTime}</th>
                  <th className="px-4 py-3 font-semibold text-left">AQI</th>
                  <th className="px-4 py-3 font-semibold text-left">CO</th>
                  <th className="px-4 py-3 font-semibold text-left">NO</th>
                  <th className="px-4 py-3 font-semibold text-left">NO₂</th>
                  <th className="px-4 py-3 font-semibold text-left">O₃</th>
                  <th className="px-4 py-3 font-semibold text-left">SO₂</th>
                  <th className="px-4 py-3 font-semibold text-left">PM2.5</th>
                  <th className="px-4 py-3 font-semibold text-left">PM10</th>
                  <th className="px-4 py-3 font-semibold text-left rounded-tr-xl">NH₃</th>
                </tr>
              </thead>
              <tbody>
                {airPollutionData.list.slice(0, 8).map((item: AirPollutionData['list'][number], idx: number) => (
                  <tr key={idx} className="transition hover:bg-green-800/30 border-b border-white/10">
                    <td className="px-4 py-3 whitespace-nowrap font-mono text-lg font-medium text-green-200">
                      {weatherApi.formatTime(item.dt)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-green-400/80 to-blue-500/80 text-white font-bold shadow">
                        {item.main.aqi}
                      </span>
                    </td>
                    <td className="px-4 py-3">{item.components.co}</td>
                    <td className="px-4 py-3">{item.components.no}</td>
                    <td className="px-4 py-3">{item.components.no2}</td>
                    <td className="px-4 py-3">{item.components.o3}</td>
                    <td className="px-4 py-3">{item.components.so2}</td>
                    <td className="px-4 py-3">{item.components.pm2_5}</td>
                    <td className="px-4 py-3">{item.components.pm10}</td>
                    <td className="px-4 py-3">{item.components.nh3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Weather Map Section */}
      {weatherMapUrl && (
        <div className="bg-gradient-to-br from-blue-700/60 to-purple-800/60 rounded-2xl p-4 sm:p-6 border border-white/20 shadow flex flex-col gap-4 mt-4">
          <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="7" width="18" height="13" rx="2" fill="currentColor" className="text-blue-900" stroke="currentColor" strokeWidth="2" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 13l2.5 2.5L16 10" />
            </svg>
            {t.weatherMapTitle}
          </h3>
          <div className="w-full flex justify-center">
            <Image
              src={weatherMapUrl}
              alt={t.weatherMapTitle}
              className="rounded-xl border border-blue-400/30 shadow-md max-w-full h-auto bg-blue-950/30"
              width={512}
              height={256}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      )}


    </div>
  );
} 