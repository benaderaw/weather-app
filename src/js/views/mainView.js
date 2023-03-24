export default class MainView {
  container = document.querySelector(".container");
  weatherImgs = document.querySelector(".weather-imgs");
  detailContainer = document.querySelector(".detail-container");
  invalid = document.querySelector(".invalid");

  flag = document.querySelector(".location-flag");
  tempImg = document.querySelector(".temp-img");
  temp = document.querySelector(".temp");
  tempDescription = document.querySelector(".temp-description");
  humidity = document.querySelector(".humidity-percent");
  wind = document.querySelector(".wind-speed");

  input = document.querySelector(".location-form");
  locationValue = document.querySelector(".location-input");
  map = document.querySelector(".map");
  mapContainer = document.querySelector(".map-container");
  mapBtn = document.querySelector(".map-btn");
}
