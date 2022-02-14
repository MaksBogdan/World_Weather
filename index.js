"use strict"
const link = `http://api.weatherstack.com/current?access_key=37 a64b378ae88bb8e0f319f8599f7e4a`;
// const fetchP = import('node-fetch').then(mod => mod.default);
// const fetch = (...args) => fetchP.then(fn => fn(...args));
// var jsdom = import("jsdom");
// var JSDOM = jsdom.JSDOM;
const root = document.getElementById('root'); 
const popup = document.getElementById("popup");
const textInput = document.getElementById("text-input");
const form = document.getElementById("form");


let store = {
  city: "Grodno",
  temperature: 0,
  time: "00:00 AM",
  isDay: "yes",
  weather: "",
  properties: {
    cloudcover: {},
    humidity: {},
    windSpeed: {},
    pressure: {},
    uvIndex: {},
    visibility: {},
  },
}

const fethData = async () => {
  const resalt = await fetch (`${link}&query=${store.city}`);
  const data = await resalt.json();
  const {
    location: {
      name 
     },
    current: {
      cloudcover,
      temperature,
      humidity,
      observation_time: time,
      pressure,
      uv_index: uvIndex,
      visibility,
      is_day: isDay,
      weather_descriptions: weather,
      wind_speed: windSpeed,
    },
  } = data;
  
  store = {
    ...store,
    isDay,
    city: name,
    temperature,
    time,
    weather: weather[0],
    properties: {
      cloudcover: {
        title: "cloudcover",
        value: `${cloudcover}%`,
        icon: "cloud.png",
      },
      humidity: {
        title: "humidity",
        value: `${humidity}%`,
        icon: "humidity.png",
      },
      windSpeed: {
        title: "wind speed",
        value: `${windSpeed} km/h`,
        icon: "wind.png",
      },
      pressure: {
        title: "pressure",
        value: `${pressure} %`,
        icon: "gauge.png",
      },
      uvIndex: {
        title: "uv Index",
        value: `${uvIndex} / 100`,
        icon: "uv-index.png",
      },
      visibility: {
        title: "visibility",
        value: `${visibility}%`,
        icon: "visibility.png",
      },
    },
  } 
  renderComponent();
  
  
};

const getImage = (weather) => {
  const weatherImg = weather.toLowerCase();
  switch(weatherImg){
    case 'sunny':
      return 'sunny.png';
    case 'clear':
      return 'clear.png';
    case 'cloud':
      return 'cloud.png';
    case 'fog':
      return 'fog.png';
    case 'partly':
      return 'partly.png';                  
    default: 
      return 'the.png'
  }
};
const renderProperty = (properties) => {
  return Object.values(properties)
    .map(({ title, value, icon }) => {
      return `<div class="property">
            <div class="property-icon">
              <img src="./img/icons/${icon}" alt="">
            </div>
            <div class="property-info">
              <div class="property-info__value">${value}</div>
              <div class="property-info__description">${title}</div>
            </div>
          </div>`;
    })
    .join("");
}

const markup = () => {
   const {city, time, temperature, properties, weather, isDay} = store;
   const containerClass = isDay === 'yes' ? 'is-Day' : '';
   console.log(isDay);
     return  `<div class="container ${containerClass}">
              <div class="top">
                 <div class="city">
                  <div class="city-subtitle">Weather Today in</div>
                    <div class="city-title" id="city">
                    <span>${city}</span>
                  </div>
                </div>
                <div class="city-info">
                  <div class="top-left">
                  <img class="icon" src = ./img/${getImage(weather)} alt = ''>
                  <div class="description">${weather}</div>
                </div>
  
                <div class="top-right">
                 <div class="city-info__subtitle">as of ${time}</div>
                  <div class="city-info__title">${temperature}°</div>
                </div>
              </div>
            </div>
            <div id="properties">${renderProperty(properties)}</div>
            </div>`;
}
const renderComponent = () => {
  root.innerHTML = markup();
} 
fethData();
  