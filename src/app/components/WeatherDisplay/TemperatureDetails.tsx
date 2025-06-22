import { WeatherData } from '../../../types/weather';
import { Translations } from '../../utils/translations';
import { formatTemperature } from '../../utils/weatherUtils';

interface TemperatureDetailsProps {
  weatherData: WeatherData;
  t: Translations;
}

export default function TemperatureDetails({ weatherData, t }: TemperatureDetailsProps) {
  return (
    <div className="bg-gradient-to-br from-blue-700/60 to-purple-800/60 rounded-2xl p-4 sm:p-6 border border-white/20 shadow flex flex-col gap-2">
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-orange-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3" /></svg>
        {t.temperature.title}
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-blue-100 text-base">{t.temperature.high}</span>
          <span className="text-white font-semibold text-base">{formatTemperature(weatherData.main.temp_max)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-blue-100 text-base">{t.temperature.low}</span>
          <span className="text-white font-semibold text-base">{formatTemperature(weatherData.main.temp_min)}</span>
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
  );
} 