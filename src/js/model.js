export const state = {
  weather: {},
};

let lat;
let lng;

// navigator.geolocation.getCurrentPosition(function success(pos) {
//   lat = pos.coords;
//   lng = pos.coords;
// });

// load location data

//

// load latitude and longitude
export const locationData = async function (country) {
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${country}?fullText=true`
    );

    if (!res.ok) return res;

    const resData = await res.json();
    state.flag = resData[0].flags.png;
    const data = resData[0].latlng;

    lat = data[0];
    lng = data[1];
    return res;
  } catch (err) {
    throw err;
  }
};

// load weather data based ob location data
export const weatherData = async function () {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&units=imperial&exclude=hourly,daily&appid=af6d9ef7cd7b37ca607d6e46c77bdc2c`
    );

    if (!res.ok) return res;

    const resData = await res.json();
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
