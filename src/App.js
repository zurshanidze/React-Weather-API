import "./App.css";
import Search from "./components/search/Search";
import CurrentWeather from "./components/current-weather/Current-weather";
import Forecast from "./components/forecast/Forecast";
import { useEffect, useState } from "react";
import ToggleMode from "./components/toggle-mode/ToggleMode";

// console.log(
//   process.env.REACT_APP_WEATHER_API_URL,
//   process.env.REACT_APP_WEATHER_API_KEY
// );

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [additionalGeoIInfo, setAdditionalGeoIInfo] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const changeDarkMode = () => {
    setDarkMode(!darkMode);

    if (darkMode) {
      document.body.classList.add("dark");
    } else if (!darkMode) {
      document.body.classList.remove("dark");
    }
  };

  const handleOnSearchChange = (searchData) => {
    const value = searchData.value;
    const { lat, lon, city, countryCode, population, region } = value;

    const currentWeatherFetch = fetch(
      `${process.env.REACT_APP_WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
    );

    const currentForecastFetch = fetch(
      `${process.env.REACT_APP_WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, currentForecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({
          city: searchData.label,
          ...weatherResponse,
        });
        setForecast({
          city: searchData.label,
          ...forecastResponse,
        });
        setAdditionalGeoIInfo({ city, countryCode, region, population });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    changeDarkMode();
  }, []);

  return (
    <div className={`${darkMode ? "container" : "container dark"}`}>
      <ToggleMode onChange={changeDarkMode} darkMode={darkMode} />
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather ? (
        <CurrentWeather
          data={currentWeather}
          geoData={additionalGeoIInfo}
          darkMode={darkMode}
        />
      ) : (
        <p
          className={`${darkMode ? "app-instruction" : "app-instruction dark"}`}
        >
          Enter location to get current weather information and 7-day forecast
        </p>
      )}
      {forecast && <Forecast data={forecast} darkMode={darkMode} />}
    </div>
  );
}

export default App;
