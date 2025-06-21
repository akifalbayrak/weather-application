const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export class WeatherApiError extends Error {
    constructor(message: string, public status?: number) {
        super(message);
        this.name = "WeatherApiError";
    }
}

export interface GeoCity {
    name: string;
    local_names?: Record<string, string>;
    lat: number;
    lon: number;
    country: string;
    state?: string;
}

export interface AirPollutionData {
    coord: { lon: number; lat: number };
    list: Array<{
        main: { aqi: number };
        components: {
            co: number;
            no: number;
            no2: number;
            o3: number;
            so2: number;
            pm2_5: number;
            pm10: number;
            nh3: number;
        };
        dt: number;
    }>;
}

export interface ForecastData {
    cod: string;
    message: number;
    cnt: number;
    list: Array<{
        dt: number;
        main: {
            temp: number;
            feels_like: number;
            temp_min: number;
            temp_max: number;
            pressure: number;
            humidity: number;
        };
        weather: Array<{
            id: number;
            main: string;
            description: string;
            icon: string;
        }>;
        wind: {
            speed: number;
            deg: number;
        };
    }>;
    city: {
        id: number;
        name: string;
        coord: { lat: number; lon: number };
        country: string;
        timezone: number;
        sunrise: number;
        sunset: number;
    };
}

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
     * Convert latitude and longitude to tile coordinates
     */
    latLonToTile(lat: number, lon: number, zoom: number): { x: number; y: number } {
        const n = Math.pow(2, zoom);
        const x = Math.floor(((lon + 180) / 360) * n);
        const y = Math.floor(((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2) * n);
        return { x, y };
    },

    /**
     * Get weather map tile URL from coordinates
     */
    getWeatherMapTileUrlFromCoords(
        layer: string,
        lat: number,
        lon: number,
        zoom: number = 5
    ): string {
        if (!API_KEY) {
            throw new WeatherApiError(
                "API key not found. Please add NEXT_PUBLIC_OPENWEATHER_API_KEY to your environment variables."
            );
        }
        const { x, y } = this.latLonToTile(lat, lon, zoom);
        return `https://tile.openweathermap.org/map/${layer}/${zoom}/${x}/${y}.png?appid=${API_KEY}`;
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
     * Get weather icon URL
     */
    getWeatherIconUrl(iconCode: string, size: "2x" | "4x" = "2x"): string {
        return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
    },

    /**
     * Format temperature with unit
     */
    formatTemperature(temp: number, unit: "C" | "F" = "C"): string {
        return `${Math.round(temp)}°${unit}`;
    },

    /**
     * Get wind direction from degrees
     */
    getWindDirection(degrees: number): string {
        const directions = [
            "N",
            "NNE",
            "NE",
            "ENE",
            "E",
            "ESE",
            "SE",
            "SSE",
            "S",
            "SSW",
            "SW",
            "WSW",
            "W",
            "WNW",
            "NW",
            "NNW",
        ];
        const index = Math.round(degrees / 22.5) % 16;
        return directions[index];
    },

    /**
     * Format time from timestamp
     */
    formatTime(timestamp: number): string {
        return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    },

    /**
     * Format visibility in kilometers
     */
    formatVisibility(visibility: number): string {
        return `${(visibility / 1000).toFixed(1)} km`;
    },
};
