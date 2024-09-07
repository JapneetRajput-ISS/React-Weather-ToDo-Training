import Axios from 'axios';

export const getWeatherDataByCityLatLong = async (lat, long) => {
    try {
        return Axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`)
    } catch (error) {
        throw new Error("Server error : ", error)
    }
}