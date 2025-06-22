import Image from 'next/image';
import { Translations } from '../../utils/translations';

interface WeatherMapProps {
  weatherMapUrl: string;
  t: Translations;
}

export default function WeatherMap({ weatherMapUrl, t }: WeatherMapProps) {
  return (
    <div className="bg-gradient-to-br from-blue-700/60 to-purple-800/60 rounded-2xl p-4 sm:p-6 border border-white/20 shadow flex flex-col gap-2">
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
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
  );
} 