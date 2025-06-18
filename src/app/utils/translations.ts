export interface Translations {
  appTitle: string;
  appSubtitle: string;
  searchPlaceholder: string;
  searchButton: string;
  locationButton: string;
  loadingText: string;
  errorTitle: string;
  locationError: string;
  geolocationError: string;
  unexpectedError: string;
  lastSearched: string;
  recentSearches: string;
  noRecentSearches: string;
  temperature: {
    title: string;
    high: string;
    low: string;
    humidity: string;
    pressure: string;
    feelsLike: string;
  };
  wind: {
    title: string;
    speed: string;
    direction: string;
    visibility: string;
    cloudCover: string;
  };
  sun: {
    title: string;
    sunrise: string;
    sunset: string;
  };
  location: {
    title: string;
    latitude: string;
    longitude: string;
    timezone: string;
  };
}

export const translations: Record<string, Translations> = {
  en: {
    appTitle: 'Weather App',
    appSubtitle: 'Get real-time weather information for any location',
    searchPlaceholder: 'Enter city name...',
    searchButton: 'Search',
    locationButton: 'Use My Location',
    loadingText: 'Loading weather data...',
    errorTitle: 'Error',
    locationError: 'Unable to get your location. Please search for a city instead.',
    geolocationError: 'Geolocation is not supported by your browser.',
    unexpectedError: 'An unexpected error occurred',
    lastSearched: 'Last searched',
    recentSearches: 'Recent Searches',
    noRecentSearches: 'No recent searches',
    temperature: {
      title: 'Temperature',
      high: 'High',
      low: 'Low',
      humidity: 'Humidity',
      pressure: 'Pressure',
      feelsLike: 'Feels like',
    },
    wind: {
      title: 'Wind & Visibility',
      speed: 'Wind Speed',
      direction: 'Wind Direction',
      visibility: 'Visibility',
      cloudCover: 'Cloud Cover',
    },
    sun: {
      title: 'Sun Times',
      sunrise: 'Sunrise',
      sunset: 'Sunset',
    },
    location: {
      title: 'Location',
      latitude: 'Latitude',
      longitude: 'Longitude',
      timezone: 'Timezone',
    },
  },
  es: {
    appTitle: 'Aplicación del Clima',
    appSubtitle: 'Obtén información meteorológica en tiempo real para cualquier ubicación',
    searchPlaceholder: 'Ingresa el nombre de la ciudad...',
    searchButton: 'Buscar',
    locationButton: 'Usar Mi Ubicación',
    loadingText: 'Cargando datos meteorológicos...',
    errorTitle: 'Error',
    locationError: 'No se pudo obtener tu ubicación. Por favor busca una ciudad.',
    geolocationError: 'La geolocalización no es compatible con tu navegador.',
    unexpectedError: 'Ocurrió un error inesperado',
    lastSearched: 'Ultima buscada',
    recentSearches: 'Búsquedas recientes',
    noRecentSearches: 'No hay búsquedas recientes',
    temperature: {
      title: 'Temperatura',
      high: 'Máxima',
      low: 'Mínima',
      humidity: 'Humedad',
      pressure: 'Presión',
      feelsLike: 'Se siente como',
    },
    wind: {
      title: 'Viento y Visibilidad',
      speed: 'Velocidad del Viento',
      direction: 'Dirección del Viento',
      visibility: 'Visibilidad',
      cloudCover: 'Cobertura de Nubes',
    },
    sun: {
      title: 'Horarios del Sol',
      sunrise: 'Amanecer',
      sunset: 'Atardecer',
    },
    location: {
      title: 'Ubicación',
      latitude: 'Latitud',
      longitude: 'Longitud',
      timezone: 'Zona Horaria',
    },
  },
  fr: {
    appTitle: 'Application Météo',
    appSubtitle: 'Obtenez des informations météorologiques en temps réel pour n\'importe quel endroit',
    searchPlaceholder: 'Entrez le nom de la ville...',
    searchButton: 'Rechercher',
    locationButton: 'Utiliser Ma Position',
    loadingText: 'Chargement des données météo...',
    errorTitle: 'Erreur',
    locationError: 'Impossible d\'obtenir votre position. Veuillez rechercher une ville.',
    geolocationError: 'La géolocalisation n\'est pas prise en charge par votre navigateur.',
    unexpectedError: 'Une erreur inattendue s\'est produite',
    lastSearched: 'Recherchée récemment',
    recentSearches: 'Recherches récentes',
    noRecentSearches: 'Aucune recherche récente',
    temperature: {
      title: 'Température',
      high: 'Élevée',
      low: 'Basse',
      humidity: 'Humidité',
      pressure: 'Pression',
      feelsLike: 'Ressenti',
    },
    wind: {
      title: 'Vent et Visibilité',
      speed: 'Vitesse du Vent',
      direction: 'Direction du Vent',
      visibility: 'Visibilité',
      cloudCover: 'Couverture Nuageuse',
    },
    sun: {
      title: 'Heures du Soleil',
      sunrise: 'Lever du Soleil',
      sunset: 'Coucher du Soleil',
    },
    location: {
      title: 'Localisation',
      latitude: 'Latitude',
      longitude: 'Longitude',
      timezone: 'Fuseau Horaire',
    },
  },
  de: {
    appTitle: 'Wetter-App',
    appSubtitle: 'Erhalten Sie Echtzeit-Wetterinformationen für jeden Ort',
    searchPlaceholder: 'Stadtname eingeben...',
    searchButton: 'Suchen',
    locationButton: 'Meinen Standort verwenden',
    loadingText: 'Wetterdaten werden geladen...',
    errorTitle: 'Fehler',
    locationError: 'Standort konnte nicht ermittelt werden. Bitte suchen Sie nach einer Stadt.',
    geolocationError: 'Geolokalisierung wird von Ihrem Browser nicht unterstützt.',
    unexpectedError: 'Ein unerwarteter Fehler ist aufgetreten',
    lastSearched: 'Zuletzt gesucht',
    recentSearches: 'Zuletzt gesucht',
    noRecentSearches: 'Keine vorherigen Suchen',
    temperature: {
      title: 'Temperatur',
      high: 'Hoch',
      low: 'Niedrig',
      humidity: 'Luftfeuchtigkeit',
      pressure: 'Druck',
      feelsLike: 'Gefühlt',
    },
    wind: {
      title: 'Wind & Sichtweite',
      speed: 'Windgeschwindigkeit',
      direction: 'Windrichtung',
      visibility: 'Sichtweite',
      cloudCover: 'Wolkenbedeckung',
    },
    sun: {
      title: 'Sonnenzeiten',
      sunrise: 'Sonnenaufgang',
      sunset: 'Sonnenuntergang',
    },
    location: {
      title: 'Standort',
      latitude: 'Breitengrad',
      longitude: 'Längengrad',
      timezone: 'Zeitzone',
    },
  },
  it: {
    appTitle: 'App Meteo',
    appSubtitle: 'Ottieni informazioni meteorologiche in tempo reale per qualsiasi località',
    searchPlaceholder: 'Inserisci il nome della città...',
    searchButton: 'Cerca',
    locationButton: 'Usa La Mia Posizione',
    loadingText: 'Caricamento dati meteo...',
    errorTitle: 'Errore',
    locationError: 'Impossibile ottenere la tua posizione. Cerca una città.',
    geolocationError: 'La geolocalizzazione non è supportata dal tuo browser.',
    unexpectedError: 'Si è verificato un errore imprevisto',
    lastSearched: 'Ricercato di recente',
    recentSearches: 'Ricerca recente',
    noRecentSearches: 'Nessuna ricerca recente',
    temperature: {
      title: 'Temperatura',
      high: 'Massima',
      low: 'Minima',
      humidity: 'Umidità',
      pressure: 'Pressione',
      feelsLike: 'Percepita',
    },
    wind: {
      title: 'Vento e Visibilità',
      speed: 'Velocità del Vento',
      direction: 'Direzione del Vento',
      visibility: 'Visibilità',
      cloudCover: 'Copertura Nuvolosa',
    },
    sun: {
      title: 'Orari del Sole',
      sunrise: 'Alba',
      sunset: 'Tramonto',
    },
    location: {
      title: 'Posizione',
      latitude: 'Latitudine',
      longitude: 'Longitudine',
      timezone: 'Fuso Orario',
    },
  },
  pt: {
    appTitle: 'App do Clima',
    appSubtitle: 'Obtenha informações meteorológicas em tempo real para qualquer local',
    searchPlaceholder: 'Digite o nome da cidade...',
    searchButton: 'Pesquisar',
    locationButton: 'Usar Minha Localização',
    loadingText: 'Carregando dados meteorológicos...',
    errorTitle: 'Erro',
    locationError: 'Não foi possível obter sua localização. Pesquise uma cidade.',
    geolocationError: 'A geolocalização não é suportada pelo seu navegador.',
    unexpectedError: 'Ocorreu um erro inesperado',
    lastSearched: 'Pesquisado recentemente',
    recentSearches: 'Pesquisas recentes',
    noRecentSearches: 'Nenhuma pesquisa recente',
    temperature: {
      title: 'Temperatura',
      high: 'Máxima',
      low: 'Mínima',
      humidity: 'Umidade',
      pressure: 'Pressão',
      feelsLike: 'Sensação Térmica',
    },
    wind: {
      title: 'Vento e Visibilidade',
      speed: 'Velocidade do Vento',
      direction: 'Direção do Vento',
      visibility: 'Visibilidade',
      cloudCover: 'Cobertura de Nuvens',
    },
    sun: {
      title: 'Horários do Sol',
      sunrise: 'Nascer do Sol',
      sunset: 'Pôr do Sol',
    },
    location: {
      title: 'Localização',
      latitude: 'Latitude',
      longitude: 'Longitude',
      timezone: 'Fuso Horário',
    },
  },
  ru: {
    appTitle: 'Приложение Погоды',
    appSubtitle: 'Получайте информацию о погоде в реальном времени для любого места',
    searchPlaceholder: 'Введите название города...',
    searchButton: 'Поиск',
    locationButton: 'Использовать Моё Местоположение',
    loadingText: 'Загрузка данных о погоде...',
    errorTitle: 'Ошибка',
    locationError: 'Не удалось получить ваше местоположение. Пожалуйста, найдите город.',
    geolocationError: 'Геолокация не поддерживается вашим браузером.',
    unexpectedError: 'Произошла непредвиденная ошибка',
    lastSearched: 'Последний поиск',
    recentSearches: 'Последние поиски',
    noRecentSearches: 'Нет последних поисков',
    temperature: {
      title: 'Температура',
      high: 'Максимум',
      low: 'Минимум',
      humidity: 'Влажность',
      pressure: 'Давление',
      feelsLike: 'Ощущается как',
    },
    wind: {
      title: 'Ветер и Видимость',
      speed: 'Скорость Ветра',
      direction: 'Направление Ветра',
      visibility: 'Видимость',
      cloudCover: 'Облачность',
    },
    sun: {
      title: 'Время Солнца',
      sunrise: 'Восход',
      sunset: 'Закат',
    },
    location: {
      title: 'Местоположение',
      latitude: 'Широта',
      longitude: 'Долгота',
      timezone: 'Часовой Пояс',
    },
  },
  zh: {
    appTitle: '天气应用',
    appSubtitle: '获取任何地点的实时天气信息',
    searchPlaceholder: '输入城市名称...',
    searchButton: '搜索',
    locationButton: '使用我的位置',
    loadingText: '正在加载天气数据...',
    errorTitle: '错误',
    locationError: '无法获取您的位置。请搜索城市。',
    geolocationError: '您的浏览器不支持地理定位。',
    unexpectedError: '发生意外错误',
    lastSearched: '最近搜索',
    recentSearches: '最近搜索',
    noRecentSearches: '没有最近搜索',
    temperature: {
      title: '温度',
      high: '最高',
      low: '最低',
      humidity: '湿度',
      pressure: '气压',
      feelsLike: '体感温度',
    },
    wind: {
      title: '风和能见度',
      speed: '风速',
      direction: '风向',
      visibility: '能见度',
      cloudCover: '云量',
    },
    sun: {
      title: '太阳时间',
      sunrise: '日出',
      sunset: '日落',
    },
    location: {
      title: '位置',
      latitude: '纬度',
      longitude: '经度',
      timezone: '时区',
    },
  },
  ja: {
    appTitle: '天気アプリ',
    appSubtitle: '任意の場所のリアルタイム天気情報を取得',
    searchPlaceholder: '都市名を入力...',
    searchButton: '検索',
    locationButton: '現在地を使用',
    loadingText: '天気データを読み込み中...',
    errorTitle: 'エラー',
    locationError: '位置情報を取得できませんでした。都市を検索してください。',
    geolocationError: 'お使いのブラウザは位置情報をサポートしていません。',
    unexpectedError: '予期しないエラーが発生しました',
    lastSearched: '最近検索',
    recentSearches: '最近の検索',
    noRecentSearches: '最近の検索はありません',
    temperature: {
      title: '気温',
      high: '最高',
      low: '最低',
      humidity: '湿度',
      pressure: '気圧',
      feelsLike: '体感温度',
    },
    wind: {
      title: '風と視程',
      speed: '風速',
      direction: '風向',
      visibility: '視程',
      cloudCover: '雲量',
    },
    sun: {
      title: '太陽の時間',
      sunrise: '日の出',
      sunset: '日の入り',
    },
    location: {
      title: '位置',
      latitude: '緯度',
      longitude: '経度',
      timezone: 'タイムゾーン',
    },
  },
  ko: {
    appTitle: '날씨 앱',
    appSubtitle: '어떤 위치든 실시간 날씨 정보를 받아보세요',
    searchPlaceholder: '도시 이름을 입력하세요...',
    searchButton: '검색',
    locationButton: '내 위치 사용',
    loadingText: '날씨 데이터를 불러오는 중...',
    errorTitle: '오류',
    locationError: '위치를 가져올 수 없습니다. 도시를 검색해주세요.',
    geolocationError: '브라우저가 위치 정보를 지원하지 않습니다.',
    unexpectedError: '예상치 못한 오류가 발생했습니다',
    lastSearched: '최근 검색',
    recentSearches: '최근 검색',
    noRecentSearches: '최근 검색이 없습니다',
    temperature: {
      title: '기온',
      high: '최고',
      low: '최저',
      humidity: '습도',
      pressure: '기압',
      feelsLike: '체감온도',
    },
    wind: {
      title: '바람과 가시거리',
      speed: '풍속',
      direction: '풍향',
      visibility: '가시거리',
      cloudCover: '구름량',
    },
    sun: {
      title: '태양 시간',
      sunrise: '일출',
      sunset: '일몰',
    },
    location: {
      title: '위치',
      latitude: '위도',
      longitude: '경도',
      timezone: '시간대',
    },
  },
  tr: {
    appTitle: 'Hava Durumu Uygulaması',
    appSubtitle: 'Herhangi bir konum için gerçek zamanlı hava durumu bilgisi alın',
    searchPlaceholder: 'Şehir adını girin...',
    searchButton: 'Ara',
    locationButton: 'Konumumu Kullan',
    loadingText: 'Hava durumu verileri yükleniyor...',
    errorTitle: 'Hata',
    locationError: 'Konumunuz alınamadı. Lütfen bir şehir arayın.',
    geolocationError: 'Tarayıcınız konum hizmetini desteklemiyor.',
    unexpectedError: 'Beklenmeyen bir hata oluştu',
    lastSearched: 'Son arama',
    recentSearches: 'Son arama',
    noRecentSearches: 'Son arama yok',
    temperature: {
      title: 'Sıcaklık',
      high: 'Yüksek',
      low: 'Düşük',
      humidity: 'Nem',
      pressure: 'Basınç',
      feelsLike: 'Hissedilen',
    },
    wind: {
      title: 'Rüzgar ve Görüş',
      speed: 'Rüzgar Hızı',
      direction: 'Rüzgar Yönü',
      visibility: 'Görüş',
      cloudCover: 'Bulut Örtüsü',
    },
    sun: {
      title: 'Güneş Zamanları',
      sunrise: 'Gün Doğumu',
      sunset: 'Gün Batımı',
    },
    location: {
      title: 'Konum',
      latitude: 'Enlem',
      longitude: 'Boylam',
      timezone: 'Saat Dilimi',
    },
  },
};

export function getTranslation(language: string): Translations {
  return translations[language] || translations.en;
} 