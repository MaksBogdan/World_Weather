"use strict"
const link = `http://api.weatherstack.com/current?access_key=37a64b378ae88bb8e0f319f8599f7e4a`;
// const fetchP = import('node-fetch').then(mod => mod.default);
// const fetch = (...args) => fetchP.then(fn => fn(...args));
// var jsdom = import("jsdom");
// var JSDOM = jsdom.JSDOM;
const root = document.getElementById('root'); 
const popup = document.getElementById("popup");
const textInput = document.getElementById("text-input");
const form = document.getElementById("form");


let store = {
  //city:'',
  city:'Grodno',
  contry:'',
  region: '',
  feelslike: 0,
  temperature: 0,
  weather:'',
  isDay:'',
  properties:{
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
    location:{
      name: city,
      country,
      region,
    },
    current:{
      feelslike,
      cloudcover,
      temperature,
      properties,
      weather_descriptions: weather,
      observation_time: time,
      visibility,
      wind_speed: wind,
      is_day: isDay,
      weather_icons: weatherIcons,
    },
  } = data;
  
  store = {
    ...store,
    city,
    country,
    region,
    feelslike,
    properties,
    cloudcover,
    temperature,
    weather: weather[0],
    weatherIcons,
    time,
    visibility,
    wind,
    isDay,
  };
  renderComponent();
  
  console.log(data);
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
            <div id="properties">${properties}</div>
            </div>`;
}
const renderComponent = () => {
  root.innerHTML = markup();
} 
fethData();
  