import Image from 'next/image';
import { ForecastData } from '../../../types/weather';
import { Translations } from '../../utils/translations';
import { getWeatherIconUrl, formatTemperature, formatTime } from '../../utils/weatherUtils';

interface ForecastTableProps {
  forecastData: ForecastData;
  t: Translations;
}

export default function ForecastTable({ forecastData, t }: ForecastTableProps) {
  return (
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
            {forecastData.list.slice(0, 8).map((item, idx) => (
              <tr key={idx} className="transition hover:bg-blue-800/30 border-b border-white/10">
                <td className="px-4 py-3 whitespace-nowrap font-mono text-lg font-medium text-blue-200">
                  {formatTime(item.dt)}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400/80 to-orange-500/80 text-white font-bold shadow">
                    {formatTemperature(item.main.temp)}
                  </span>
                </td>
                <td className="px-4 py-3 flex items-center gap-2 capitalize">
                  <Image
                    src={getWeatherIconUrl(item.weather[0].icon)}
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
  );
} 