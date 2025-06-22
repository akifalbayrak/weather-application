'use client';

import { WeatherData, ForecastData, AirPollutionData } from '../../types/weather';
import { useLanguage } from '../contexts/LanguageContext';
import MainWeatherCard from './WeatherDisplay/MainWeatherCard';
import TemperatureDetails from './WeatherDisplay/TemperatureDetails';
import WindInfo from './WeatherDisplay/WindInfo';
import WeatherMap from './WeatherDisplay/WeatherMap';
import LocationInfo from './WeatherDisplay/LocationInfo';
import RecentSearches from './WeatherDisplay/RecentSearches';
import ForecastTable from './WeatherDisplay/ForecastTable';
import AirPollutionSection from './WeatherDisplay/AirPollutionSection';

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

  const getAqiColor = (aqi: number) => {
    if (aqi === 1) return 'text-green-400';
    if (aqi === 2) return 'text-yellow-400';
    if (aqi === 3) return 'text-orange-400';
    if (aqi === 4) return 'text-red-500';
    if (aqi === 5) return 'text-purple-500';
    return 'text-gray-400';
  };

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {/* Main Weather Card */}
      <MainWeatherCard weatherData={weatherData} t={t} />

      {/* Temperature Details */}
      <TemperatureDetails weatherData={weatherData} t={t} />

      {/* Wind Information */}
      <WindInfo weatherData={weatherData} t={t} />

      {/* Weather Map Section */}
      {weatherData && <WeatherMap weatherData={weatherData} t={t} />}

      {/* Location Info */}
      <LocationInfo weatherData={weatherData} t={t} />

      {/* Recent Searches */}
      <RecentSearches recentSearches={recentSearches} t={t} onCityClick={onCityClick} onRemoveCity={onRemoveCity} />

      {/* Weather Forecast Section */}
      {forecastData && forecastData.list && (<ForecastTable forecastData={forecastData} t={t} />)}

      {/* Air Pollution Section */}
      {airPollutionData && airPollutionData.list && airPollutionData.list.length > 0 && (<AirPollutionSection airPollutionData={airPollutionData} t={t} getAqiColor={getAqiColor} />)}

    </div>
  );
} 