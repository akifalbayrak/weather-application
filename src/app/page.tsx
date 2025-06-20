'use client';

import { useState, useEffect, useCallback } from 'react';
import WeatherDisplay from '@/app/components/WeatherDisplay';
import SearchBar from '@/app/components/SearchBar';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import ErrorMessage from '@/app/components/ErrorMessage';
import LanguageSelector from '@/app/components/LanguageSelector';
import { weatherApi, WeatherApiError } from './utils/weatherApi';
import { useLanguage } from './contexts/LanguageContext';

export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSearchedLocation, setLastSearchedLocation] = useState<string>('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const { t, language, setLanguage } = useLanguage();

  // Function to add city to recent searches
  const addToRecentSearches = useCallback((cityName: string) => {
    const normalizedCityName = cityName.toLowerCase();
    setRecentSearches(prev => {
      const filtered = prev.filter(city => city.toLowerCase() !== normalizedCityName);
      const updated = [cityName, ...filtered].slice(0, 3);
      localStorage.setItem('weather-app-recent-searches', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Function to remove city from recent searches
  const removeFromRecentSearches = useCallback((cityName: string) => {
    setRecentSearches(prev => {
      const updated = prev.filter(city => city !== cityName);
      localStorage.setItem('weather-app-recent-searches', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getWeatherByCoords = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);

    try {
      const data = await weatherApi.getWeatherByCoords(lat, lon, language);
      setWeatherData(data);
      // Save location name to localStorage
      const locationName = `${data.name}, ${data.sys.country}`;
      setLastSearchedLocation(locationName);
      localStorage.setItem('weather-app-last-location', locationName);
      addToRecentSearches(locationName);
    } catch (err) {
      if (err instanceof WeatherApiError) {
        setError(err.message);
      } else {
        setError(t.unexpectedError);
      }
    } finally {
      setLoading(false);
    }
  }, [t.unexpectedError, addToRecentSearches, language]);

  const getWeatherByCity = useCallback(async (cityName: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await weatherApi.getWeatherByCity(cityName, language);
      setWeatherData(data);
      // Save searched city to localStorage
      setLastSearchedLocation(cityName);
      localStorage.setItem('weather-app-last-location', cityName);
      addToRecentSearches(cityName);
    } catch (err) {
      if (err instanceof WeatherApiError) {
        setError(err.message);
      } else {
        setError(t.unexpectedError);
      }
    } finally {
      setLoading(false);
    }
  }, [t.unexpectedError, addToRecentSearches, language]);

  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setError(t.locationError);
        }
      );
    } else {
      setError(t.geolocationError);
    }
  }, [getWeatherByCoords, t.locationError, t.geolocationError]);

  useEffect(() => {
    // Load last searched location from localStorage
    const savedLocation = localStorage.getItem('weather-app-last-location');
    const savedRecentSearches = localStorage.getItem('weather-app-recent-searches');
    
    if (savedRecentSearches) {
      try {
        setRecentSearches(JSON.parse(savedRecentSearches));
      } catch (error) {
        console.error('Error parsing recent searches:', error);
      }
    }
    
    if (savedLocation) {
      // Try to get weather for the saved location
      getWeatherByCity(savedLocation);
    } else {
      // Fallback to default city if no saved location
      getWeatherByCity('London');
    }
  }, [getWeatherByCity]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 p-6 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">{t.appTitle}</h1>
            <p className="text-blue-100 text-sm sm:text-base">{t.appSubtitle}</p>
            {lastSearchedLocation && (
              <p className="text-blue-200 text-xs sm:text-sm mt-1">
                {t.lastSearched}: {lastSearchedLocation}
              </p>
            )}
          </div>
          <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
        </div>

        <SearchBar onSearch={getWeatherByCity} onLocationClick={getCurrentLocation} />

        {loading && <LoadingSpinner />}
        
        {error && <ErrorMessage message={error} />}
        
        {weatherData && !loading && (
          <WeatherDisplay 
            weatherData={weatherData} 
            recentSearches={recentSearches}
            onCityClick={getWeatherByCity}
            onRemoveCity={removeFromRecentSearches}
          />
        )}
      </div>
    </main>
  );
}
