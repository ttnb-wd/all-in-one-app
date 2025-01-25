import React, { useState } from 'react';
import './Weather.css';

// Mock weather data for different cities
const mockWeatherData = {
  'london': {
    name: 'London',
    sys: { country: 'GB' },
    weather: [{ icon: '04d', description: 'cloudy with light rain' }],
    main: {
      temp: 18,
      feels_like: 17,
      humidity: 75,
      pressure: 1012
    },
    wind: { speed: 4.2 }
  },
  'paris': {
    name: 'Paris',
    sys: { country: 'FR' },
    weather: [{ icon: '01d', description: 'clear sky' }],
    main: {
      temp: 22,
      feels_like: 21,
      humidity: 60,
      pressure: 1015
    },
    wind: { speed: 3.1 }
  },
  'new york': {
    name: 'New York',
    sys: { country: 'US' },
    weather: [{ icon: '02d', description: 'partly cloudy' }],
    main: {
      temp: 25,
      feels_like: 26,
      humidity: 65,
      pressure: 1008
    },
    wind: { speed: 5.2 }
  },
  'tokyo': {
    name: 'Tokyo',
    sys: { country: 'JP' },
    weather: [{ icon: '10d', description: 'light rain' }],
    main: {
      temp: 28,
      feels_like: 30,
      humidity: 80,
      pressure: 1006
    },
    wind: { speed: 3.8 }
  },
  'sydney': {
    name: 'Sydney',
    sys: { country: 'AU' },
    weather: [{ icon: '01d', description: 'sunny' }],
    main: {
      temp: 24,
      feels_like: 25,
      humidity: 55,
      pressure: 1020
    },
    wind: { speed: 6.1 }
  }
};

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchCity = city.trim().toLowerCase();
    
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      if (mockWeatherData[searchCity]) {
        setWeather(mockWeatherData[searchCity]);
        setError(null);
      } else {
        setError('City not found. Try: London, Paris, New York, Tokyo, or Sydney');
        setWeather(null);
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="weather-container">
      <h1>Weather Forecast</h1>
      
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Try: London, Paris, New York, Tokyo, Sydney"
          className="city-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && <div className="loading">Loading...</div>}
      
      {error && <div className="error">{error}</div>}
      
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <div className="weather-main">
            <img 
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p className="temperature">{Math.round(weather.main.temp)}°C</p>
          </div>
          <p className="description">{weather.weather[0].description}</p>
          <div className="weather-details">
            <div>
              <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>
              <p>Humidity: {weather.main.humidity}%</p>
            </div>
            <div>
              <p>Wind: {weather.wind.speed} m/s</p>
              <p>Pressure: {weather.main.pressure} hPa</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather; 