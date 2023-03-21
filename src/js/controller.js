const tempImg = document.querySelector(".temp-img");
const temp = document.querySelector(".temp");
const tempDescription = document.querySelector(".temp-description");
const humidity = document.querySelector(".humidity-percent");
const wind = document.querySelector(".wind-speed");

const state = {
  weather: {},
};

let lat = 90;
let lang = 0;

const weatherData = async function () {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lang}&exclude=hourly,daily&appid=af6d9ef7cd7b37ca607d6e46c77bdc2c`
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

const renderWeatherImg = function (data) {
  const forecast = data.forecast.toLowerCase().split(" ");

  if (forecast.includes("clear")) return (tempImg.src = "/src/img/clear.png");

  if (forecast.includes("cloud")) return (tempImg.src = "/src/img/cloud.png");

  if (forecast.includes("mist")) return (tempImg.src = "/src/img/mist.png");

  if (forecast.includes("rain")) return (tempImg.src = "/src/img/rain.png");

  if (forecast.includes("snow")) return (tempImg.src = "/src/img/snow.png");
};

const renderTemp = function (data) {
  return (temp.textContent = `${data.temp}\u00B0`);
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
  return (wind.textContent = `${data.windSpeed}km/h`);
};

const renderWeather = async function () {
  try {
    const data = await weatherData();

    renderWeatherImg(data);
    renderTemp(data);
    renderTempDetail(data);
    renderHumidity(data);
    renderWindSpeed(data);

    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

renderWeather();
