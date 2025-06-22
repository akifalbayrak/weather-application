import Image from 'next/image';
import { WeatherData } from '../../../types/weather';
import { Translations } from '../../utils/translations';
import { getWeatherIconUrl, formatTemperature } from '../../utils/weatherUtils';

interface MainWeatherCardProps {
  weatherData: WeatherData;
  t: Translations;
}

export default function MainWeatherCard({ weatherData, t }: MainWeatherCardProps) {
  return (
    <div className="bg-gradient-to-br from-blue-700/70 to-purple-800/70 rounded-2xl p-6 border border-white/20 shadow-xl flex flex-col items-center">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <svg className="w-7 h-7 text-yellow-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="currentColor" className="text-yellow-300" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95-7.07l-1.41 1.41M6.05 17.95l-1.41 1.41M17.95 17.95l-1.41-1.41M6.05 6.05L4.64 4.64" /></svg>
          {weatherData.name}, {weatherData.sys.country}
        </h2>
        <div className="flex items-center justify-center mb-4">
          <Image
            src={getWeatherIconUrl(weatherData.weather[0].icon)}
            alt={weatherData.weather[0].description}
            width={80}
            height={80}
            className="w-20 h-20 drop-shadow-lg"
          />
          <div className="ml-4">
            <div className="text-4xl font-bold text-white">
              <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400/80 to-orange-500/80 text-white shadow">
                {formatTemperature(weatherData.main.temp)}
              </span>
            </div>
            <div className="text-lg text-blue-100 capitalize font-semibold mt-2">
              {weatherData.weather[0].description}
            </div>
          </div>
        </div>
        <div className="text-blue-100 text-base font-medium">
          {t.temperature.feelsLike} <span className="font-bold text-white">{formatTemperature(weatherData.main.feels_like)}</span>
        </div>
      </div>
    </div>
  );
} 