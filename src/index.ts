import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Weather } from './ICurrentWeather.js';
import { weatherCodesArray } from './weatherCodes.js';

const weatherRequest: AxiosInstance = axios.create({
	baseURL: 'https://api.open-meteo.com',
	timeout: 1000,
});

const weatherResponse: AxiosResponse = await weatherRequest.get(
	'v1/forecast?latitude=50.82&longitude=5.19&current_weather=true',
);

const weather: Weather = weatherResponse.data;

const weatherCode: { [key: string]: string } | undefined =
	weatherCodesArray.find((code) => code[weather.current_weather.weathercode]);

if (weatherCode) {
	weather.current_weather.weathercode += ` - ${
		weatherCode[weather.current_weather.weathercode]
	}`;
} else {
	console.log('Weather code not found');
}

const UTCdate = weather.current_weather.time + 'Z';
const localDateTime = new Date(UTCdate);
const shortTimezone = localDateTime
	.toLocaleString('nl-BE', { timeZoneName: 'short' })
	.split(' ')[2];

const fullTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

weather.timezone = fullTimezone;
weather.timezone_abbreviation = shortTimezone;
weather.current_weather.time = localDateTime.toLocaleString();

console.log(weather);
