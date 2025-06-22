export function formatTemperature(temp: number, unit: 'C' | 'F' = 'C'): string {
  return `${Math.round(temp)}°${unit}`;
}

export function getWindDirection(degrees: number): string {
  const directions = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
  ];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

export function formatTime(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export function formatVisibility(visibility: number): string {
  return `${(visibility / 1000).toFixed(1)} km`;
}

export function getWeatherIconUrl(iconCode: string, size: '2x' | '4x' = '2x'): string {
  return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
}

export function latLonToTile(lat: number, lon: number, zoom: number): { x: number; y: number } {
  const n = Math.pow(2, zoom);
  const x = Math.floor(((lon + 180) / 360) * n);
  const y = Math.floor(((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2) * n);
  return { x, y };
}

export function getWeatherMapTileUrlFromCoords(
  layer: string,
  lat: number,
  lon: number,
  zoom: number = 5
): string {
  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  if (!API_KEY) {
    throw new Error('API key not found. Please add NEXT_PUBLIC_OPENWEATHER_API_KEY to your environment variables.');
  }
  const { x, y } = latLonToTile(lat, lon, zoom);
  return `https://tile.openweathermap.org/map/${layer}/${zoom}/${x}/${y}.png?appid=${API_KEY}`;
} 