# 🌤️ Weather App

A modern, feature-rich weather application built with Next.js, TypeScript, and Tailwind CSS. Get real-time weather information for any location with multilingual support, smart search history, and beautiful UI.

![weather-application-eight-steel vercel app_](https://github.com/user-attachments/assets/5f9c47ca-2755-45f1-8fd2-26e36f717015)
![weather-application-eight-steel vercel app_ (1)](https://github.com/user-attachments/assets/9336c6cd-c3b1-4d31-919d-ff4963703b55)
![weather-application-eight-steel vercel app_ (2)](https://github.com/user-attachments/assets/ef38f023-17c9-42ba-ac20-c0d6e1c60177)



## ✨ Features

### 🌍 **Multilingual Support**
- **11 Languages**: English, Spanish, French, German, Italian, Portuguese, Russian, Chinese, Japanese, Korean, Turkish
- **Auto-Detection**: Automatically detects browser language
- **Persistent Settings**: Remembers your language preference
- **Complete Translation**: All UI elements translated

### 🔍 **Smart Search & History**
- **City Search**: Search for any city worldwide
- **GPS Location**: Use your current location with geolocation
- **Recent Searches**: Last 3 searched cities with quick access
- **Deletable History**: Remove unwanted cities from history
- **Case-Insensitive**: Smart deduplication (London = london = LONDON)
- **Persistent Storage**: Remembers your last searched location

### 📊 **Comprehensive Weather Data**
- **Current Conditions**: Temperature, feels-like, weather description
- **Detailed Metrics**: High/low temps, humidity, pressure
- **Wind Information**: Speed, direction, visibility, cloud cover
- **Sun Times**: Sunrise and sunset times
- **Location Details**: Coordinates, timezone, country

### 🎨 **Modern UI/UX**
- **Glassmorphism Design**: Beautiful backdrop blur effects
- **Responsive Layout**: Perfect on desktop, tablet, and mobile
- **Smooth Animations**: Loading states and hover effects
- **Weather Icons**: Dynamic weather condition icons
- **Gradient Background**: Eye-catching blue-to-purple gradient

### ⚡ **Performance & Reliability**
- **Next.js 15**: Latest framework with App Router
- **TypeScript**: Type-safe development
- **Optimized Images**: Next.js Image component for weather icons
- **Error Handling**: Graceful error states and user feedback
- **Loading States**: Smooth loading animations

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **API**: [OpenWeatherMap Current Weather API](https://openweathermap.org/api)
- **Icons**: OpenWeatherMap Weather Icons
- **State Management**: React Context API
- **Storage**: Browser localStorage

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenWeatherMap API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/akifalbayrak/weather-application
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get an API Key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Get your API key from the dashboard

4. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp env.example .env
   
   # Edit .env and add your API key
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_actual_api_key_here
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### 🌍 Language Selection
- Click the language selector in the top-right corner
- Choose from 11 available languages
- Your preference is automatically saved
- Browser language is detected on first visit

### 🔍 Searching for Weather
1. **City Search**: Type any city name and press Enter or click "Search"
2. **Current Location**: Click "📍 My Location" for GPS-based weather
3. **Recent Searches**: Click any city in the "Recent Searches" card
4. **Remove History**: Click the red "×" to remove cities from history

### 📊 Understanding Weather Data
- **Main Card**: Current temperature, weather condition, and feels-like temperature
- **Temperature**: High/low temperatures, humidity, and atmospheric pressure
- **Wind & Visibility**: Wind speed, direction, visibility, and cloud coverage
- **Sun Times**: Local sunrise and sunset times
- **Location**: Precise coordinates and timezone information

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── WeatherDisplay.tsx      # Main weather information display
│   │   ├── SearchBar.tsx           # Search input and location button
│   │   ├── LanguageSelector.tsx    # Language dropdown with flags
│   │   ├── LoadingSpinner.tsx      # Loading animation
│   │   └── ErrorMessage.tsx        # Error display component
│   ├── contexts/
│   │   └── LanguageContext.tsx     # Language state management
│   ├── utils/
│   │   ├── weatherApi.ts           # OpenWeatherMap API integration
│   │   └── translations.ts         # Multilingual text content
│   ├── page.tsx                    # Main page with weather logic
│   ├── layout.tsx                  # App layout with providers
│   └── globals.css                 # Global styles
├── public/                         # Static assets
└── next.config.ts                  # Next.js configuration
```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_OPENWEATHER_API_KEY` | OpenWeatherMap API key | Yes | `abc123def456...` |

## 📱 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🌐 Supported Languages

| Language | Code | Flag | Native Name |
|----------|------|------|-------------|
| English | `en` | 🇺🇸 | English |
| Spanish | `es` | 🇪🇸 | Español |
| French | `fr` | 🇫🇷 | Français |
| German | `de` | 🇩🇪 | Deutsch |
| Italian | `it` | 🇮🇹 | Italiano |
| Portuguese | `pt` | 🇵🇹 | Português |
| Russian | `ru` | 🇷🇺 | Русский |
| Chinese | `zh` | 🇨🇳 | 中文 |
| Japanese | `ja` | 🇯🇵 | 日本語 |
| Korean | `ko` | 🇰🇷 | 한국어 |
| Turkish | `tr` | 🇹🇷 | Türkçe |

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather API
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://reactjs.org/) for the component-based architecture

## 📞 Support

If you have any questions or need help:

- 📧 Create an issue on GitHub
- 🐛 Report bugs with detailed steps
- 💡 Suggest new features
- 🌟 Star the repository if you find it useful

---

**Made with ❤️ using Next.js, TypeScript, and Tailwind CSS**
