export let store = {
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

export const fethData = async () => {
    try {
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
      
    } catch (err){
      console.log(err);
    };
};