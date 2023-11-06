import axios from "axios";
import { useEffect, useState } from "react";
import {
  WiDaySunny,
  WiDayCloudy,
  WiCloud,
  WiCloudy,
  WiDust,
  WiSnowflakeCold,
  WiThunderstorm,
  WiRain,
  WiRainMix,
} from "react-icons/wi";

const weatherIcons = {
  "01": {
    textColor: "text-red-500",
    icon: <WiDaySunny size={120} />,
  },

  "02": {
    textColor: "text-red-300",
    icon: <WiDayCloudy size={120} />,
  },

  "03": {
    textColor: "text-gray-300",
    icon: <WiCloud size={120} />,
  },

  "04": {
    textColor: "text-gray-500",
    icon: <WiCloudy size={120} />,
  },

  "09": {
    textColor: "text-blue-500",
    icon: <WiRainMix size={120} />,
  },

  10: {
    textColor: "text-blue-300",
    icon: <WiRain size={120} />,
  },

  11: {
    textColor: "text-yellow-500",
    icon: <WiThunderstorm size={120} />,
  },

  13: {
    textColor: "text-white",
    icon: <WiSnowflakeCold size={120} />,
  },

  50: {
    textColor: "text-white",
    icon: <WiDust size={120} />,
  },
};

const App = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [weatherData, setWeatherData] = useState();

  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  };

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );

      setWeatherData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGeolocation();
  }, []);

  useEffect(() => {
    if (!latitude || !longitude) return;

    getWeather();
  }, [latitude, longitude]);

  return (
    <div className="bg-pink-100 min-h-screen flex flex-col justify-center items-center text-2xl">
      {weatherData ? (
        <div
          className={`flex flex-col items-center gap-8 ${
            weatherIcons[weatherData.weather[0].icon.substring(0, 2)].textColor
          }`}
        >
          {weatherIcons[weatherData.weather[0].icon.substring(0, 2)].icon}
          <div>
            {weatherData.name}, {parseInt(weatherData.main.temp, 10)}℃
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default App;
