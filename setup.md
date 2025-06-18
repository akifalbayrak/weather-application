# Quick Setup Guide

## 1. Get Your API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to your [API keys page](https://home.openweathermap.org/api_keys)
4. Copy your API key

## 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
# Copy the example file
cp env.example .env

# Edit .env and add your API key
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_actual_api_key_here
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Run the Development Server

```bash
npm run dev
```

## 5. Open Your Browser

Navigate to [http://localhost:3000](http://localhost:3000)

## Troubleshooting

### "API key not found" Error
- Make sure you've created the `.env` file
- Ensure the API key is correct and has no extra spaces
- Restart the development server after adding the environment variable

### "City not found" Error
- Check the spelling of the city name
- Try using the full city name (e.g., "New York" instead of "NYC")
- Some cities might need country codes (e.g., "London, UK")

### "Invalid API key" Error
- Verify your API key is correct
- Make sure your OpenWeatherMap account is activated
- Check if you've exceeded the free tier limits

## Features to Try

1. **Search for a city**: Enter any city name and click "Search"
2. **Use your location**: Click "📍 My Location" (requires location permission)
3. **View detailed weather**: See temperature, humidity, wind, and more
4. **Responsive design**: Try resizing your browser window

## Next Steps

- Deploy to Vercel for free hosting
- Add more features like weather forecasts
- Customize the UI with your own colors
- Add more weather data sources 