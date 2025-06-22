import { WeatherData } from '../../../types/weather';
import { Translations } from '../../utils/translations';
import { getWindDirection, formatVisibility } from '../../utils/weatherUtils';

interface WindInfoProps {
  weatherData: WeatherData;
  t: Translations;
}

export default function WindInfo({ weatherData, t }: WindInfoProps) {
  return (
    <div className="bg-gradient-to-br from-blue-700/60 to-purple-800/60 rounded-2xl p-4 sm:p-6 border border-white/20 shadow flex flex-col gap-2">
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0l-4.243 4.243" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11V7a2 2 0 10-4 0v4m4 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
        {t.wind.title}
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-blue-100 text-base">{t.wind.speed}</span>
          <span className="text-white font-semibold text-base flex items-center gap-1">
            {weatherData.wind.speed} m/s
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-blue-100 text-base">{t.wind.direction}</span>
          <span className="text-white font-semibold text-base">{getWindDirection(weatherData.wind.deg)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-blue-100 text-base">{t.wind.visibility}</span>
          <span className="text-white font-semibold text-base">{formatVisibility(weatherData.visibility)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-blue-100 text-base">{t.wind.cloudCover}</span>
          <span className="text-white font-semibold text-base">{weatherData.clouds.all}%</span>
        </div>
      </div>
    </div>
  );
} 