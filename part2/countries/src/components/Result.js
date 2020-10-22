import React from "react";

const Result = ({
  response,
  showButtonClickHandler,
  showDetails,
  countryObj,
}) => {
  const renderCountryDetails = (country) => {
    console.log("[renderCountryDetails]: ", country);
    return (
      <div>
        <h2>{country.name}</h2>
        <p>Capital {country.capital}</p>
        <p>Population {country.population}</p>

        <h3>Languages</h3>
        <ul>
          {country.languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>

        <img alt="flag" src={country.flag} height={200} width={200}></img>
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
                <button onClick={() => showButtonClickHandler(country)}>Show</button>
              </p>
            ))
          : "No Matches"}
      </div>
    );
  };

  return renderResonse(response);
};

export default Result;
