import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'
const weatherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&'
const iconBaseUrl = 'https://openweathermap.org/img/wn/'

const getAll = () => {
    const request = axios.get(`${baseUrl}/api/all`)
    return request.then(response => response.data)
}

const getWeather = (lat, lng) => {
    const request = axios.get(`${weatherBaseUrl}lat=${lat}&lon=${lng}&appid=${api_key}`)
    return request.then(response => response.data)
}

const getIcon = (icon) => {
    const request = axios.get(`${iconBaseUrl}${icon}@2x.png`)
    return request.then(response => response.data)
}

export default { getAll, getWeather, getIcon }