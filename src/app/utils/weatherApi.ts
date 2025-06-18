import { WeatherData } from '../page';

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export class WeatherApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'WeatherApiError';
  }
}

export const weatherApi = {
  /**
   * Get weather data by city name
   */
  async getWeatherByCity(cityName: string): Promise<WeatherData> {
    if (!API_KEY) {
      throw new WeatherApiError('API key not found. Please add NEXT_PUBLIC_OPENWEATHER_API_KEY to your environment variables.');
    }

    const url = `${API_BASE_URL}?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new WeatherApiError('City not found. Please check the spelling and try again.', 404);
      }
      if (response.status === 401) {
        throw new WeatherApiError('Invalid API key. Please check your OpenWeatherMap API key.', 401);
      }
      if (response.status === 429) {
        throw new WeatherApiError('API rate limit exceeded. Please try again later.', 429);
      }
      throw new WeatherApiError('Failed to fetch weather data', response.status);
    }

    return response.json();
  },

  /**
   * Get weather data by coordinates
   */
  async getWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
    if (!API_KEY) {
      throw new WeatherApiError('API key not found. Please add NEXT_PUBLIC_OPENWEATHER_API_KEY to your environment variables.');
    }

    const url = `${API_BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 400) {
        throw new WeatherApiError('Invalid coordinates provided.', 400);
      }
      if (response.status === 401) {
        throw new WeatherApiError('Invalid API key. Please check your OpenWeatherMap API key.', 401);
      }
      if (response.status === 429) {
        throw new WeatherApiError('API rate limit exceeded. Please try again later.', 429);
      }
      throw new WeatherApiError('Failed to fetch weather data', response.status);
    }

    return response.json();
  },

  /**
   * Get weather icon URL
   */
  getWeatherIconUrl(iconCode: string, size: '2x' | '4x' = '2x'): string {
    return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
  },

  /**
   * Format temperature with unit
   */
  formatTemperature(temp: number, unit: 'C' | 'F' = 'C'): string {
    return `${Math.round(temp)}°${unit}`;
  },

  /**
   * Get wind direction from degrees
   */
  getWindDirection(degrees: number): string {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  },

  /**
   * Format time from timestamp
   */
  formatTime(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  },

  /**
   * Format visibility in kilometers
   */
  formatVisibility(visibility: number): string {
    return `${(visibility / 1000).toFixed(1)} km`;
  }
}; 