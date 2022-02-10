"use strict"
const link = "http://api.weatherstack.com/current?access_key=42a70c58e24c0657cf1dae01d1c5b48a";
// const fetchP = import('node-fetch').then(mod => mod.default);
// const fetch = (...args) => fetchP.then(fn => fn(...args));
// var jsdom = import("jsdom");
// var JSDOM = jsdom.JSDOM;
const root = document.getElementById('root'); 
const popup = document.getElementById("popup");
const textInput = document.getElementById("text-input");
const form = document.getElementById("form");


let store = {
  city:'Grodno',
  contry:'Belarus',
  region: '',
  feelslike: 0,
  cloudcover: 0,
  temperature: 0,
  humidity: 0,
  observationTime: '00:00 am',
  pressure: 0,
  weather: 0,
  visibility: 0,
  wind: 0,
  isDay: 'yes',
  
}

const fethData = async () => {
  const resalt = await fetch (`${link}&query=${store.city},${store.contry}`);
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
      weather_descriptions: weather,
      observation_time: time,
      visibility,
      wind_speed: wind,
      is_day: isDay,
    },
  } = data;
  
  store = {
    ...store,
    city,
    country,
    region,
    feelslike,
    cloudcover,
    temperature,
    weather,
    time,
    visibility,
    wind,
    isDay,
  };
  console.log(`${store.time}, have ${store.temperature}°c , in ${store.city}`);
  
  renderComponent();
};
const markup = () => {
   const {city, description, observationTime, temperature, isDay, properties} = store;
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
                  <img class="icon" src="./img/${getImage(description)}" alt="" />
                  <div class="description">${description}</div>
                </div>
  
                <div class="top-right">
                 <div class="city-info__subtitle">as of ${observationTime}</div>
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
  