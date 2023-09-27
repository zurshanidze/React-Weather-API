import "./current-weather.css";

const CurrentWeather = ({ data, geoData }) => {
  return (
    <div className="weather">
      <div className="top">
        <div className="city-weather-wrapper">
          <div className="city-countryCode">
            <p className="city">
              {geoData.city}, {geoData.countryCode}
            </p>
          </div>
          <div className="region">
            <label>Region: </label>
            <label>{geoData.region}</label>
          </div>
          <div className="population">
            <label>Population: </label>
            <label>{geoData.population}</label>
          </div>

          <p className="weather-description">{data.weather[0].description}</p>
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${data.weather[0].icon}.png`}
        />
      </div>
      <div className="bottom">
        <p className="temperature">{data.main.temp.toFixed(0)}°C</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label top">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feels Like</span>
            <span className="parameter-value">
              {data.main.feels_like.toFixed(0)}°C
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{data.wind.speed} m/s</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
