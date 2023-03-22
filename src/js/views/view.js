import flag404 from "url:../../img/flag404.png";
import clear from "url:../../img/clear.png";
import clouds from "url:../../img/cloud.png";
import mist from "url:../../img/mist.png";
import rain from "url:../../img/rain.png";
import snow from "url:../../img/snow.png";

import mainView from "./mainView";

class View extends mainView {
  // GET INPUT VALUE
  getQuery() {
    if (this.locationValue.value === "") return "";

    const query = this.locationValue.value;

    //this.locationValue.value.blur();
    this.locationValue.setAttribute("placeholder", query.toUpperCase());
    this.locationValue.value = "";

    return query;
  }

  // RENDER FLAG
  renderFlag(png) {
    this.flag.src = png;
  }

  // RENDER IMAGE
  renderWeatherImg(data) {
    const forecast = data.forecast.toLowerCase().split(" ");

    if (forecast.includes("clear")) {
      this.tempImg.alt = data.tempDescription;
      return (this.tempImg.src = clear);
    }

    if (forecast.includes("clouds")) {
      this.tempImg.alt = data.tempDescription;
      return (this.tempImg.src = clouds);
    }

    if (forecast.includes("mist")) {
      this.tempImg.alt = data.tempDescription;
      return (this.tempImg.src = mist);
    }

    if (forecast.includes("rain")) {
      this.tempImg.alt = data.tempDescription;
      return (this.tempImg.src = rain);
    }

    if (forecast.includes("snow")) {
      this.tempImg.alt = data.tempDescription;
      return (this.tempImg.src = snow);
    }
  }

  // RENDER TEMP
  renderTemp(data) {
    return (this.temp.textContent = `${data.temp}\u00B0F`);
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
  }

  // REMOVE HIDDEN FROM WEATHER
  displayWeather() {
    // show display
    this.weatherImgs.classList.remove("hidden");
    this.detailContainer.classList.remove("hidden");

    //
    this.container.style.height = "610px";

    // remove fade in from 404
    this.invalid.classList.remove("fadeIn");

    // hide 404
    this.invalid.classList.add("hidden");
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