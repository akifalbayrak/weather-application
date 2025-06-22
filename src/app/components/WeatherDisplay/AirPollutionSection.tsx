import { AirPollutionData } from '../../../types/weather';
import { getAqiInfo } from '../../utils/aqi';
import { Translations } from '../../utils/translations';

interface AirPollutionSectionProps {
  airPollutionData: AirPollutionData;
  t: Translations;
  getAqiColor: (aqi: number) => string;
}

export default function AirPollutionSection({ airPollutionData, t, getAqiColor }: AirPollutionSectionProps) {
  return (
    <div className="bg-gradient-to-br from-green-700/60 to-blue-700/60 rounded-2xl p-4 sm:p-6 border border-white/20 col-span-full shadow-xl mt-4">
      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2">
        <svg className="w-7 h-7 text-green-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="currentColor" className="text-green-300" /><path strokeLinecap="round" strokeLinejoin="round" d="M2 12h2m16 0h2M12 2v2m0 16v2m4.24-13.66l-1.42 1.42M6.34 17.66l-1.42 1.42M17.66 17.66l-1.42-1.42M6.34 6.34L4.92 4.92" /></svg>
        {t.airPollutionTitle}
      </h3>
      <div className="space-y-4">
        <div className="text-center">
          <p className={`text-6xl font-bold ${getAqiColor(airPollutionData.list[0].main.aqi)}`}>
            {t.airQuality[getAqiInfo(airPollutionData.list[0].main.aqi)?.name as keyof typeof t.airQuality] || 'Unknown'}
          </p>
          <p className="text-xl text-white">({t.aqi}: {airPollutionData.list[0].main.aqi})</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-white">
          {Object.entries(airPollutionData.list[0].components).map(([key, value]) => (
            <div key={key} className="bg-black/20 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-300 uppercase">{key}</p>
              <p className="text-lg font-semibold">{value.toFixed(2)}</p>
              <p className="text-xs text-gray-400">μg/m³</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 