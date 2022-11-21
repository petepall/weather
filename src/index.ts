import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { IWeatherAPI } from './IWeatherApi.js';

const request: AxiosInstance = axios.create({
	// baseURL: 'https://api.open-meteo.com',
	baseURL: 'https://fcc-weather-api.glitch.me',
	timeout: 1000,
});

const response: AxiosResponse = await request.get(
	// 'v1/forecast?latitude=50.82&longitude=5.19&current_weather=true',
	'/api/current?lat=50.82&lon=5.19',
);

const weather: IWeatherAPI = response.data;

// const weather: Weather = response.data;
// const weatherCode: { [key: string]: string } | undefined =
// 	weatherCodesArray.find((code) => code[weather.current_weather.weathercode]);

// if (weatherCode) {
// 	weather.current_weather.weathercode += ` - ${
// 		weatherCode[weather.current_weather.weathercode]
// 	}`;
// } else {
// 	console.log('Weather code not found');
// }

console.log(weather);
