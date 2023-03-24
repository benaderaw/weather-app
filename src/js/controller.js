import * as model from "./model.js";
import view from "./views/view.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import mapView from "./views/mapView.js";
import { async } from "regenerator-runtime";

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

const controlFlag = async function () {
  try {
    // GET VALUE OF INPUT
    const query = view.getQuery();
    if (query === "") return;

    // CATCH AND RENDER INVALID LOCATION MESSAGE
    const locationRes = await model.locationData(query);

    if (!locationRes.ok) {
      view.render404();
      throw new Error(`${locationRes.status}: Bad country api URL`);
    }

    // CATCH BAD WEATHER API URL
    const weatherRes = await model.weatherData();
    if (!weatherRes)
      throw new Error(`${locationRes.status}: Bad weather api URL`);

    // RENDER FLAG
    view.renderFlag(model.state.flag);

    // RENDER IMAGE
    view.weatherHideOnLoad();
    view.displayWeather();
    view.renderWeatherImg(model.state.weather);

    // RENDER TEMP
    view.renderTemp(model.state.weather);

    // RENDER TEMP DESCRIPTION
    view.renderTempDescription(model.state.weather);

    // RENDER HUMIDITY
    view.renderHumidity(model.state.weather);

    // RENDER WIND SPEED
    view.renderWindSpeed(model.state.weather);

    // Display Map
    model.mapData();
  } catch (err) {
    console.error(err);
  }
};

const controlMap = async function () {
  mapView.displayMapContainer();
  model.mapData();
};

const init = function () {
  view.searchHandler(controlFlag);
  mapView.displayBtnHandler(controlMap);
};

init();
