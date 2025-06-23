'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import WeatherDisplay from '@/app/components/WeatherDisplay';
import SearchBar from '@/app/components/SearchBar';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorMessage from './components/common/ErrorMessage';
import LanguageSelector from '@/app/components/LanguageSelector';
import { weatherApi } from './utils/weatherApi';
import { WeatherApiError, ForecastData, AirPollutionData, WeatherData } from '../types/weather';
import { getWeatherMapTileUrlFromCoords } from './utils/weatherUtils';
import { useLanguage } from './contexts/LanguageContext';

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [airPollutionData, setAirPollutionData] = useState<AirPollutionData | null>(null);
  const [weatherMapUrl, setWeatherMapUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastSearchedLocation, setLastSearchedLocation] = useState<string>('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t, language, setLanguage, isLanguageLoaded } = useLanguage();
  const initialLoadDone = useRef(false);

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

  // Helper to fetch all data for a given lat/lon
  const fetchAllWeatherData = useCallback(async (lat: number, lon: number, locationLabel: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const [weather, forecast, airPollution] = await Promise.all([
        weatherApi.getWeatherByCoords(lat, lon, language),
        weatherApi.getForecastByCoords(lat, lon, language),
        weatherApi.getAirPollutionForecast(lat, lon, language),
      ]);
      // Generate dynamic map URL based on actual coordinates
      const mapUrl = getWeatherMapTileUrlFromCoords('clouds_new', lat, lon, 5);
      setWeatherData(weather);
      setForecastData(forecast);
      setAirPollutionData(airPollution);
      setWeatherMapUrl(mapUrl);
      setLastSearchedLocation(locationLabel);
      localStorage.setItem('weather-app-last-location', locationLabel);
      addToRecentSearches(locationLabel);
    } catch (err) {
      if (err instanceof WeatherApiError) {
        setError(err.message);
      } else {
        setError(t.unexpectedError);
      }
    } finally {
      setIsLoading(false);
    }
  }, [language, addToRecentSearches, t.unexpectedError, setIsLoading]);

  // Search by city name using getGeoByCity
  const getWeatherByCity = useCallback(async (cityName: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const geoResults = await weatherApi.getGeoByCity(cityName, language, 1);
      if (!geoResults || geoResults.length === 0) {
        throw new WeatherApiError(t.locationError);
      }
      const { lat, lon, name, country } = geoResults[0];
      const locationLabel = `${name}, ${country}`;
      await fetchAllWeatherData(lat, lon, locationLabel);
    } catch (err) {
      if (err instanceof WeatherApiError) {
        setError(err.message);
      } else {
        setError(t.unexpectedError);
      }
    } finally {
      setIsLoading(false);
    }
  }, [language, fetchAllWeatherData, t.locationError, t.unexpectedError, setIsLoading]);

  // Search by coordinates (e.g., from geolocation)
  const getWeatherByCoords = useCallback(async (lat: number, lon: number) => {
    setIsLoading(true);
    setError(null);
    try {
      // Use reverse geo to get city name
      const reverseGeo = await weatherApi.getReverseGeo(lat, lon, 1, language);
      let locationLabel = '';
      if (reverseGeo && reverseGeo.length > 0) {
        locationLabel = `${reverseGeo[0].name}, ${reverseGeo[0].country}`;
      } else {
        locationLabel = `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
      }
      await fetchAllWeatherData(lat, lon, locationLabel);
    } catch (err) {
      if (err instanceof WeatherApiError) {
        setError(err.message);
      } else {
        setError(t.unexpectedError);
      }
    } finally {
      setIsLoading(false);
    }
  }, [language, fetchAllWeatherData, t.unexpectedError, setIsLoading]);

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
    // Wait for language to be loaded from localStorage before making initial API call
    if (!isLanguageLoaded || isLoading || initialLoadDone.current) return;
    
    initialLoadDone.current = true;
    
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
      getWeatherByCity(savedLocation);
    } else {
      getWeatherByCity('London');
    }
  }, [isLanguageLoaded, isLoading, getWeatherByCity]);

  useEffect(() => {
    if (weatherData) {
      // Re-fetch all weather data in the new language
      fetchAllWeatherData(weatherData.coord.lat, weatherData.coord.lon, lastSearchedLocation);
    }
  }, [language]);

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
        <SearchBar onSearch={getWeatherByCity} onLocationClick={getCurrentLocation} isLoading={isLoading} setIsLoading={setIsLoading} t={t} language={language} />
        {isLoading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {weatherData && !isLoading && (
          <WeatherDisplay
            weatherData={weatherData}
            forecastData={forecastData}
            airPollutionData={airPollutionData}
            weatherMapUrl={weatherMapUrl}
            recentSearches={recentSearches}
            onCityClick={getWeatherByCity}
            onRemoveCity={removeFromRecentSearches}
          />
        )}
      </div>
    </main>
  );
}
