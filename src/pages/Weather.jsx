import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import cities from "../data/cities.json";
import { getWeatherDataByCityLatLong } from '../services/api.services';
import { Backdrop, CircularProgress } from '@mui/material';
import Lottie from 'react-lottie';
import weatherMist from '../assets/lotties/weather-mist';
import weatherHaze from '../assets/lotties/weather-haze';
import weatherDrizzle from '../assets/lotties/weather-drizzle';
import weatherCloudy from '../assets/lotties/weather-windy';
import weatherBrokenClouds from '../assets/lotties/weather-broken-clouds';

export const Weather = () => {

  // INIT STATES 
  const [weatherData, setWeatherData] = React.useState();
  const [open, setOpen] = React.useState(false);

  // Function to Fetch Weather Data
  const fetchWeatherData = (cityName) => {
    const city = findCityByLatLong(cityName);
    if (city != null) {
      getWeatherDataByCityLatLong(city.lat, city.lng)
        .then(res => {
          setTimeout(() => { }, 10000)
          setWeatherData({ ...res.data, cityName: cityName });
        })
        .catch(error => {
          console.error("Error fetching weather data:", error);
        })
        .finally(() => {
          setOpen(false)
        });
    } else {
      console.log("City not found");
    }
  };

  // Find the City object by City Name
  const findCityByLatLong = (cityName) => {
    return cities.find(cityItem => cityItem.city === cityName);
  };

  const weatherLottieMap = {
    "mist": weatherMist,
    "haze": weatherHaze,
    "light intensity drizzle": weatherDrizzle,
    "overcast clouds": weatherCloudy,
    "broken clouds": weatherBrokenClouds
  }

  const returnLottieOptions = (desc) => {
    return {
      loop: true,
      autoplay: true,
      animationData: weatherLottieMap[desc] != null ? weatherLottieMap[desc] : weatherCloudy,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    }
  };

  return (
    <Stack spacing={2} sx={{ width: 500, padding: '5%' }}>
      <Autocomplete
        sx={{ width: 300 }}
        freeSolo
        disableClearable
        options={cities.map((option) => option.city)}
        onChange={(event, newValue) => {
          if (newValue) {
            setOpen(true)
            fetchWeatherData(newValue);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Enter City"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        onClick={() => setOpen(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {weatherData && (
        <div>
          <h2>Weather for {weatherData.cityName}</h2>
          <p>Area: {weatherData.name}</p>
          <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <Lottie
            options={returnLottieOptions(weatherData.weather[0].description)}
            height={400}
            width={400}
          />
        </div>
      )}
    </Stack>
  );
};