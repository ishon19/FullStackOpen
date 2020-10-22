import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search";
import Result from "./Result";

const App = () => {
  const [data, setData] = useState([]);
  const [filteredResponse, setFilteredResponse] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [countryObj, setCountryObj] = useState({});

  const showButtonClickHandler = (countryObj) => {
    setShowDetails(true);
    setCountryObj(countryObj);
  };

  const searchHandler = (event) => {
    console.log("Search Query: ", event.target.value);
    setShowDetails(false);
    setCountryObj({});
    let searchQuery = event.target.value.trim().toLowerCase();
    let filteredCountries = data
      ? data.filter((country) =>
          country.name.toLowerCase().includes(searchQuery)
        )
      : [];
    console.log("filtered Countries: ", filteredCountries);
    setFilteredResponse(filteredCountries);
  };

  const effectHandler = () => {
    console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then(
      (response) => {
        console.log(response.data);
        setData(response.data);
      },
      (error) => {
        console.log("Error getting data from the server", error);
      }
    );
  };

  useEffect(effectHandler, []);

  return (
    <div>
      <Search onChangeHandler={searchHandler} />
      <Result
        response={filteredResponse}
        showButtonClickHandler={showButtonClickHandler}
        showDetails={showDetails}
        countryObj={countryObj}
      />
    </div>
  );
};

export default App;
