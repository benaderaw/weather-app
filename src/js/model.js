import { async } from "regenerator-runtime";
import { API_KEY, API_URL } from "./config";
import { AJAX } from "./helper";

export const state = {
  weather: {},
};

let lat;
let lng;
export let map;

export const locationData = async function (country) {
  try {
    const res = await AJAX(`${API_URL}${country}?fullText=true`);

    const resData = await res.json();
    if (!res.ok) return res;

    state.flag = resData[0].flags.png;
    const data = resData[0].latlng;

    lat = data[0];
    lng = data[1];

    state.weather.lat = lat;
    state.weather.lng = lng;

    return res;
  } catch (err) {
    throw err;
  }
};

// load weather data based ob location data
export const weatherData = async function () {
  try {
    const res = await AJAX(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&units=imperial&exclude=hourly,daily&appid=${API_KEY}`
    );

    const resData = await res.json();
    if (!res.ok) return res;

    const { ...data } = resData.current;

    state.weather = {
      id: data.weather[0].id,
      forecast: data.weather[0].main,
      temp: data.temp,
      tempDescription: data.weather[0].description,
      humidity: data.humidity,
      windSpeed: data.wind_speed,
    };

    return res;
  } catch (err) {
    throw err;
  }
};

export const mapData = async function () {
  if (map != undefined) map.remove();

  map = L.map("map").setView([lat, lng], 5);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([lat, lng]).addTo(map);
};
