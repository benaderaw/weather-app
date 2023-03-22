import rain from "url:../img/404.png";
import clear from "url:../img/clear.png";
import clouds from "url:../img/cloud.png";
import mist from "url:../img/mist.png";
import rain from "url:../img/rain.png";
import snow from "url:../img/snow.png";

const weatherImgs = document.querySelector(".weather-imgs");
const detailContainer = document.querySelector(".detail-container");
const invalid = document.querySelector(".invalid");

const tempImg = document.querySelector(".temp-img");
const temp = document.querySelector(".temp");
const tempDescription = document.querySelector(".temp-description");
const humidity = document.querySelector(".humidity-percent");
const wind = document.querySelector(".wind-speed");

const input = document.querySelector(".location-form");
const locationValue = document.querySelector(".location-input");

const state = {
  weather: {},
};

let lat;
let lng;
let country = "";

navigator.geolocation.getCurrentPosition(function success(pos) {
  lat = pos.coords;
  lng = pos.coords;
});

// load location data
const locationData = async function () {
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${country || "usa"}`
    );

    render404(res);
    // if (!res.ok) throw new Error(`🛑🛑🛑`);

    const resData = await res.json();
    const data = resData[0].latlng;

    lat = data[0];
    lng = data[1];
  } catch (err) {
    console.error(err.message);
  }
};

// load weather data based ob location data
const weatherData = async function () {
  try {
    await locationData();

    const res = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&units=imperial&exclude=hourly,daily&appid=af6d9ef7cd7b37ca607d6e46c77bdc2c`
    );

    if (!res.ok) throw new Error(`${res.status}: ${res.statusText} 🛑`);

    const resData = await res.json();

    const { ...data } = resData.current;

    return (state.weather = {
      id: data.weather[0].id,
      forecast: data.weather[0].main,
      temp: data.temp,
      tempDescription: data.weather[0].description,
      humidity: data.humidity,
      windSpeed: data.wind_speed,
    });
  } catch (err) {
    throw err;
  }
};

//////////////////////////////////////////
//////////////////////////////////////////

// RENDER WEATHER

const fff = function (dom) {
  dom.style.opacity = 0;
  dom.style.scale = 0;
};

const render404 = function (res) {
  if (!res.ok) {
    // hide display
    weatherImgs.classList.add("hidden");
    detailContainer.classList.add("hidden");

    //
    fff(weatherImgs);
    fff(detailContainer);

    // show 404 message
    invalid.classList.remove("hidden");
    invalid.classList.add("fadeIn");
  }
};

const renderWeatherImg = function (data) {
  const forecast = data.forecast.toLowerCase().split(" ");

  if (forecast.includes("clear")) {
    tempImg.alt = data.tempDescription;
    return (tempImg.src = clear);
  }

  if (forecast.includes("clouds")) {
    tempImg.alt = data.tempDescription;
    return (tempImg.src = clouds);
  }

  if (forecast.includes("mist")) {
    tempImg.alt = data.tempDescription;
    return (tempImg.src = mist);
  }

  if (forecast.includes("rain")) {
    tempImg.alt = data.tempDescription;
    return (tempImg.src = rain);
  }

  if (forecast.includes("snow")) {
    tempImg.alt = data.tempDescription;
    return (tempImg.src = snow);
  }
};

const renderTemp = function (data) {
  return (temp.textContent = `${data.temp}\u00B0C`);
};

const renderTempDetail = function (data) {
  const tempDetailToUpper = data.tempDescription
    .split(" ")
    .map((el) => {
      return el[0].toUpperCase() + el.slice(1);
    })
    .join(" ");

  return (tempDescription.textContent = tempDetailToUpper);
};

const renderHumidity = function (data) {
  return (humidity.textContent = `${data.humidity}%`);
};

const renderWindSpeed = function (data) {
  return (wind.textContent = `${data.windSpeed} m/h`);
};

const renderWeather = async function () {
  try {
    const data = await weatherData();
    renderWeatherImg(data);
    renderTemp(data);
    renderTempDetail(data);
    renderHumidity(data);
    renderWindSpeed(data);
  } catch (err) {
    console.error(err);
  }
};

renderWeather();

const eee = function (dom) {
  dom.classList.add("fadeIn");
  dom.classList.add("fadeIn");
};

//
const displayWeather = function () {
  // show display
  eee(weatherImgs);
  eee(detailContainer);
  weatherImgs.classList.remove("hidden");
  detailContainer.classList.remove("hidden");

  // hide 404 message
  invalid.classList.add("hidden");
};

input.addEventListener("submit", function (e) {
  e.preventDefault();

  if (locationValue.value === "") return;

  country = locationValue.value;

  // render
  renderWeather();

  // display weather
  displayWeather();

  //

  // stop input focus
  locationValue.blur();

  // reset
  locationValue.setAttribute("placeholder", locationValue.value.toUpperCase());
  locationValue.value = "";
});
