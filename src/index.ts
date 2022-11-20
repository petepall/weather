import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Weather } from './ICurrentWeather.js';
import { TWeatherCode, weatherCodesArray } from './weatherCodes.js';

const request: AxiosInstance = axios.create({
	baseURL: 'https://api.open-meteo.com',
	timeout: 1000,
});

const response: AxiosResponse = await request.get(
	'v1/forecast?latitude=50.82&longitude=5.19&current_weather=true',
);

const weather: Weather = response.data;
const weatherCode = weatherCodesArray.find(
	(code) => code[weather.current_weather.weathercode],
) as TWeatherCode[0];

if (weatherCode) {
	weather.current_weather.weathercode =
		weatherCode[weather.current_weather.weathercode];
} else {
	console.log('Weather code not found');
}

console.log(weather);