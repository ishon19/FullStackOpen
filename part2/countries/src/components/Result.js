import React from "react";

const Result = ({
  response,
  showButtonClickHandler,
  showDetails,
  countryObj,
  weatherData,
}) => {
  const renderWeatherData = () => {
    return weatherData.current ? (
      <div>
        <p>
          <b>Temperature :</b> {weatherData.current.temperature}
        </p>
        <img
          alt="Weather icon"
          height="100"
          width="100"
          src={weatherData.current.weather_icons[0]}
        ></img>
        <p>
          <b>Wind :</b> {weatherData.current.wind_speed} mph direction{" "}
          {weatherData.current.wind_dir}
        </p>
      </div>
    ) : (
      ""
    );
  };

  const renderCountryDetails = (country) => {
    console.log("[renderCountryDetails]: ", country);
    return (
      <div>
        <h2>{country.name}</h2>
        <p>
          <b>Capital</b> {country.capital}
        </p>
        <p>
          <b>Population</b> {country.population}
        </p>

        <h3>Spoken Languages</h3>
        <ul>
          {country.languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img alt="flag" src={country.flag} height={200} width={200}></img>
        <h3>Weather in {country.capital}</h3>
        {renderWeatherData(country.capital)}
      </div>
    );
  };

  const renderResonse = (response) => {
    return showDetails ? (
      <div>{renderCountryDetails(countryObj)}</div>
    ) : (
      <div>
        {response.length === 1
          ? renderCountryDetails(response[0])
          : response.length > 10
          ? "Too many matches, specify another filter"
          : response.length <= 10
          ? response.map((country) => (
              <p key={country.alpha2Code}>
                {country.name}{" "}
                <button onClick={() => showButtonClickHandler(country)}>
                  Show
                </button>
              </p>
            ))
          : "No Matches"}
      </div>
    );
  };

  return renderResonse(response);
};

export default Result;
