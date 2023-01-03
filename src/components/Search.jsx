import axios from "axios";
import React from "react";
//import { useEffect } from "react";
import { useState } from "react";

export default function Weather() {
  const [data, setData] = useState();

  const apiKey = "9d90489d1a4789792602519391e0c1fa";
  const [searchCityName, setSearchCityName] = useState("");

  const handleChangeInput = (e) => {
    //console.log("value",e.target.value)
    setSearchCityName(e.target.value);
  };

  const getWeatherDetails = (cityName) => {
    if (!cityName) return;
    const apiURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apiKey;
    axios
      .get(apiURL)
      .then((res) => {
        console.log("response", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

 
  const handleSearch = () => {
    getWeatherDetails(searchCityName);
  };

  return (
    <>
      <div className="col-md-12">
        <div className="weatherBg">
          <h1 className="heading d-flex justify-content-center">Weather App</h1>
          <div className="search d-flex justify-content-center px-5 p-3">
            <div className="input-group mb-3 " style={{ width: "40%" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search here"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                value={searchCityName}
                onChange={handleChangeInput}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
          
          {data&&<div className="col-md-12 text-center mt-5">
            <div className="shadow rounded weatherResultBox">
              <img
                className="weatherIcon"
                src="https://www.noaa.gov/sites/default/files/styles/square_width_650/public/2021-02/FocusArea__Weather-02.jpg?h=5dc006f5&itok=20VGa8_F"
                alt=""
              />
              <h5 className="weatherCityName">{data?.name}</h5>
              <h6 className="weatherTemp">{((data?.main?.temp)-273.15).toFixed(2)}°C</h6>
            </div>
          </div>}
        </div>
      </div>
    </>
  );
}
