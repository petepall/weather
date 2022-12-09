import axios, { AxiosInstance, AxiosResponse } from 'axios';
import dotenv from 'dotenv';
import { IWeather } from './ICurrentWeather.js';
import { ILocation } from './ILocationData.js';
import { weatherCodesArray } from './weatherCodes.js';

dotenv.config();

async function getCurrentWeather(
	latitude: number,
	longitude: number,
): Promise<AxiosResponse<IWeather>> {
	const weatherRequest: AxiosInstance = axios.create({
		baseURL: 'https://api.open-meteo.com',
		timeout: 1000,
	});

	return await weatherRequest.get(
		`v1/forecast?latitude=${latitude}2&longitude=${longitude}&current_weather=true`,
	);
}

async function getCityName(
	latitude: number,
	longitude: number,
): Promise<AxiosResponse<ILocation>> {
	const locationRequest: AxiosInstance = axios.create({
		baseURL: 'https://api.myptv.com/geocoding',
		timeout: 1000,
		headers: {
			apiKey: process.env.API_KEY,
			'Content-Type': 'application/json',
		},
	});

	return await locationRequest.get(
		`/v1/locations/by-position/${latitude}/${longitude}?language=en`,
	);
}

const latitude = 50.80835;
const longitude = 5.19168;

const weatherResponse: AxiosResponse<IWeather> = await getCurrentWeather(
	latitude,
	longitude,
);
const locationResponse: AxiosResponse<ILocation> = await getCityName(
	latitude,
	longitude,
);

const location: ILocation = locationResponse.data;

const weather: IWeather = weatherResponse.data;

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

console.dir(location, { depth: null });
