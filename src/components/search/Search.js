import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import axios from "axios";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState();

  const loadOptions = async (inputValue) => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "a6de39b80emsh2c79d430e72f9d6p1148c9jsna256d95e8fca",
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    };

    const response = await fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=5000&namePrefix=${inputValue}`,
      options
    );

    const responseJSON = await response.json();

    return {
      options: responseJSON.data.map((city) => {
        return {
          value: {
            lat: city.latitude,
            lon: city.longitude,
            city: city.name,
            countryCode: city.countryCode,
            region: city.region,
            population: city.population,
          },
          label: `${city.name}, ${city.region}, ${city.countryCode}`,
        };
      }),
    };
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search The City"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
