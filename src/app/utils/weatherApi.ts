import { WeatherData, ForecastData, AirPollutionData, GeoCity, WeatherApiError } from '../../types/weather';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export const weatherApi = {

    /**
     * Get geocoding data by city name
     */
    async getGeoByCity(
        cityName: string,
        lang: string,
        limit: number = 1
    ): Promise<GeoCity[]> {
        if (!API_KEY) {
            throw new WeatherApiError(
                "API key not found. Please add NEXT_PUBLIC_OPENWEATHER_API_KEY to your environment variables."
            );
        }

        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
            cityName
        )}&limit=${limit}&appid=${API_KEY}&lang=${lang}`;
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new WeatherApiError(
                    "Location not found. Please check the city name and try again.",
                    404
                );
            }
            if (response.status === 401) {
                throw new WeatherApiError(
                    "Invalid API key. Please check your OpenWeatherMap API key.",
                    401
                );
            }
            if (response.status === 429) {
                throw new WeatherApiError(
                    "API rate limit exceeded. Please try again later.",
                    429
                );
            }
            throw new WeatherApiError(
                "Failed to fetch geocoding data",
                response.status
            );
        }

        return response.json();
    },

    /**
     * Get weather data by coordinates
     */
    async getWeatherByCoords(
        lat: number,
        lon: number,
        lang: string
    ): Promise<WeatherData> {
        if (!API_KEY) {
            throw new WeatherApiError(
                "API key not found. Please add NEXT_PUBLIC_OPENWEATHER_API_KEY to your environment variables."
            );
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=${lang}`;

        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 400) {
                throw new WeatherApiError("Invalid coordinates provided.", 400);
            }
            if (response.status === 401) {
                throw new WeatherApiError(
                    "Invalid API key. Please check your OpenWeatherMap API key.",
                    401
                );
            }
            if (response.status === 429) {
                throw new WeatherApiError(
                    "API rate limit exceeded. Please try again later.",
                    429
                );
            }
            throw new WeatherApiError(
                "Failed to fetch weather data",
                response.status
            );
        }

        return response.json();
    },

    /**
     * Get reverse geocoding data by coordinates
     */
    async getReverseGeo(
        lat: number,
        lon: number,
        limit: number = 1,
        lang: string
    ): Promise<GeoCity[]> {
        if (!API_KEY) {
            throw new WeatherApiError(
                "API key not found. Please add NEXT_PUBLIC_OPENWEATHER_API_KEY to your environment variables."
            );
        }

        const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${API_KEY}&lang=${lang}`;
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new WeatherApiError(
                    "Location not found for the provided coordinates.",
                    404
                );
            }
            if (response.status === 401) {
                throw new WeatherApiError(
                    "Invalid API key. Please check your OpenWeatherMap API key.",
                    401
                );
            }
            if (response.status === 429) {
                throw new WeatherApiError(
                    "API rate limit exceeded. Please try again later.",
                    429
                );
            }
            throw new WeatherApiError(
                "Failed to fetch reverse geocoding data",
                response.status
            );
        }

        return response.json();
    },

    /**
     * Get air pollution forecast by coordinates
     */
    async getAirPollutionForecast(lat: number, lon: number, lang: string): Promise<AirPollutionData> {
        if (!API_KEY) {
            throw new WeatherApiError(
                "API key not found. Please add NEXT_PUBLIC_OPENWEATHER_API_KEY to your environment variables."
            );
        }

        const url = `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=${lang}`;
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 400) {
                throw new WeatherApiError("Invalid coordinates provided.", 400);
            }
            if (response.status === 401) {
                throw new WeatherApiError(
                    "Invalid API key. Please check your OpenWeatherMap API key.",
                    401
                );
            }
            if (response.status === 429) {
                throw new WeatherApiError(
                    "API rate limit exceeded. Please try again later.",
                    429
                );
            }
            throw new WeatherApiError(
                "Failed to fetch air pollution forecast data",
                response.status
            );
        }

        return response.json();
    },

    /**
     * Get historical air pollution data by coordinates and time range
     */
    async getAirPollutionHistory(
        lat: number,
        lon: number,
        start: number,
        end: number,
        lang: string
    ): Promise<AirPollutionData> {
        if (!API_KEY) {
            throw new WeatherApiError(
                "API key not found. Please add NEXT_PUBLIC_OPENWEATHER_API_KEY to your environment variables."
            );
        }

        const url = `https://api.openweathermap.org/data/2.5/air_pollution/history?lat=${lat}&lon=${lon}&start=${start}&end=${end}&appid=${API_KEY}&lang=${lang}`;
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 400) {
                throw new WeatherApiError(
                    "Invalid parameters provided for air pollution history.",
                    400
                );
            }
            if (response.status === 401) {
                throw new WeatherApiError(
                    "Invalid API key. Please check your OpenWeatherMap API key.",
                    401
                );
            }
            if (response.status === 429) {
                throw new WeatherApiError(
                    "API rate limit exceeded. Please try again later.",
                    429
                );
            }
            throw new WeatherApiError(
                "Failed to fetch historical air pollution data",
                response.status
            );
        }

        return response.json();
    },

    /**
     * Get 5 day / 3 hour weather forecast by coordinates
     */
    async getForecastByCoords(
        lat: number,
        lon: number,
        lang: string,
        limit: number = 1
    ): Promise<ForecastData> {
        if (!API_KEY) {
            throw new WeatherApiError(
                "API key not found. Please add NEXT_PUBLIC_OPENWEATHER_API_KEY to your environment variables."
            );
        }

        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=${lang}&limit=${limit}`;
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 400) {
                throw new WeatherApiError("Invalid coordinates provided.", 400);
            }
            if (response.status === 401) {
                throw new WeatherApiError(
                    "Invalid API key. Please check your OpenWeatherMap API key.",
                    401
                );
            }
            if (response.status === 429) {
                throw new WeatherApiError(
                    "API rate limit exceeded. Please try again later.",
                    429
                );
            }
            throw new WeatherApiError(
                "Failed to fetch weather forecast data",
                response.status
            );
        }

        return response.json();
    },

    /**
     * Format visibility in kilometers
     */
    formatVisibility(visibility: number): string {
        return `${(visibility / 1000).toFixed(1)} km`;
    },
};
