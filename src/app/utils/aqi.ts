export const AQI_LEVELS = {
    1: { name: 'good', so2: [0, 20], no2: [0, 40], pm10: [0, 20], pm2_5: [0, 10], o3: [0, 60], co: [0, 4400] },
    2: { name: 'fair', so2: [20, 80], no2: [40, 70], pm10: [20, 50], pm2_5: [10, 25], o3: [60, 100], co: [4400, 9400] },
    3: { name: 'moderate', so2: [80, 250], no2: [70, 150], pm10: [50, 100], pm2_5: [25, 50], o3: [100, 140], co: [9400, 12400] },
    4: { name: 'poor', so2: [250, 350], no2: [150, 200], pm10: [100, 200], pm2_5: [50, 75], o3: [140, 180], co: [12400, 15400] },
    5: { name: 'veryPoor', so2: [350, Infinity], no2: [200, Infinity], pm10: [200, Infinity], pm2_5: [75, Infinity], o3: [180, Infinity], co: [15400, Infinity] },
};

export type Pollutant = keyof typeof AQI_LEVELS[1];

export const getAqiInfo = (aqi: number) => {
    return AQI_LEVELS[aqi as keyof typeof AQI_LEVELS] || null;
}; 