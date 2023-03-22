import * as model from "./model.js";
import view from "./views/view.js";
import mainView from "./views/mainView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

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

    // RENDER FLAG
    view.renderFlag(model.state.flag);

    // CATCH BAD WEATHER API URL
    const weatherRes = await model.weatherData();
    if (!weatherRes.ok)
      throw new Error(`${locationRes.status}: Bad weather api URL`);

    // RENDER IMAGE
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
  } catch (err) {
    console.error(err);
  }
};

// const controlWeather = async function () {
//   try {
//     await model.weatherData();
//     console.log(model.state);
//     view.renderWeatherImg(model.state.weather);
//   } catch (err) {
//     console.error(err);
//   }
// };

// controlWeather();

const init = function () {
  view.searchHandler(controlFlag);
  //view.searchHandler(controlWeather);
};

init();
