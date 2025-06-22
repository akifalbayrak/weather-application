import { WeatherData } from '../../../types/weather';
import { Translations } from '../../utils/translations';
import { formatTime } from '../../utils/weatherUtils';

interface LocationInfoProps {
  weatherData: WeatherData;
  t: Translations;
}

export default function LocationInfo({ weatherData, t }: LocationInfoProps) {
  return (
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
        <div className="flex justify-between">
          <span className="text-blue-100 text-base">{t.sun.sunrise}</span>
          <span className="text-white font-semibold text-base">{formatTime(weatherData.sys.sunrise)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-blue-100 text-base">{t.sun.sunset}</span>
          <span className="text-white font-semibold text-base">{formatTime(weatherData.sys.sunset)}</span>
        </div>
      </div>
    </div>
  );
} 