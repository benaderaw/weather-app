import flag404 from "url:../../img/flag404.png";
import clear from "url:../../img/clear.png";
import clouds from "url:../../img/cloud.png";
import mist from "url:../../img/mist.png";
import rain from "url:../../img/rain.png";
import snow from "url:../../img/snow.png";

import mainView from "./mainView";
import { DEGREE_SYMBOL } from "../config";
class View extends mainView {
  // GET INPUT VALUE
  getQuery() {
    if (this.locationValue.value === "") return "";

    const query = this.locationValue.value.trim();

    //this.locationValue.value.blur();
    this.locationValue.setAttribute("placeholder", query.toUpperCase());
    this.locationValue.value = "";
    this.locationValue.blur();

    return query;
  }

  // RENDER FLAG
  renderFlag(png) {
    this.flag.src = png;
  }

  //
  weatherHideOnLoad() {
    this.weatherImgs.style.opacity = 0;
    this.weatherImgs.style.scale = 0;

    this.detailContainer.style.opacity = 0;
    this.detailContainer.style.scale = 0;
  }

  // ADD FADE-IN CLASS
  addFadeInClass() {
    this.weatherImgs.classList.add("fadeIn");
    this.detailContainer.classList.add("fadeIn");
  }

  // RENDER IMAGE

  renderWeatherImg(data) {
    const forecast = data.forecast.toLowerCase().split(" ");
    const weatherConditions = ["clear", "clouds", "rain", "mist", "snow"];
    const weatherConditionImgs = [clear, clouds, rain, mist, snow];

    let currCondition;

    weatherConditions.filter((el, i) => {
      if (forecast.includes(el)) {
        currCondition = weatherConditionImgs[i];
      }
    });

    this.tempImg.alt = data.tempDescription;
    this.tempImg.src = currCondition;
  }

  // RENDER TEMP
  renderTemp(data) {
    return (this.temp.textContent = `${data.temp}${DEGREE_SYMBOL}F`);
  }

  // RENDER TEMP DESCRIPTION
  renderTempDescription(data) {
    const tempDetailToUpper = data.tempDescription
      .split(" ")
      .map((el) => {
        return el[0].toUpperCase() + el.slice(1);
      })
      .join(" ");

    return (this.tempDescription.textContent = tempDetailToUpper);
  }

  // RENDER HUMIDITY
  renderHumidity(data) {
    return (this.humidity.textContent = `${data.humidity}%`);
  }

  // RENDER WIND SPEED
  renderWindSpeed(data) {
    return (this.wind.textContent = `${data.windSpeed} m/h`);
  }

  // RENDER BAD URL
  render404() {
    //
    this.weatherHideOnLoad();
    // remove fade in from 404
    this.weatherImgs.classList.remove("fadeIn");
    this.detailContainer.classList.remove("fadeIn");

    // hide display
    this.weatherImgs.classList.add("hidden");
    this.detailContainer.classList.add("hidden");

    // show 404 message
    this.invalid.classList.remove("hidden");
    this.container.style.height = "500px";
    this.invalid.classList.add("fadeIn");

    //
    this.flag.src = flag404;

    // remove map button
    this.map.classList.add("hidden");

    // remove map display
    this.mapContainer.classList.add("hidden");
    this.container.classList.remove("borderToZero");

    // remove btn icon color
    this.mapBtn.classList.remove("map-btn-toggled");
  }

  // REMOVE HIDDEN FROM WEATHER
  // RENDER WEATHER AFTER 404
  displayWeather() {
    //
    this.addFadeInClass();

    // show display
    this.weatherImgs.classList.remove("hidden");
    this.detailContainer.classList.remove("hidden");

    //
    this.container.style.height = "650px";

    // remove fade in from 404
    this.invalid.classList.remove("fadeIn");

    // hide 404
    this.invalid.classList.add("hidden");

    // add map button
    this.map.classList.remove("hidden");
  }

  // EVENT HANDLER (SUBMIT)
  searchHandler(handler) {
    this.input.addEventListener("submit", function (e) {
      e.preventDefault();

      handler();
    });
  }
}

export default new View();
