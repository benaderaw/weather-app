"use strict";

console.log("hello world");

const degree = document.querySelector(".temp");
const degreeDescription = document.querySelector(".temp-description");

const state = {
  weather: {},
};

const jjj = async function () {
  try {
    const res = await fetch(
      "https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=af6d9ef7cd7b37ca607d6e46c77bdc2c"
    );

    if (!res.ok) throw new Error(`${res.status}: ${res.statusText} 🛑`);

    const resData = await res.json();

    const { ...data } = resData.current;
    console.log(data);

    state.weather = {
      id: data.weather[0].id,
      forecast: data.weather[0].main,
      temp: data.temp,
      tempDescription: data.weather[0].description,
      humidity: data.humidity,
      windSpeed: data.wind_speed,
    };

    console.log(state.weather);
  } catch (err) {
    console.error(err);
  }
};

jjj();
